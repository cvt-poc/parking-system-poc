// src/services/api.ts
import { Vehicle, VehicleType, ParkingResponse } from '../types/parking';

const API_BASE_URL = 'http://localhost:8000/api/parking';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.detail || 'An error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};

export const parkingApi = {
  async parkVehicle(licensePlate: string, vehicleType: VehicleType): Promise<ParkingResponse> {
    try {
      console.log('Attempting to park vehicle:', { licensePlate, vehicleType });
      const response = await fetch(
        `${API_BASE_URL}/park?licensePlate=${encodeURIComponent(licensePlate)}&vehicle_type=${vehicleType}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Park Vehicle Error:', error);
      throw error;
    }
  },

  async exitVehicle(licensePlate: string): Promise<ParkingResponse> {
    try {
      console.log('Attempting to exit vehicle:', licensePlate);
      const response = await fetch(
        `${API_BASE_URL}/exit?licensePlate=${encodeURIComponent(licensePlate)}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Exit Vehicle Error:', error);
      throw error;
    }
  },

  async getCurrentVehicles(): Promise<Vehicle[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/current`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get Current Vehicles Error:', error);
      throw error;
    }
  },

  async getAvailableSpots(vehicleType: VehicleType): Promise<number> {
    try {
      const response = await fetch(`${API_BASE_URL}/available/${vehicleType}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get Available Spots Error:', error);
      throw error;
    }
  },
};