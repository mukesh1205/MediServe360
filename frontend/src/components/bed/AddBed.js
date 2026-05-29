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
        let url = "http://localhost:9002/api/beds/create";
        let data = {
            "bed": {
                "bedStatus": bedStatus,
                "ward": {
                    "wardId": parseInt(wardId)
                }
            }
        };
        axios.post(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((response) => {
                alert("Bed saved successfully! Bed ID: " + response.data.bed.bedId);
            })
            .catch((error) => {
                if (error.response) {
                    alert("Error " + error.response.status + ": " + (error.response.data?.message || JSON.stringify(error.response.data)));
                } else if (error.request) {
                    alert("No response from server. Make sure the backend is running on port 9002.");
                } else {
                    alert("Error: " + error.message);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h2>Add Bed</h2>
            <div className="mb-3">
                <label className="form-label">Bed Status</label>
                <input
                    className="form-control"
                    onChange={bedStatusHandler}
                    placeholder="e.g. Available"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Ward ID</label>
                <input
                    className="form-control"
                    onChange={wardIdHandler}
                    placeholder="Enter Ward ID"
                />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
        </div>
    )
}
