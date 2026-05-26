import axios from "axios";
import { useParams } from "react-router";

export default function DeleteAppointment() {

    //  let [id, setId] = useState("");
    // let deleteHandler = () => {

    //     if (!id) {
    //         alert("Enter Appointment ID");
    //         return;
    //     }

    const {id}=useParams();
        let url = `http://localhost:9002/api/appointments/delete/${id}`;

        axios.delete(url)
            .then((response) => {
                alert(response.data);   // ✅ "Appointment deleted successfully"

                // ✅ Reset field
                //setId("");
            })
            .catch((error) => {
                alert(
                    error.response?.data?.message ||
                    "Error deleting appointment"
                );
                console.error(error);
            });

    return (
        <div>

            <h2>Delete Appointment</h2>
            {/* <label>Appointment ID</label>
            <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Appointment ID"
            />
            <br />

            <button onClick={deleteHandler}>Delete</button> */}

        </div>
    );
}
