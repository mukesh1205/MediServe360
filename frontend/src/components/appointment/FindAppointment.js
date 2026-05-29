// import axios from "axios";
// import { useState } from "react";

// export default function FindAppointment() {

//     let [id, setId] = useState("");
//     let [appointment, setAppointment] = useState(null);

//     let findHandler = () => {

//         if (!id) {
//             alert("Enter Appointment ID");
//             return;
//         }

//         let url = `http://localhost:9002/api/appointments/get/${id}`;

//         axios.get(url)
//             .then((res) => {
//                 // ✅ Backend returns AppointmentResponseDTO with "appointment" field
//                 setAppointment(res.data.appointment);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 alert("Appointment not found");
//                 setAppointment(null);
//             });
//     };

//     return (
//         <div>

//             <h3>Find Appointment</h3>

//             <input
//                 placeholder="Enter Appointment ID"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//             />

//             <button onClick={findHandler}>Search</button>

//             <br /><br />

//             {appointment && (
//                 <div>
//                     <h4>Appointment Details</h4>

//                     <p><strong>ID:</strong> {appointment.id}</p>
//                     <p><strong>Date:</strong> {appointment.date}</p>
//                     <p><strong>Time:</strong> {appointment.time}</p>
//                     <p><strong>Status:</strong> {appointment.status}</p>
//                     <p><strong>Duration:</strong> {appointment.durationMinutes} mins</p>

//                     <p>
//                         <strong>Patient:</strong> {appointment.patient?.patientName} 
//                         {" "}({appointment.patient?.patientGender}) – ID: {appointment.patient?.patientId}
//                     </p>

//                     <p>
//                         <strong>Doctor:</strong> {appointment.doctor?.name} 
//                         {" "}({appointment.doctor?.department}) – ID: {appointment.doctor?.id}
//                     </p>
//                 </div>
//             )}

//         </div>
//     );
// }

import axios from "axios";
import { useState } from "react";

export default function FindAppointment() {
    let [id, setId] = useState("");
    let [appointment, setAppointment] = useState(null);
    let [error, setError] = useState("");

    let findHandler = () => {
        setError("");
        setAppointment(null);

        if (!id) {
            setError("Enter Appointment ID");
            return;
        }

<<<<<<< HEAD
        let url = `http://localhost:9002/api/appointments/get/${id}`;
        axios.get(url)
=======
        let url = `http://localhost:9002/api/appointment/get/${id}`;

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
>>>>>>> 4a13951c1b65ad9c78169498f0ce149db738cb93
            .then((res) => {
                if (!res.data.appointment) {
                    setError("Appointment not found with ID: " + id);
                } else {
                    setAppointment(res.data.appointment);
                }
            })
            .catch(() => {
                setError("Appointment not found");
            });
    };

    return (
        <div className="container mt-4">
            <h2>Find Appointment</h2>

            <div className="input-group mb-3">
                <input
                    className="form-control"
                    placeholder="Enter Appointment ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={findHandler}>Search</button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {appointment && (
                <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{appointment.id}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.status}</td>
                            <td>{appointment.durationMinutes} mins</td>
                            <td>
                                {appointment.patient?.patientName} ({appointment.patient?.patientGender})  
                                – ID: {appointment.patient?.patientId}
                            </td>
                            <td>
                                {appointment.doctor?.name} ({appointment.doctor?.department})  
                                – ID: {appointment.doctor?.id}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
