import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteInsuranceClaim() {

    const { claimId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const url = "http://localhost:9002/api/deleteInsuranceClaim/" + claimId;

        axios.delete(url)
            .then((res) => {
                alert("Insurance Claim deleted successfully");
                navigate("/insuranceClaim");
            })
            .catch((err) => {
                console.error(err);
            });

    }, [claimId, navigate]); 

    return (
        <div>
            <h3>Deleting Insurance Claim...</h3>
        </div>
    );
}