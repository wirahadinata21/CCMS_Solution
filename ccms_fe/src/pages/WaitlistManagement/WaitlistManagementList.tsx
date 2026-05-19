import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import WaitlistMgtTable from "../../components/tables/WaitlistMgtTable";
import AddWaitlistEntryModal from "../../components/modals/AddParentEnquiryModal";

export default function WaitlistManagementList() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Handler ketika entry baru ditambahkan
  const handleSaveWaitlist = (newEntry: any) => {
    console.log("New waitlist entry submitted:", newEntry);
    // TODO: simpan ke backend atau update state tabel
  };

  return (
    <>
      {/* Meta info halaman */}
      <PageMeta
        title="Waitlist Management | CCMS"
        description="Manajemen daftar tunggu anak di pusat layanan NLCS"
      />

      {/* Breadcrumb */}
      <PageBreadcrumb pageTitle="Waitlist Management" />

      <div className="space-y-6">
        {/* Header: Search bar + Add button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search bar */}
          <div className="relative w-full max-w-[300px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={18} />
            </span>
            <input
              type="text"
              placeholder="Search waitlist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-brand-500 dark:border-white/[0.1] dark:bg-white/[0.03]"
            />
          </div>

          {/* Add Waitlist Entry button */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-500 py-3 px-6 text-center font-medium text-white hover:bg-brand-600 shadow-md transition-all whitespace-nowrap"
          >
            <PlusIcon size={20} />
            Add Waitlist Entry
          </button>
        </div>

        {/* Table waitlist */}
        <ComponentCard title="Waitlist Management">
          <WaitlistMgtTable searchTerm={search} />
        </ComponentCard>
      </div>

      {/* Modal tambah waitlist entry */}
      <AddWaitlistEntryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveWaitlist}
      />
    </>
  );
}
