import React, { useEffect, useState } from "react";
import { ParentEnquiry } from "../../../../types/parentEnquiry";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import clsx from "clsx";

const statusMap: Record<string, string> = {
  New: "New",
  Contacted: "Contacted",
  Visited: "Visited",
  Waitlisted: "Waitlisted",
  Enrolled: "Converted",
};

const statusOrder = ["New", "Contacted", "Visited", "Waitlisted", "Converted"];

const statusStyles: Record<string, string> = {
  New: "border-lime-500 bg-lime-50",
  Contacted: "border-sky-500 bg-sky-50",
  Visited: "border-amber-500 bg-amber-50",
  Waitlisted: "border-violet-500 bg-violet-50",
  Converted: "border-rose-500 bg-rose-50",
};

const statusIcons: Record<string, string> = {
  New: "🆕",
  Contacted: "📞",
  Visited: "🏫",
  Waitlisted: "⏳",
  Converted: "✅",
};

// 🧩 Card component
function EnquiryCard({ enquiry }: { enquiry: ParentEnquiry }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: enquiry.id });
  const mappedStatus = statusMap[enquiry.enquiryStatusName] ?? "New";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        "relative p-4 rounded-xl shadow-md border-l-4 transition hover:scale-[1.02] hover:shadow-lg",
        statusStyles[mappedStatus] ?? "border-gray-300 bg-gray-50"
      )}
    >
      <div className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full bg-white shadow-sm">
        {statusIcons[mappedStatus]} {mappedStatus}
      </div>
      <div className="font-bold text-md flex items-center gap-2">
        👨‍👩‍👧 {enquiry.parentName}
      </div>
      <div className="text-sm">🧒 {enquiry.childName}</div>
      <div className="text-xs">📅 {new Date(enquiry.preferredStartDate).toLocaleDateString()}</div>
      <div className="text-xs">📍 {enquiry.centreName}</div>
    </div>
  );
}

// 🧩 Lane component
function StatusLane({
  status,
  items,
}: {
  status: string;
  items: ParentEnquiry[];
}) {
  const { setNodeRef } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-xl shadow-lg p-4 min-h-[300px] border-t-4"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-bold">
          {statusIcons[status]} {status}
        </h3>
        <span className="text-xs text-gray-500">{items.length} enquiries</span>
      </div>
      <div className="space-y-3">
        {items.map((enq) => (
          <EnquiryCard key={enq.id} enquiry={enq} />
        ))}
      </div>
    </div>
  );
}

export default function InquiryPipelineKanban() {
  const [enquiries, setEnquiries] = useState<ParentEnquiry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries`);
      const data = await res.json();
      setEnquiries(data);
    };
    fetchData();
  }, []);

  const grouped = statusOrder.map((status) => ({
    status,
    items: enquiries.filter((e) => statusMap[e.enquiryStatusName] === status),
  }));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const newStatus = String(over.id);
    setEnquiries((prev) =>
      prev.map((enq) =>
        enq.id === active.id ? { ...enq, enquiryStatusName: newStatus } : enq
      )
    );

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/enrolment/enquiries/${active.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enquiryStatusName: newStatus }),
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        {grouped.map((group) => (
          <StatusLane key={group.status} status={group.status} items={group.items} />
        ))}
      </div>
    </DndContext>
  );
}
