import axios from "axios";
import { useState } from "react";
 
export default function UpdateAppointment() {
 
    let [id, setId] = useState("");
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [status, setStatus] = useState(""); // read-only
    let [durationMinutes, setDurationMinutes] = useState("");
    let [patientId, setPatientId] = useState("");
    let [doctorId, setDoctorId] = useState("");
 
    let fetchAppointment = () => {
        if (!id) {
            alert("Enter Appointment ID");
            return;
        }
 
        let url = `http://localhost:9002/api/appointments/get/${id}`;
 
        axios.get(url)
            .then((res) => {
                let appt = res.data.appointment;
                setDate(appt.date);
                setTime(appt.time);
                setStatus(appt.status); // just display
                setDurationMinutes(appt.durationMinutes);
                setPatientId(appt.patient?.patientId || "");
                setDoctorId(appt.doctor?.id || "");
            })
            .catch((err) => {
                console.error(err);
                alert("Appointment not found");
            });
    };
 
    let updateHandler = () => {
        if (!id || !date || !time || !durationMinutes || !patientId || !doctorId) {
            alert("Please fill all fields");
            return;
        }
 
        let url = "http://localhost:9002/api/appointments/update";
 
        let data = {
            "appointment": {
                "id": parseInt(id),
                "date": date,
                "time": time,
                "durationMinutes": parseInt(durationMinutes),
                "patient": { "patientId": parseInt(patientId) },
                "doctor": { "id": parseInt(doctorId) }
            }
        };
 
        axios.put(url, data)
            .then((res) => {
                alert(res.data.message);
                setId("");
                setDate("");
                setTime("");
                setStatus("");
                setDurationMinutes("");
                setPatientId("");
                setDoctorId("");
            })
            .catch((err) => {
                alert(err.response?.data?.message || "Error updating appointment");
            });
    };
 
    return (
        <div>
            <h2>Update Appointment</h2>
 
            <label>Appointment ID</label>
            <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Appointment ID"
            />
            <button onClick={fetchAppointment}>Load</button>
            <br /><br />
 
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <br />
 
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <br />
 
            <label>Duration (minutes)</label>
            <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
            <br />
 
            <label>Patient ID</label>
            <input value={patientId} onChange={(e) => setPatientId(e.target.value)} />
            <br />
 
            <label>Doctor ID</label>
            <input value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
            <br />
 
            <p><strong>Status:</strong> {status}</p> {/* read-only display */}
 
            <button onClick={updateHandler}>Update</button>
        </div>
    );
}