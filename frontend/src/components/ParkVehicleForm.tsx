// src/components/ParkVehicleForm.tsx
import React, { useState } from 'react';
import { VehicleType } from '../types/parking';
import { parkingApi } from '../services/api';

interface ParkVehicleFormProps {
  onSuccess: () => void;
}

export const ParkVehicleForm: React.FC<ParkVehicleFormProps> = ({ onSuccess }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.CAR);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await parkingApi.parkVehicle(licensePlate, vehicleType);
      setSuccess(true);
      setLicensePlate('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to park vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Park New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
            License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter license plate"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {Object.values(VehicleType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-600 text-sm">
            Vehicle parked successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Parking...
            </div>
          ) : (
            'Park Vehicle'
          )}
        </button>
      </form>
    </div>
  );
};