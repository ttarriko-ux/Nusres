
import React from 'react';
import { Patient, Treatment, TreatmentStatus } from '../types';
import { PlusCircleIcon, BedIcon, UserIcon } from './Icons';

interface PatientListProps {
  patients: Patient[];
  treatments: Treatment[];
  onAddTreatmentClick: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ patients, treatments, onAddTreatmentClick }) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No patients added yet.</p>
        <p className="text-gray-400 mt-2">Click 'Add Patient' to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brand-dark">Patient List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map(patient => {
          const patientTreatments = treatments.filter(t => t.patientId === patient.id);
          return (
            <div key={patient.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-brand-blue">{patient.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <BedIcon className="w-5 h-5" />
                      <span>Room {patient.room}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold text-gray-600 mb-2">Treatments ({patientTreatments.length})</h4>
                  {patientTreatments.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {patientTreatments.map(treatment => (
                        <li key={treatment.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                          <span>{treatment.medication} - {treatment.time}</span>
                           <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            treatment.status === TreatmentStatus.Completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>{treatment.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">No treatments scheduled.</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onAddTreatmentClick(patient)}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-colors duration-200"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add Treatment
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
