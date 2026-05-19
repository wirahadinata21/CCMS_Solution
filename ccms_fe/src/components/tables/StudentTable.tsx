import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { TrashIcon, PencilIcon, ChevronLeft, ChevronRight } from "lucide-react";

// Import TailAdmin UI Components & Hooks
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

// --- INTERFACES ---
interface Guardian {
  name: string;
  relationship: string;
  contactNumber: string;
  email: string;
  isEmergencyContact: boolean;
}

interface Student {
  id: string;
  fullName: string;
  nriC_FIN: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  enrolmentStatus: string;
  allergyInfo: string;
  medicalInstructions: string;
  guardians: Guardian[];
}

interface StudentTableProps {
  searchTerm: string;
}

export default function StudentTable({ searchTerm }: StudentTableProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { isOpen, openModal, closeModal } = useModal();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "guardian">("personal");

  const fetchStudents = () => {
    axios.get("https://localhost:7290/api/Students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Gagal load murid:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setActiveTab("personal");
    openModal();
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      await axios.put(`https://localhost:7290/api/Students/${selectedStudent.id}`, selectedStudent);
      fetchStudents();
      closeModal();
      alert("Student updated successfully!");
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Failed to update student.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://localhost:7290/api/Students/${id}`);
        fetchStudents();
        alert("Student deleted successfully");
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.fullName.toLowerCase().includes(searchLower) ||
      student.nriC_FIN.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Student Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">NRIC/FIN</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Allergy Info</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="px-5 py-4 text-start font-medium text-gray-800 dark:text-white/90">{student.fullName}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start">{student.nriC_FIN}</TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <span className={student.allergyInfo && student.allergyInfo !== "None" ? "text-red-500 font-bold" : "text-gray-500"}>
                        {student.allergyInfo || "None"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge size="sm" color={student.enrolmentStatus === "Active" ? "success" : "warning"}>
                        {student.enrolmentStatus || "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button type="button" onClick={() => handleEditClick(student)} className="text-gray-500 hover:text-brand-500">
                          <PencilIcon size={18} />
                        </button>
                        <button type="button" className="text-gray-500 hover:text-error-500" onClick={() => handleDelete(student.id)}>
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  {/* Gunakan td biasa jika TableCell tidak mendukung colSpan */}
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                    No students found matching "{searchTerm}"
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* --- FOOTER PAGINATION --- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 p-5 sm:flex-row dark:border-white/[0.05]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Rows per page:</span>
              <select 
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1); 
                }}
                className="rounded-md border border-gray-200 px-2 py-1 text-sm outline-none dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">
              Showing {totalItems > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 disabled:opacity-50 dark:border-white/[0.1] dark:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-medium dark:text-white">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 disabled:opacity-50 dark:border-white/[0.1] dark:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL EDIT --- */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Student Detail
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update personal and guardian information.
            </p>

            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("personal")}
                className={`pb-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === "personal" ? "border-b-2 border-brand-500 text-brand-500" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Personal Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("guardian")}
                className={`pb-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === "guardian" ? "border-b-2 border-brand-500 text-brand-500" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Guardians ({selectedStudent?.guardians?.length || 0})
              </button>
            </div>
          </div>

          <form onSubmit={handleUpdateStudent}>
            <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
              {selectedStudent && activeTab === "personal" && (
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={selectedStudent.fullName}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>NRIC/FIN</Label>
                    <Input
                      type="text"
                      value={selectedStudent.nriC_FIN}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, nriC_FIN: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Medical Instructions</Label>
                    <textarea
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white"
                      rows={3}
                      value={selectedStudent.medicalInstructions || ""}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, medicalInstructions: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {selectedStudent && activeTab === "guardian" && (
                <div className="space-y-6">
                  {selectedStudent.guardians.map((guardian, index) => (
                    <div key={index} className="p-4 border rounded-2xl border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/[0.02]">
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                          <Label>Name</Label>
                          <Input
                            type="text"
                            value={guardian.name}
                            onChange={(e) => {
                              const newG = [...selectedStudent.guardians];
                              newG[index].name = e.target.value;
                              setSelectedStudent({ ...selectedStudent, guardians: newG });
                            }}
                          />
                        </div>
                        <div>
                          <Label>Relationship</Label>
                          <Input
                            type="text"
                            value={guardian.relationship}
                            onChange={(e) => {
                              const newG = [...selectedStudent.guardians];
                              newG[index].relationship = e.target.value;
                              setSelectedStudent({ ...selectedStudent, guardians: newG });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              {/* Hapus properti 'type' dari Button karena interface-nya tidak mendukungnya */}
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}