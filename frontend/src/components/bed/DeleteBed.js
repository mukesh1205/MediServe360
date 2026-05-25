import { useParams } from "react-router";
import axios from 'axios';
import { useEffect } from "react";

export default function DeleteBed() {
    let { bedId } = useParams();

    useEffect(() => {
        let url = `http://localhost:9002/bed/delete/${bedId}`;

        axios.delete(url)
            .then((response) => {
                alert(response.data);
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
    }, [bedId]);

    return (
        <div>
            <h1>Delete Bed</h1>
            <span>Deleting Bed ID: {bedId}</span>
        </div>
    );
}
