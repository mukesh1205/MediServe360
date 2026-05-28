import axios from "axios";
import { useState } from "react";
import {toast} from 'react-toastify';

export default function AddInsuranceClaim() {

    const [patientId, setPatientId] = useState("");
    const [policyNumber, setPolicyNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");

    const buttonHandler = () => {

        if (!patientId || !policyNumber || !amount || !status) {
            toast.warning("Please fill all fields");
            return;
        }

        if(amount<0){
            toast.info("Amount mus be greater than 0");
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
            .then(() => {
                toast.success("Insurance Claim added successfully");

                setPatientId("");
                setPolicyNumber("");
                setAmount("");
                setStatus("");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Add Insurance Claim</h3>

            <div className="mb-3">
                <label className="form-label">Patient ID</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Policy Number</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter policy number"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Claim Amount</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-control"
                    placeholder="Enter claim amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">--Select--</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
            </div>

            <button className="btn btn-primary w-100" onClick={buttonHandler}>
                Add Insurance Claim
            </button>
        </div>
    );
}