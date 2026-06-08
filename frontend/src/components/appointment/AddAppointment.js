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

  // Load dropdown data
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9002/api/patient/fetchAllPatients",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setPatients(res.data || []);
    } catch {
      toast.error("Unable to load patients. Please try again.");
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9002/api/doctor/getAll",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setDoctors(res.data || []);
    } catch {
      toast.error("Unable to load doctors. Please try again.");
    }
  };

  const validateDoctorAvailability = () => {
    const selectedDoctor = doctors.find(
      (doc) => doc.id === parseInt(doctorId)
    );

    if (!selectedDoctor) {
      toast.error("Invalid doctor selection");
      return false;
    }

    const schedule = selectedDoctor.availabilitySchedule;

    if (!schedule || !schedule.includes("-")) {
      toast.error("Doctor availability not configured");
      return false;
    }

    const [start, end] = schedule.split("-");

    const formattedTime = time.length === 5 ? time + ":00" : time;

    if (formattedTime < start || formattedTime > end) {
      toast.error(
        `Doctor is available only between ${start} and ${end}`
      );
      return false;
    }

    return true;
  };

  const buttonHandler = async () => {
    if (loading) return;

    //Basic validation
    if (!date || !time || !durationMinutes || !patientId || !doctorId) {
      toast.warning("All fields are required");
      return;
    }

    //Duration validation
    if (durationMinutes < 5) {
      toast.error("Minimum appointment duration is 5 minutes");
      return;
    }

    //Availability validation
    if (!validateDoctorAvailability()) return;

    setLoading(true);

    try {
      //Format time
      const formattedTime =
        time.length === 5 ? time + ":00" : time;

      const data = {
        appointment: {
          date: date,
          time: formattedTime,
          durationMinutes: parseInt(durationMinutes),
          status: "BOOKED",
          patient: { patientId: parseInt(patientId) },
          doctor: { id: parseInt(doctorId) }
        }
      };

      const res = await axios.post(
        "http://localhost:9002/api/appointment/add",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      //Success message
      const message =
        res.data?.message ||
        "Appointment created successfully";

      toast.success(message);

      //Reset form
      setDate("");
      setTime("");
      setDurationMinutes(30);
      setPatientId("");
      setDoctorId("");

    } catch (error) {
      console.log("ERROR:", error);

      let message =
        error.response?.data?.errorMessage ||
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to create appointment";

      if (typeof message === "object") {
        message = JSON.stringify(message);
      }

      toast.error(message);

    } finally {
      setLoading(false);
    }
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
            Duration (minutes)
            <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="number"
            value={durationMinutes}
            onChange={(e) =>
              setDurationMinutes(e.target.value)
            }
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
            {patients.map((p) => (
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
            {doctors.map((doc) => (
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















