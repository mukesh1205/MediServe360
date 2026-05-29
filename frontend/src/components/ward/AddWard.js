import axios from 'axios';
import { useState } from 'react';

export default function AddWard() {

    let [wardName, setWardName] = useState("");
    let [wardCapacity, setWardCapacity] = useState("");
    let [wardStatus, setWardStatus] = useState("");

    let wardNameHandler = (e) => {
        setWardName(e.target.value);
    }

    let wardCapacityHandler = (e) => {
        setWardCapacity(e.target.value);
    }

    let wardStatusHandler = (e) => {
        setWardStatus(e.target.value);
    }

    let saveHandler = () => {
        let url = "http://localhost:9002/api/ward/create";
        let data = {
            "ward": {
                "wardname": wardName,
                "wardcapacity": parseInt(wardCapacity),
                "wardstatus": wardStatus
            }
        };

        axios.post(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((response) => {
                alert("Ward created successfully! Ward ID: " + response.data.ward.wardId);
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
            <h2>Add Ward</h2>

            <div className="mb-3">
                <label className="form-label">Ward Name</label>
                <input className="form-control" value={wardName} onChange={wardNameHandler} placeholder="Enter Ward Name" />
            </div>

            <div className="mb-3">
                <label className="form-label">Ward Capacity</label>
                <input className="form-control" value={wardCapacity} onChange={wardCapacityHandler} placeholder="Enter Ward Capacity" />
            </div>

            <div className="mb-3">
                <label className="form-label">Ward Status</label>
                <input className="form-control" value={wardStatus} onChange={wardStatusHandler} placeholder="e.g. active" />
            </div>

            <button className="btn btn-primary" onClick={saveHandler}>Save</button>
        </div>
    );
}
