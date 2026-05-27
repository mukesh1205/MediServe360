import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function DeleteDoctor() {
    const { id } = useParams();   // route param
    const navigate = useNavigate();

    let deleteHandler = () => {
        axios.delete(`http://localhost:9002/api/doctors/delete/${id}`)
            .then((res) => {
                alert(res.data); // "Doctor deleted successfully"
                navigate("/doctor/display"); // back to list
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message || "Error deleting doctor");
            });
    };

    return (
        <div>
            <h2>Delete Doctor {id}</h2>
            <button onClick={deleteHandler}>Confirm Delete</button>
        </div>
    );
}
