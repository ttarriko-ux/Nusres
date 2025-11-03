
export enum TreatmentStatus {
  Upcoming = 'UPCOMING',
  Completed = 'COMPLETED',
  Overdue = 'OVERDUE',
}

export interface Treatment {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  time: string; // "HH:MM" format
  notes?: string;
  status: TreatmentStatus;
}

export interface Patient {
  id: string;
  name: string;
  room: string;
}

export enum View {
  Schedule = 'SCHEDULE',
  Patients = 'PATIENTS',
}
