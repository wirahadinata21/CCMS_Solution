import React from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function FormsDashboard() {
  const navigate = useNavigate();

  const forms = [
    { id: "enquiry", title: "Parent Enquiry Form", fields: 7 },
    { id: "registration", title: "Registration Form", fields: 12 },
    { id: "medical", title: "Medical Information Form", fields: 8 },
    { id: "allergy", title: "Allergy Form", fields: 5 },
  ];

  const getCardColor = (id: string) => {
    switch (id) {
      case "enquiry":
        return "bg-blue-50 border-blue-200";
      case "registration":
        return "bg-green-50 border-green-200";
      case "medical":
        return "bg-pink-50 border-pink-200";
      case "allergy":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <PageMeta
        title="Forms Dashboard | ToffelTech"
        description="Manage and configure enquiry, registration, and operational forms"
      />
      <PageBreadcrumb pageTitle="Forms" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Forms</h1>
        {/* Tombol New Form disembunyikan dulu agar tidak over-promise */}
        {/* <button
          onClick={() => navigate("/forms/new")}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          + New Form
        </button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {forms.map((form) => (
          <div
            key={form.id}
            className={`${getCardColor(
              form.id
            )} border rounded-lg p-4 shadow-sm hover:shadow-md transition`}
          >
            <h3 className="font-semibold text-lg">{form.title}</h3>
            <p className="text-sm text-gray-600">{form.fields} fields</p>
            <button
              onClick={() => navigate(`/forms/${form.id}`)}
              className="mt-3 text-blue-700 hover:text-blue-900 text-sm font-medium"
            >
              View / Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
