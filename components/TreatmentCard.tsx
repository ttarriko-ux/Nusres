
import React, { useState, useEffect } from 'react';
import { Treatment, TreatmentStatus } from '../types';
import { ClockIcon, PillIcon, UserIcon, BedIcon, CheckCircleIcon, ArrowUturnLeftIcon, NotesIcon } from './Icons';

interface TreatmentWithPatientInfo extends Treatment {
  patientName: string;
  patientRoom: string;
}

interface TreatmentCardProps {
  treatment: TreatmentWithPatientInfo;
  updateTreatmentStatus: (treatmentId: string, status: 'COMPLETED' | 'UPCOMING') => void;
}

const getStatusStyles = (status: TreatmentStatus) => {
  switch (status) {
    case TreatmentStatus.Completed:
      return {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-400',
        textColor: 'text-green-800',
        iconColor: 'text-green-500'
      };
    case TreatmentStatus.Overdue:
      return {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-400',
        textColor: 'text-red-800',
        iconColor: 'text-red-500'
      };
    case TreatmentStatus.Upcoming:
    default:
      return {
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-400',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-500'
      };
  }
};

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, updateTreatmentStatus }) => {
  const [isOverdue, setIsOverdue] = useState(false);
  const { id, time, medication, dosage, notes, patientName, patientRoom, status } = treatment;

  useEffect(() => {
    if (status === TreatmentStatus.Upcoming) {
      const checkOverdue = () => {
        const [hours, minutes] = time.split(':').map(Number);
        const treatmentTime = new Date();
        treatmentTime.setHours(hours, minutes, 0, 0);
        
        if (new Date() > treatmentTime) {
          setIsOverdue(true);
        }
      };
      
      checkOverdue();
      const interval = setInterval(checkOverdue, 60000); // Check every minute
      return () => clearInterval(interval);
    } else {
        setIsOverdue(false);
    }
  }, [time, status]);

  const effectiveStatus = status === TreatmentStatus.Upcoming && isOverdue ? TreatmentStatus.Overdue : status;
  const styles = getStatusStyles(effectiveStatus);

  const isCompleted = status === TreatmentStatus.Completed;

  const handleToggleComplete = () => {
    updateTreatmentStatus(id, isCompleted ? 'UPCOMING' : 'COMPLETED');
  };
  
  return (
    <div className={`rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4 transition-all duration-300 ${isCompleted ? 'bg-white opacity-70' : 'bg-white'}`}>
      <div className={`w-full sm:w-24 flex sm:flex-col items-center justify-center rounded-lg p-2 ${styles.bgColor} ${styles.textColor}`}>
        <ClockIcon className={`w-8 h-8 ${styles.iconColor}`} />
        <span className="text-2xl font-bold ml-4 sm:ml-0 sm:mt-2">{time}</span>
        {effectiveStatus === TreatmentStatus.Overdue && (
          <span className="text-xs font-semibold mt-1 px-2 py-0.5 bg-red-500 text-white rounded-full">OVERDUE</span>
        )}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-bold ${styles.textColor}`}>{medication}</h3>
              <p className="text-gray-600">{dosage}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-brand-dark flex items-center gap-2 justify-end"><UserIcon className="w-4 h-4 text-gray-400"/> {patientName}</p>
              <p className="text-sm text-gray-500 flex items-center gap-2 justify-end"><BedIcon className="w-4 h-4 text-gray-400"/> Room {patientRoom}</p>
            </div>
        </div>
        
        {notes && (
          <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
            <p className="text-sm text-yellow-800 flex items-start gap-2">
              <NotesIcon className="w-4 h-4 mt-0.5 flex-shrink-0" /> 
              <span>{notes}</span>
            </p>
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0 flex items-center justify-center">
        <button 
          onClick={handleToggleComplete}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            isCompleted 
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
            : 'bg-brand-green text-white hover:bg-green-600'
          }`}
        >
          {isCompleted ? <ArrowUturnLeftIcon className="w-5 h-5"/> : <CheckCircleIcon className="w-5 h-5"/>}
          <span>{isCompleted ? 'Undo' : 'Complete'}</span>
        </button>
      </div>
    </div>
  );
};
