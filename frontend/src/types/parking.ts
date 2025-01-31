// src/types/parking.ts
export enum VehicleType {
    CAR = "CAR",
    MOTORCYCLE = "MOTORCYCLE",
    TRUCK = "TRUCK"
  }
  
  export interface Vehicle {
    id: number;
    license_plate: string;
    vehicle_type: VehicleType;
    entry_time: string;
    exit_time: string | null;
    parking_spot_id: number;
  }
  
  export interface ParkingSpot {
    id: number;
    spot_number: string;
    vehicle_type: VehicleType;
    occupied: boolean;
  }
  
  export interface ParkingResponse {
    license_plate: string;
    spot_number: string;
    entry_time: string;
    message: string;
  }
  
  // Additional types for requests if needed
  export interface ParkVehicleRequest {
    licensePlate: string;
    vehicleType: VehicleType;
  }
  
  export interface ExitVehicleRequest {
    licensePlate: string;
  }