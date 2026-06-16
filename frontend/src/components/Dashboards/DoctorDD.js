import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../common/TopNavbar";

const BASE = "http://localhost:9002";

// Status config
const STATUS = {
  COMPLETED:   { badge: "bg-success",          dot: "#10b981" },
  BOOKED:      { badge: "bg-primary",           dot: "#3b82f6" },
  PENDING:     { badge: "bg-warning text-dark", dot: "#f59e0b" },
  RESCHEDULED: { badge: "bg-info text-dark",    dot: "#6366f1" },
  CANCELLED:   { badge: "bg-danger",            dot: "#ef4444" },
};

//Reusable UI pieces

function Badge({ status }) {
  return (
    <span className={`badge ${STATUS[status]?.badge || "bg-secondary"}`}
      style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>
      {status}
    </span>
  );
}

function Field({ label, value }) {
  return (
    <div className="bg-body-secondary rounded-3 p-3">
      <p className="text-muted mb-1" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
      <p className="fw-medium mb-0" style={{ fontSize: 14 }}>{value ?? "—"}</p>
    </div>
  );
}

function Dialog({ title, onClose, children, wide = false }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="bg-body rounded-4 shadow-lg w-100" style={{ maxWidth: wide ? 640 : 560, maxHeight: "88vh", overflowY: "auto" }}>
        <div className="bg-body d-flex align-items-center justify-content-between px-4 py-3 border-bottom sticky-top">
          <h6 className="fw-bold mb-0">{title}</h6>
          <button onClick={onClose} className="btn-close" />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function Toast({ toasts }) {
  const style = {
    success: { icon: "bi-check-circle-fill", color: "#10b981", bg: "#d1fae5" },
    error:   { icon: "bi-x-circle-fill",     color: "#ef4444", bg: "#fee2e2" },
    info:    { icon: "bi-info-circle-fill",   color: "#3b82f6", bg: "#dbeafe" },
  };
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => {
        const s = style[t.type] || style.info;
        return (
          <div key={t.id} style={{ background: s.bg, borderRadius: 10, padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 10, minWidth: 260, maxWidth: 340,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)", animation: "toastIn 0.2s ease" }}>
            <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: 15, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{t.message}</span>
          </div>
        );
      })}
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateX(16px) } to { opacity:1; transform:translateX(0) } }`}</style>
    </div>
  );
}

//Main dashboard

export default function DoctorDD() {
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");
  const email    = localStorage.getItem("email");
  const headers  = { Authorization: "Bearer " + token };

  // Core data
  const [doctor,       setDoctor]       = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(true);

  // Table UI
  const [tab,          setTab]          = useState("all");
  const [filterName,   setFilterName]   = useState("");
  const [filterDate,   setFilterDate]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Modals
  const [profileModal, setProfileModal] = useState(false);
  const [editModal,    setEditModal]    = useState(false);
  const [recordModal,  setRecordModal]  = useState(null); // holds appointment
  const [notesModal,   setNotesModal]   = useState(null); // holds { patient, notes }
  const [manageModal,  setManageModal]  = useState(null); // holds appointment

  // Profile edit
  const [editForm,   setEditForm]   = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError,  setEditError]  = useState("");

  // Notes
  const [newNote,     setNewNote]     = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [noteBusy,    setNoteBusy]    = useState(false);

  // Manage appointment
  const [newStatus,   setNewStatus]   = useState("");
  const [reason,      setReason]      = useState("");
  const [reDate,      setReDate]      = useState("");
  const [reTime,      setReTime]      = useState("");
  const [saving,      setSaving]      = useState(false);

  // Vitals
  const [vitals, setVitals] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);
  function toast(message, type = "success") {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }

  //Load doctor + appointments
  useEffect(() => {
    if (!email) { setLoading(false); return; }
    axios.get(`${BASE}/api/doctor/by-email?email=${encodeURIComponent(email)}`, { headers })
      .then(res => {
        const d = res.data;
        if (!d.department || !d.availabilitySchedule) {
          navigate("/complete-profile");
          return;
        }
        setDoctor(d);
        setEditForm({ id: d.id, name: d.name || "", department: d.department || "",
          availabilitySchedule: d.availabilitySchedule || "", email: d.email || "" });
        return axios.get(`${BASE}/api/appointment/doctor/${d.id}`, { headers });
      })
      .then(res => { if (res) setAppointments(res.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Computed lists
  const today    = new Date().toISOString().split("T")[0];
  const todayList    = appointments.filter(a => a.date === today);
  const upcomingList = appointments.filter(a => a.date > today).sort((a, b) => a.date.localeCompare(b.date));
  const reschedList  = appointments.filter(a => a.status === "RESCHEDULED");
  const completedList = appointments.filter(a => a.status === "COMPLETED");
  const breakdown    = appointments.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {});

  const tabMap  = { today: todayList, upcoming: upcomingList, rescheduled: reschedList, all: appointments };
  const rows    = (tabMap[tab] || []).filter(a =>
    (!filterName   || a.patient?.patientName?.toLowerCase().includes(filterName.toLowerCase())) &&
    (!filterDate   || a.date === filterDate) &&
    (!filterStatus || a.status === filterStatus));

  //Notes actions
  function loadNotes(appt) {
    setNotesModal({ patient: appt.patient, notes: null });
    setNewNote(""); setEditingNote(null);
    axios.get(`${BASE}/api/medical-notes/patient/${appt.patient.patientId}`, { headers })
      .then(res => setNotesModal(p => ({ ...p, notes: res.data })))
      .catch(() => setNotesModal(p => ({ ...p, notes: [] })));
  }
  function refreshNotes(pid) {
    axios.get(`${BASE}/api/medical-notes/patient/${pid}`, { headers })
      .then(res => setNotesModal(p => ({ ...p, notes: res.data }))).catch(console.error);
  }
  function addNote() {
    if (!newNote.trim() || !doctor) return;
    setNoteBusy(true);
    axios.post(`${BASE}/api/medical-notes/add`,
      { patientId: notesModal.patient.patientId, doctorId: doctor.id, note: newNote.trim() }, { headers })
      .then(() => { refreshNotes(notesModal.patient.patientId); setNewNote(""); toast("Note saved"); })
      .catch(() => toast("Could not save note", "error"))
      .finally(() => setNoteBusy(false));
  }
  function updateNote() {
    if (!editingNote?.text?.trim()) return;
    setNoteBusy(true);
    axios.put(`${BASE}/api/medical-notes/update/${editingNote.noteId}`,
      { note: editingNote.text.trim() }, { headers })
      .then(() => { refreshNotes(notesModal.patient.patientId); setEditingNote(null); toast("Note updated"); })
      .catch(() => toast("Could not update note", "error"))
      .finally(() => setNoteBusy(false));
  }
  function removeNote(noteId) {
    if (!window.confirm("Delete this note?")) return;
    axios.delete(`${BASE}/api/medical-notes/delete/${noteId}`, { headers })
      .then(() => { refreshNotes(notesModal.patient.patientId); toast("Note deleted", "info"); })
      .catch(() => toast("Could not delete note", "error"));
  }

  //Open manage modal
  function openManage(appt) {
    setManageModal(appt);
    setNewStatus(appt.status);
    setReason("");
    setReDate(appt.date);
    setReTime(appt.time?.slice(0, 5) ?? "");
  }

  //Save appointment status
  function saveStatus() {
    if (!manageModal) return;
    setSaving(true);
    const payload = {
      ...manageModal, status: newStatus, reason: reason || null,
      date: newStatus === "RESCHEDULED" ? reDate : manageModal.date,
      time: newStatus === "RESCHEDULED" ? reTime + ":00" : manageModal.time,
    };
    axios.put(`${BASE}/api/appointment/update`, { appointment: payload }, { headers })
      .then(res => {
        const updated = res.data.appointment;
        setAppointments(p => p.map(a => a.id === updated.id ? updated : a));
        setManageModal(null);
        toast(`Marked as ${updated.status}`);
      })
      .catch(err => toast(err.response?.data?.message || "Update failed", "error"))
      .finally(() => setSaving(false));
  }

  //Save profile
  function saveProfile() {
    setEditSaving(true); setEditError("");
    axios.put(`${BASE}/api/doctor/update`, { doctor: editForm }, { headers })
      .then(res => { setDoctor(res.data.doctor ?? res.data); setEditModal(false); toast("Profile saved"); })
      .catch(err => { setEditError(err.response?.data?.message || "Save failed"); toast("Save failed", "error"); })
      .finally(() => setEditSaving(false));
  }

  //Open patient record + vitals
  function openRecord(appt) {
    setRecordModal(appt); setVitals(null);
    axios.get(`${BASE}/api/vitals/patient/${appt.patient.patientId}`, { headers })
      .then(res => setVitals(res.data || [])).catch(() => setVitals([]));
  }

  if (loading) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center flex-column gap-3">
      <div className="spinner-border text-primary" />
      <p className="text-muted mb-0">Loading your dashboard…</p>
    </div>
  );

  return (
    <div className="min-vh-100 bg-body-tertiary">
      <TopNavbar onMyProfile={() => setProfileModal(true)} onEditProfile={() => setEditModal(true)} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>

        {/* ── Banner ── */}
        <div className="rounded-4 p-4 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
          style={{ background: "linear-gradient(135deg,#1e3a5f,#0f172a)" }}>
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
              style={{ width: 52, height: 52, background: "#3b82f6", fontSize: 22, flexShrink: 0 }}>
              {doctor?.name?.charAt(0) ?? "D"}
            </div>
            <div>
              <p className="fw-bold text-white mb-0" style={{ fontSize: 19 }}>{doctor?.name}</p>
              <p className="mb-0" style={{ color: "#94a3b8", fontSize: 13 }}>{doctor?.department}</p>
              <p className="mb-0" style={{ color: "#64748b", fontSize: 12 }}>
                <i className="bi bi-clock me-1" />{doctor?.availabilitySchedule}
              </p>
            </div>
          </div>
          <div className="d-flex gap-4">
            {[["Today", todayList.length, "#60a5fa"], ["Total", appointments.length, "#fff"], ["Done", completedList.length, "#34d399"]].map(([l, v, c]) => (
              <div key={l} className="text-center">
                <p style={{ color: "#94a3b8", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{l}</p>
                <p style={{ color: c, fontWeight: 700, fontSize: 26, margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── KPI cards ── */}
        <div className="row g-3 mb-4">
          {[["Total", appointments.length, "#3b82f6"], ["Today", todayList.length, "#10b981"],
            ["Upcoming", upcomingList.length, "#8b5cf6"], ["Rescheduled", reschedList.length, "#f59e0b"],
            ["Completed", completedList.length, "#06b6d4"]].map(([l, v, c]) => (
            <div key={l} className="col">
              <div className="card border-0 shadow-sm h-100" style={{ borderTop: `3px solid ${c}`, borderRadius: 12 }}>
                <div className="card-body">
                  <p className="text-muted mb-1" style={{ fontSize: 12 }}>{l}</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: c, margin: 0 }}>{v}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Status breakdown ── */}
        {Object.keys(breakdown).length > 0 && (
          <div className="card border-0 shadow-sm mb-4 rounded-3">
            <div className="card-body">
              <p className="fw-semibold mb-3" style={{ fontSize: 13 }}>Appointments by status</p>
              <div className="d-flex gap-2 flex-wrap">
                {Object.entries(breakdown).map(([s, n]) => (
                  <div key={s} className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-body-secondary">
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS[s]?.dot || "#9ca3af", flexShrink: 0 }} />
                    <span className="fw-semibold" style={{ fontSize: 12 }}>{s}</span>
                    <span className="fw-bold" style={{ fontSize: 17, color: STATUS[s]?.dot || "#9ca3af" }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Appointments table ── */}
        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">

          {/* Tabs */}
          <div className="d-flex border-bottom px-3" style={{ overflowX: "auto" }}>
            {[["today", `Today (${todayList.length})`], ["upcoming", `Upcoming (${upcomingList.length})`],
              ["rescheduled", `Rescheduled (${reschedList.length})`], ["all", `All (${appointments.length})`]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className="btn btn-link text-decoration-none fw-semibold px-3 py-3"
                style={{ fontSize: 13, whiteSpace: "nowrap", borderRadius: 0,
                  color: tab === k ? "#3b82f6" : "#6c757d",
                  borderBottom: tab === k ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -1 }}>
                {l}
                {k === "rescheduled" && reschedList.length > 0 &&
                  <span className="badge bg-warning text-dark ms-1" style={{ fontSize: 10 }}>!</span>}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="d-flex gap-2 px-3 py-3 border-bottom flex-wrap align-items-center">
            <div className="input-group input-group-sm" style={{ maxWidth: 220 }}>
              <span className="input-group-text"><i className="bi bi-search text-muted" /></span>
              <input className="form-control" placeholder="Patient name…"
                value={filterName} onChange={e => setFilterName(e.target.value)} />
            </div>
            <div className="input-group input-group-sm" style={{ maxWidth: 180 }}>
              <span className="input-group-text"><i className="bi bi-calendar3 text-muted" /></span>
              <input type="date" className="form-control" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
            </div>
            <select className="form-select form-select-sm" style={{ maxWidth: 160 }}
              value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All statuses</option>
              {["BOOKED","COMPLETED","RESCHEDULED","PENDING","CANCELLED"].map(s => <option key={s}>{s}</option>)}
            </select>
            {(filterName || filterDate || filterStatus) &&
              <button className="btn btn-sm btn-outline-danger"
                onClick={() => { setFilterName(""); setFilterDate(""); setFilterStatus(""); }}>Clear</button>}
          </div>

          {/* Table */}
          <div className="p-3">
            {rows.length === 0 ? (
              <p className="text-center text-muted py-5 mb-0">
                {filterName || filterDate || filterStatus ? "No appointments match your filters." : "No appointments yet."}
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
                  <thead className="table-light">
                    <tr>
                      {["#", "Patient", "Date", "Time", "Duration", "Status", "Actions"].map(h => (
                        <th key={h} className="text-muted fw-semibold border-0"
                          style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(a => (
                      <tr key={a.id}>
                        <td><span className="badge bg-secondary-subtle text-secondary">{a.id}</span></td>
                        <td className="fw-semibold">{a.patient?.patientName ?? "—"}</td>
                        <td className="text-muted">
                          {a.date === today
                            ? <span className="text-success fw-semibold">Today</span>
                            : a.date}
                        </td>
                        <td className="text-muted">{a.time?.slice(0, 5) ?? "—"}</td>
                        <td className="text-muted">{a.durationMinutes} min</td>
                        <td><Badge status={a.status} /></td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-sm btn-outline-primary" style={{ fontSize: 12 }}
                              onClick={() => openRecord(a)}>
                              <i className="bi bi-person me-1" />Record
                            </button>
                            <button className="btn btn-sm btn-outline-success" style={{ fontSize: 12 }}
                              onClick={() => loadNotes(a)}>
                              <i className="bi bi-journal-text me-1" />Notes
                            </button>
                            <button className="btn btn-sm btn-outline-warning" style={{ fontSize: 12 }}
                              onClick={() => openManage(a)}>
                              <i className="bi bi-gear me-1" />Manage
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

      {/*MODALS*/}

      {/* Profile view */}
      {profileModal && (
        <Dialog title="My Profile" onClose={() => setProfileModal(false)}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
              style={{ width: 60, height: 60, background: "#3b82f6", fontSize: 24, flexShrink: 0 }}>
              {doctor?.name?.charAt(0)}
            </div>
            <div>
              <p className="fw-bold mb-0" style={{ fontSize: 18 }}>{doctor?.name}</p>
              <p className="text-muted mb-1" style={{ fontSize: 13 }}>{doctor?.department}</p>
              <span className="badge bg-primary-subtle text-primary" style={{ fontSize: 11 }}>DOCTOR</span>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-6"><Field label="Name"         value={doctor?.name} /></div>
            <div className="col-6"><Field label="Department"   value={doctor?.department} /></div>
            <div className="col-6"><Field label="Availability" value={doctor?.availabilitySchedule} /></div>
            <div className="col-6"><Field label="Email"        value={doctor?.email} /></div>
          </div>
          <button className="btn btn-primary w-100 mt-4"
            onClick={() => { setProfileModal(false); setEditModal(true); }}>
            <i className="bi bi-pencil me-2" />Edit profile
          </button>
        </Dialog>
      )}

      {/* Profile edit */}
      {editModal && (
        <Dialog title="Edit Profile" onClose={() => setEditModal(false)}>
          {editError && <div className="alert alert-danger py-2 mb-3" style={{ fontSize: 13 }}>{editError}</div>}
          <div className="d-flex flex-column gap-3">
            {[["Full name", "name", "text", "Dr. Jane Smith"],
              ["Department", "department", "text", "e.g. Cardiology"],
              ["Working hours", "availabilitySchedule", "text", "e.g. 09:00-17:00"],
              ["Email", "email", "email", "doctor@hospital.com"]].map(([l, f, t, ph]) => (
              <div key={f}>
                <label className="form-label fw-semibold" style={{ fontSize: 13 }}>{l}</label>
                <input type={t} className="form-control" placeholder={ph} value={editForm[f] || ""}
                  onChange={e => setEditForm(p => ({ ...p, [f]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div className="d-flex gap-2 mt-4">
            <button className="btn btn-outline-secondary flex-fill" onClick={() => setEditModal(false)}>Cancel</button>
            <button className="btn btn-primary flex-fill" onClick={saveProfile} disabled={editSaving}>
              {editSaving ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</> : "Save changes"}
            </button>
          </div>
        </Dialog>
      )}

      {/* Patient record + vitals */}
      {recordModal && (
        <Dialog title="Patient Record" onClose={() => setRecordModal(null)} wide>
          {recordModal.patient ? (
            <>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: 48, height: 48, background: "#dbeafe", color: "#3b82f6", fontSize: 18, flexShrink: 0 }}>
                  {recordModal.patient.patientName?.charAt(0)}
                </div>
                <div>
                  <p className="fw-bold mb-0" style={{ fontSize: 17 }}>{recordModal.patient.patientName}</p>
                  <p className="text-muted mb-0" style={{ fontSize: 13 }}>Patient #{recordModal.patient.patientId}</p>
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6"><Field label="Date of birth"    value={recordModal.patient.patientDOB} /></div>
                <div className="col-6"><Field label="Gender"           value={recordModal.patient.patientGender} /></div>
                <div className="col-6"><Field label="Phone"            value={recordModal.patient.patientPhoneNumber} /></div>
                <div className="col-6"><Field label="Status"           value={recordModal.patient.patientStatus} /></div>
                <div className="col-12"><Field label="Medical history" value={recordModal.patient.patientMedicalHistory || "None recorded"} /></div>
              </div>
              <div className="bg-body-secondary rounded-3 p-3 mb-4">
                <p className="text-muted mb-1" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Appointment</p>
                <p className="mb-0" style={{ fontSize: 13 }}>
                  {recordModal.date} · {recordModal.time?.slice(0, 5)} · {recordModal.durationMinutes} min
                </p>
              </div>

              {/* Vitals */}
              <p className="fw-semibold mb-3" style={{ fontSize: 14 }}>
                <i className="bi bi-heart-pulse text-danger me-2" />Patient Vitals
              </p>
              {vitals === null ? (
                <p className="text-muted text-center py-3">
                  <span className="spinner-border spinner-border-sm me-2" />Loading vitals…
                </p>
              ) : vitals.length === 0 ? (
                <div className="text-center text-muted bg-body-secondary rounded-3 py-4">
                  <i className="bi bi-clipboard-x d-block fs-3 mb-2" />
                  No vitals recorded yet
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {vitals.map(v => (
                    <div key={v.vitalId} className="p-3 rounded-3 bg-body-secondary border-start border-danger border-3">
                      <div className="row g-2 mb-2">
                        {[["Blood pressure", v.bloodPressure, "bi-droplet-fill text-danger"],
                          ["Temperature", v.temperature != null ? `${v.temperature} °C` : null, "bi-thermometer-half text-warning"],
                          ["Pulse rate", v.pulseRate != null ? `${v.pulseRate} bpm` : null, "bi-heart-pulse text-danger"],
                          ["SpO2", v.spo2 != null ? `${v.spo2}%` : null, "bi-lungs text-primary"]].map(([l, val, ic]) => (
                          <div key={l} className="col-6 col-md-3">
                            <p className="text-muted mb-1" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</p>
                            <p className="fw-semibold mb-0" style={{ fontSize: 14 }}>
                              <i className={`bi ${ic} me-1`} />{val ?? "—"}
                            </p>
                          </div>
                        ))}
                      </div>
                      <small className="text-muted">
                        <i className="bi bi-clock me-1" />
                        {v.recordedAt ? new Date(v.recordedAt).toLocaleString() : "—"}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-muted">No patient data.</p>}
        </Dialog>
      )}

      {/* Medical notes */}
      {notesModal && (
        <Dialog title={`Notes — ${notesModal.patient?.patientName}`} onClose={() => setNotesModal(null)} wide>
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: 13 }}>Add a note</label>
            <textarea className="form-control" rows={3} placeholder="Write your clinical note here…"
              value={newNote} onChange={e => setNewNote(e.target.value)} style={{ resize: "vertical" }} />
            <button className="btn btn-primary btn-sm mt-2" onClick={addNote}
              disabled={noteBusy || !newNote.trim()}>
              {noteBusy ? "Saving…" : "Save note"}
            </button>
          </div>
          <hr />
          {notesModal.notes === null ? (
            <p className="text-center text-muted py-3">Loading…</p>
          ) : notesModal.notes.length === 0 ? (
            <p className="text-center text-muted py-4">No notes yet for this patient.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {notesModal.notes.map(n => (
                <div key={n.noteId} className="p-3 rounded-3 bg-body-secondary border-start border-primary border-3">
                  {editingNote?.noteId === n.noteId ? (
                    <>
                      <textarea className="form-control form-control-sm mb-2" rows={2} style={{ resize: "vertical" }}
                        value={editingNote.text}
                        onChange={e => setEditingNote(p => ({ ...p, text: e.target.value }))} />
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={updateNote} disabled={noteBusy}>
                          {noteBusy ? "Saving…" : "Save"}
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingNote(null)}>Cancel</button>
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
                          <button className="btn btn-sm btn-outline-primary" style={{ fontSize: 11 }}
                            onClick={() => setEditingNote({ noteId: n.noteId, text: n.note })}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" style={{ fontSize: 11 }}
                            onClick={() => removeNote(n.noteId)}>Delete</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </Dialog>
      )}

      {/* Manage appointment */}
      {manageModal && (
        <Dialog title="Update Appointment" onClose={() => setManageModal(null)}>
          {/* Appointment summary */}
          <div className="bg-body-secondary rounded-3 p-3 mb-4">
            <p className="fw-semibold mb-1">{manageModal.patient?.patientName}</p>
            <p className="text-muted mb-2" style={{ fontSize: 13 }}>
              <i className="bi bi-calendar3 me-2" />{manageModal.date}
              <i className="bi bi-clock ms-3 me-2" />{manageModal.time?.slice(0, 5)}
              <i className="bi bi-hourglass ms-3 me-2" />{manageModal.durationMinutes} min
            </p>
            <Badge status={manageModal.status} />
          </div>

          {/* Past appointment warning */}
          {manageModal.date < today && (
            <div className="alert alert-warning py-2 mb-3" style={{ fontSize: 12 }}>
              <i className="bi bi-exclamation-triangle me-2" />
              Past appointment — only Completed or Cancelled are allowed.
            </div>
          )}

          {/* Status picker */}
          <label className="form-label fw-semibold" style={{ fontSize: 13 }}>Change status to</label>
          <div className="d-flex gap-2 flex-wrap mb-3">
            {["COMPLETED", "CANCELLED", "RESCHEDULED"].map(s => {
              const disabled = manageModal.date < today && s === "RESCHEDULED";
              return (
                <button key={s} disabled={disabled}
                  onClick={() => { if (!disabled) setNewStatus(s); }}
                  className={`btn btn-sm fw-semibold ${newStatus === s ? "btn-primary" : "btn-outline-secondary"}`}
                  style={{ borderRadius: 8, minWidth: 120, opacity: disabled ? 0.4 : 1 }}>
                  <i className={`bi me-1 ${s === "COMPLETED" ? "bi-check-circle" : s === "CANCELLED" ? "bi-x-circle" : "bi-arrow-repeat"}`} />
                  {s === "RESCHEDULED" ? "Reschedule" : s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>

          {/* New date/time for reschedule */}
          {newStatus === "RESCHEDULED" && (
            <div className="bg-body-secondary rounded-3 p-3 mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                <i className="bi bi-calendar-event me-2 text-primary" />New date & time
                <span className="text-danger ms-1">*</span>
              </label>
              <div className="row g-2">
                <div className="col-6">
                  <input type="date" className="form-control form-control-sm"
                    min={today} value={reDate} onChange={e => setReDate(e.target.value)} />
                </div>
                <div className="col-6">
                  <input type="time" className="form-control form-control-sm"
                    value={reTime} onChange={e => setReTime(e.target.value)} />
                </div>
              </div>
              <small className="text-muted d-block mt-1">
                <i className="bi bi-info-circle me-1" />If this slot is taken you'll be asked to pick another.
              </small>
            </div>
          )}

          {/* Reason field */}
          {(newStatus === "CANCELLED" || newStatus === "RESCHEDULED") && (
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ fontSize: 13 }}>
                <i className="bi bi-chat-left-text me-2 text-primary" />Reason
                <span className="text-danger ms-1">*</span>
              </label>
              <textarea className="form-control form-control-sm" rows={3}
                placeholder={newStatus === "CANCELLED"
                  ? "e.g. Doctor unavailable due to emergency…"
                  : "e.g. Rescheduling due to prior commitment…"}
                value={reason} onChange={e => setReason(e.target.value)} style={{ resize: "vertical" }} />
              <small className="text-muted">Receptionist will be notified with this reason.</small>
            </div>
          )}

          {/* Save button */}
          <button className="btn btn-primary w-100" onClick={saveStatus}
            disabled={saving || !newStatus
              || ((newStatus === "CANCELLED" || newStatus === "RESCHEDULED") && !reason.trim())
              || (newStatus === "RESCHEDULED" && (!reDate || !reTime))}>
            {saving
              ? <><span className="spinner-border spinner-border-sm me-2" />Updating…</>
              : <><i className="bi bi-check2-circle me-2" />Confirm update</>}
          </button>
        </Dialog>
      )}

      <Toast toasts={toasts} />
    </div>
  );
}









