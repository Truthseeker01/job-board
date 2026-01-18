from flask import Blueprint, request, jsonify
from app.models.job import Job
from app.models.application import Application
from app.models.user import User
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

applications_bp = Blueprint('applications', __name__)

@applications_bp.route('/jobs/<int:job_id>/apply', methods=['POST'])
@jwt_required()
def apply_to_job(job_id):
  user_id = get_jwt_identity()
  user = User.query.get(user_id)
  if user.role != 'seeker':
      return jsonify({"msg": "Only job seekers can apply to jobs"}), 403

  existing_application = Application.query.filter_by(
        job_id=job_id,
        seeker_id=user_id
    ).first()

  if existing_application:
    return jsonify({"msg": "You have already applied to this job"}), 400
  
  job = Job.query.get_or_404(job_id)

  data = request.get_json()

  new_application = Application(
      cover_letter=data['cover_letter'],
      job_id=job.id,
      seeker_id=user_id
  )

  db.session.add(new_application)
  db.session.commit()
  return jsonify({"msg": "Application submitted", "application_id": new_application.id}), 201


@applications_bp.route('/employer/applications', methods=['GET'])
@jwt_required()
def get_application():
  user_id = get_jwt_identity()
  user = User.query.get(user_id)

  if user.role != 'employer':
      return jsonify({"msg": "Only employers can view applications"}), 403

  applications = (
      Application.query
      .join(Job)
      .filter(Job.employer_id == user_id)
      .all()
  )

  return [
     {
      "id": a.id,
      "cover_letter": a.cover_letter,
      "created_at": a.created_at,
      "job_id": a.job_id,
      "seeker_id": a.seeker_id
    }
    for a in applications
  ], 200