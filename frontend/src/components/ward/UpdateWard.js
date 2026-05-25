import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function UpdateWard() {

    let { wardId } = useParams();
    let navigate = useNavigate();

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

    // Load existing ward data when page opens
    useEffect(() => {
        let url = `http://localhost:9002/ward/getWard/${wardId}`;
        axios.get(url)
            .then((res) => {
                setWardName(res.data.ward.wardname);
                setWardCapacity(res.data.ward.wardcapacity);
                setWardStatus(res.data.ward.wardstatus);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    let updateButtonHandler = () => {
        let url = "http://localhost:9002/ward/updateWard";
        let data = {
            "ward": {
                "wardId": parseInt(wardId),
                "wardname": wardName,
                "wardcapacity": parseInt(wardCapacity),
                "wardstatus": wardStatus
            }
        };

        axios.put(url, data)
            .then((res) => {
                alert("Ward updated successfully");
                navigate("/ward/findAll");
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
            <h1>Update Ward {wardId}</h1>

            <label>Ward ID</label>
            <input value={wardId} readOnly />
            <br />

            <label>Ward Name</label>
            <input value={wardName} onChange={wardNameHandler} />
            <br />

            <label>Ward Capacity</label>
            <input value={wardCapacity} onChange={wardCapacityHandler} />
            <br />

            <label>Ward Status</label>
            <input value={wardStatus} onChange={wardStatusHandler} />
            <br />

            <button onClick={updateButtonHandler}>Update</button>
        </div>
    );
}
