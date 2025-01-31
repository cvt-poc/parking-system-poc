# app/models/parking.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base
from app.schemas.parking import VehicleType

class ParkingSpot(Base):
    __tablename__ = "parking_spots"

    id = Column(Integer, primary_key=True, index=True)
    spot_number = Column(String, unique=True, index=True)
    vehicle_type = Column(SQLEnum(VehicleType))
    occupied = Column(Boolean, default=False)
    vehicles = relationship("Vehicle", back_populates="parking_spot")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    license_plate = Column(String, index=True)
    vehicle_type = Column(SQLEnum(VehicleType))
    entry_time = Column(DateTime, default=datetime.utcnow)
    exit_time = Column(DateTime, nullable=True)
    parking_spot_id = Column(Integer, ForeignKey("parking_spots.id"))
    parking_spot = relationship("ParkingSpot", back_populates="vehicles")