import React, { useMemo, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

// Types
type AttendanceStatus =
  | "Pending"
  | "Checked In"
  | "Checked Out"
  | "Absent"
  | "Late Arrival"
  | "Late Pickup"
  | "Early Pickup"
  | "Medical Leave";

type Child = {
  id: string;
  name: string;
  avatar?: string;
  status: AttendanceStatus;
  lastEventAt?: string; // ISO timestamp
  qrId: string;
  absencesInTwoWeeks?: number; // for PTC suggestion
};

type Staff = {
  id: string;
  name: string;
  role: "Teacher" | "Support" | "Admin";
  active: boolean;
};

type AuditLog = {
  id: string;
  entityType: "Child" | "Staff";
  entityId: string;
  actor: string;
  action: string;
  status?: AttendanceStatus;
  timestamp: string;
  reason?: string;
  meta?: Record<string, string | number | boolean>;
};

// Mock data
const initialChildren: Child[] = [
  { id: "c1", name: "Violet", status: "Checked In", qrId: "QR-VIOLET-001", lastEventAt: new Date().toISOString(), absencesInTwoWeeks: 0, avatar: "🧒" },
  { id: "c2", name: "Jimmy", status: "Checked In", qrId: "QR-JIMMY-001", lastEventAt: new Date().toISOString(), absencesInTwoWeeks: 1, avatar: "👦" },
  { id: "c3", name: "Akash", status: "Checked In", qrId: "QR-AKASH-001", lastEventAt: new Date().toISOString(), absencesInTwoWeeks: 0, avatar: "🧑" },
  { id: "c4", name: "Emily", status: "Checked In", qrId: "QR-EMILY-001", lastEventAt: new Date().toISOString(), absencesInTwoWeeks: 2, avatar: "👧" },
  { id: "c5", name: "Mark", status: "Pending", qrId: "QR-MARK-001", absencesInTwoWeeks: 3, avatar: "🧒" },
  { id: "c6", name: "Jacob", status: "Pending", qrId: "QR-JACOB-001", absencesInTwoWeeks: 1, avatar: "👦" },
];

const initialStaff: Staff[] = [
  { id: "s1", name: "Ariana", role: "Teacher", active: true },
  { id: "s2", name: "Ben", role: "Teacher", active: true },
  { id: "s3", name: "Chen", role: "Support", active: true },
  { id: "s4", name: "Dina", role: "Admin", active: true },
  { id: "s5", name: "Eko", role: "Teacher", active: true },
];

// Utils
const nowIso = () => new Date().toISOString();
const formatTime = (iso?: string) =>
  iso ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
const randomWithinRadiusMeters = () => Math.floor(Math.random() * 600); // 0–600m demo
const withinValidRadius = (m: number) => m <= 500; // demo threshold

// Simple radial chart using SVG
function RadialRatio({ staff, students }: { staff: number; students: number }) {
  const total = staff + students;
  const staffPct = total === 0 ? 0 : staff / total;
  const studentsPct = total === 0 ? 0 : students / total;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
      <circle
        cx="55"
        cy="55"
        r={radius}
        stroke="#60a5fa"
        strokeWidth="10"
        fill="none"
        strokeDasharray={`${circumference * staffPct} ${circumference}`}
        strokeDashoffset={circumference * 0.25}
      />
      <circle
        cx="55"
        cy="55"
        r={radius}
        stroke="#34d399"
        strokeWidth="10"
        fill="none"
        strokeDasharray={`${circumference * studentsPct} ${circumference}`}
        strokeDashoffset={circumference * (0.25 + staffPct)}
      />
      <text x="55" y="50" textAnchor="middle" fontSize="12" fill="#374151">
        Ratio
      </text>
      <text x="55" y="68" textAnchor="middle" fontSize="16" fontWeight="600" fill="#111827">
        {staff}:{students}
      </text>
    </svg>
  );
}

// Badge styles
const badgeClass = (status: AttendanceStatus) => {
  const styles: Record<AttendanceStatus, string> = {
    Pending: "bg-gray-100 text-gray-700",
    "Checked In": "bg-green-100 text-green-700",
    "Checked Out": "bg-blue-100 text-blue-700",
    Absent: "bg-red-100 text-red-700",
    "Late Arrival": "bg-yellow-100 text-yellow-800",
    "Late Pickup": "bg-orange-100 text-orange-700",
    "Early Pickup": "bg-indigo-100 text-indigo-700",
    "Medical Leave": "bg-pink-100 text-pink-700",
  };
  return `text-xs px-2 py-1 rounded ${styles[status] || "bg-gray-100 text-gray-700"}`;
};

// Modal for QR input
function QRModal({
  open,
  onClose,
  onSubmit,
  setOverrideReason,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (qrValue: string) => void;
  setOverrideReason: (s: string) => void;
}) {
  const [qrValue, setQrValue] = useState("");
  const [reason, setReason] = useState("");

  const submit = () => {
    setOverrideReason(reason);
    onSubmit(qrValue);
    setQrValue("");
    setReason("");
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">QR Check-In</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter QR ID (e.g., QR-EMILY-001)"
            value={qrValue}
            onChange={(e) => setQrValue(e.target.value)}
            className="border rounded px-3 py-2 w-full text-sm"
          />
          <input
            type="text"
            placeholder="Override reason (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded px-3 py-2 w-full text-sm"
          />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-2 text-sm border rounded">Cancel</button>
            <button onClick={submit} className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Check-In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Student card
function StudentCard({
  child,
  onCheckIn,
  onCheckOut,
  onStatusChange,
  onSchedulePTC,
}: {
  child: Child;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
  onStatusChange: (id: string, status: AttendanceStatus) => void;
  onSchedulePTC: (id: string) => void;
}) {
  const showPTC = child.status === "Absent" || child.status === "Medical Leave" || (child.absencesInTwoWeeks || 0) >= 3;

  return (
    <div className="border rounded p-4 bg-white hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">{child.avatar || "👤"}</div>
          <div>
            <div className="font-medium">{child.name}</div>
            <div className="text-xs text-gray-600">Last event: {formatTime(child.lastEventAt)}</div>
          </div>
        </div>
        <span className={badgeClass(child.status)}>{child.status}</span>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button onClick={() => onCheckIn(child.id)} className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
          Check In
        </button>
        <button onClick={() => onCheckOut(child.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
          Check Out
        </button>
        <select
          value={child.status}
          onChange={(e) => onStatusChange(child.id, e.target.value as AttendanceStatus)}
          className="border rounded px-2 py-1 text-xs ml-auto"
        >
          <option value="Pending">Pending</option>
          <option value="Checked In">Checked In</option>
          <option value="Checked Out">Checked Out</option>
          <option value="Absent">Absent</option>
          <option value="Late Arrival">Late Arrival</option>
          <option value="Late Pickup">Late Pickup</option>
          <option value="Early Pickup">Early Pickup</option>
          <option value="Medical Leave">Medical Leave</option>
        </select>
      </div>

      {showPTC && (
        <div className="mt-3 flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded p-2">
          <div className="text-xs text-indigo-800">
            Suggested: Schedule PTC
            {child.absencesInTwoWeeks && child.absencesInTwoWeeks >= 3 ? ` • ${child.absencesInTwoWeeks} absences` : ""}
          </div>
          <button onClick={() => onSchedulePTC(child.id)} className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700">
            Schedule PTC
          </button>
        </div>
      )}
    </div>
  );
}

export default function AttendanceDashboardEnhanced() {
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [staff] = useState<Staff[]>(initialStaff);
  const [auditTrail, setAuditTrail] = useState<AuditLog[]>([]);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [overrideReason, setOverrideReason] = useState<string>("");

  // Derived stats
  const checkedInCount = useMemo(() => children.filter((c) => c.status === "Checked In").length, [children]);
  const absentCount = useMemo(() => children.filter((c) => c.status === "Absent").length, [children]);
  const pendingCount = useMemo(() => children.filter((c) => c.status === "Pending").length, [children]);
  const activeStaffCount = useMemo(() => staff.filter((s) => s.active).length, [staff]);
  const totalStudents = children.length;

  // Audit log helper
  const addLog = (entry: Omit<AuditLog, "id" | "timestamp">) => {
    setAuditTrail((prev) => [
      { id: `log-${prev.length + 1}`, timestamp: nowIso(), ...entry },
      ...prev,
    ]);
  };

  // Status updates
  const updateChildStatus = (id: string, status: AttendanceStatus, actor = "System", meta?: AuditLog["meta"]) => {
    setChildren((prev) => prev.map((c) => (c.id === id ? { ...c, status, lastEventAt: nowIso() } : c)));
    addLog({ entityType: "Child", entityId: id, actor, action: "Status Update", status, reason: overrideReason || undefined, meta });
  };

  // Actions
  const handleCheckIn = (id: string) => {
    const meters = randomWithinRadiusMeters();
    const ok = withinValidRadius(meters);
    updateChildStatus(id, "Checked In", ok ? "System" : "Manual Override", { locationMeters: meters, validRadius: ok });
  };

  const handleCheckOut = (id: string) => {
    updateChildStatus(id, "Checked Out", "System");
  };

  const setExceptionStatus = (id: string, value: AttendanceStatus) => {
    updateChildStatus(id, value, "Manual Update");
  };

  const schedulePTC = (id: string) => {
    const child = children.find((c) => c.id === id);
    addLog({
      entityType: "Child",
      entityId: id,
      actor: "Teacher",
      action: "PTC Scheduled",
      meta: { childName: child?.name || "", trigger: child?.status || "Pattern" },
    });
    alert(`PTC scheduled for ${child?.name || id}`);
  };

  // QR submit (from modal)
  const submitQR = (qrValue: string) => {
    const match = children.find((c) => c.qrId.toLowerCase() === qrValue.trim().toLowerCase());
    if (!match) {
      addLog({ entityType: "Child", entityId: "unknown", actor: "System", action: "QR Scan Failed", meta: { qrValue } });
      return;
    }
    const meters = randomWithinRadiusMeters();
    const ok = withinValidRadius(meters);
    if (!ok && !overrideReason) {
      addLog({
        entityType: "Child",
        entityId: match.id,
        actor: "System",
        action: "QR Scan Blocked (Invalid Location)",
        meta: { qrValue, locationMeters: meters },
      });
      return;
    }
    updateChildStatus(match.id, "Checked In", ok ? "System (QR)" : "Manual Override (QR)", {
      via: "QR",
      locationMeters: meters,
      validRadius: ok,
    });
    setOverrideReason("");
  };

  // Sticky summary visibility
  const summaryText = `Checked In: ${checkedInCount} • Absent: ${absentCount} • Pending: ${pendingCount}`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky summary bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b px-6 py-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium">Today’s Summary</span>
          <span className="text-gray-700">{summaryText}</span>
        </div>
      </div>

      <div className="p-6">
        <PageMeta title="Enhanced Attendance Dashboard | ToffelTech" description="Engaging UI with live ratio, QR modal, and smart PTC prompts" />
        <PageBreadcrumb pageTitle="Attendance Dashboard" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Student Attendance Overview</h1>
            <p className="text-sm text-gray-600">Live ratio, QR check-in, and today’s attendance summary</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQrModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              <span>QR Check-In</span> <span>📷</span>
            </button>
          </div>
        </div>

        {/* Top panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Live Ratio</h3>
              <span className="text-xs text-gray-500">Real-time</span>
            </div>
            <div className="flex items-center gap-6 mt-3">
              <RadialRatio staff={activeStaffCount} students={totalStudents} />
              <div className="text-sm">
                <div className="text-gray-700">
                  <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="font-medium">Staff:</span></span> {activeStaffCount}
                </div>
                <div className="text-gray-700">
                  <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="font-medium">Students:</span></span> {totalStudents}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">Today’s Attendance</h3>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <div className="text-xs text-gray-600">Checked In</div>
                <div className="text-xl font-semibold text-green-700">{checkedInCount}</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="text-xs text-gray-600">Absent</div>
                <div className="text-xl font-semibold text-red-700">{absentCount}</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <div className="text-xs text-gray-600">Pending</div>
                <div className="text-xl font-semibold text-yellow-700">{pendingCount}</div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold">Compliance & Location</h3>
            <p className="text-sm text-gray-600 mt-2">
              QR check-ins validate proximity to centre. Manual overrides require reasons and are logged to audit trail.
            </p>
            <p className="text-xs text-gray-500 mt-1">Status changes are timestamped and attributed to actors.</p>
          </div>
        </div>

        {/* Check-in grid with avatars and smart PTC */}
        <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Check In / Check Out</h3>
            <span className="text-xs text-gray-500">Tap to update status</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {children.map((c) => (
              <StudentCard
                key={c.id}
                child={c}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                onStatusChange={setExceptionStatus}
                onSchedulePTC={schedulePTC}
              />
            ))}
          </div>
        </div>

        {/* Audit trail with icons and simple filters */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Audit Trail</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Last 10 events</span>
            </div>
          </div>
          {auditTrail.length === 0 ? (
            <p className="text-sm text-gray-600">No events yet.</p>
          ) : (
            <div className="mt-2 space-y-2">
              {auditTrail.slice(0, 10).map((logItem) => {
                const icon = logItem.action.includes("PTC")
                  ? "📅"
                  : logItem.action.includes("QR")
                  ? "📷"
                  : logItem.action.includes("Status")
                  ? "✏️"
                  : "🕒";
                return (
                  <div key={logItem.id} className="text-sm text-gray-800 border-b pb-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2">
                        <span>{icon}</span>
                        <span>
                          <span className="font-medium">{logItem.actor}</span> • {logItem.action}
                          {logItem.status ? ` → ${logItem.status}` : ""}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">{new Date(logItem.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {logItem.entityType} ID: {logItem.entityId}
                      {logItem.reason ? ` • Reason: ${logItem.reason}` : ""}
                      {logItem.meta &&
                        Object.keys(logItem.meta).length > 0 &&
                        ` • ${Object.entries(logItem.meta)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" • ")}`}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* QR modal */}
      <QRModal open={qrModalOpen} onClose={() => setQrModalOpen(false)} onSubmit={submitQR} setOverrideReason={setOverrideReason} />
    </div>
  );
}
