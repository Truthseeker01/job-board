from datetime import datetime
from app import db

class Job(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(120), nullable=False)
  description = db.Column(db.Text, nullable=False)
  location = db.Column(db.String(100))
  salary = db.Column(db.String(50))
  created_at = db.Column(db.DateTime, default=datetime.utcnow),
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
  employer_id = db.Column(
      db.Integer,
      db.ForeignKey("user.id"),
      nullable=False
  )
  hasApplied = db.Column(db.Boolean, default=False)

  employer = db.relationship("User", backref="jobs")