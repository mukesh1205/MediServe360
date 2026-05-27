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
        <div className="container mt-4">
            <h2>Assign Patient to Bed</h2>

            <div className="mb-3">
                <label className="form-label">Bed ID</label>
                <input className="form-control" value={bedId} onChange={bedIdHandler} placeholder="Enter Bed ID" />
            </div>

            <div className="mb-3">
                <label className="form-label">Patient ID</label>
                <input className="form-control" value={patientId} onChange={patientIdHandler} placeholder="Enter Patient ID" />
            </div>

            <button className="btn btn-success" onClick={assignHandler}>Assign</button>
        </div>
    );
}
