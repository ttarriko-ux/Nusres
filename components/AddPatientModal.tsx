
import React, { useState } from 'react';
import { XMarkIcon } from './Icons';

interface AddPatientModalProps {
  onClose: () => void;
  onAddPatient: (patient: { name: string; room: string }) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ onClose, onAddPatient }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      onAddPatient({ name, room });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-dark">Add New Patient</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              id="patient-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="room-number" className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
            <input
              id="room-number"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              placeholder="e.g., 302B"
              required
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 shadow-sm">
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
