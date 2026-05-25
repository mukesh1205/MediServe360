import { useState } from "react";
import axios from "axios";

export default function DischargeBed() {

    let [bedId, setBedId] = useState("");

    let bedIdHandler = (e) => {
        setBedId(e.target.value);
    }

    let dischargeHandler = () => {
        let url = `http://localhost:9002/bed/${bedId}/discharge`;

        axios.put(url)
            .then((response) => {
                alert("Bed " + bedId + " discharged successfully! Bed is now Available.");
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.errorMessage || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9002.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    }

    return (
        <div>
            <h1>Discharge Patient from Bed</h1>

            <label>Bed ID</label>
            <input value={bedId} onChange={bedIdHandler} placeholder="Enter Bed ID" />
            <br /><br />

            <button onClick={dischargeHandler}>Discharge</button>
        </div>
    );
}
