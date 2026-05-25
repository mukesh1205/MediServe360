import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function DeleteCompliance(){

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {

        let url = "http://localhost:9002/api/deleteComplianceReport/" + id;

        axios.delete(url)
        .then((res) => {
            alert("Compliance Report Deleted successfully");
            navigate("/compliance");   // change route if needed
        })
        .catch((err) => {
            console.error(err);
        });

    }, [id, navigate]);

    return(
        <div>
            <h3>Deleting Compliance Report...</h3>
        </div>
    );
}