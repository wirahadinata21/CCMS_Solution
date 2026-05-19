
export interface Guardian {
  name: string;
  relationship: string;
  contactNumber: string;
  email: string;
  isEmergencyContact: boolean;
  [key: string]: string | boolean | undefined; 
}

export interface Student {
  id?: string;
  fullName: string;
  nricFin: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  enrolmentStatus: string;
  subsidyType: string;        // Tambahan baru
  allergyInfo: string;        // Tambahan baru
  medicalInstructions: string; // Tambahan baru
  vaccinationStatus?: string;  // Tambahan baru (opsional)
  guardians: Guardian[];
}

export interface ReferenceData {
  id: string;
  name: string;
}

export interface StudentRegistrationData {
  fullName: string;
  nriC_FIN: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  allergyInfo: string;
  medicalInstructions: string;
  guardians: Guardian[];
}