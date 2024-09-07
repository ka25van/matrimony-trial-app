from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)




try:
    client = MongoClient('mongodb+srv://user_name:dbaccess_password@cluster0.uukjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    db = client['matrimony_db']
    users = db['users']
    print("DATA BASE CONNECTED")
except Exception as e:
    print("Error connecting to Data base", e)


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if users.find_one({'email': data['email']}):
        return jsonify({'message': 'User already registered'}), 400
    
    # hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    user_data = {
        "name": data['name'],
        "email": data['email'],
        "place": data['place'],
        "password": data['password'],
        "gender": data['gender']
    }
    users.insert_one(user_data)
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = db.users.find_one({"email": email})
    
    if user and password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 404  # 404 for invalid user

@app.route('/profiles', methods=['GET'])
def profiles():
    place = request.args.get('place')
    profiles = list(users.find({'place': place}, {'_id': 0, 'password': 0}))
    return jsonify(profiles)

@app.route('/profile/<email>', methods=['PUT'])
def update_profile(email):
    data = request.json
    users.update_one({'email': email}, {'$set': data})
    return jsonify({'message': 'Profile updated successfully'})

@app.route('/home/search', methods=['POST'])
def search():
    data = request.get_json()
    place = data.get('place')

    # Query the database for profiles with the matching place
    profiles = db.users.find({"place": place})

    # Convert the profiles to a list of dictionaries, including lat and lon
    result = []
    for profile in profiles:
        profile_data = {
            "name": profile.get('name'),
            "email": profile.get('email'),
            "place": profile.get('place'),
            "gender": profile.get('gender'),
            "lat": profile.get('lat'),  # Include latitude
            "lon": profile.get('lon')   # Include longitude
        }
        result.append(profile_data)

    return jsonify(result), 200


if __name__ == '__main__':
    app.run(debug=True)
