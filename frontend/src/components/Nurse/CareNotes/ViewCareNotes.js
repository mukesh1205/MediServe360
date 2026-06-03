// src/components/Nurse/CareNotes/ViewCareNotes.jsx
import { useState } from "react";
import axios from "axios";
import PatientSearch from "../PatientSearch";

export default function ViewCareNotes() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setError("");
        setNotes([]);
        fetchNotes(patient.patientId);
    };

    const fetchNotes = (patientId) => {
        setLoading(true);
        axios.get(`http://localhost:9002/api/care-notes/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setNotes(res.data))
        .catch(() => setError("Failed to fetch care notes."))
        .finally(() => setLoading(false));
    };

    return (
        <div>
            <h5 className="mb-4">📄 View Care Notes</h5>

            {/* Step 1 - Search Patient */}
            <div className="card mb-4">
                <div className="card-header fw-semibold" style={{ backgroundColor: "#e7f1ff" }}>
                    Step 1 — Search and select a patient
                </div>
                <div className="card-body">
                    <PatientSearch onSelect={handleSelectPatient} />
                </div>
            </div>

            {/* Selected Patient Badge */}
            {selectedPatient && (
                <div className="alert alert-success d-flex justify-content-between align-items-center mb-4">
                    <span>
                        ✅ Showing notes for: <strong>{selectedPatient.patientName}</strong>
                        &nbsp;(ID: {selectedPatient.patientId})
                    </span>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => { setSelectedPatient(null); setNotes([]); }}
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2 text-muted">Loading notes...</p>
                </div>
            )}

            {/* Error */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* No notes */}
            {selectedPatient && !loading && notes.length === 0 && !error && (
                <div className="alert alert-warning">
                    No care notes recorded yet for {selectedPatient.patientName}.
                </div>
            )}

            {/* Notes Cards */}
            {notes.length > 0 && (
                <div>
                    <h6 className="mb-3 text-muted">
                        {notes.length} note{notes.length > 1 ? "s" : ""} found for {selectedPatient.patientName}
                    </h6>
                    {notes.map((n, index) => (
                        <div className="card mb-3" key={n.noteId}>
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <span className="fw-semibold text-primary">Note #{notes.length - index}</span>
                                <small className="text-muted">
                                    🕐 {new Date(n.createdAt).toLocaleString()}
                                </small>
                            </div>
                            <div className="card-body">
                                <p className="mb-0" style={{ whiteSpace: "pre-wrap", lineHeight: "1.7" }}>
                                    {n.note}
                                </p>
                            </div>
                            <div className="card-footer text-muted" style={{ fontSize: "0.8rem" }}>
                                Recorded by Nurse ID: {n.nurseId}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}