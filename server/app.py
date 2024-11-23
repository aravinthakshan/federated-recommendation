from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import jwt
from datetime import datetime, timedelta
import os
from functools import wraps

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['recommender_db']

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key')
JWT_EXPIRATION_HOURS = 24

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token.split()[1], JWT_SECRET, algorithms=['HS256'])
            current_user = db.users.find_one({'_id': data['user_id']})
        except:
            return jsonify({'message': 'Token is invalid'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'User already exists'}), 400
        
    user_id = db.users.insert_one({
        'email': data['email'],
        'password': data['password'],  # In production, hash this!
        'created_at': datetime.utcnow()
    }).inserted_id
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = db.users.find_one({'email': data['email'], 'password': data['password']})
    
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
        
    token = jwt.encode({
        'user_id': str(user['_id']),
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }, JWT_SECRET)
    
    return jsonify({'token': token})

@app.route('/api/recommendations', methods=['GET'])
@token_required
def get_recommendations(current_user):
    # Here you would typically get recommendations from your model
    # This is a placeholder that returns dummy recommendations
    recommendations = [
        {'item_id': 1, 'name': 'Item 1', 'score': 0.95},
        {'item_id': 2, 'name': 'Item 2', 'score': 0.85},
        {'item_id': 3, 'name': 'Item 3', 'score': 0.75}
    ]
    return jsonify(recommendations)

@app.route('/api/feedback', methods=['POST'])
@token_required
def submit_feedback(current_user):
    data = request.get_json()
    
    feedback = {
        'user_id': str(current_user['_id']),
        'item_id': data['item_id'],
        'rating': data['rating'],
        'timestamp': datetime.utcnow()
    }
    
    db.feedback.insert_one(feedback)
    return jsonify({'message': 'Feedback submitted successfully'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)