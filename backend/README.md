# Parking System

A modern parking management system built with FastAPI, PostgreSQL, and Docker.

## Features

- Vehicle entry and exit management
- Real-time parking space tracking
- Support for different vehicle types (Car, Motorcycle, Truck)
- API documentation with Swagger/OpenAPI
- Prometheus metrics integration
- Docker support

## Tech Stack

- FastAPI (Python web framework)
- PostgreSQL (Database)
- SQLAlchemy (ORM)
- Alembic (Database migrations)
- Docker & Docker Compose
- Prometheus (Metrics)

## Prerequisites

- Python 3.11+
- Docker and Docker Compose
- PostgreSQL client (optional, for direct DB access)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd parking-system
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start PostgreSQL using Docker:
```bash
docker-compose up -d db
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Seed initial parking spots:
```bash
python seed_data.py
```

7. Start the application:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the application is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Metrics: http://localhost:8000/metrics

## Available Endpoints

- POST /api/parking/park - Park a vehicle
- POST /api/parking/exit - Record vehicle exit
- GET /api/parking/current - Get currently parked vehicles
- GET /api/parking/available/{vehicle_type} - Get available spots by vehicle type

## Docker Deployment

To run the entire application using Docker:

```bash
docker-compose up -d
```

This will start both the PostgreSQL database and the FastAPI application.

## Testing

To run tests:

```bash
pytest
```

## Directory Structure

```
parking_system/
├── app/                  # Main application package
│   ├── api/             # API routes
│   ├── core/            # Core configurations
│   ├── crud/            # Database operations
│   ├── models/          # SQLAlchemy models
│   └── schemas/         # Pydantic models
├── alembic/             # Database migrations
├── tests/               # Test files
└── docker-compose.yml   # Docker compose configuration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/parking_db
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request