import { useState } from "react";
import { EyeIcon, EditIcon, TrashIcon } from "lucide-react";
import { ParentEnquiry } from "../../../../types/parentEnquiry";

interface Props {
  searchTerm: string;
  data: ParentEnquiry[];
  onDelete: (id: string) => void;
  onEdit: (enquiry: ParentEnquiry) => void;
  onView: (enquiry: ParentEnquiry) => void; // 👁️ handler untuk view
}

export default function ParentEnqSubmitTable({ searchTerm, data, onDelete, onEdit, onView }: Props) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof ParentEnquiry | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: keyof ParentEnquiry) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filtered = data.filter((row) => {
    const q = searchTerm.toLowerCase();
    return (
      row.parentName.toLowerCase().includes(q) ||
      row.childName.toLowerCase().includes(q) ||
      row.enquiryStatusName.toLowerCase().includes(q) ||
      row.centreName.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey] ?? "";
    const valB = b[sortKey] ?? "";
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const sortIndicator = (key: keyof ParentEnquiry) =>
    sortKey === key ? (sortAsc ? " ↑" : " ↓") : "";

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead className="sticky top-0 z-10">
            <tr className="g-gradient-to-r from-brand-100 to-brand-200 text-brand-700 font-semibold rounded-full overflow-hidden shadow-md">
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => handleSort("parentName")}>
                Parent Name{sortIndicator("parentName")}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => handleSort("childName")}>
                Child Name{sortIndicator("childName")}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => handleSort("preferredStartDate")}>
                Preferred Start{sortIndicator("preferredStartDate")}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => handleSort("centreName")}>
                Centre{sortIndicator("centreName")}
              </th>
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => handleSort("enquiryStatusName")}>
                Status{sortIndicator("enquiryStatusName")}
              </th>
              <th className="px-4 py-3 text-center">Notes</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500 italic">
                  No enquiries found
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr key={row.id} 
                className={`${ idx % 2 === 0 ? "bg-white" : "bg-gray-50" } hover:bg-brand-50 transition`}
                >
                  <td className="px-4 py-3 text-center">{row.parentName}</td>
                  <td className="px-4 py-3 text-center">{row.childName}</td>
                  <td className="px-4 py-3 text-center">
                    {new Date(row.preferredStartDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">{row.centreName}</td>
                  <td className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">{row.enquiryStatusName}</td>
                  <td className="px-4 py-3 text-center">{row.notes}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button 
                      onClick={() => onView(row)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <EyeIcon size={16} /> View
                    </button>
                    <button
                      onClick={() => onEdit(row)}
                      className="text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <EditIcon size={16} /> Update
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this enquiry?")) {
                          onDelete(row.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <TrashIcon size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <label htmlFor="rows">Rows per page:</label>
          <select
            id="rows"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
          {Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
