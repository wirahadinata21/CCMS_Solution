import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Guardian {
  name: string;
  relationship: string;
}

interface Student {
  id: string;
  fullName: string;
  nriC_FIN: string;
  enrolmentStatus: string;
  allergyInfo: string;
  guardians: Guardian[];
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onSave: (updatedStudent: Student) => void;
}

export default function EditStudentModal({ isOpen, onClose, student, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<Student | null>(null);

  // Sync data student yang dipilih ke dalam form
  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Student Information</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-brand-500 dark:border-gray-600 dark:bg-gray-700"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">NRIC/FIN</label>
              <input
                type="text"
                value={formData.nriC_FIN}
                onChange={(e) => setFormData({ ...formData, nriC_FIN: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-brand-500 dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <select
                value={formData.enrolmentStatus}
                onChange={(e) => setFormData({ ...formData, enrolmentStatus: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-brand-500 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="Active">Active</option>
                <option value="Waitlist">Waitlist</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Allergy Info</label>
            <textarea
              value={formData.allergyInfo}
              onChange={(e) => setFormData({ ...formData, allergyInfo: e.target.value })}
              className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-brand-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="e.g. Peanuts, none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5 mt-6">
            <button type="button" onClick={onClose} className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700">Cancel</button>
            <button type="submit" className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}