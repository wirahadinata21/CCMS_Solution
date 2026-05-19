import React, { useState } from "react";
import { BellIcon, CheckIcon, TrashIcon } from "lucide-react";

export default function WaitlistMgtTable({
  searchTerm = "",
  centreFilter = "All centres",
  ageGroupFilter = "All ages",
  priorityFilter = "All priorities",
}) {
  const waitlist = [
    {
      id: 1,
      parentName: "Sarah Tan",
      childName: "Aiden Tom",
      birthdate: "2016-01-01",
      centre: "Clementi",
      ageGroup: "Preschool",
      status: "Waitlisted",
      priority: "High",
    },
    {
      id: 2,
      parentName: "Diana Lee",
      childName: "Ethan Lee",
      birthdate: "2026-04-01",
      centre: "Bukit Timah",
      ageGroup: "Toddler",
      status: "Accepted",
      priority: "Medium",
    },
    {
      id: 3,
      parentName: "Mario Wisg",
      childName: "Cheid Limi",
      birthdate: "2028-05-06",
      centre: "Novena",
      ageGroup: "Infant",
      status: "Waitlisted",
      priority: "Low",
    },
    {
      id: 4,
      parentName: "Mario Wisg",
      childName: "Lutof Wany",
      birthdate: "2026-09-01",
      centre: "Tampines",
      ageGroup: "Preschool",
      status: "Slot Offered",
      priority: "Low",
    },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering logic dengan fallback default
  const filtered = waitlist.filter((row) => {
    const q = searchTerm.toLowerCase();

    const matchSearch =
      row.parentName.toLowerCase().includes(q) ||
      row.childName.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q) ||
      row.centre.toLowerCase().includes(q);

    const matchCentre =
      !centreFilter || centreFilter === "All centres" || row.centre === centreFilter;
    const matchAgeGroup =
      !ageGroupFilter || ageGroupFilter === "All ages" || row.ageGroup === ageGroupFilter;
    const matchPriority =
      !priorityFilter || priorityFilter === "All priorities" || row.priority === priorityFilter;

    return matchSearch && matchCentre && matchAgeGroup && matchPriority;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-brand-100 text-brand-700 font-semibold rounded-md">
              <th className="px-4 py-3 rounded-l-full">Centre</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">Waitlist Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Parent Name</th>
              <th className="px-4 py-3">Child Name</th>
              <th className="px-4 py-3">Birthdate</th>
              <th className="px-4 py-3 rounded-r-full">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No waitlist entries found
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`rounded-md ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } shadow-sm`}
                >
                  <td className="px-4 py-3 rounded-l-full">{row.centre}</td>
                  <td className="px-4 py-3">{row.ageGroup}</td>
                  <td className="px-4 py-3">{row.status}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : row.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.parentName}</td>
                  <td className="px-4 py-3">{row.childName}</td>
                  <td className="px-4 py-3">{row.birthdate}</td>
                  <td className="px-4 py-3 flex gap-2 rounded-r-full">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <BellIcon size={16} /> Notify
                    </button>
                    <button className="text-green-600 hover:text-green-800 flex items-center gap-1">
                      <CheckIcon size={16} /> Offer Slot
                    </button>
                    <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                      <TrashIcon size={16} /> Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Rows per page + pagination */}
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
          {Math.min(currentPage * rowsPerPage, filtered.length)} of{" "}
          {filtered.length} entries
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
            disabled={currentPage === totalPages || totalPages === 0}
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
