import React, { useState } from "react";

// Types
type CurriculumItem = {
  id: string;
  week: string;
  theme: string;
  activity: string;
  domain: string;
  createdBy: string;
  createdAt: string;
};

const initialCurriculum: CurriculumItem[] = [
  {
    id: "c1",
    week: "Week 1",
    theme: "Myself",
    activity: "Drawing self-portrait",
    domain: "Art",
    createdBy: "Ms. Anna",
    createdAt: "2026-01-01T09:00:00Z",
  },
  {
    id: "c2",
    week: "Week 2",
    theme: "Animals",
    activity: "Storytelling: The Very Hungry Caterpillar",
    domain: "Literacy",
    createdBy: "Ms. Sarah",
    createdAt: "2026-01-08T09:00:00Z",
  },
  {
    id: "c3",
    week: "Week 2",
    theme: "Animals",
    activity: "Counting animal toys",
    domain: "Numeracy",
    createdBy: "Mr. Ben",
    createdAt: "2026-01-08T10:00:00Z",
  },
  {
    id: "c4",
    week: "Week 3",
    theme: "Nature",
    activity: "Leaf collection walk",
    domain: "Physical Development",
    createdBy: "Ms. Dina",
    createdAt: "2026-01-15T09:00:00Z",
  },
  {
    id: "c5",
    week: "Week 4",
    theme: "Community Helpers",
    activity: "Role play: Firefighter",
    domain: "Social & Emotional",
    createdBy: "Mr. John",
    createdAt: "2026-01-22T09:00:00Z",
  },
];

export default function CurriculumPlan() {
  const [items, setItems] = useState<CurriculumItem[]>(initialCurriculum);
  const [filterDomain, setFilterDomain] = useState<string>("");
  const [newActivity, setNewActivity] = useState<string>("");

  const filtered = filterDomain
    ? items.filter((i) => i.domain === filterDomain)
    : items;

  // Domain color mapping
  const domainColors: Record<string, string> = {
    Literacy: "bg-pink-100 text-pink-700",
    Numeracy: "bg-green-100 text-green-700",
    "Social & Emotional": "bg-yellow-100 text-yellow-700",
    "Physical Development": "bg-blue-100 text-blue-700",
    Art: "bg-purple-100 text-purple-700",
  };

  // Add new activity (demo only)
  const addActivity = () => {
    if (!newActivity) return;
    const newItem: CurriculumItem = {
      id: `c${items.length + 1}`,
      week: "Week 5",
      theme: "Plants",
      activity: newActivity,
      domain: "Literacy",
      createdBy: "Ms. Dina",
      createdAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
    setNewActivity("");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Curriculum Plan</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
          Export Curriculum
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">Filter by domain:</label>
        <select
          value={filterDomain}
          onChange={(e) => setFilterDomain(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="Literacy">Literacy</option>
          <option value="Numeracy">Numeracy</option>
          <option value="Social & Emotional">Social & Emotional</option>
          <option value="Physical Development">Physical Development</option>
          <option value="Art">Art</option>
        </select>
      </div>

      {/* Add Activity Form */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Add new activity..."
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={addActivity}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Add
        </button>
      </div>

      {/* Curriculum Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-5 border-l-4 border-indigo-400"
          >
            <div className="text-sm text-gray-600 mb-2 flex justify-between">
              <span className="font-semibold">{item.week}</span>
              <span className="italic text-gray-400">{item.theme}</span>
            </div>
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">
              {item.activity}
            </h2>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                domainColors[item.domain] || "bg-gray-100 text-gray-700"
              }`}
            >
              {item.domain}
            </span>
            <div className="mt-3 text-xs text-gray-500">
              Created by {item.createdBy} •{" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
