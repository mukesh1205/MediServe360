import axios from "axios";
import { useState } from "react";

export default function AddInsuranceClaim() {

    const [patientId, setPatientId] = useState(0);
    const [policyNumber, setPolicyNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState("");

    const buttonHandler = () => {

        if (!patientId || !policyNumber || !amount || !status) {
            alert("Please fill all fields");
            return;
        }

        const url = "http://localhost:9002/api/addInsuranceClaim";

        const data = {
            insuranceClaim: {
                patient: {
                    patientId: patientId
                },
                policyNumber: policyNumber,
                amount: Number(amount),
                status: status
            }
        };

        axios.post(url, data)
            .then((res) => {
                alert("Insurance Claim added successfully");
                console.log(res.data);

                // ✅ optional: clear form
                setPatientId(0);
                setPolicyNumber("");
                setAmount(0);
                setStatus("");
            })
            .catch((err) => {
                console.error(err.response?.data || err);
                alert("Error adding insurance claim");
            });
    };

    return (
        <div>
            <h3>Add Insurance Claim</h3>

            <label>Patient ID</label>
            <input
                type="number"
                value={patientId}
                onChange={(e) => setPatientId(Number(e.target.value))}
            />
            <br />

            <label>Policy Number</label>
            <input
                type="text"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
            />
            <br />

            <label>Claim Amount</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <br />

            <label>Status</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">--Select--</option>
                <option value="SUBMITTED">SUBMITTED</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
            </select>
            <br />

            <button onClick={buttonHandler}>Add Insurance Claim</button>
        </div>
    );
}