# app/api/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.parking import Vehicle, VehicleType, ParkingResponse
from app.crud.parking import park_vehicle, exit_vehicle, get_currently_parked_vehicles, get_available_spots

parking_router = APIRouter()

@parking_router.post("/park", response_model=ParkingResponse)
def park_vehicle_route(
    licensePlate: str,
    vehicle_type: VehicleType,
    db: Session = Depends(get_db)
):
    try:
        # Convert camelCase to snake_case when calling CRUD function
        return park_vehicle(db=db, license_plate=licensePlate, vehicle_type=vehicle_type)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@parking_router.post("/exit", response_model=ParkingResponse)
def exit_vehicle_route(
    licensePlate: str,
    db: Session = Depends(get_db)
):
    try:
        # Convert camelCase to snake_case when calling CRUD function
        return exit_vehicle(db=db, license_plate=licensePlate)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@parking_router.get("/current", response_model=List[Vehicle])
def get_current_vehicles(db: Session = Depends(get_db)):
    return get_currently_parked_vehicles(db)

@parking_router.get("/available/{vehicle_type}", response_model=int)
def get_available_spots_route(
    vehicle_type: VehicleType,
    db: Session = Depends(get_db)
):
    return get_available_spots(db, vehicle_type)