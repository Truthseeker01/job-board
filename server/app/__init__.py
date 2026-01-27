from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    # allowed_origins = os.getenv(
    #     "CORS_ORIGINS",
    #     "http://localhost:5173,http://localhost:8080"
    # ).split(",")


    db.init_app(app)
    Migrate(app, db)
    jwt.init_app(app)

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    from app.routes.jobs import jobs_bp
    app.register_blueprint(jobs_bp)

    from app.routes.applications import applications_bp
    app.register_blueprint(applications_bp)

    return app
