import { useState } from "react";
import axios from "axios";

export default function FindInsuranceClaim() {

    const [claimId, setClaimId] = useState("");
    const [claim, setClaim] = useState(null);

    const buttonHandler = async () => {
        try {
            if (!claimId) {
                alert("Please enter Insurance Claim ID");
                return;
            }

            const url = "http://localhost:9002/api/getInsuranceClaimById/" + claimId;
            const res = await axios.get(url);

            setClaim(res.data.insuranceClaim);

        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert(err.response.data.errorMessage || "Insurance Claim not found");
                setClaim(null);
            } else {
                console.error(err);
                alert("Something went wrong");
            }
        }
    };

    return (
        <div>
            <h1>Find Insurance Claim</h1>

            <label>Enter Insurance Claim ID</label>
            <input
                type="number"
                onChange={(e) => setClaimId(e.target.value)}
            />
            <br />

            <button onClick={buttonHandler}>Find</button>

            {claim && (
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Claim Id</th>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                                <th>Policy Number</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{claim.insuranceClaimId}</td>
                                <td>{claim.patient?.patientId}</td>
                                <td>{claim.patient?.patientName}</td>
                                <td>{claim.policyNumber}</td>
                                <td>{claim.amount}</td>
                                <td>{claim.status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}