
import React, { useState } from 'react';
import { Patient, Treatment, TreatmentStatus } from '../types';
import { getMedicationInfo } from '../services/geminiService';
import { XMarkIcon, SparklesIcon, InformationCircleIcon } from './Icons';

interface AddTreatmentModalProps {
  patient: Patient;
  onClose: () => void;
  onAddTreatment: (treatment: Omit<Treatment, 'id'>) => void;
}

export const AddTreatmentModal: React.FC<AddTreatmentModalProps> = ({ patient, onClose, onAddTreatment }) => {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [medInfo, setMedInfo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (medication.trim() && dosage.trim() && time) {
      onAddTreatment({
        patientId: patient.id,
        medication,
        dosage,
        time,
        notes,
        status: TreatmentStatus.Upcoming
      });
      onClose();
    }
  };

  const handleGetMedInfo = async () => {
    if (!medication.trim()) {
      setMedInfo("Please enter a medication name first.");
      return;
    }
    setIsFetchingInfo(true);
    setMedInfo(null);
    const info = await getMedicationInfo(medication);
    setMedInfo(info);
    setIsFetchingInfo(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-brand-dark">Add Treatment</h2>
            <p className="text-gray-500">For {patient.name} (Room {patient.room})</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="medication" className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
            <div className="flex gap-2">
              <input
                id="medication"
                type="text"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                placeholder="e.g., Paracetamol"
                required
              />
              <button 
                type="button" 
                onClick={handleGetMedInfo}
                disabled={isFetchingInfo}
                className="flex-shrink-0 px-3 py-2 bg-brand-yellow text-brand-dark rounded-md hover:bg-opacity-90 shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait"
              >
                <SparklesIcon className="w-5 h-5"/>
                <span className="hidden sm:inline">{isFetchingInfo ? 'Checking...' : 'Info'}</span>
              </button>
            </div>
          </div>

          {medInfo && (
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <InformationCircleIcon className="w-5 h-5 text-brand-blue"/> Medication Info
              </h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{medInfo}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
              <input
                id="dosage"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                placeholder="e.g., 500mg"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
              rows={3}
              placeholder="e.g., Administer with food"
            ></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 shadow-sm">
              Add Treatment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
