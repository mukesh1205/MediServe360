import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DisplayInsuranceClaims() {

    const [claims, setClaims] = useState([]);

    useEffect(() => {
        const url = "http://localhost:9002/api/insurance/fetchAllInsuranceClaims";

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                setClaims(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h3>Display All Insurance Claims</h3>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Claim Id</th>
                        <th>Patient Id</th>
                        <th>Patient Name</th>
                        <th>Policy Number</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {claims.map((c) => (
                        <tr key={c.insuranceClaimId}>
                            <td>{c.insuranceClaimId}</td>

                            <td>{c.patient?.patientId}</td>
                            <td>{c.patient?.patientName}</td>

                            <td>{c.policyNumber}</td>
                            <td>{c.amount}</td>
                            <td>{c.status}</td>

                            <td>
                                <Link to={`/insuranceClaim/update/${c.insuranceClaimId}`}>
                                    Edit
                                </Link>
                            </td>

                            <td>
                                <Link to={`/insuranceClaim/delete/${c.insuranceClaimId}`}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}