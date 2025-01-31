from app.core.database import SessionLocal
from app.models.parking import ParkingSpot, VehicleType

def seed_parking_spots():
    db = SessionLocal()
    try:
        # Check if spots already exist
        existing_spots = db.query(ParkingSpot).count()
        if existing_spots > 0:
            print("Parking spots already seeded. Skipping...")
            return

        spots = [
            # Car spots
            *[ParkingSpot(
                spot_number=f"C-{i}",
                vehicle_type=VehicleType.CAR
            ) for i in range(1, 11)],
            
            # Motorcycle spots
            *[ParkingSpot(
                spot_number=f"M-{i}",
                vehicle_type=VehicleType.MOTORCYCLE
            ) for i in range(1, 6)],
            
            # Truck spots
            *[ParkingSpot(
                spot_number=f"T-{i}",
                vehicle_type=VehicleType.TRUCK
            ) for i in range(1, 4)]
        ]
        
        db.add_all(spots)
        db.commit()
        print(f"Successfully seeded {len(spots)} parking spots")
        
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_parking_spots()