import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../common/TopNavbar";

const BASE = "http://localhost:9002";

const STATUS_COLORS = {
  COMPLETED:   { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  BOOKED:      { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
  PENDING:     { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  RESCHEDULED: { bg: "#e0e7ff", text: "#3730a3", dot: "#6366f1" },
  CANCELLED:   { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
};

const STATUS_BADGE = {
  COMPLETED:   "bg-success",
  BOOKED:      "bg-primary",
  PENDING:     "bg-warning text-dark",
  RESCHEDULED: "bg-info text-dark",
  CANCELLED:   "bg-danger",
};

function StatusBadge({ status }) {
  const cls = STATUS_BADGE[status] || "bg-secondary";
  return (
    <span className={`badge ${cls}`} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>
      {status}
    </span>
  );
}

function Modal({ title, onClose, children, maxWidth = 560 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="bg-body" style={{ borderRadius: 16, width: "100%", maxWidth, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div className="bg-body d-flex align-items-center justify-content-between" style={{ padding: "18px 24px", borderBottom: "1px solid var(--bs-border-color)", position: "sticky", top: 0, zIndex: 1 }}>
          <h6 className="mb-0 fw-bold">{title}</h6>
          <button onClick={onClose} className="btn-close"></button>
        </div>
        <div style={{ padding: "20px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="bg-body-secondary" style={{ borderRadius: 8, padding: "10px 14px" }}>
      <div className="text-muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
      <div className="fw-medium" style={{ fontSize: 14 }}>{value ?? "—"}</div>
    </div>
  );
}

// Toast notification
const TOAST_ICONS = {
  success: { icon: "bi-check-circle-fill", color: "#10b981", bg: "#d1fae5" },
  error:   { icon: "bi-x-circle-fill",     color: "#ef4444", bg: "#fee2e2" },
  info:    { icon: "bi-info-circle-fill",  color: "#3b82f6", bg: "#dbeafe" },
};

function ToastContainer({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
      {toasts.map((t) => {
        const s = TOAST_ICONS[t.type] || TOAST_ICONS.info;
        return (
          <div key={t.id} style={{
            background: s.bg, borderRadius: 10, padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            minWidth: 260, maxWidth: 360,
            animation: "slideIn 0.2s ease",
          }}>
            <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: 16, flexShrink: 0 }}></i>
            <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{t.message}</span>
          </div>
        );
      })}
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}

export default function DoctorDD() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor]             = useState(null);
  const [loading, setLoading]           = useState(true);
  const [activeTab, setActiveTab]       = useState("all");

  const [filterName,   setFilterName]   = useState("");
  const [filterDate,   setFilterDate]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [patientModal, setPatientModal] = useState(null);
  const [apptModal,    setApptModal]    = useState(null);
  const [notesModal,   setNotesModal]   = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [editModal,    setEditModal]    = useState(false);

  const [newNote,     setNewNote]     = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [apptUpdating, setApptUpdating] = useState(false);
  const [apptStatus,   setApptStatus]   = useState("");

  const [editForm,   setEditForm]   = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError,  setEditError]  = useState("");

  const [apptReason,     setApptReason]     = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  const [toasts, setToasts] = useState([]);
  const [vitals, setVitals] = useState(null);

  function showToast(message, type = "success") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }

  const token   = localStorage.getItem("token");
  const email   = localStorage.getItem("email");
  const headers = { Authorization: "Bearer " + token };

  useEffect(() => {
  if (!email) { setLoading(false); return; }

  axios.get(`${BASE}/api/doctor/by-email?email=${encodeURIComponent(email)}`, { headers })
    .then((res) => {
      const doctorData = res.data;

      //if profile is incomplete — redirect to complete profile page
      if (!doctorData.department || !doctorData.availabilitySchedule) {
        navigate("/complete-profile");
        return;
      }

      setDoctor(doctorData);
      setEditForm({
        id:                   doctorData.id,
        name:                 doctorData.name || "",
        department:           doctorData.department || "",
        availabilitySchedule: doctorData.availabilitySchedule || "",
        email:                doctorData.email || "",
      });
      return axios.get(`${BASE}/api/appointment/doctor/${doctorData.id}`, { headers });
    })
    .then((res) => {
      if (res) setAppointments(res.data || []);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

  const today         = new Date().toISOString().split("T")[0];
  const todayAppts    = appointments.filter((a) => a.date === today);
  const upcomingAppts = appointments.filter((a) => a.date > today).sort((a, b) => a.date.localeCompare(b.date));
  const rescheduled   = appointments.filter((a) => a.status === "RESCHEDULED");
  const completed     = appointments.filter((a) => a.status === "COMPLETED");
  const statusBreakdown = appointments.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {});

  const baseTabData  = { today: todayAppts, upcoming: upcomingAppts, rescheduled, all: appointments };
  const filteredData = baseTabData[activeTab].filter((a) =>
    (!filterName   || a.patient?.patientName?.toLowerCase().includes(filterName.toLowerCase())) &&
    (!filterDate   || a.date === filterDate) &&
    (!filterStatus || a.status === filterStatus)
  );

  function openNotes(appt) {
    setNotesModal({ patient: appt.patient, notes: null });
    setNewNote(""); setEditingNote(null);
    axios.get(`${BASE}/api/medical-notes/patient/${appt.patient.patientId}`, { headers })
      .then((res) => setNotesModal((p) => ({ ...p, notes: res.data })))
      .catch(() => setNotesModal((p) => ({ ...p, notes: [] })));
  }

  function refreshNotes(pid) {
    axios.get(`${BASE}/api/medical-notes/patient/${pid}`, { headers })
      .then((res) => setNotesModal((p) => ({ ...p, notes: res.data })))
      .catch(console.error);
  }

  function submitNote() {
    if (!newNote.trim() || !doctor) return;
    setNoteLoading(true);
    axios.post(`${BASE}/api/medical-notes/add`, { patientId: notesModal.patient.patientId, doctorId: doctor.id, note: newNote.trim() }, { headers })
      .then(() => { refreshNotes(notesModal.patient.patientId); setNewNote(""); showToast("Note added successfully"); })
      .catch(() => showToast("Failed to add note", "error")).finally(() => setNoteLoading(false));
  }

  function saveEditNote() {
    if (!editingNote?.text?.trim()) return;
    setNoteLoading(true);
    axios.put(`${BASE}/api/medical-notes/update/${editingNote.noteId}`, { note: editingNote.text.trim() }, { headers })
      .then(() => { refreshNotes(notesModal.patient.patientId); setEditingNote(null); showToast("Note updated successfully"); })
      .catch(() => showToast("Failed to update note", "error")).finally(() => setNoteLoading(false));
  }

  function deleteNote(noteId) {
    if (!window.confirm("Delete this note?")) return;
    axios.delete(`${BASE}/api/medical-notes/delete/${noteId}`, { headers })
      .then(() => { refreshNotes(notesModal.patient.patientId); showToast("Note deleted", "info"); }).catch(() => showToast("Failed to delete note", "error"));
  }

  //openManage function
function openManage(appt) {
  setApptModal(appt);
  setApptStatus(appt.status);
  setApptReason("");
  setRescheduleDate(appt.date);
  setRescheduleTime(appt.time?.slice(0, 5) ?? "");
}

//updateAppointment function
function updateAppointment() {
  if (!apptModal) return;
  setApptUpdating(true);

  const updatedAppt = {
    ...apptModal,
    status: apptStatus,
    reason: apptReason || null,
    // For RESCHEDULED use new date/time
    date: apptStatus === "RESCHEDULED" ? rescheduleDate : apptModal.date,
    time: apptStatus === "RESCHEDULED"
      ? rescheduleTime + ":00"   // backend expects HH:mm:ss
      : apptModal.time,
  };

  axios.put(`${BASE}/api/appointment/update`, { appointment: updatedAppt }, { headers })
    .then((res) => {
      const updated = res.data.appointment;
      setAppointments((prev) => prev.map((a) => a.id === updated.id ? updated : a));
      setApptModal(null);
      showToast(`Appointment status updated to ${updated.status}`);
    })
    .catch((err) => {
      const msg = err.response?.data?.message || "Failed to update appointment";
      showToast(msg, "error");
    })
    .finally(() => setApptUpdating(false));
}

  function saveProfile() {
    setEditSaving(true); setEditError("");
    axios.put(`${BASE}/api/doctor/update`, { doctor: editForm }, { headers })
      .then((res) => { setDoctor(res.data.doctor ?? res.data); setEditModal(false); showToast("Profile updated successfully"); })
      .catch((err) => { setEditError(err.response?.data?.message || "Failed to save."); showToast("Failed to update profile", "error"); })
      .finally(() => setEditSaving(false));
  }

  if (loading) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center flex-column gap-3">
      <div className="spinner-border text-primary" />
      <p className="text-muted mb-0">Loading your dashboard...</p>
    </div>
  );

  return (
    <div className="min-vh-100 bg-body-tertiary">

      <TopNavbar onMyProfile={() => setProfileModal(true)} onEditProfile={() => setEditModal(true)} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>

        {/* Profile Banner */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)", borderRadius: 16, padding: "20px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 22 }}>
              {doctor?.name?.charAt(0) ?? "D"}
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>{doctor?.name ?? "—"}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{doctor?.department ?? "—"}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                <i className="bi bi-clock me-1"></i>{doctor?.availabilitySchedule ?? "—"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[["Today", todayAppts.length, "#60a5fa"], ["Total", appointments.length, "#fff"], ["Completed", completed.length, "#34d399"]].map(([label, val, color]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                <div style={{ color, fontWeight: 700, fontSize: 28 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="row g-3 mb-4">
          {[
            { label: "Total",       value: appointments.length,  color: "#3b82f6" },
            { label: "Today",       value: todayAppts.length,    color: "#10b981" },
            { label: "Upcoming",    value: upcomingAppts.length, color: "#8b5cf6" },
            { label: "Rescheduled", value: rescheduled.length,   color: "#f59e0b" },
            { label: "Completed",   value: completed.length,     color: "#06b6d4" },
          ].map((k) => (
            <div key={k.label} className="col">
              <div className="card border-0 shadow-sm h-100" style={{ borderTop: `3px solid ${k.color}`, borderRadius: 12 }}>
                <div className="card-body">
                  <div className="text-muted mb-1" style={{ fontSize: 12 }}>{k.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: k.color }}>{k.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Breakdown */}
        {Object.keys(statusBreakdown).length > 0 && (
          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 12 }}>
            <div className="card-body">
              <div className="fw-semibold mb-3" style={{ fontSize: 13 }}>Appointments by Status</div>
              <div className="d-flex gap-2 flex-wrap">
                {Object.entries(statusBreakdown).map(([status, count]) => {
                  const s = STATUS_COLORS[status] || { dot: "#9ca3af" };
                  return (
                    <div key={status} className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-body-secondary">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, display: "inline-block", flexShrink: 0 }} />
                      <span className="fw-semibold" style={{ fontSize: 12 }}>{status}</span>
                      <span className="fw-bold" style={{ fontSize: 18, color: s.dot }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: 12, overflow: "hidden" }}>

          {/* Tabs */}
          <div className="d-flex border-bottom px-3" style={{ overflowX: "auto" }}>
            {[
              { key: "today",       label: `Today (${todayAppts.length})` },
              { key: "upcoming",    label: `Upcoming (${upcomingAppts.length})` },
              { key: "rescheduled", label: `Rescheduled (${rescheduled.length})`, alert: rescheduled.length > 0 },
              { key: "all",         label: `All (${appointments.length})` },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="btn btn-link text-decoration-none fw-semibold px-3 py-3"
                style={{
                  fontSize: 13, whiteSpace: "nowrap", borderRadius: 0,
                  color: activeTab === tab.key ? "#3b82f6" : "#6c757d",
                  borderBottom: activeTab === tab.key ? "2px solid #3b82f6" : "2px solid transparent",
                  marginBottom: -1,
                }}>
                {tab.label}
                {tab.alert && <span className="badge bg-warning text-dark ms-1" style={{ fontSize: 10 }}>!</span>}
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="d-flex gap-2 px-3 py-3 border-bottom flex-wrap align-items-center">
            <div className="input-group input-group-sm" style={{ maxWidth: 220 }}>
              <span className="input-group-text"><i className="bi bi-search text-muted"></i></span>
              <input type="text" className="form-control" placeholder="Patient name..."
                value={filterName} onChange={(e) => setFilterName(e.target.value)} />
            </div>
            <div className="input-group input-group-sm" style={{ maxWidth: 180 }}>
              <span className="input-group-text"><i className="bi bi-calendar3 text-muted"></i></span>
              <input type="date" className="form-control"
                value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
            </div>
            <select className="form-select form-select-sm" style={{ maxWidth: 160 }}
              value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              {["BOOKED","COMPLETED","RESCHEDULED","PENDING","CANCELLED"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {(filterName || filterDate || filterStatus) && (
              <button className="btn btn-sm btn-outline-danger"
                onClick={() => { setFilterName(""); setFilterDate(""); setFilterStatus(""); }}>
                Clear
              </button>
            )}
          </div>

          {/* Table */}
          <div className="p-3">
            {filteredData.length === 0 ? (
              <div className="text-center text-muted py-5">
                {filterName || filterDate || filterStatus ? "No appointments match your filters." : "No appointments found."}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
                  <thead className="table-light">
                    <tr>
                      {["ID", "Patient", "Date", "Time", "Duration", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-muted fw-semibold border-0"
                          style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((a) => (
                      <tr key={a.id}>
                        <td><span className="badge bg-secondary-subtle text-secondary fw-semibold">#{a.id}</span></td>
                        <td className="fw-semibold">{a.patient?.patientName ?? "—"}</td>
                        <td className="text-muted">
                          {a.date === today
                            ? <span className="text-success fw-semibold">Today</span>
                            : a.date ?? "—"}
                        </td>
                        <td className="text-muted">{a.time ? a.time.slice(0, 5) : "—"}</td>
                        <td className="text-muted">{a.durationMinutes ? `${a.durationMinutes} min` : "—"}</td>
                        <td><StatusBadge status={a.status} /></td>
                        <td>
                          <div className="d-flex gap-1">

                      <button onClick={() => {
                          setPatientModal(a);
                          setVitals(null);
                          axios.get(`${BASE}/api/vitals/patient/${a.patient.patientId}`, { headers })
                          .then((res) => setVitals(res.data || []))
                          .catch(() => setVitals([]));
                           }} className="btn btn-sm btn-outline-primary" style={{ fontSize: 12 }}>                           
                            

                              <i className="bi bi-person me-1"></i>Record
                            </button>
                            <button onClick={() => openNotes(a)} className="btn btn-sm btn-outline-success" style={{ fontSize: 12 }}>
                              <i className="bi bi-journal-text me-1"></i>Notes
                            </button>
                            <button onClick={() => openManage(a)} className="btn btn-sm btn-outline-warning" style={{ fontSize: 12 }}>
                              <i className="bi bi-gear me-1"></i>Manage
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Profile Modal */}
      {profileModal && (
        <Modal title="My Profile" onClose={() => setProfileModal(false)}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 26, flexShrink: 0 }}>
              {doctor?.name?.charAt(0) ?? "D"}
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: 20 }}>{doctor?.name}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>{doctor?.department}</div>
              <span className="badge bg-primary-subtle text-primary mt-1" style={{ fontSize: 11 }}>DOCTOR</span>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-6"><InfoRow label="Name"         value={doctor?.name} /></div>
            <div className="col-6"><InfoRow label="Department"   value={doctor?.department} /></div>
            <div className="col-6"><InfoRow label="Availability" value={doctor?.availabilitySchedule} /></div>
            <div className="col-6"><InfoRow label="Email"        value={doctor?.email} /></div>
          </div>
          <button onClick={() => { setProfileModal(false); setEditModal(true); }}
            className="btn btn-primary w-100 mt-4">
            <i className="bi bi-pencil me-2"></i>Edit Profile
          </button>
        </Modal>
      )}

      {/* Edit Profile Modal */}
      {editModal && (
        <Modal title="Edit Profile" onClose={() => setEditModal(false)}>
          {editError && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: 13 }}>{editError}</div>}
          <div className="d-flex flex-column gap-3">
            {[
              { label: "Full Name",             field: "name",                 type: "text",  placeholder: "Dr. John Doe" },
              { label: "Department",            field: "department",           type: "text",  placeholder: "e.g. Cardiology" },
              { label: "Availability Schedule", field: "availabilitySchedule", type: "text",  placeholder: "e.g. 09:00-17:00" },
              { label: "Email Address",         field: "email",                type: "email", placeholder: "doctor@hospital.com" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>{label}</label>
                <input type={type} className="form-control" value={editForm[field] || ""}
                  placeholder={placeholder}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, [field]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div className="d-flex gap-2 mt-4">
            <button onClick={() => setEditModal(false)} className="btn btn-outline-secondary flex-fill">Cancel</button>
            <button onClick={saveProfile} disabled={editSaving} className="btn btn-primary flex-fill">
              {editSaving ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}


      {/* Patient Record Modal */}
{patientModal && (
  <Modal title="Patient Record" onClose={() => setPatientModal(null)} maxWidth={640}>
    {patientModal.patient ? (
      <>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#dbeafe",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#3b82f6", fontWeight: 700, fontSize: 20, flexShrink: 0 }}>
            {patientModal.patient.patientName?.charAt(0)}
          </div>
          <div>
            <div className="fw-bold" style={{ fontSize: 18 }}>{patientModal.patient.patientName}</div>
            <div className="text-muted" style={{ fontSize: 13 }}>Patient ID: #{patientModal.patient.patientId}</div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-6"><InfoRow label="Date of Birth" value={patientModal.patient.patientDOB} /></div>
          <div className="col-6"><InfoRow label="Gender"        value={patientModal.patient.patientGender} /></div>
          <div className="col-6"><InfoRow label="Phone"         value={patientModal.patient.patientPhoneNumber} /></div>
          <div className="col-6"><InfoRow label="Status"        value={patientModal.patient.patientStatus} /></div>
          <div className="col-12"><InfoRow label="Medical History" value={patientModal.patient.patientMedicalHistory ?? "None recorded"} /></div>
        </div>

        <div className="bg-body-secondary p-3 rounded-3 mb-4">
          <div className="text-muted mb-1" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Appointment Info</div>
          <div style={{ fontSize: 13 }}>{patientModal.date} · {patientModal.time?.slice(0, 5)} · {patientModal.durationMinutes} min</div>
        </div>

        {/* Vitals Section */}
        <div className="fw-semibold mb-3" style={{ fontSize: 14 }}>
          <i className="bi bi-heart-pulse me-2 text-danger"></i>Patient Vitals
        </div>

        {vitals === null ? (
          <div className="text-center text-muted py-3">
            <span className="spinner-border spinner-border-sm me-2"></span>Loading vitals...
          </div>
        ) : vitals.length === 0 ? (
          <div className="text-center text-muted py-3 bg-body-secondary rounded-3">
            <i className="bi bi-clipboard-x d-block fs-4 mb-1"></i>
            No vitals recorded for this patient yet.
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {vitals.map((v) => (
              <div key={v.vitalId} className="p-3 rounded-3 bg-body-secondary border-start border-danger border-3">
                <div className="row g-2 mb-2">
                  <div className="col-6 col-md-3">
                    <div className="text-muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Blood Pressure</div>
                    <div className="fw-semibold" style={{ fontSize: 14 }}>
                      <i className="bi bi-droplet-fill text-danger me-1"></i>
                      {v.bloodPressure ?? "—"}
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Temperature</div>
                    <div className="fw-semibold" style={{ fontSize: 14 }}>
                      <i className="bi bi-thermometer-half text-warning me-1"></i>
                      {v.temperature != null ? `${v.temperature} °C` : "—"}
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Pulse Rate</div>
                    <div className="fw-semibold" style={{ fontSize: 14 }}>
                      <i className="bi bi-heart-pulse text-danger me-1"></i>
                      {v.pulseRate != null ? `${v.pulseRate} bpm` : "—"}
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="text-muted" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>SpO2</div>
                    <div className="fw-semibold" style={{ fontSize: 14 }}>
                      <i className="bi bi-lungs text-primary me-1"></i>
                      {v.spo2 != null ? `${v.spo2}%` : "—"}
                    </div>
                  </div>
                </div>
                <small className="text-muted">
                  <i className="bi bi-clock me-1"></i>
                  Recorded: {v.recordedAt ? new Date(v.recordedAt).toLocaleString() : "—"}
                </small>
              </div>
            ))}
          </div>
        )}
      </>
    ) : <p className="text-muted">No patient data.</p>}
  </Modal>
)}


      {/* Medical Notes Modal */}
      {notesModal && (
        <Modal title={`Medical Notes — ${notesModal.patient?.patientName}`} onClose={() => setNotesModal(null)} maxWidth={600}>
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: 13 }}>Add New Note</label>
            <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a medical note..." rows={3} className="form-control"
              style={{ resize: "vertical" }} />
            <button onClick={submitNote} disabled={noteLoading || !newNote.trim()}
              className="btn btn-primary btn-sm mt-2">
              {noteLoading ? "Saving..." : "Add Note"}
            </button>
          </div>
          <hr />
          {notesModal.notes === null ? (
            <div className="text-center text-muted py-3">Loading notes...</div>
          ) : notesModal.notes.length === 0 ? (
            <div className="text-center text-muted py-4">No notes yet for this patient.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {notesModal.notes.map((n) => (
                <div key={n.noteId} className="p-3 rounded-3 bg-body-secondary border-start border-primary border-3">
                  {editingNote?.noteId === n.noteId ? (
                    <>
                      <textarea value={editingNote.text}
                        onChange={(e) => setEditingNote((p) => ({ ...p, text: e.target.value }))}
                        rows={2} className="form-control form-control-sm mb-2" style={{ resize: "vertical" }} />
                      <div className="d-flex gap-2">
                        <button onClick={saveEditNote} disabled={noteLoading} className="btn btn-primary btn-sm">
                          {noteLoading ? "Saving..." : "Save"}
                        </button>
                        <button onClick={() => setEditingNote(null)} className="btn btn-sm btn-outline-secondary">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mb-2" style={{ fontSize: 13 }}>{n.note}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <small className="text-muted">
                          {n.doctorName} · {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                        </small>
                        <div className="d-flex gap-1">
                          <button onClick={() => setEditingNote({ noteId: n.noteId, text: n.note })}
                            className="btn btn-sm" style={{ background: "#eff6ff", color: "#3b82f6", border: "none", fontSize: 11 }}>
                            Edit
                          </button>
                          <button onClick={() => deleteNote(n.noteId)}
                            className="btn btn-sm btn-outline-danger" style={{ fontSize: 11 }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {/* Manage Appointment Modal */}
{apptModal && (
  <Modal title="Manage Appointment" onClose={() => setApptModal(null)}>

    {/* Appointment info card */}
    <div className="bg-body-secondary p-3 rounded-3 mb-4">
      <div className="fw-semibold mb-1">{apptModal.patient?.patientName}</div>
      <div className="text-muted" style={{ fontSize: 13 }}>
        <i className="bi bi-calendar3 me-2"></i>{apptModal.date}
        <i className="bi bi-clock ms-3 me-2"></i>{apptModal.time?.slice(0, 5)}
        <i className="bi bi-hourglass ms-3 me-2"></i>{apptModal.durationMinutes} min
      </div>
      <div className="mt-2"><StatusBadge status={apptModal.status} /></div>
    </div>

    {/* Past appointment warning */}
    {apptModal.date < today && (
      <div className="alert alert-warning py-2 mb-3" style={{ fontSize: 12 }}>
        <i className="bi bi-exclamation-triangle me-2"></i>
        Past appointment — only COMPLETED or CANCELLED are allowed.
      </div>
    )}

    {/* Status selector */}
    <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
      Update Status
    </label>
    <div className="d-flex gap-2 flex-wrap mb-3">
      {["COMPLETED", "CANCELLED", "RESCHEDULED"].map((s) => {
        const isPast     = apptModal.date < today;
        const isDisabled = isPast && s === "RESCHEDULED";
        return (
          <button key={s}
            onClick={() => { if (!isDisabled) setApptStatus(s); }}
            disabled={isDisabled}
            className={`btn btn-sm fw-semibold ${apptStatus === s ? "btn-primary" : "btn-outline-secondary"}`}
            style={{ borderRadius: 8, minWidth: 120, opacity: isDisabled ? 0.4 : 1 }}>
            {s === "COMPLETED"   && <><i className="bi bi-check-circle me-1"></i>Completed</>}
            {s === "CANCELLED"   && <><i className="bi bi-x-circle me-1"></i>Cancelled</>}
            {s === "RESCHEDULED" && <><i className="bi bi-arrow-repeat me-1"></i>Reschedule</>}
          </button>
        );
      })}
    </div>

    {/* New date/time - only for RESCHEDULED */}
    {apptStatus === "RESCHEDULED" && (
      <div className="bg-body-secondary p-3 rounded-3 mb-3">
        <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
          <i className="bi bi-calendar-event me-2 text-primary"></i>
          New Date & Time <span className="text-danger">*</span>
        </label>
        <div className="row g-2">
          <div className="col-6">
            <input
              type="date"
              className="form-control form-control-sm"
              min={today}
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
          </div>
          <div className="col-6">
            <input
              type="time"
              className="form-control form-control-sm"
              value={rescheduleTime}
              onChange={(e) => setRescheduleTime(e.target.value)}
            />
          </div>
        </div>
        <small className="text-muted mt-1 d-block">
          <i className="bi bi-info-circle me-1"></i>
          If this slot is taken you will be asked to pick a different time.
        </small>
      </div>
    )}

    {/* Reason — required for CANCELLED and RESCHEDULED */}
    {(apptStatus === "CANCELLED" || apptStatus === "RESCHEDULED") && (
      <div className="mb-4">
        <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
          <i className="bi bi-chat-left-text me-2 text-primary"></i>
          Reason <span className="text-danger">*</span>
        </label>
        <textarea
          className="form-control form-control-sm"
          rows={3}
          placeholder={
            apptStatus === "CANCELLED"
              ? "e.g. Doctor unavailable due to emergency..."
              : "e.g. Rescheduling due to prior commitment..."
          }
          value={apptReason}
          onChange={(e) => setApptReason(e.target.value)}
          style={{ resize: "vertical" }}
        />
        <small className="text-muted">
          Required. Receptionist will be notified with this reason to inform the patient.
        </small>
      </div>
    )}

    {/* Update button */}
    <button
      onClick={updateAppointment}
      disabled={
        apptUpdating ||
        !apptStatus ||
        ((apptStatus === "CANCELLED" || apptStatus === "RESCHEDULED") && !apptReason.trim()) ||
        (apptStatus === "RESCHEDULED" && (!rescheduleDate || !rescheduleTime))
      }
      className="btn btn-primary w-100">
      {apptUpdating
        ? <><span className="spinner-border spinner-border-sm me-2" />Updating...</>
        : <><i className="bi bi-check2-circle me-2"></i>Update Appointment</>}
    </button>

  </Modal>
)}
      <ToastContainer toasts={toasts} />

    </div>
  );
}
