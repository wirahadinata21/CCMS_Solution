import React from "react";
import { X } from "lucide-react";
import { ParentEnquiry } from "../../types/parentEnquiry";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: ParentEnquiry | null; // atau enquiryForm | null
}
export default function ViewParentEnquiryModal({ 
    isOpen, 
    onClose, 
    enquiry 
}: ViewModalProps) { if (!isOpen || !enquiry) return null; 
 

 const formatDate = (value: string | Date | undefined) => {
  if (!value) return "-"; // ✅ handle undefined/null
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              View Parent Enquiry
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Info Sections */}
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
            {/* Parent Info */}
            <div>
              <h3 className="font-semibold text-base mb-2">👨‍👩‍👧 Parent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Parent Name:</strong> {enquiry.parentName}</div>
                <div><strong>Email:</strong> {enquiry.email}</div>
                <div><strong>Phone:</strong> {enquiry.phone}</div>
              </div>
            </div>

            {/* Child Info */}
            <div>
              <h3 className="font-semibold text-base mb-2">👶 Child Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><strong>Child Name:</strong> {enquiry.childName}</div>
                <div><strong>Date of Birth:</strong> {formatDate(enquiry.dateOfBirth)}</div>
                <div><strong>Preferred Start:</strong> {formatDate(enquiry.preferredStartDate)}</div>
                <div><strong>Centre Preference:</strong> {enquiry.centreName}</div>
              </div>
            </div>

            {/* Other Info */}
            <div>
              <strong>Notes / Special Requirements:</strong>
              <div className="mt-1 whitespace-pre-line">{enquiry.notes || "-"}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Status:</strong> {enquiry.enquiryStatusName}</div>
              <div><strong>Status ID:</strong> {enquiry.enquiryStatusId}</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-6 border-t mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border text-sm font-medium hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
