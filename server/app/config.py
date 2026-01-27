import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")


    SQLALCHEMY_DATABASE_URI = "sqlite:////app/instance/db.sqlite3"


    SQLALCHEMY_TRACK_MODIFICATIONS = False
