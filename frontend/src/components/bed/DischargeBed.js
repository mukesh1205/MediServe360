import { useState } from "react";
import axios from "axios";

export default function DischargeBed() {

    let [bedId, setBedId] = useState("");

    let bedIdHandler = (e) => {
        setBedId(e.target.value);
    }

    let dischargeHandler = () => {
        let url = `http://localhost:9002/api/beds/${bedId}/discharge`;

        axios.put(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
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
        <div className="container mt-4">
            <h2>Discharge Patient from Bed</h2>

            <div className="mb-3">
                <label className="form-label">Bed ID</label>
                <input className="form-control" value={bedId} onChange={bedIdHandler} placeholder="Enter Bed ID" />
            </div>

            <button className="btn btn-danger" onClick={dischargeHandler}>Discharge</button>
        </div>
    );
}
