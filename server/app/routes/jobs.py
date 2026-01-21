from pydoc import text
from flask import Blueprint, request, jsonify
from app.models.job import Job 
from app.models.user import User
from app.models.application import Application
from app import db
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import desc

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

@jobs_bp.route("/jobs", methods=["GET"])
def get_jobs():
    keyword = request.args.get("q")
    location = request.args.get("location")

    query = Job.query

    if keyword:
        query = query.filter(Job.title.ilike(f"%{keyword}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    # jobs = query.order_by(Job.created_at.desc()).all()
    jobs = query.all()
    ordered_jobs = sorted(jobs, key=lambda x: x.updated_at, reverse=True)
    return [
        {
            "id": j.id,
            "title": j.title,
            "location": j.location,
            "salary": j.salary,
            "updated_at": j.updated_at
        }
        for j in ordered_jobs
    ]

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

@jobs_bp.route("/jobs/<int:job_id>/application-status")
@jwt_required()
def application_status(job_id):
    user_id = get_jwt_identity()

    application = Application.query.filter_by(
        job_id=job_id,
        seeker_id=user_id
    ).first()

    return jsonify({
        "applied": application is not None,
        "application": {
            "id": application.id,
            "seeker_id": application.seeker_id,
            "job_id": application.job_id,
        } if application else None
    }), 200