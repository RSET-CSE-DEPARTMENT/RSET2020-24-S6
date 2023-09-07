from api.index import db

def projectDetails(result_docs):
  """
    Retrieves project details from a database based on document IDs and combines them with similarity scores.

    Args:
        result_docs (list): A list of result documents, where each document is represented as a tuple.
            Each tuple should contain two elements:
            - id (string): ID of a document.
            - score (string): Similarity score corresponding to the document as a percentage.

    Returns:
        docs (list): A list of project details, where each detail is represented as a tuple.
            Each tuple contains the following elements:
            - id (string): ID of the project.
            - title (string): Title of the project.
            - abstract (string): Abstract of the project.
            - score (string): Similarity score corresponding to the project as a percentage.
    """
  docs=[]
  print(result_docs)
  
  # Iterate over each result document (document ID and score)
  for id,score in result_docs:
    record = db.Projects.find_one({"id":id})  # Retrieve a record (project details) from the database based on the document ID
    docs.append((record['id'],record['title'],record['abstract'],score))  # Extract relevant information from the retrieved record and combine it with the similarity score
  
  return docs

# Example usage:
# result_docs = [("doc1", "80%"), ("doc2", "75%"), ...]
# project_details = projectDetails(result_docs)
# print(project_details)