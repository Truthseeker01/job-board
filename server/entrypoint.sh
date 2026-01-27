#!/bin/sh
set -e

export FLASK_APP=run.py

# If migrations folder doesn't exist, create it
# if [ ! -d "migrations" ]; then
#   echo "No migrations folder found. Initializing migrations..."
#   flask db init
#   flask db migrate -m "initial"
# fi

# # Always upgrade to latest
flask db upgrade

exec gunicorn -b 0.0.0.0:5000 run:app
