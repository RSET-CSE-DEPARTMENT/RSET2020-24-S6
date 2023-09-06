import pickle

with open('andromeda-data.txt', 'r') as file:
    text_data = file.read()

data_list = text_data.split('\n')
with open('output.pickle', 'wb') as file:
    pickle.dump(data_list, file)