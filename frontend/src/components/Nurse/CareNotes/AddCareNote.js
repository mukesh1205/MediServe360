// src/components/Nurse/CareNotes/AddCareNote.jsx
import { useState } from "react";
import axios from "axios";
import PatientSearch from "../PatientSearch";

export default function AddCareNote() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [note, setNote] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const nurseId = parseInt(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setSuccess("");
        setError("");
    };

    const handleSubmit = () => {
        if (!selectedPatient) {
            setError("Please select a patient first.");
            return;
        }
        if (!note.trim()) {
            setError("Please enter a care note.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            patientId: selectedPatient.patientId,
            nurseId: nurseId,
            note: note.trim()
        };

        axios.post("http://localhost:9002/api/care-notes/add", payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setSuccess(`Care note saved successfully for ${selectedPatient.patientName}!`);
            setNote("");
            setSelectedPatient(null);
        })
        .catch(() => setError("Failed to save care note. Please try again."))
        .finally(() => setLoading(false));
    };

    return (
        <div>
            <h5 className="mb-4">📝 Add Care Note</h5>

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
                        ✅ Selected: <strong>{selectedPatient.patientName}</strong>
                        &nbsp;(ID: {selectedPatient.patientId}, {selectedPatient.patientGender})
                    </span>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setSelectedPatient(null)}
                    >
                        Change
                    </button>
                </div>
            )}

            {/* Step 2 - Note Form */}
            <div className="card mb-4">
                <div className="card-header fw-semibold" style={{ backgroundColor: "#e7f1ff" }}>
                    Step 2 — Write care note
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Care Note</label>
                        <textarea
                            className="form-control"
                            rows={5}
                            placeholder="Enter care note here... (e.g. patient condition, observations, medications given)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <div className="form-text text-end">{note.length} characters</div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loading || !selectedPatient}
                    >
                        {loading ? "Saving..." : "Save Note"}
                    </button>
                </div>
            </div>

            {/* Feedback */}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}