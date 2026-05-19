import { useState } from "react"; // 1. Tambahkan useState
import { PlusIcon, SearchIcon } from "lucide-react"; 
import { Link } from "react-router"; 
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import StudentTable from "../../components/tables/StudentTable"; 

export default function StudentList() {
  // 2. Buat state untuk menampung teks pencarian
  const [search, setSearch] = useState(""); 

  return (
    <>
      <PageMeta
        title="Student List | CCMS"
        description="Daftar murid aktif di Child Care Management System"
      />
      <PageBreadcrumb pageTitle="Student Management" />
      
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-[300px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={18} />
            </span>
            {/* 3. Hubungkan input dengan state search */}
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-brand-500 dark:border-white/[0.1] dark:bg-white/[0.03]"
            />
          </div>

          <Link
             to="/students/register"
             className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-500 py-3 px-6 text-center font-medium text-white hover:bg-brand-600 shadow-md transition-all whitespace-nowrap"
          >
            <PlusIcon size={20} />
            Add Student
          </Link>
        </div>

        <ComponentCard title="Active Students">
          {/* 4. Kirim state search ke StudentTable sebagai props */}
          <StudentTable searchTerm={search} />
        </ComponentCard>
      </div>
    </>
  );
}