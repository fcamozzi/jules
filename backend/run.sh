#!/bin/sh

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start Gunicorn server
echo "Starting Gunicorn..."
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
