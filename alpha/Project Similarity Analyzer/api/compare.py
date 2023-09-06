# Main source file to perform the semantic similarity check of given document with that in database

# Import necessary libraries and modules
import string
import re
import numpy as np
from nltk.stem import WordNetLemmatizer, PorterStemmer
from nltk.corpus import stopwords, wordnet
from nltk.tokenize import word_tokenize
from gensim import corpora, models
import gensim
from api.index import db
import nltk

# Download required NLTK resources
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')




def compareData(abstract):
    """
    Compares the abstract with abstracts in the database and finds semantic similarity.

    Args:
        abstract (string): Input abstract to compare against the database.

    Returns:
        result_docs (list): A list of tuples, each containing document information.
            Each tuple has two elements:
            - id (string): ID of a document in the final result.
            - score (string): Similarity score corresponding to the document as a percentage.
    """

    
    def preprocess_data(contents):
        """
        Preprocesses the textual content of documents.

        Args:
            contents (list): List of document contents, where each content is a tuple (id, text).

        Returns:
            preprocessed_data (list): List of preprocessed documents, where each document is a list of tokens.
        """
        stemmer = PorterStemmer()   #define stemmer
        wordnet.ensure_loaded()     
        stop_words = set(stopwords.words('english'))    #get stopwords in english
        preprocessed_data = []
        for content in contents:                #process content of each document
            lemmatizer = WordNetLemmatizer()  # Define lemmatizer 
            sentence = content[1].lower()       #convert into lowercase
            sentence = re.sub(r'\d+', '', sentence)  # Remove numbers
            sentence = sentence.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
            tokens = word_tokenize(sentence)            #tokenize the content
            tokens = [stemmer.stem(token) for token in tokens if token not in stop_words and token.isalpha()]  # Apply stemming and filtering out stopwords and non-alphabetic tokens
            lemmatized_synonyms = []
            for token in tokens:
                synsets = wordnet.synsets(token)    #get synonyms of different words from synset
                lemmas = [lemma for synset in synsets for lemma in synset.lemmas()]
                if lemmas:
                    lemmatized_synonyms.extend([lemmatizer.lemmatize(lemma.name()) for lemma in lemmas])
            tokens.extend(lemmatized_synonyms)      # Add synonyms of tokens to the token listtokens to 
            preprocessed_data.append(tokens)    # Append the preprocessed tokens to the result list
        return preprocessed_data

    def preprocess_query(query):
        """
        Preprocesses the input query.

        Args:
            query (string): Input query to be preprocessed.

        Returns:
            tokens (list): List of preprocessed tokens from the query.
        """
        stemmer = PorterStemmer()
        stop_words = set(stopwords.words('english')) # Get a set of English stopwords
        lemmatizer = WordNetLemmatizer()  # Define lemmatizer
        query = query.lower()           # Convert the query to lowercase
        query = re.sub(r'\d+', '', query)  # Remove numeric digits from the query
        query = query.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
        tokens = word_tokenize(query)   # Tokenize the query
        tokens = [stemmer.stem(token) for token in tokens if token not in stop_words and token.isalpha()]   # Apply stemming and filtering out stopwords and non-alphabetic tokens
        lemmatized_synonyms = []
        for token in tokens:
            # Get synonyms for each token using WordNet synsets
            synsets = wordnet.synsets(token)
            lemmas = [lemma for synset in synsets for lemma in synset.lemmas()]
            if lemmas:
                lemmatized_synonyms.extend([lemmatizer.lemmatize(lemma.name()) for lemma in lemmas])
        # Extend the list of tokens with lemmatized synonyms
        tokens.extend(lemmatized_synonyms)
        return tokens

    def calculate_euclidean_distance(query, documents):
        """
        Calculates the Euclidean distance between the query and a set of documents.

        Args:
            query (list): List of tokens representing the preprocessed query.
            documents (list): List of preprocessed documents, where each document is a list of tokens.

        Returns:
            euclidean_distances (numpy.ndarray): An array of Euclidean distances between the query and each document.
        """
        dictionary = corpora.Dictionary(documents)
        corpus = [dictionary.doc2bow(doc) for doc in documents]

        model = models.TfidfModel(corpus)
        tfidf_corpus = model[corpus]

        # Convert the query to a tf-idf vector
        query_bow = dictionary.doc2bow(query)
        query_tfidf = model[query_bow]

        # Create a matrix of tf-idf vectors for all documents
        document_matrix = gensim.matutils.corpus2dense(tfidf_corpus, num_terms=len(dictionary)).T

        # Convert the query and document vectors to numpy arrays
        query_vector = gensim.matutils.corpus2dense([query_tfidf], num_terms=len(dictionary)).T

        # Calculate Euclidean distance between the query vector and each document vector
        euclidean_distances = np.linalg.norm(document_matrix - query_vector, axis=1)

        return euclidean_distances

    def read_data():
        """
        Reads data from a database (assuming MongoDB).

        Returns:
            contents (list): List of document contents, where each content is a tuple (id, text).
        """
        contents = [(int(obj["id"]),obj["sentence"]) for obj in db.Projects.find()]
        return contents

    # Read data from the database
    data = read_data()
    
    # Preprocess the database documents
    preprocessed_data = preprocess_data(data)

    # Preprocess the input query
    preprocessed_query = preprocess_query(abstract)

    # Calculate similarity using Euclidean distance
    query_distances = calculate_euclidean_distance(preprocessed_query, preprocessed_data)

    
    # Rank documents based on similarity
    ranked_docs = sorted(enumerate(query_distances, start=1), key=lambda x: x[1])

    result_docs=[]
    # create list of top-ranked similar documents
    for doc_id, distance in ranked_docs[:10]:
        original_doc_id = data[doc_id - 1][0]
        similarity = 1 / (1 + distance)  # Convert distance to similarity (values closer to 1 are more similar)
        sim_score= f'{similarity*100:.2f}%'     # Format similarity score as a percentage
        result_docs.append((original_doc_id,sim_score))
    
        
    return result_docs
