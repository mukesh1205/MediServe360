import { useState } from "react";
import axios from "axios";

export default function WardOccupancyReport() {

    let [wardId, setWardId] = useState("");
    let [report, setReport] = useState(null);
    let [error, setError] = useState("");

    let wardIdHandler = (e) => {
        setWardId(e.target.value);
    }

    let searchHandler = () => {
        setError("");
        setReport(null);

        let url = `http://localhost:9002/ward/${wardId}/occupancy-report`;
        axios.get(url)
            .then((response) => {
                if (!response.data) {
                    setError("No report found for Ward ID: " + wardId);
                } else {
                    setReport(response.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    setError("Error " + error.response.status + ": " + (error.response.data?.errorMessage || "Ward not found"));
                } else if (error.request) {
                    setError("No response from server. Make sure the backend is running on port 9002.");
                } else {
                    setError("Error: " + error.message);
                }
            });
    }

    return (
        <div>
            <h1>Ward Occupancy Report</h1>

            <label>Ward ID</label>
            <input value={wardId} onChange={wardIdHandler} placeholder="Enter Ward ID" />
            <button onClick={searchHandler}>Get Report</button>

            <br /><br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {report && (
                <div>
                    <h2>Occupancy Report</h2>
                    <p>{report}</p>
                </div>
            )}
        </div>
    );
}
