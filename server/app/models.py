# from flask import Flask
# from flask_mongoengine import MongoEngine

# app = Flask(__name__)


# app.config['MONGODB_SETTINGS'] = {
#     'db': 'your_db_name',
#     'host': 'mongodb://localhost:27017/
# }

# db = MongoEngine(app)


# class User(db.Document):
#     username = db.StringField(max_length=80, unique=True, required=True)
#     email = db.StringField(max_length=120, unique=True, required=True)

#     def __repr__(self):
#         return f'<User {self.username}>'
