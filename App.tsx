
import React, { useState, useEffect, useMemo } from 'react';
import { Patient, Treatment, View } from './types';
import { Header } from './components/Header';
import { PatientList } from './components/PatientList';
import { TreatmentSchedule } from './components/TreatmentSchedule';
import { AddPatientModal } from './components/AddPatientModal';
import { AddTreatmentModal } from './components/AddTreatmentModal';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [patients, setPatients] = useLocalStorage<Patient[]>('patients', []);
  const [treatments, setTreatments] = useLocalStorage<Treatment[]>('treatments', []);
  const [currentView, setCurrentView] = useState<View>(View.Schedule);
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const [isAddTreatmentModalOpen, setAddTreatmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = { ...patient, id: Date.now().toString() };
    setPatients(prev => [...prev, newPatient]);
  };

  const addTreatment = (treatment: Omit<Treatment, 'id'>) => {
    const newTreatment: Treatment = { ...treatment, id: Date.now().toString() };
    setTreatments(prev => [...prev, newTreatment]);
  };
  
  const updateTreatmentStatus = (treatmentId: string, status: 'COMPLETED' | 'UPCOMING') => {
    setTreatments(prev => prev.map(t => t.id === treatmentId ? { ...t, status } : t));
  };

  const openAddTreatmentModalForPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setAddTreatmentModalOpen(true);
  };
  
  const treatmentsWithPatientInfo = useMemo(() => {
    return treatments.map(treatment => {
      const patient = patients.find(p => p.id === treatment.patientId);
      return {
        ...treatment,
        patientName: patient?.name || 'Unknown Patient',
        patientRoom: patient?.room || 'N/A'
      };
    }).sort((a, b) => a.time.localeCompare(b.time));
  }, [treatments, patients]);

  return (
    <div className="bg-brand-gray min-h-screen font-sans text-brand-dark">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        onAddPatientClick={() => setAddPatientModalOpen(true)}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === View.Schedule && (
          <TreatmentSchedule treatments={treatmentsWithPatientInfo} updateTreatmentStatus={updateTreatmentStatus} />
        )}
        {currentView === View.Patients && (
          <PatientList 
            patients={patients} 
            treatments={treatments}
            onAddTreatmentClick={openAddTreatmentModalForPatient}
          />
        )}
      </main>
      
      {isAddPatientModalOpen && (
        <AddPatientModal 
          onClose={() => setAddPatientModalOpen(false)}
          onAddPatient={addPatient}
        />
      )}

      {isAddTreatmentModalOpen && selectedPatient && (
        <AddTreatmentModal 
          patient={selectedPatient}
          onClose={() => {
            setAddTreatmentModalOpen(false);
            setSelectedPatient(null);
          }}
          onAddTreatment={addTreatment}
        />
      )}
    </div>
  );
};

export default App;
