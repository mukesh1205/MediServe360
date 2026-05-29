import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function UpdateAppointment() {
    const { aid } = useParams();   // ✅ get ID from URL
    const navigate = useNavigate();

    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [status, setStatus] = useState("");
    let [durationMinutes, setDurationMinutes] = useState("");
    let [patientId, setPatientId] = useState("");
    let [doctorId, setDoctorId] = useState("");

    // ✅ Load appointment automatically
    useEffect(() => {
        axios.get(`http://localhost:9002/api/appointments/get/${aid}`)
            .then((res) => {
                let appt = res.data.appointment;
                setDate(appt.date);
                setTime(appt.time);
                setStatus(appt.status);
                setDurationMinutes(appt.durationMinutes);
                setPatientId(appt.patient?.patientId || "");
                setDoctorId(appt.doctor?.id || "");
            })
            .catch(() => alert("Appointment not found"));
    }, [aid]);

    let updateHandler = () => {
        let url = "http://localhost:9002/api/appointments/update";
        let data = {
            appointment: {
                id: parseInt(aid),
                date,
                time,
                durationMinutes: parseInt(durationMinutes),
                patient: { patientId: parseInt(patientId) },
                doctor: { id: parseInt(doctorId) }
            }
        };

        axios.put(url, data)
            .then((res) => {
                alert(res.data.message);
                navigate("/appointment/display"); // back to list
            })
            .catch((err) => {
                alert(err.response?.data?.message || "Error updating appointment");
            });
    };

    return (
        <div>
            <h2>Edit Appointment {aid}</h2>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} /><br />
            <label>Duration (minutes)</label>
            <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} /><br />
            <label>Patient ID</label>
            <input value={patientId} onChange={(e) => setPatientId(e.target.value)} /><br />
            <label>Doctor ID</label>
            <input value={doctorId} onChange={(e) => setDoctorId(e.target.value)} /><br />
            <p><strong>Status:</strong> {status}</p>
            <button onClick={updateHandler}>Update</button>
        </div>
    );
}
