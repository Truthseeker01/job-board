from flask import Blueprint, request, jsonify
from app.models.job import Job 
from app.models.user import User
from app import db
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/post-job', methods=['POST'])
@jwt_required()
def create_job():
  try:
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if user.role != 'employer':
        return jsonify({"msg": "Only employers can create job postings"}), 403
  
    data = request.get_json()
    new_job = Job(
        title=data['title'],
        description=data['description'],
        location=data.get('location'),
        salary=data.get('salary'),
        employer_id=user_id
    )

    db.session.add(new_job)
    db.session.commit()

    return jsonify({"msg": "Job created", "job_id": new_job.id}), 201
  except Exception as e:
    return jsonify({"msg": "Error creating job", "error": str(e)}), 500

@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
  jobs = Job.query.all()
  jobs_list = [{
      "id": job.id,
      "title": job.title,
      "description": job.description,
      "location": job.location,
      "salary": job.salary,
      "employer_id": job.employer_id
  } for job in jobs]

  return jsonify(jobs_list), 200

@jobs_bp.route("/jobs/<int:id>", methods=["GET"])
def get_job(id):
    job = Job.query.get_or_404(id)

    return {
        "id": job.id,
        "title": job.title,
        "description": job.description,
        "location": job.location,
        "salary": job.salary,
        "employer_id": job.employer_id,
    }, 200