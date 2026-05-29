import axios from "axios";
import { useState, useEffect } from "react";

export default function AddAppointment() {

    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [durationMinutes, setDurationMinutes] = useState(30);
    let [patientId, setPatientId] = useState("");
    let [doctorId, setDoctorId] = useState("");

    let [doctors, setDoctors] = useState([]);
    let [patients, setPatients] = useState([]);

    // ✅ Fetch doctors for dropdown
    useEffect(() => {
        axios.get("http://localhost:9002/api/doctor/getAll",{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => setDoctors(res.data))
            .catch(() => alert("Failed to load doctors"));

        axios.get("http://localhost:9002/api/patient/fetchAllPatients",{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => setPatients(res.data))
            .catch(() => alert("Failed to load patients"));
    }, []);

    let saveHandler = () => {
        if (!date || !time || !durationMinutes || !patientId || !doctorId) {
            alert("Please fill all fields");
            return;
        }

        let url = "http://localhost:9002/api/appointment/add";

        let data = {
            "appointment": {
                "date": date,
                "time": time,
                "durationMinutes": parseInt(durationMinutes),
                "patient": { "patientId": parseInt(patientId) }, // ✅ patientId
                "doctor": { "id": parseInt(doctorId) }           // ✅ id
            }
        };

        axios.post(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((response) => {
                alert(response.data.message);
                setDate("");
                setTime("");
                setDurationMinutes(30);
                setPatientId("");
                setDoctorId("");
            })
            .catch((error) => {
                alert(error.response?.data?.message || "Error creating appointment");
            });
    };

    return (
        <div>
            <h2>Add Appointment</h2>

            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <br />

            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <br />

            <label>Duration (minutes)</label>
            <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
            <br />

            <label>Select Patient</label>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                <option value="">-- Select Patient --</option>
                {patients.map((p) => (
                    <option key={p.patientId} value={p.patientId}>
                        {p.patientName} ({p.patientGender})
                    </option>
                ))}
            </select>
            <br />

            <label>Select Doctor</label>
            <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                <option value="">-- Select Doctor --</option>
                {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.department})
                    </option>
                ))}
            </select>
            <br />

            <button onClick={saveHandler}>Save Appointment</button>
        </div>
    );
}
