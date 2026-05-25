import { useState } from "react";
import axios from "axios";

export default function AssignBed() {

    let [bedId, setBedId] = useState("");
    let [patientId, setPatientId] = useState("");

    let bedIdHandler = (e) => {
        setBedId(e.target.value);
    }

    let patientIdHandler = (e) => {
        setPatientId(e.target.value);
    }

    let assignHandler = () => {
        let url = `http://localhost:9002/bed/${bedId}/assign`;
        let data = {
            "patientId": parseInt(patientId)
        };

        axios.post(url, data)
            .then((response) => {
                alert("Patient " + patientId + " assigned to Bed " + bedId + " successfully!");
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
            <h1>Assign Patient to Bed</h1>

            <label>Bed ID</label>
            <input value={bedId} onChange={bedIdHandler} placeholder="Enter Bed ID" />
            <br />

            <label>Patient ID</label>
            <input value={patientId} onChange={patientIdHandler} placeholder="Enter Patient ID" />
            <br />

            <button onClick={assignHandler}>Assign</button>
        </div>
    );
}
