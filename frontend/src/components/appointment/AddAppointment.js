import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddAppointment() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);

  // ✅ Load dropdown data
  useEffect(() => {
    axios.get("http://localhost:9002/api/patient/fetchAllPatients", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => setPatients(res.data))
    .catch(() => toast.error("Failed to load patients"));

    axios.get("http://localhost:9002/api/doctor/getAll", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => setDoctors(res.data))
    .catch(() => toast.error("Failed to load doctors"));
  }, []);

  const buttonHandler = () => {
    if (loading) return;

    if (!date || !time || !durationMinutes || !patientId || !doctorId) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);

    const url = "http://localhost:9002/api/appointment/add";

    const data = {
      appointment: {
        date: date,
        time: time,
        durationMinutes: parseInt(durationMinutes),
        patient: { patientId: parseInt(patientId) },
        doctor: { id: parseInt(doctorId) }
      }
    };

    axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(() => {
      toast.success("Appointment created successfully");

      setDate("");
      setTime("");
      setDurationMinutes(30);
      setPatientId("");
      setDoctorId("");

      setLoading(false);
    })
    .catch((error) => {
      toast.error(error.response?.data?.message || "Error creating appointment");
      setLoading(false);
    });
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Add Appointment</h3>

      <form onSubmit={(e) => {
        e.preventDefault();
        buttonHandler();
      }}>

        {/* Date */}
        <div className="mb-3">
          <label className="form-label">
            Date <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        {/* Time */}
        <div className="mb-3">
          <label className="form-label">
            Time <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-3">
          <label className="form-label">
            Duration (minutes) <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            min="5"
            required
          />
        </div>

        {/* Patient */}
        <div className="mb-3">
          <label className="form-label">
            Select Patient <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          >
            <option value="">-- Select Patient --</option>
            {patients.map(p => (
              <option key={p.patientId} value={p.patientId}>
                {p.patientName} ({p.patientGender})
              </option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div className="mb-3">
          <label className="form-label">
            Select Doctor <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.department})
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Submitting...
            </>
          ) : (
            "Add Appointment"
          )}
        </button>

      </form>
    </div>
  );
}