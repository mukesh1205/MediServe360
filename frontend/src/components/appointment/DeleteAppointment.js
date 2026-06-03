import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function DeleteAppointment() {
    const { aid } = useParams();   // route param from /appointment/delete/:aid
    const navigate = useNavigate();

    let deleteHandler = () => {
        axios.delete(`http://localhost:9002/api/appointment/delete/${aid}`,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                alert(res.data); // "Appointment deleted successfully"
                navigate("/appointment/display"); // back to list
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message || "Error deleting appointment");
            });
    };

    return (
        <div>
            <h2>Delete Appointment {aid}</h2>
            <button onClick={deleteHandler}>Confirm Delete</button>
        </div>
    );
}