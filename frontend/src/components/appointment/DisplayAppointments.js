import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DisplayAppointments() {
    let [appointments, setAppointments] = useState([]);

    useEffect(() => {
<<<<<<< HEAD
        let url = "http://localhost:9002/api/appointments/getAll";
        axios.get(url)
=======
        let url = "http://localhost:9002/api/appointment/getAll";

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
>>>>>>> 4a13951c1b65ad9c78169498f0ce149db738cb93
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                alert("Error fetching appointments: " + error.message);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>All Appointments</h2>

            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((a) => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.date}</td>
                            <td>{a.time}</td>
                            <td>{a.durationMinutes} mins</td>
                            <td>{a.status}</td>
                            <td>{a.patient?.patientName} (ID: {a.patient?.patientId})</td>
                            <td>{a.doctor?.name} ({a.doctor?.department})</td>
                            <td>
                                <Link className="btn btn-warning btn-sm" to={`/appointment/edit/${a.id}`}>Update</Link>
                            </td>
                            <td>
                                <Link className="btn btn-danger btn-sm" to={`/appointment/delete/${a.id}`}>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
