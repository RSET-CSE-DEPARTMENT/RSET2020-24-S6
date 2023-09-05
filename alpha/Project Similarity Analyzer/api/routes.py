# Import necessary modules and classes from Flask, Flask forms, and custom modules

from flask import render_template,url_for,request,redirect,flash
from api.index import app
from api.index import db
from .forms import abstractForm
from .form2 import detailForm
from .compare import compareData
from .details import projectDetails

# Global variables to store the result set and input abstract
result_set=[]
input_abstract =''

# Define a route for the home page (index)
@app.route("/")
def index():
  """
    Renders the home page (index.html).

    Returns:
        HTML template: The rendered home page template.
    """
  return render_template('index.html')

# Define a route for inputting an abstract and performing a similarity check
@app.route("/input_abstract", methods=["POST", "GET"])
def input_abstract():
  """
    Handles the input of an abstract, performs a similarity check, and redirects to the results page.

    - If the HTTP request method is POST:
        - Get the input abstract from the form.
        - Perform a similarity check using the 'compareData' function.
        - Store the results in the 'result_set' variable.
        - Redirect to the results page.
    - If the HTTP request method is GET:
        - Render the input abstract form.

    Returns:
        HTML template: Either the input form or a redirect to the results page.
    """
  global result_set
  global input_abstract
  if request.method == "POST":
    form = abstractForm(request.form)
    input_abstract = form.abstract.data
    ranked_docs = compareData(input_abstract)
    result_set = projectDetails(ranked_docs)
    return redirect(url_for('output_results'))
  else:
    form=abstractForm()
  return render_template('search.html',form =form)

# Define a route for displaying the results
@app.route("/results",methods=['POST','GET'])
def output_results():
  """
    Renders the results page (results.html) with the result set.

    Returns:
        HTML template: The rendered results page template.
    """
  return render_template('results.html',result_set=result_set)

# Define a route for displaying project details
@app.route('/results/<id>', methods=['GET', 'POST'])
def result_details(id):
  """
    Renders the project details page (project_details.html) for a specific project.

    Args:
        id (str): The ID of the project to display details for.

    Returns:
        HTML template: The rendered project details page template.
    """
        
  result = db.Projects.find_one({'id':int(id)})
  
  project =  []
  project.append(result['id'])
  project.append(result['title'])
  project.append(result['abstract'])  

  return render_template('project_details.html', project = project)
