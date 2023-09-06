from PyPDF2 import PdfReader
from flask import render_template, url_for, flash, redirect, request,session,send_file
from questionpapergenerator import app, users_collection , pdf_collection
import re
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, T5ForConditionalGeneration, T5TokenizerFast
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
import torch,random

# model_1=AutoModelForSeq2SeqLM.from_pretrained("rohan-jp1/t5-end2end-question-generation")

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ''
    for page in reader.pages:
        text += page.extract_text()
    return text

def preprocess_text(text, segment_length=1700):
    # Remove leading and trailing whitespace
    text = text.strip()

    # Replace bullet points with a space
    text = re.sub(r'\s*•\s*', ' ', text)

    # Replace newlines and multiple whitespaces with a single space
    text = ' '.join(text.split())

    # Split the text into segments of specified length
    segments = [text[i:i+segment_length] for i in range(0, len(text), segment_length)]

    return segments


checkpoint = "t5-base"
tokenizer = T5TokenizerFast.from_pretrained(checkpoint)

model = AutoModelForSeq2SeqLM.from_pretrained("rohan-jp1/t5-end2end-questions-generation")

import random

def hf_run_model(input_list, num_return_sequences=8, num_questions=2, max_sequence_length=512, generator_args=None):
    if generator_args is None:
        generator_args = {
            "max_length": max_sequence_length,
            "num_beams": 10,
            "length_penalty": 1.5,
            "no_repeat_ngram_size": 6,
            "early_stopping": True,
            "temperature": 0.8,  # Adjust the temperature value (higher values for more randomness)
            "top_k": 50,  # Adjust the top_k value (higher values for more diverse output)
            "top_p": 0.95  # Adjust the top_p value (lower values for more focused output)
        }
    
    generated_questions = []
    unique_questions = set()

    #creating tensors of each input
    for input_string in input_list:
        input_string = "generate questions: " + input_string + " </s>"
        input_ids = tokenizer.encode(input_string, truncation=True, max_length=max_sequence_length, return_tensors="pt")

        # Generate questions using the model
        res = model.generate(input_ids, **generator_args, num_return_sequences=num_return_sequences)
        output = tokenizer.batch_decode(res, skip_special_tokens=True, clean_up_tokenization_spaces=True)

        segment_questions = []
        for sequence in output:
            sequence = sequence.split("<sep>")
            questions = [question.strip() + "?" for question in sequence[0].split("?") if question.strip()]
            segment_questions.extend(questions[:num_questions])  # Selecting the desired number of questions from each segment

        # Filter out single-word questions for each segment
        segment_questions = [question for question in segment_questions if len(question.split()) > 1]
        generated_questions.extend(segment_questions)

    # Randomly sample questions until reaching the desired number of non-repeated questions
    while len(unique_questions) < num_questions * len(input_list):  # Generating questions from each segment
        question = random.choice(generated_questions)
        generated_questions.remove(question)
        if question not in unique_questions:
            unique_questions.add(question)

    return list(unique_questions)


import datetime
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph
from io import BytesIO

def convert_list_to_pdf_with_template(data_list, output_file):
    # Create the PDF canvas
    c = canvas.Canvas(output_file, pagesize=letter)

    # Set the font and size
    c.setFont("Helvetica", 12)

    # Add the template or background image
    template_path = 'template.png'
    c.drawImage(template_path, 0, 0, width=letter[0], height=letter[1])

    # Set up paragraph styles
    styles = getSampleStyleSheet()
    paragraph_style = ParagraphStyle(
        'normal',
        parent=styles['Normal'],
        textColor=colors.black,
        fontSize=12,
        leading=16  # Adjust the leading for more spacing between lines
    )

    # Write the list elements to the PDF
    y = 550  # Starting y position
    index = 1
    spacing = 20  # Fixed spacing between paragraphs

    for item in data_list:
        text = f"{index}) {item}"
        p = Paragraph(text, style=paragraph_style)
        p.wrapOn(c, 400, 0)

        # Check if there's enough space on the page for the paragraph
        if y - p.height < 50:
            c.showPage()  # Start a new page
            y = 750  # Reset the y position to the top of the new page

        p.drawOn(c, 100, y-p.height)
        y -= p.height + spacing  # Adjust the spacing between paragraphs
        index += 1

    # Save the canvas as the final PDF
    c.save()

    # Save the PDF file into MongoDB
    with open(output_file, 'rb') as pdf_file:
        pdf_data = pdf_file.read()

    username = session.get('username')  # Get the username from session or any relevant source

    user = users_collection.find_one({'username': username})  # Retrieve the user document from MongoDB

    if user:
        user_id = user['_id']  # Assuming the user ID is stored in the '_id' field
        timestamp = datetime.datetime.now()  # Generate a timestamp

        file_name = session.get('file_name')

        pdf_document = {
            "user_id": user_id,
            "timestamp": timestamp,
            "file_name": file_name,
            "pdf_file": pdf_data
        }

        pdf_collection.insert_one(pdf_document)
        print("PDF saved to MongoDB successfully.")
    else:
        print("User not found. PDF not saved.")



@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        existing_user = users_collection.find_one({'username': username})

        if existing_user:
            return "Username already exists!"

        user = {'username': username, 'password': password}
        users_collection.insert_one(user)
        session['username'] = username
        return redirect('/')
    else:
        return render_template('register.html')

@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        existing_user = users_collection.find_one({'username': username, 'password': password})

        if existing_user:
            session['username'] = username
            flash('Login successful!', 'success')
            return redirect('/userdashboard')
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
            return redirect('/')
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('Logged out successfully!', 'success')
    return redirect('/')

@app.route("/userdashboard")
def user_dashboard():
    username = session.get('username')
    return render_template('dashboard.html',username=username)

import os
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            # Save the uploaded file to a temporary directory
            temp_dir = '/tmp'
            file_path = os.path.join(temp_dir, file.filename)
            file.save(file_path)
            session['file_name'] = file.filename
            # Perform text extraction
            extracted_text = extract_text_from_pdf(file_path)
            # Delete the temporary file
            os.remove(file_path)
            # Continue with text processing
            preprocessed_text = preprocess_text(extracted_text, segment_length=1700)
            print(len(preprocessed_text))
            questions = hf_run_model(preprocessed_text, num_return_sequences=8, num_questions=2)
            session['my_list'] = questions

            for count, ele in enumerate(questions):
                print(count + 1)
                print(ele)
            print(type(questions))
            return render_template('upload.html', file_name=file.filename, text1=extracted_text,
                                   text2=preprocessed_text, text3=questions)

    return render_template('upload.html')




@app.route('/generate_pdf', methods=['GET'])
def generate_pdf():
    items_1=session['my_list']
    output_path='output.pdf'
    convert_list_to_pdf_with_template(items_1,output_path)
    return redirect('/my_pdf_documents')

def fetch_pdf_documents_for_user(username):
    user = users_collection.find_one({'username': username})  # Retrieve the user document from MongoDB
    if user:
        user_id = user['_id']  # Assuming the user ID is stored in the '_id' field
        pdf_documents = pdf_collection.find({'user_id': user_id})  # Fetch all PDF documents for the user

        return pdf_documents
    else:
        return None


import io
from bson import ObjectId

@app.route('/view_pdf/<pdf_id>')
def view_pdf(pdf_id):
    pdf_doc = pdf_collection.find_one({'_id': ObjectId(pdf_id)})

    if pdf_doc:
        pdf_file = pdf_doc['pdf_file']
        pdf_buffer = io.BytesIO(pdf_file)
        return send_file(pdf_buffer,mimetype='application/pdf')

    return "PDF not found"

@app.route('/my_pdf_documents')
def my_pdf_documents():
    username = session['username']  # Get the username from session or any relevant source
    if username:
        pdf_documents = fetch_pdf_documents_for_user(username)
        return render_template('my_pdf_documents.html', pdf_documents=pdf_documents)

    return "User not logged in"

@app.route('/remove_pdf/<pdf_id>', methods=['POST'])
def remove_pdf(pdf_id):
    # Remove the PDF file from the database
    pdf_collection.delete_one({'_id': ObjectId(pdf_id)})
    return redirect(url_for('my_pdf_documents'))
