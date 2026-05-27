import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DisplayAppointments() {

    let [appointments, setAppointments] = useState([]);

    useEffect(() => {
        let url = "http://localhost:9002/api/appointments/getAll";

        axios.get(url)
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching appointments", error);
            });

    }, []);   // ✅ IMPORTANT: run only once (fixed infinite loop issue)

    return (
        <div>

            <h2>Appointments List</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Patient ID</th>
                        <th>Doctor</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        appointments.map((a) => {
                            return (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.date}</td>
                                    <td>{a.time}</td>
                                    <td>{a.durationMinutes}</td>
                                    <td>{a.status}</td>
                                    <td>{a.patient?.patientId}</td>
                                    <td>{a.doctor?.name}</td>

                                    <td>
                                        <Link to={`/appointment/delete/${a.id}`}>
                                            Delete
                                        </Link>
                                    </td>

                                    <td>
                                        <Link to={`/appointment/edit/${a.id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}