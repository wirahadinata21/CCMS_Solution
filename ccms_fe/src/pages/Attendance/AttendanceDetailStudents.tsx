import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

type Student = {
  id: string;
  name: string;
  status: string;
};

export default function AttendanceDetailStudents() {
  const { id } = useParams(); // ambil program id dari URL

  // Dummy data per program
  const programmeData: Record<string, Student[]> = {
    pg1: [
      { id: "s1", name: "Aiden Tan", status: "Present" },
      { id: "s2", name: "Chloe Lim", status: "Absent" },
    ],
    nursery: [
      { id: "s3", name: "Ethan Ng", status: "Present" },
      { id: "s4", name: "Sofia Lee", status: "Medical Leave" },
    ],
    k1: [
      { id: "s5", name: "Lucas Wong", status: "Present" },
      { id: "s6", name: "Maya Chen", status: "Late" },
    ],
    k2: [
      { id: "s7", name: "Daniel Tan", status: "Present" },
      { id: "s8", name: "Hannah Ong", status: "Present" },
    ],
  };

  const [students, setStudents] = useState<Student[]>(programmeData[id || "pg1"]);

  const updateStatus = (sid: string, newStatus: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === sid ? { ...s, status: newStatus } : s))
    );
  };

  const schedulePTC = (studentName: string) => {
    alert(`PTC scheduled for ${studentName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <PageMeta
        title="Attendance Detail | ToffelTech"
        description="View and update student attendance per programme"
      />
      <PageBreadcrumb pageTitle={`Attendance Detail - ${id?.toUpperCase()}`} />

      <h2 className="text-xl font-semibold mb-4">
        {id?.toUpperCase()} Attendance
      </h2>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div className="font-medium">{student.name}</div>
              <div className="text-sm text-gray-600">Status: {student.status}</div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={student.status}
                onChange={(e) => updateStatus(student.id, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Medical Leave">Medical Leave</option>
              </select>

              {(student.status === "Absent" || student.status === "Medical Leave") && (
                <button
                  onClick={() => schedulePTC(student.name)}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Schedule PTC
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
