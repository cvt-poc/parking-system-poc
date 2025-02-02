#!/bin/bash
set -e

echo "Waiting for postgres..."

while ! nc -z $POSTGRES_HOST 5432; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - checking database connection"

# Test database connection
python << END
import sys
import time
import psycopg2

def test_connection():
    try:
        conn = psycopg2.connect(
            dbname="$POSTGRES_DB",
            user="$POSTGRES_USER",
            password="$POSTGRES_PASSWORD",
            host="$POSTGRES_HOST"
        )
        conn.close()
        return True
    except:
        return False

for _ in range(30):  # Try for 30 seconds
    if test_connection():
        print("Database connection successful!")
        sys.exit(0)
    time.sleep(1)

print("Could not connect to database!")
sys.exit(1)
END

echo "Running migrations..."
alembic upgrade head

echo "Seeding initial data..."
python seed_data.py

echo "Starting application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000