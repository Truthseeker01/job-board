from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
  data = request.get_json()

  if User.query.filter_by(email=data['email']).first():
    return jsonify({"msg": "Email already registered"}), 400
  user = User(email=data['email'], role=data['role'])
  user.set_password(data['password']) # Set_password method hashes the password

  db.session.add(user)
  db.session.commit()

  return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
  try:
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
      return jsonify({"msg": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
    "access_token": token, 
    "user": {
      "id": user.id, 
      "email": user.email, 
      "role": user.role
      }
    }), 200
  except Exception as e:
    return jsonify({"msg": "A login error occurred", "error": str(e)}), 500

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
  try:
    current_user_id = int(get_jwt_identity())
    current_user = User.query.get(current_user_id)
    return jsonify({
    "id": current_user.id,
    "email": current_user.email,
    "role": current_user.role
  }), 200
  except Exception as e:
    return jsonify({"msg": "An error occurred", "error": str(e)}), 500