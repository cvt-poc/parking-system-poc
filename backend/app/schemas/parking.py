# app/schemas/parking.py
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional

class VehicleType(str, Enum):
    CAR = "CAR"
    MOTORCYCLE = "MOTORCYCLE"
    TRUCK = "TRUCK"

class ParkingSpotBase(BaseModel):
    spotNumber: str = Field(alias='spot_number')
    vehicleType: VehicleType = Field(alias='vehicle_type')
    occupied: bool = False

    class Config:
        from_attributes = True
        populate_by_name = True

class ParkingSpot(ParkingSpotBase):
    id: int

class VehicleBase(BaseModel):
    licensePlate: str = Field(alias='license_plate')
    vehicleType: VehicleType = Field(alias='vehicle_type')

    class Config:
        from_attributes = True
        populate_by_name = True

class Vehicle(VehicleBase):
    id: int
    entryTime: datetime = Field(alias='entry_time')
    exitTime: Optional[datetime] = Field(default=None, alias='exit_time')
    parkingSpotId: int = Field(alias='parking_spot_id')

class ParkingResponse(BaseModel):
    licensePlate: str = Field(alias='license_plate')
    spotNumber: str = Field(alias='spot_number')
    entryTime: datetime = Field(alias='entry_time')
    message: str

    class Config:
        from_attributes = True
        populate_by_name = True