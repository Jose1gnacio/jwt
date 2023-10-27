"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Mensaje del home solo visible si estas logeado"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    
    email= request.json.get("email")
    password= request.json.get("password") 
 
    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422

    user = User.query.filter_by(email=email).first()
   
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
 
    expires=datetime.timedelta(days=30)    
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    print(access_token)
    data = {
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }
    return jsonify(data), 200

@api.route('/register', methods=['POST'])
def user_register():   
    
    email= None
    password= None    

    if 'email' in request.form:
        email =request.form["email"]
    else:
        return jsonify({"error": "E-mail is required"}), 400
    
    if 'password' in request.form:
        password =request.form["password"]
    else:
        return jsonify({"error": "Password is required"}), 400
        
    email_Found = User.query.filter_by(email=email).first()
    
    if email_Found:
        return jsonify({"message": "E-mail is not available"}), 400  
    
    user = User()    
    user.email = email
    user.password = generate_password_hash(password)
    user.save()  
    return jsonify(user.serialize(), {"succes": "Registro exitoso, por favor inicie sesión"}), 200
        
    