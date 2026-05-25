import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function UpdateBed() {

    let { bedId } = useParams();
    let navigate = useNavigate();

    let [bedStatus, setBedStatus] = useState("");
    let [wardId, setWardId] = useState("");

    let bedStatusHandler = (e) => {
        setBedStatus(e.target.value);
    }

    let wardIdHandler = (e) => {
        setWardId(e.target.value);
    }

    // Load existing bed data when page opens
    useEffect(() => {
        let url = `http://localhost:9002/bed/getBed/${bedId}`;
        axios.get(url)
            .then((res) => {
                setBedStatus(res.data.bed.bedStatus);
                setWardId(res.data.bed.ward?.wardId || "");
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    let updateButtonHandler = () => {
    let url = "http://localhost:9002/bed/updateBed";
    let data = {
        "bed": {
            "bedId": parseInt(bedId),
            "bedStatus": bedStatus,
            // only include ward if wardId is actually entered
            ...(wardId && { "ward": { "wardId": parseInt(wardId) } })
        }
    };
    axios.put(url, data)
        .then((res) => {
            alert("Bed updated successfully");
            navigate("/bed/all");
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
            <h1>Update Bed {bedId}</h1>

            <label>Bed ID</label>
            <input value={bedId} readOnly />
            <br />

            <label>Bed Status</label>
            <input value={bedStatus} onChange={bedStatusHandler} />
            <br />

            <label>Ward ID</label>
            <input value={wardId} onChange={wardIdHandler} />
            <br />

            <button onClick={updateButtonHandler}>Update</button>
        </div>
    );
}
