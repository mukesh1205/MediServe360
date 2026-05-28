// import { useParams, useNavigate } from "react-router";
// import axios from "axios";

// export default function DeleteAppointment() {
//     const { aid } = useParams();   // route param from /appointment/delete/:aid
//     const navigate = useNavigate();

//     let deleteHandler = () => {
//         axios.delete(`http://localhost:9002/api/appointments/delete/${aid}`)
//             .then((res) => {
//                 alert(res.data); // "Appointment deleted successfully"
//                 navigate("/appointment/display"); // back to list
//             })
//             .catch((err) => {
//                 console.error(err);
//                 alert(err.response?.data?.message || "Error deleting appointment");
//             });
//     };

//     return (
//         <div>
//             <h2>Delete Appointment {aid}</h2>
//             <button onClick={deleteHandler}>Confirm Delete</button>
//         </div>
//     );
// }

import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

export default function DeleteAppointment() {
    const { aid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`http://localhost:9002/api/appointments/delete/${aid}`)
            .then((res) => {
                alert(res.data);
                navigate("/appointment/display");
            })
            .catch((err) => {
                alert(err.response?.data?.message || "Error deleting appointment");
            });
    }, [aid, navigate]);

    return (
        <div className="container mt-4">
            <h2 className="text-danger">Delete Appointment</h2>
            <div className="alert alert-warning">
                Deleting Appointment ID: <strong>{aid}</strong>
            </div>
        </div>
    );
}
