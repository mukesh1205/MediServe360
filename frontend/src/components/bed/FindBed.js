import { useState } from "react";
import axios from "axios";

export default function FindBed() {

    let [bedId, setBedId] = useState("");
    let [bed, setBed] = useState(null);
    let [error, setError] = useState("");

    let bedIdHandler = (e) => {
        setBedId(e.target.value);
    }

    let searchHandler = () => {
        setError("");
        setBed(null);

        let url = `http://localhost:9002/bed/getBed/${bedId}`;
        axios.get(url)
            .then((response) => {
                setBed(response.data.bed);
            })
            .catch((error) => {
                if (error.response) {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || "Bed not found"));
                } else if (error.request) {
                    setError("No response from server. Make sure the backend is running on port 9002.");
                } else {
                    setError("Error: " + error.message);
                }
            });
    }

    return (
        <div>
            <h1>Find Bed</h1>

            <label>Bed ID</label>
            <input value={bedId} onChange={bedIdHandler} placeholder="Enter Bed ID" />
            <button onClick={searchHandler}>Search</button>

            <br /><br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {bed && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Bed ID</th>
                            <th>Bed Status</th>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bed.bedId}</td>
                            <td>{bed.bedStatus}</td>
                            <td>{bed.patient ? bed.patient.patientId : "Not Assigned"}</td>
                            <td>{bed.patient ? bed.patient.patientName : "Not Assigned"}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
