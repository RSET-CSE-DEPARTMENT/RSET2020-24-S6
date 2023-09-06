from flask_pymongo import ObjectId
from questionpapergenerator import mongo

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    @staticmethod
    def from_dict(user_dict):
        username = user_dict.get('username')
        password = user_dict.get('password')
        return User(username, password)

    def to_dict(self):
        return {'username': self.username, 'password': self.password}

    @staticmethod
    def find_by_username(username):
        user_dict = mongo.db.users.find_one({'username': username})
        if user_dict:
            return User.from_dict(user_dict)
        return None

    def save(self):
        user_dict = self.to_dict()
        mongo.db.users.insert_one(user_dict)
