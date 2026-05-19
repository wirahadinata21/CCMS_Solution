import React from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function AttendanceDashboardStudents() {
  const navigate = useNavigate();

  const attendanceData = [
    { id: "pg1", program: "PG1 Morning", present: 12, absent: 3, color: "blue" },
    { id: "nursery", program: "Nursery Full Day", present: 18, absent: 1, color: "green" },
    { id: "k1", program: "K1 Afternoon", present: 20, absent: 2, color: "yellow" },
    { id: "k2", program: "K2 Full Day", present: 15, absent: 0, color: "pink" },
  ];

  const getCardColor = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-50 border-blue-200";
      case "green": return "bg-green-50 border-green-200";
      case "yellow": return "bg-yellow-50 border-yellow-200";
      case "pink": return "bg-pink-50 border-pink-200";
      default: return "bg-white border-gray-200";
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "pg1": return "🧒";
      case "nursery": return "👶";
      case "k1": return "🎒";
      case "k2": return "📚";
      default: return "🏫";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <PageMeta
        title="Student Attendance Dashboard | ToffelTech"
        description="Track student attendance across programmes"
      />
      <PageBreadcrumb pageTitle="Student Attendance" />

      <h1 className="text-2xl font-semibold mb-6">Student Attendance Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {attendanceData.map((group) => (
          <div
            key={group.id}
            className={`${getCardColor(group.color)} border rounded-lg p-4 shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{getIcon(group.id)}</span>
              <h3 className="font-semibold text-lg">{group.program}</h3>
            </div>
            <p className="text-sm text-gray-700">
              Present: <span className="font-medium text-green-700">{group.present}</span> • Absent: <span className="font-medium text-red-600">{group.absent}</span>
            </p>
            <button
              onClick={() => navigate(`/attendance/students/${group.id}`)}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
