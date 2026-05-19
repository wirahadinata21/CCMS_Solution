import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
// import InquiryPipelineTable from "../../../components/tables/Enrollments/EnquiryPipeline/InquiryPipelineTable";
import InquiryPipelineKanban from "../../../components/tables/Enrollments/EnquiryPipeline/InquiryPipelineKanban"
// import { ParentEnquiry } from "../../../types/parentEnquiry";
import toast, { Toaster } from "react-hot-toast";

export default function InquiryPipelineList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
//   const [enquiries, setEnquiries] = useState<ParentEnquiry[]>([]);

  // 🔄 Fetch data dengan filter status
  const fetchEnquiries = async () => {
    try {
      const query = statusFilter !== "All" ? `?status=${statusFilter}` : "";
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries${query}`);
      if (!res.ok) throw new Error("Failed to fetch enquiries");
    //   const data: ParentEnquiry[] = await res.json();
    //   setEnquiries(data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      toast.error("Failed to load enquiries");
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  return (
    <>
      <Toaster position="top-right" />

      <PageMeta
        title="Inquiry Pipeline | CCMS"
        description="Pantau progres enquiry berdasarkan status pipeline"
      />

      <PageBreadcrumb pageTitle="Inquiry Pipeline" />

      <div className="space-y-6">
        {/* Header: Search bar + Filter status */}
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 py-3 px-4 outline-none focus:border-brand-500 dark:border-white/[0.1] dark:bg-white/[0.03]"
          >
            <option value="All">All Status</option>
            <option value="EnquiryReceived">EnquiryReceived</option>
            <option value="Contacted">Contacted</option>
            <option value="Visited">Visited</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        {/* Table */}
        <ComponentCard title="Inquiry Pipeline">
          {/* <InquiryPipelineTable searchTerm={search} data={enquiries} /> */}
          <InquiryPipelineKanban />
        </ComponentCard>
      </div>
    </>
  );
}
