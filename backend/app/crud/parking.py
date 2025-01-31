# app/crud/parking.py
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.parking import Vehicle, ParkingSpot, VehicleType
from app.schemas.parking import ParkingResponse

def get_available_spots(db: Session, vehicle_type: VehicleType) -> int:
    # Changed to return count instead of list
    return db.query(ParkingSpot).filter(
        ParkingSpot.vehicle_type == vehicle_type,
        ParkingSpot.occupied == False
    ).count()

def get_vehicle_by_license_plate(db: Session, license_plate: str) -> Vehicle:
    return db.query(Vehicle).filter(Vehicle.license_plate == license_plate).first()

def get_currently_parked_vehicles(db: Session) -> list[Vehicle]:
    return db.query(Vehicle).filter(Vehicle.exit_time.is_(None)).all()

def park_vehicle(db: Session, license_plate: str, vehicle_type: VehicleType) -> ParkingResponse:
    # Check if vehicle is already parked
    existing_vehicle = get_vehicle_by_license_plate(db, license_plate)
    if existing_vehicle and not existing_vehicle.exit_time:
        raise ValueError("Vehicle already parked")

    # Find available parking spot
    available_spots = db.query(ParkingSpot).filter(
        ParkingSpot.vehicle_type == vehicle_type,
        ParkingSpot.occupied == False
    ).first()
    
    if not available_spots:
        raise ValueError(f"No available parking spots for {vehicle_type}")

    available_spots.occupied = True
    db.add(available_spots)

    # Create new vehicle entry
    vehicle = Vehicle(
        license_plate=license_plate,
        vehicle_type=vehicle_type,
        entry_time=datetime.utcnow(),
        parking_spot_id=available_spots.id
    )
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return ParkingResponse(
        license_plate=vehicle.license_plate,
        spot_number=available_spots.spot_number,
        entry_time=vehicle.entry_time,
        message="Vehicle parked successfully"
    )

def exit_vehicle(db: Session, license_plate: str) -> ParkingResponse:
    vehicle = get_vehicle_by_license_plate(db, license_plate)
    if not vehicle or vehicle.exit_time:
        raise ValueError("Vehicle not found or already exited")

    spot = vehicle.parking_spot
    spot.occupied = False
    vehicle.exit_time = datetime.utcnow()
    
    db.add(spot)
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return ParkingResponse(
        license_plate=vehicle.license_plate,
        spot_number=spot.spot_number,
        entry_time=vehicle.entry_time,
        message="Vehicle exited successfully"
    )