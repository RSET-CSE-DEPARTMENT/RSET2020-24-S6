import json
import random

# Read users from users.json
n = int(input("Enter the user: "))

user_array=[]
item_array=[]
rating_array=[]
for i in range(1,118):
    user_array.append(n)
    item_array.append(i)
    rating_array.append(0)

with open('test_user_array.json', 'w') as file:
    json.dump(user_array, file, indent=4)

with open('test_item_array.json', 'w') as file:
    json.dump(item_array, file, indent=4)

with open('test_rating_array.json', 'w') as file:
    json.dump(rating_array, file, indent=4)

