import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const centres = [
  { name: "Centre A", billed: 1000, collected: 800, outstanding: 200 },
  { name: "Centre B", billed: 1200, collected: 900, outstanding: 300 },
  { name: "Centre C", billed: 900, collected: 600, outstanding: 300 },
  { name: "Centre D", billed: 1500, collected: 1200, outstanding: 300 },
];

// Hitung summary global
const summary = centres.reduce(
  (acc, c) => {
    acc.billed += c.billed;
    acc.collected += c.collected;
    acc.outstanding += c.outstanding;
    return acc;
  },
  { billed: 0, collected: 0, outstanding: 0 }
);

const COLORS = ["#22c55e", "#ef4444"]; // green vs red

// Demo invoices per student
const invoices = [
  { id: "INV-001", student: "Emily", centre: "Centre A", status: "Paid", amount: 400 },
  { id: "INV-002", student: "Akash", centre: "Centre B", status: "Sent", amount: 350 },
  { id: "INV-003", student: "Violet", centre: "Centre C", status: "Overdue", amount: 300 },
  { id: "INV-004", student: "Ravi", centre: "Centre D", status: "Paid", amount: 500 },
];

export default function BillingDashboard() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Invoice Dashboard</h1>

      {/* Summary Global */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-xl shadow p-5 text-center">
          <h2 className="text-sm text-gray-600">Total Billed</h2>
          <p className="text-2xl font-bold text-indigo-700">${summary.billed}</p>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow p-5 text-center">
          <h2 className="text-sm text-gray-600">Total Collected</h2>
          <p className="text-2xl font-bold text-green-600">${summary.collected}</p>
        </div>
        <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl shadow p-5 text-center">
          <h2 className="text-sm text-gray-600">Total Outstanding</h2>
          <p className="text-2xl font-bold text-red-600">${summary.outstanding}</p>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-700">Collected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span className="text-sm text-gray-700">Outstanding</span>
        </div>
      </div>

      {/* Doughnut Charts per Centre */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-700">Collected vs Outstanding per Centre</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {centres.map((c) => {
            const chartData = [
              { name: "Collected", value: c.collected },
              { name: "Outstanding", value: c.outstanding },
            ];
            return (
              <div key={c.name} className="flex flex-col items-center">
                <h3 className="text-sm font-medium mb-2 text-gray-700">{c.name}</h3>
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice Table per Student */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-3 text-indigo-700">Invoice Status per Student</h2>
        <table className="w-full text-sm">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr className="text-left">
              <th className="py-2 px-2">Invoice</th>
              <th className="py-2 px-2">Student</th>
              <th className="py-2 px-2">Centre</th>
              <th className="py-2 px-2">Amount</th>
              <th className="py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-indigo-50 transition">
                <td className="py-2 px-2">{inv.id}</td>
                <td className="py-2 px-2">🎓 {inv.student}</td>
                <td className="py-2 px-2">{inv.centre}</td>
                <td className="py-2 px-2">${inv.amount}</td>
                <td className="py-2 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      inv.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "Sent"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
