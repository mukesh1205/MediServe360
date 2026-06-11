import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddAppointment() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctorname, setDoctorname] = useState("");
  const [patientname, setPatientname] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9002/api/patient/fetchAllPatients", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then(res => setPatients(res.data))
    .catch(() => toast.error("Failed to load patients"));

    axios.get("http://localhost:9002/api/doctor/getAll", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
    .then(res => setDoctors(res.data))
    .catch(() => toast.error("Failed to load doctors"));
  }, []);

  function handlePatientChange(event) {
    const selectedId = event.target.value;
    const selectedPatient = patients.find(p => String(p.patientId) === selectedId);
    setPatientId(selectedId);
    setPatientname(selectedPatient ? selectedPatient.patientName : "");
    localStorage.setItem("patientId", selectedId);
  }

  function handleDoctorChange(event) {
    const selectedId = event.target.value;
    const selectedDoctor = doctors.find(d => String(d.id) === selectedId);
    setDoctorId(selectedId);
    setDoctorname(selectedDoctor ? selectedDoctor.name : "");
    localStorage.setItem("doctorId", selectedId);
  }

  async function addnotificationHandler() {
    try {
      const url = "http://localhost:9002/notification/insertnotificationdata";
      const message = "Patient " + patientname + " is appointed to " + doctorname + " at " + time;
      const data = {
        patientID: parseInt(patientId),  
        doctorID: parseInt(doctorId),
        message: message,
        category: "APPOINTMENT",
        status: "UNREAD",
      };

      await axios.post(url, data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      toast.success("Notification added");
    } catch (err) {
      toast.error("Notification error: " + err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;
    if (!date || !time || !durationMinutes || !patientId || !doctorId) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:9002/api/appointment/add", {
        appointment: {
          date,
          time,
          durationMinutes: parseInt(durationMinutes),
          patient: { patientId: parseInt(patientId) },
          doctor: { id: parseInt(doctorId) }
        }
      }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });

      toast.success("Appointment created successfully");
      await addnotificationHandler();

      setDate("");
      setTime("");
      setDurationMinutes(30);
      setPatientId("");
      setDoctorId("");
      setPatientname("");
      setDoctorname("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating appointment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add Appointment</h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Date <span className="text-danger">*</span></label>
          <input
            className="form-control"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time <span className="text-danger">*</span></label>
          <input
            className="form-control"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (minutes) <span className="text-danger">*</span></label>
          <input
            className="form-control"
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            min="5"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Patient <span className="text-danger">*</span></label>
          <select
            className="form-select"
            value={patientId}
            onChange={handlePatientChange}  // FIX 2
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

        <div className="mb-3">
          <label className="form-label">Select Doctor <span className="text-danger">*</span></label>
          <select
            className="form-select"
            value={doctorId}
            onChange={handleDoctorChange}  // FIX 2
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

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? (
            <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</>
          ) : "Add Appointment"}
        </button>

      </form>
    </div>
  );
}