import axios from "axios";
import { useState } from "react";

export default function FindAppointment() {

    let [id, setId] = useState("");
    let [appointment, setAppointment] = useState(null);

    let findHandler = () => {

        if (!id) {
            alert("Enter Appointment ID");
            return;
        }

        let url = `http://localhost:9002/api/appointment/get/${id}`;

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                // ✅ Backend returns AppointmentResponseDTO with "appointment" field
                setAppointment(res.data.appointment);
            })
            .catch((err) => {
                console.error(err);
                alert("Appointment not found");
                setAppointment(null);
            });
    };

    return (
        <div>

            <h3>Find Appointment</h3>

            <input
                placeholder="Enter Appointment ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <button onClick={findHandler}>Search</button>

            <br /><br />

            {appointment && (
                <div>
                    <h4>Appointment Details</h4>

                    <p><strong>ID:</strong> {appointment.id}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                    <p><strong>Duration:</strong> {appointment.durationMinutes} mins</p>

                    <p>
                        <strong>Patient:</strong> {appointment.patient?.patientName} 
                        {" "}({appointment.patient?.patientGender}) – ID: {appointment.patient?.patientId}
                    </p>

                    <p>
                        <strong>Doctor:</strong> {appointment.doctor?.name} 
                        {" "}({appointment.doctor?.department}) – ID: {appointment.doctor?.id}
                    </p>
                </div>
            )}

        </div>
    );
}
