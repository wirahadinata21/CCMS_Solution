import { useState, useEffect } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import ParentEnqSubmitTable from "../../../components/tables/Enrollments/ParentEnquiry/ParentEnqSubmitTable";
import AddParentEnquiryModal from "../../../components/modals/AddParentEnquiryModal";
import ViewParentEnquiryModal from "../../../components/modals/ViewParentEnquiryModal";
import { ParentEnquiry } from "../../../types/parentEnquiry";
import { enquiryForm } from "../../../types/enquiryForm";
import toast, { Toaster } from "react-hot-toast";

export default function ParentEnquiryList() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiries, setEnquiries] = useState<ParentEnquiry[]>([]);
  const [editData, setEditData] = useState<ParentEnquiry | null>(null);
  const [viewData, setViewData] = useState<ParentEnquiry | null>(null); 

  // 🔄 Fetch data awal
  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries`);
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const data: ParentEnquiry[] = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      toast.error("Failed to load enquiries");
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // 💾 Handler submit enquiry baru
  const handleSaveEnquiry = async (newEnquiry: enquiryForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnquiry),
      });

      if (!res.ok) throw new Error("Failed to submit enquiry");

      toast.success("Enquiry submitted successfully!");
      await fetchEnquiries();
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      toast.error("Error submitting enquiry");
    }
  };

  // ✏️ Handler update enquiry
 
 
const handleViewEnquiry = (enquiry: ParentEnquiry) => {
  setViewData({
    ...enquiry,
    preferredStartDate: enquiry.preferredStartDate instanceof Date 
      ? enquiry.preferredStartDate.toISOString()
      : enquiry.preferredStartDate,
    dateOfBirth: enquiry.dateOfBirth instanceof Date 
      ? enquiry.dateOfBirth.toISOString()
      : enquiry.dateOfBirth,
  });
};


const handleUpdateEnquiry = async (updated: enquiryForm) => {
    console.log("📤 PUT request triggered for ID:", editData?.id);
  console.log("📦 Payload:", updated);
  try {
    const payload = {
      ...updated,
      // pastikan tanggal dalam format ISO
      dateOfBirth: new Date(updated.dateOfBirth).toISOString(),
      preferredStartDate: new Date(updated.preferredStartDate).toISOString(),
    };
    console.log("Updating enquiry with ID:", editData?.id);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries/${editData?.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Response error:", errorText);
      throw new Error(`Failed to update enquiry: ${errorText}`);
    }

    toast.success("Enquiry updated successfully!");
    await fetchEnquiries();
  } catch (err) {
    console.error("Error updating enquiry:", err);
    toast.error("Failed to update enquiry");
  }
};



  // 🗑️ Handler delete enquiry
  const handleDeleteEnquiry = async (id: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete enquiry");

      toast.success("Enquiry deleted successfully!");
      await fetchEnquiries();
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      toast.error("Failed to delete enquiry");
    }
  };

  // 🔧 Handler edit (buka modal dengan data existing)
  const handleEditEnquiry = (enquiry: ParentEnquiry) => {
    setEditData(enquiry);
    setModalOpen(true);
  };

  // 🔧 Mapper: convert ParentEnquiry → enquiryForm
const mapToEnquiryForm = (enq: ParentEnquiry): enquiryForm => ({
  parentName: enq.parentName ?? "",
  childName: enq.childName ?? "",
  dateOfBirth:
    typeof enq.dateOfBirth === "string"
      ? enq.dateOfBirth
      : enq.dateOfBirth
      ? enq.dateOfBirth.toISOString()
      : "",
  preferredStartDate:
    typeof enq.preferredStartDate === "string"
      ? enq.preferredStartDate
      : enq.preferredStartDate
      ? enq.preferredStartDate.toISOString()
      : "",
  centreName: enq.centreName ?? "",
  notes: enq.notes ?? "",
  email: enq.email ?? "",   // ✅ fallback string kosong
  phone: enq.phone ?? "",   // ✅ fallback string kosong
  enquiryStatusId: enq.enquiryStatusId ?? "11111111-1111-1111-1111-111111111111", // default GUID dari master 
  enquiryStatusName: enq.enquiryStatusName ?? "EnquiryReceived",
});


  return (
    <>
      <Toaster position="top-right" />

      <PageMeta
        title="Parent Enquiry List | CCMS"
        description="Daftar History Parent Enquiry"
      />

      <PageBreadcrumb pageTitle="Parent Enquiry History" />

      <div className="space-y-6">
        {/* Header: Search bar + Add button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-[300px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={18} />
            </span>
            <input
              type="text"
              placeholder="Search enquiry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-brand-500 dark:border-white/[0.1] dark:bg-white/[0.03]"
            />
          </div>

          <button
            onClick={() => {
              setEditData(null); // reset edit
              setModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-500 py-3 px-6 text-center font-medium text-white hover:bg-brand-600 shadow-md transition-all whitespace-nowrap"
          >
            <PlusIcon size={20} />
            Add Parent Enquiry
          </button>
        </div>

        {/* Table */}
        <ComponentCard title="Parent Enquiry History">
          <ParentEnqSubmitTable
            searchTerm={search}
            data={enquiries}
            onDelete={handleDeleteEnquiry}
            onEdit={handleEditEnquiry}
            onView={handleViewEnquiry}
          />
        </ComponentCard>
      </div>

      {/* Modal Add / Update */}
      <AddParentEnquiryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSave={editData ? handleUpdateEnquiry : handleSaveEnquiry}
        initialData={editData ? mapToEnquiryForm(editData) : undefined}
      />
       {/* Modal View */}
      <ViewParentEnquiryModal 
        isOpen={viewData !== null}
        onClose={() => setViewData(null)}
        enquiry={viewData} 
        />
    </>
  );
}
