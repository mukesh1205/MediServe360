import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateInsuranceClaim() {

  const { claimId } = useParams();
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const updateButtonHandler = () => {

    if (!patientId || !policyNumber || !amount || !status) {
      toast.warning("Please fill all fields");
      return;
    }

    if(amount<0){
      toast.info("Amount should be greater than 0");
      return;
    }
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
        toast.success("Insurance Claim updated successfully");
        navigate("/insuranceClaim/display");
      })
      .catch((err) => {
        toast.error(err.message);
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

        setPatientId(c.patient?.patientId || "");
        setPolicyNumber(c.policyNumber);
        setAmount(c.amount);
        setStatus(c.status);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [claimId]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Insurance Claim</h3>

      <div className="mb-3">
        <label className="form-label">Patient ID</label>
        <input
          className="form-control"
          type="number"
          value={patientId}
          onChange={(e) =>
            setPatientId(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Policy Number</label>
        <input
          className="form-control"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          className="form-control"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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

      <button
        className="btn btn-warning w-100"
        onClick={updateButtonHandler}
      >
        Update Insurance Claim
      </button>
    </div>
  );
}