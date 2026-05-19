import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { enquiryForm } from "../../types/enquiryForm"; 
import DatePickerField from "../../components/form/DatePickerField"; 
import "react-datepicker/dist/react-datepicker.css"; 
import TextField from "../../components/form/TextField"; 
import TextAreaField from "../../components/form/TextAreaField"; 

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEnquiry: enquiryForm) => void;
  initialData?: enquiryForm;
}

export default function AddParentEnquiryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddModalProps) {
  const [formData, setFormData] = useState<enquiryForm>({
    parentName: "",
    childName: "",
    dateOfBirth: "",
    preferredStartDate: "",
    centreName: "",
    notes: "",
    email: "",
    phone: "",
    enquiryStatusId: "11111111-1111-1111-1111-111111111111", // from master table 
    enquiryStatusName: "New",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

useEffect(() => {
  if (initialData) {
    setFormData(initialData);
  } else {
    setFormData({
      parentName: "",
      childName: "",
      dateOfBirth: "",
      preferredStartDate: "",
      centreName: "",
      notes: "",
      email: "",
      phone: "",
      enquiryStatusId: "11111111-1111-1111-1111-111111111111",
      enquiryStatusName: "New",
    });
  }
}, [initialData, isOpen]); // ✅ tambahkan isOpen agar reset saat modal dibuka
useEffect(() => {
  if (isOpen) setErrors({});
}, [isOpen]);


  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.parentName) newErrors.parentName = "Parent name is required";
    if (!formData.childName) newErrors.childName = "Child name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = "Phone must be 10–15 digits";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.preferredStartDate) newErrors.preferredStartDate = "Preferred start date is required";
    return newErrors;
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("🔧 Submitting form...");
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    console.log("❌ Validation errors:", newErrors);
    setErrors(newErrors);
    return;
  }
  console.log("✅ Valid form, calling onSave with:", formData);
  onSave(formData);
  onClose();
};


  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl transform transition-all duration-300 animate-slideIn">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {initialData ? "Update Parent Enquiry" : "Submit Parent Enquiry"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent Info */}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">👨‍👩‍👧 Parent Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextField 
                  id="parentName" 
                  label="Parent Name" 
                  value={formData.parentName} 
                  onChange={(val) => setFormData({ ...formData, parentName: val })} 
                  required error={errors.parentName} 
                />
              </div>
              <div>
                <TextField 
                  id="email" 
                  label="Email" 
                  value={formData.email} 
                  onChange={(val) => setFormData({ ...formData, email: val })} 
                  required error={errors.email} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
              <TextField
                id="phone"
                label="Phone"
                type="tel" // ✅ lebih semantik untuk nomor telepon
                value={formData.phone ?? ""} // fallback ke string kosong kalau undefined
                onChange={(val) => setFormData({ ...formData, phone: val })}
                required
                placeholder="e.g. 08123456789"
                error={errors.phone}
              />

              </div>
            </div>

            {/* Child Info */}
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">👶 Child Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextField 
                  id="childName" 
                  label="Child Name" 
                  value={formData.childName} 
                  onChange={(val) => setFormData({ ...formData, childName: val })} 
                  required error={errors.childName} 
                />
              </div>
              <div>
                <DatePickerField
                  id="dateOfBirth"
                  label="Date of Birth "
                  value={formData.dateOfBirth}
                    onChange={(dates) =>
                      setFormData({ ...formData, dateOfBirth: dates[0]?.toISOString() || "" })
                  }
                  required
                    error={errors.dateOfBirth}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <DatePickerField
                  id="preferredStart"
                  label="Preferred Start"
                  value={formData.preferredStartDate}
                    onChange={(dates) =>
                      setFormData({ ...formData, preferredStartDate: dates[0]?.toISOString() || "" })
                  }
                  required
                    error={errors.preferredStartDate}
                />
              </div>
              <TextField
                id="centreName"
                label="Centre Preference"
                value={formData.centreName ?? ""}   // fallback ke string kosong kalau undefined
                onChange={(val) => setFormData({ ...formData, centreName: val })}
                placeholder="e.g. Jakarta Centre"
                error={errors.centreName}
              />

            </div>

            <div>
              <TextAreaField 
                id="notes" 
                label="Notes / Special Requirements" 
                value={formData.notes ?? ""} // ✅ fallback ke string kosong
                onChange={(val) => setFormData({ ...formData, notes: val })}
                placeholder="e.g. Allergies, learning needs"
                error={errors.notes}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border text-sm font-medium hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600"
              >
                {initialData ? "Update Enquiry" : "Submit Enquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
