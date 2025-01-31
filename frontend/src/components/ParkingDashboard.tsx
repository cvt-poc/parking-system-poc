import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleType } from '../types/parking';
import { parkingApi } from '../services/api';

export const ParkingDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [availableSpots, setAvailableSpots] = useState<Record<VehicleType, number>>({
    [VehicleType.CAR]: 0,
    [VehicleType.MOTORCYCLE]: 0,
    [VehicleType.TRUCK]: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const currentVehicles = await parkingApi.getCurrentVehicles();
      console.log('Loaded vehicles:', currentVehicles);
      setVehicles(currentVehicles);

      const spots = await Promise.all(
        Object.values(VehicleType).map(async (type) => ({
          type,
          count: await parkingApi.getAvailableSpots(type)
        }))
      );

      setAvailableSpots(
        spots.reduce((acc, { type, count }) => ({ ...acc, [type]: count }), {} as Record<VehicleType, number>)
      );
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    // Set up periodic refresh
    const interval = setInterval(loadDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      console.error('Error formatting date:', dateString, e);
      return 'Invalid Date';
    }
  };

  const handleExitVehicle = async (license_plate: string) => {
    try {
      setError(null);
      console.log('Exiting vehicle with license plate:', license_plate);
      await parkingApi.exitVehicle(license_plate);
      await loadDashboardData(); // Refresh data after exit
    } catch (err) {
      console.error('Error exiting vehicle:', err);
      setError(err instanceof Error ? err.message : 'Failed to exit vehicle');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(availableSpots).map(([type, count]) => (
          <div key={type} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{type}</h2>
            <p className="text-3xl font-bold text-blue-600">{count}</p>
            <p className="text-gray-600">Available Spots</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Currently Parked Vehicles</h2>
        {error && (
          <div className="p-4 bg-red-50 text-red-600 border-b">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License Plate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entry Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No vehicles currently parked
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.license_plate}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vehicle.license_plate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.vehicle_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(vehicle.entry_time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleExitVehicle(vehicle.license_plate)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Exit Vehicle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};