import axios from 'axios';
import { useState } from 'react';

export default function AddBed() {

    let [bedStatus, setBedStatus] = useState("");
    let [wardId, setWardId] = useState("");

    let bedStatusHandler = (event) => {
        setBedStatus(event.target.value);
    }

    let wardIdHandler = (event) => {
        setWardId(event.target.value);
    }

    let saveHandler = () => {
        let url = "http://localhost:9002/bed/create";
        let data = {
            "bed": {
                "bedStatus": bedStatus,
                "ward": {
                    "wardId": parseInt(wardId)
                }
            }
        };
        axios.post(url, data)
            .then((response) => {
                alert("Bed saved successfully! Bed ID: " + response.data.bed.bedId);
            })
            .catch((error) => {
                if (error.response) {
                    // Server responded with an error (4xx, 5xx)
                    alert("Error " + error.response.status + ": " + (error.response.data?.message || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    // Request was made but no response (CORS or backend not running)
                    alert("No response from server. Make sure the backend is running on port 8080.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    }

    return (
        <div>
            <label>Bed Status</label>
            <input onChange={bedStatusHandler} placeholder="e.g. Available" />
            <br />

            <label>Ward ID</label>
            <input onChange={wardIdHandler} placeholder="Enter Ward ID" />
            <br />

            <button onClick={saveHandler}>Save</button>
        </div>
    )
}
