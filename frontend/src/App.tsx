import React from 'react';
import { ParkingDashboard } from './components/ParkingDashboard';
import { ParkVehicleForm } from './components/ParkVehicleForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Parking Management System</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ParkingDashboard />
          </div>
          <div>
            <ParkVehicleForm onSuccess={() => window.location.reload()} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;