// types/enquiryForm.ts
export type enquiryForm = {
  parentName: string;
  childName: string;
  preferredStartDate: string; // date string dari input
  centreName: string;
  notes?: string;
  email: string;              // baru
  phone: string;              // baru
  dateOfBirth: string;        // baru, date string dari input
  enquiryStatusId: string;
  enquiryStatusName: string;
};
