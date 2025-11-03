
import React from 'react';
import { Treatment, TreatmentStatus } from '../types';
import { TreatmentCard } from './TreatmentCard';

interface TreatmentWithPatientInfo extends Treatment {
  patientName: string;
  patientRoom: string;
}

interface TreatmentScheduleProps {
  treatments: TreatmentWithPatientInfo[];
  updateTreatmentStatus: (treatmentId: string, status: 'COMPLETED' | 'UPCOMING') => void;
}

export const TreatmentSchedule: React.FC<TreatmentScheduleProps> = ({ treatments, updateTreatmentStatus }) => {
  const upcomingTreatments = treatments.filter(t => t.status !== TreatmentStatus.Completed);
  const completedTreatments = treatments.filter(t => t.status === TreatmentStatus.Completed);

  if (treatments.length === 0) {
    return (
        <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No treatments scheduled.</p>
            <p className="text-gray-400 mt-2">Go to the 'Patients' tab to add a treatment for a patient.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Upcoming Treatments</h2>
        {upcomingTreatments.length > 0 ? (
          <div className="space-y-4">
            {upcomingTreatments.map(treatment => (
              <TreatmentCard 
                key={treatment.id} 
                treatment={treatment} 
                updateTreatmentStatus={updateTreatmentStatus} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 text-center text-gray-500 shadow-sm">
            <p>All treatments for today are complete!</p>
          </div>
        )}
      </div>

      {completedTreatments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Completed Treatments</h2>
          <div className="space-y-4">
            {completedTreatments.map(treatment => (
              <TreatmentCard 
                key={treatment.id} 
                treatment={treatment} 
                updateTreatmentStatus={updateTreatmentStatus} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
