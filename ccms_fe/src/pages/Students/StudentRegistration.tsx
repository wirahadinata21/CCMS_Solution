import React, { useState, useEffect } from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { getGenders, getCitizenships, getRelationships, getEnrolmentStatuses } from '../../services/masterService';
import { createStudent } from '../../services/studentService';
import { ReferenceData, Student, Guardian } from '../../types';

// Animasi shake untuk validasi visual
const shakeAnimation = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
  .animate-shake {
    animation: shake 0.2s ease-in-out 0s 2;
  }
`;

const StudentRegistration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [genderList, setGenderList] = useState<ReferenceData[]>([]);
  const [citizenshipList, setCitizenshipList] = useState<ReferenceData[]>([]);
  const [relationshipList, setRelationshipList] = useState<ReferenceData[]>([]);
  const [enrolmentStatusList, setEnrolmentStatusList] = useState<ReferenceData[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);

  const [studentForm, setStudentForm] = useState<Student>({
    fullName: '',
    nricFin: '',
    dateOfBirth: '',
    gender: '',
    citizenship: '',
    enrolmentStatus: 'Active',
    subsidyType: 'None',
    allergyInfo: 'None',
    medicalInstructions: 'None',
    guardians: [{ 
      name: '', 
      relationship: '', 
      contactNumber: '', 
      email: '', 
      isEmergencyContact: true 
    }]
  });

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const [genders, citizenships, relationships, statuses] = await Promise.all([
          getGenders(),
          getCitizenships(),
          getRelationships(),
          getEnrolmentStatuses()
        ]);
        setGenderList(genders);
        setCitizenshipList(citizenships);
        setRelationshipList(relationships);
        setEnrolmentStatusList(statuses);
      } catch (error) {
        console.error("Error loading master data:", error);
      }
    };
    loadDropdownData();
  }, []);

  const validateTab = (tabIndex: number) => {
    const newErrors: Record<string, string> = {}; // Menggunakan const untuk ESLint
    
    if (tabIndex === 0) {
      if (!studentForm.fullName) newErrors.fullName = "Full Name is required";
      if (!studentForm.nricFin) newErrors.nricFin = "NRIC/FIN is required";
      if (!studentForm.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const firstGuardian = studentForm.guardians[0];
      if (!firstGuardian.name) newErrors.guardianName = "Guardian Name is required";
      if (!firstGuardian.relationship) newErrors.relationship = "Relationship is required";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return false;
    }
    return true;
  };

  const updateGuardianField = (index: number, field: keyof Guardian, value: string | boolean) => {
    const updatedGuardians = [...studentForm.guardians];
    (updatedGuardians[index] as any)[field] = value;
    setStudentForm({ ...studentForm, guardians: updatedGuardians });
    if (errors.guardianName || errors.relationship) setErrors({});
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTab(activeTab)) return;

    setIsSubmitting(true);
    try {
      await createStudent(studentForm);
      alert('Registration Successful!');
    } catch (error) {
      console.error("Submission error:", error);
      alert('Failed to register student.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{shakeAnimation}</style>
      <PageBreadcrumb pageTitle="Student Enrollment" />
      
      {/* Container dengan Elevasi (Shadow) */}
      <div className={`rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark transition-all ${isShaking ? 'animate-shake' : ''}`}>
        
        {/* Tab Header dengan Efek Hover & Berwarna */}
        <div className="flex overflow-hidden rounded-t-sm border-b border-stroke bg-[#F7F9FC] dark:border-strokedark dark:bg-meta-4">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`flex flex-1 items-center justify-center gap-3 px-4 py-4 text-sm font-bold transition-all duration-300 md:text-base ${
              activeTab === 0
                ? 'bg-white text-primary border-t-4 border-primary shadow-md dark:bg-boxdark' 
                : 'text-body hover:bg-gray-2 hover:text-primary dark:hover:bg-boxdark'
            }`}
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${activeTab === 0 ? 'bg-primary text-white border-primary' : 'border-body'}`}>1</span>
            Student Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`flex flex-1 items-center justify-center gap-3 px-4 py-4 text-sm font-bold transition-all duration-300 md:text-base ${
              activeTab === 1
                ? 'bg-white text-primary border-t-4 border-primary shadow-md dark:bg-boxdark'
                : 'text-body hover:bg-gray-2 hover:text-primary dark:hover:bg-boxdark'
            }`}
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${activeTab === 1 ? 'bg-primary text-white border-primary' : 'border-body'}`}>2</span>
            Guardian Details
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6.5">
          {activeTab === 0 && (
            <div className="flex flex-col gap-5.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" placeholder="John Doe" 
                    className={`w-full rounded-lg border-[1.5px] py-3 px-5 outline-none transition focus:border-primary ${errors.fullName ? 'border-red-500 bg-red-50/10' : 'border-stroke bg-transparent'}`}
                    value={studentForm.fullName}
                    onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })} 
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">NRIC/FIN <span className="text-red-500">*</span></label>
                  <input 
                    type="text" placeholder="S1234567X" 
                    className={`w-full rounded-lg border-[1.5px] py-3 px-5 outline-none transition focus:border-primary ${errors.nricFin ? 'border-red-500 bg-red-50/10' : 'border-stroke bg-transparent'}`}
                    value={studentForm.nricFin}
                    onChange={(e) => setStudentForm({ ...studentForm, nricFin: e.target.value })} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Date of Birth <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    className={`w-full rounded-lg border-[1.5px] py-3 px-5 outline-none transition focus:border-primary ${errors.dateOfBirth ? 'border-red-500 bg-red-50/10' : 'border-stroke bg-transparent'}`}
                    onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Gender</label>
                  <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    value={studentForm.gender} onChange={(e) => setStudentForm({...studentForm, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    {genderList.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Citizenship</label>
                  <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    value={studentForm.citizenship} onChange={(e) => setStudentForm({...studentForm, citizenship: e.target.value})}>
                    <option value="">Select Citizenship</option>
                    {citizenshipList.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Enrolment Status <span className="text-red-500">*</span></label>
                  <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    value={studentForm.enrolmentStatus} onChange={(e) => setStudentForm({...studentForm, enrolmentStatus: e.target.value})}>
                    {enrolmentStatusList.map(status => <option key={status.id} value={status.name}>{status.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Subsidy Type</label>
                  <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    value={studentForm.subsidyType} onChange={(e) => setStudentForm({...studentForm, subsidyType: e.target.value})}>
                    <option value="None">None</option>
                    <option value="Basic">Basic</option>
                    <option value="Additional">Additional</option>
                  </select>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => validateTab(0) && setActiveTab(1)} 
                className="mt-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90 shadow-md transition-all active:scale-[0.98]"
              >
                Continue to Guardian Info
              </button>
            </div>
          )}

          {activeTab === 1 && (
            <div className="flex flex-col gap-5.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Guardian Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" placeholder="Full Name" 
                    className={`w-full rounded-lg border-[1.5px] py-3 px-5 outline-none transition focus:border-primary ${errors.guardianName ? 'border-red-500 bg-red-50/10' : 'border-stroke bg-transparent'}`}
                    onChange={(e) => updateGuardianField(0, 'name', e.target.value)} 
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Relationship <span className="text-red-500">*</span></label>
                  <select className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    onChange={(e) => updateGuardianField(0, 'relationship', e.target.value)}>
                    <option value="">Select Relationship</option>
                    {relationshipList.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Contact Number</label>
                  <input type="text" placeholder="+65" className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    onChange={(e) => updateGuardianField(0, 'contactNumber', e.target.value)} />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
                  <input type="email" placeholder="example@mail.com" className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary"
                    onChange={(e) => updateGuardianField(0, 'email', e.target.value)} />
                </div>
              </div>

              {/* Tombol Back & Save dengan Efek Premium */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-stroke dark:border-strokedark">
                <button 
                  type="button" 
                  onClick={() => setActiveTab(0)} 
                  className="flex-1 rounded-lg border border-stroke py-3 px-6 font-medium text-black transition-all hover:bg-gray-100 dark:border-strokedark dark:text-white dark:hover:bg-meta-4 active:scale-95"
                >
                  Back
                </button>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-primary py-3 px-6 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-opacity-90 active:scale-95 disabled:bg-opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving Data...
                    </>
                  ) : (
                    <>
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M15.75 3.375H2.25C1.62656 3.375 1.125 3.87656 1.125 4.5V13.5C1.125 14.1234 1.62656 14.625 2.25 14.625H15.75C16.3734 14.625 16.875 14.1234 16.875 13.5V4.5C16.875 3.87656 16.3734 3.375 15.75 3.375Z" />
                      </svg>
                      Save Student Record
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default StudentRegistration;