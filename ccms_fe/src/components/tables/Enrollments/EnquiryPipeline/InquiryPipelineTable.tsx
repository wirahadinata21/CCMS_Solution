import React from "react";
import clsx from "clsx";
import { ParentEnquiry } from "../../../../types/parentEnquiry";

const statusColors: Record<string, string> = {
  New: "bg-green-100 text-green-700",
  Contacted: "bg-blue-100 text-blue-700",
  Visited: "bg-orange-100 text-orange-700",
  Waitlisted: "bg-purple-100 text-purple-700",
  Converted: "bg-yellow-100 text-yellow-700",
};

interface Props {
  searchTerm: string;
  data: ParentEnquiry[];
}

export default function InquiryPipelineTable({ searchTerm, data }: Props) {
  const filtered = data.filter(
    (enq) =>
      enq.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.childName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="w-full border rounded-md overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="px-4 py-2">Parent</th>
          <th className="px-4 py-2">Child</th>
          <th className="px-4 py-2">Preferred Start</th>
          <th className="px-4 py-2">Centre</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((enquiry) => (
          <tr key={enquiry.id} className="border-t">
            <td className="px-4 py-2">{enquiry.parentName}</td>
            <td className="px-4 py-2">{enquiry.childName}</td>
            <td className="px-4 py-2">
              {new Date(enquiry.preferredStartDate).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">{enquiry.centreName}</td>
            <td className="px-4 py-2">
              <span
                className={clsx(
                  "px-2 py-1 rounded-full text-sm font-medium",
                  statusColors[enquiry.enquiryStatusName] || "bg-gray-100 text-gray-700"
                )}
              >
                {enquiry.enquiryStatusName}
              </span>
            </td>
            <td className="px-4 py-2">{enquiry.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
