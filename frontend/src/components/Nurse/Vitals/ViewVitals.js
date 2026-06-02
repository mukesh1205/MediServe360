// src/components/Nurse/Vitals/ViewVitals.jsx
import { useState } from "react";
import axios from "axios";
import PatientSearch from "../PatientSearch";

export default function ViewVitals() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [vitals, setVitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setError("");
        setVitals([]);
        fetchVitals(patient.patientId);
    };

    const fetchVitals = (patientId) => {
        setLoading(true);
        axios.get(`http://localhost:9002/api/vitals/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setVitals(res.data))
        .catch(() => setError("Failed to fetch vitals."))
        .finally(() => setLoading(false));
    };

    return (
        <div>
            <h5 className="mb-4">📋 View Patient Vitals</h5>

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
                        ✅ Showing vitals for: <strong>{selectedPatient.patientName}</strong>
                        &nbsp;(ID: {selectedPatient.patientId})
                    </span>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => { setSelectedPatient(null); setVitals([]); }}
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2 text-muted">Loading vitals...</p>
                </div>
            )}

            {/* Error */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* No vitals */}
            {selectedPatient && !loading && vitals.length === 0 && !error && (
                <div className="alert alert-warning">
                    No vitals recorded yet for {selectedPatient.patientName}.
                </div>
            )}

            {/* Vitals Table */}
            {vitals.length > 0 && (
                <div className="card">
                    <div className="card-header fw-semibold" style={{ backgroundColor: "#e7f1ff" }}>
                        Vitals History — {selectedPatient.patientName}
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Blood Pressure</th>
                                    <th>Temperature (°C)</th>
                                    <th>Pulse Rate (bpm)</th>
                                    <th>SpO₂ (%)</th>
                                    <th>Recorded At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vitals.map((v, index) => (
                                    <tr key={v.vitalId}>
                                        <td>{index + 1}</td>
                                        <td>{v.bloodPressure ?? "—"}</td>
                                        <td>{v.temperature ?? "—"}</td>
                                        <td>{v.pulseRate ?? "—"}</td>
                                        <td>{v.spo2 ?? "—"}</td>
                                        <td>{new Date(v.recordedAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}