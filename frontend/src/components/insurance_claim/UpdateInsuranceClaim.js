import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateInsuranceClaim() {

  const { claimId } = useParams();
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState(0);
  const [policyNumber, setPolicyNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  const updateButtonHandler = () => {

    const url = "http://localhost:9002/api/insurance/updateInsuranceClaim";

    const data = {
      insuranceClaim: {
        insuranceClaimId: claimId,
        patient: {
          patientId: patientId
        },
        policyNumber: policyNumber,
        amount: Number(amount),
        status: status
      }
    };

    axios.put(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
      .then((res) => {
        alert("Insurance Claim updated successfully");
        navigate("/insuranceClaim/display");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {

    const url = "http://localhost:9002/api/insurance/getInsuranceClaimById/" + claimId;

    axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
      .then((res) => {

        const c = res.data.insuranceClaim;

        setPatientId(c.patient?.patientId);
        setPolicyNumber(c.policyNumber);
        setAmount(c.amount);
        setStatus(c.status);

      })
      .catch((err) => {
        console.error(err);
      });

  }, [claimId]);

  return (
    <div>
      <h3>Update Insurance Claim</h3>

      <label>Patient ID </label>
      <input
        type="number"
        value={patientId}
        onChange={(e) => setPatientId(Number(e.target.value))}
      />
      <br />

      <label>Policy Number </label>
      <input
        value={policyNumber}
        onChange={(e) => setPolicyNumber(e.target.value)}
      />
      <br />

      <label>Amount </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />

      <label>Status </label>
      <input
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <br />

      <button onClick={updateButtonHandler}>Update</button>
    </div>
  );
}