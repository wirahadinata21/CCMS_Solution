import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

// Types
type PortfolioEntry = {
  id: string;
  childName: string;
  mediaType: "photo" | "video" | "note";
  mediaUrl?: string;
  note?: string;
  tags: string[];
  createdAt: string;
  createdBy: string;
  comments?: { author: string; text: string; timestamp: string }[];
};

const initialEntries: PortfolioEntry[] = [
  {
    id: "p1",
    childName: "Emily",
    mediaType: "photo",
    mediaUrl: "/uploads/emily-art.jpg",
    tags: ["🎨 Art", "✋ Fine Motor", "✨ Creativity"],
    createdAt: "2026-01-10T09:00:00Z",
    createdBy: "Ms. Sarah",
    comments: [
      { author: "Parent", text: "Beautiful work!", timestamp: "2026-01-10T12:00:00Z" },
    ],
  },
  {
    id: "p2",
    childName: "Akash",
    mediaType: "note",
    note: "Akash demonstrated strong problem-solving during block play.",
    tags: ["🧠 Cognitive", "🧩 Problem Solving"],
    createdAt: "2026-01-09T14:30:00Z",
    createdBy: "Mr. Ben",
  },
];

export default function PortfolioDashboard() {
  const [entries] = useState<PortfolioEntry[]>(initialEntries);
  const [filterTag, setFilterTag] = useState<string>("");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const filtered = filterTag
    ? entries.filter((e) => e.tags.some((t) => t.includes(filterTag)))
    : entries;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Learning Portfolios</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
          Export Termly Report
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">Filter by tag:</label>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="Art">Art</option>
          <option value="Cognitive">Cognitive</option>
          <option value="Problem Solving">Problem Solving</option>
        </select>
      </div>

      {/* Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-5 relative"
          >
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">{entry.childName}</span> •{" "}
              {new Date(entry.createdAt).toLocaleString()} • by {entry.createdBy}
            </div>

            {/* Media */}
            {entry.mediaType === "photo" && entry.mediaUrl && (
              <img
                src={entry.mediaUrl}
                alt="Portfolio"
                className="rounded-lg cursor-pointer mb-3"
                onClick={() => setLightboxUrl(entry.mediaUrl!)}
              />
            )}
            {entry.mediaType === "video" && entry.mediaUrl && (
              <video controls src={entry.mediaUrl} className="rounded-lg mb-3" />
            )}
            {entry.mediaType === "note" && entry.note && (
              <p className="text-gray-800 mb-3 italic">“{entry.note}”</p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Comments */}
            {entry.comments && entry.comments.length > 0 && (
              <div className="mt-2 border-t pt-2">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">Comments:</h4>
                {entry.comments.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-700 mb-1"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                      {c.author[0]}
                    </div>
                    <div className="bg-gray-100 px-2 py-1 rounded-lg">
                      <span className="font-semibold">{c.author}</span>: {c.text}{" "}
                      <span className="text-gray-500">
                        ({new Date(c.timestamp).toLocaleTimeString()})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightboxUrl} onClose={() => setLightboxUrl(null)} className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-screen bg-black/70">
          <Dialog.Panel className="bg-white rounded-lg p-4">
            {lightboxUrl && <img src={lightboxUrl} alt="Preview" className="rounded-lg" />}
            <button
              onClick={() => setLightboxUrl(null)}
              className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
