import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export default function UpdatePatient() {
  let { pid } = useParams();

  let navigate = useNavigate();

  let [patientName, setPatientName] = useState("");
  let [patientDOB, setPatientDOB] = useState("");
  let [patientGender, setPatientGender] = useState("");
  let [patientPN, setPatientPN] = useState("");
  let [patientMH, setPatientMH] = useState("");
  let [patientStatus, setPatientStatus] = useState("");

  let patientNameHandler = (e) => {
    setPatientName(e.target.value);
  };

  let patientDOBHandler = (e) => {
    setPatientDOB(e.target.value);
  };

  let patientGenderHandler = (e) => {
    setPatientGender(e.target.value);
  };

  let patientPNHandler = (e) => {
    setPatientPN(e.target.value);
  };

  let patientMHHandler = (e) => {
    setPatientMH(e.target.value);
  };

  let patientStatusHandler = (e) => {
    setPatientStatus(e.target.value);
  };

  let updateButtonHandler = (e) => {
    if (!patientName || !patientDOB || !patientGender || !patientPN || !patientMH || !patientStatus) {
      toast.warning("Please fill all fields");
      return;
    }
    let url = "http://localhost:9002/api/updatePatient";
    let data={
        "patient":{
            "patientId":pid,
            "patientName": patientName,
            "patientDOB": patientDOB,
            "patientGender": patientGender,
            "patientPhoneNumber": patientPN,
            "patientMedicalHistory": patientMH,
            "patientStatus": patientStatus
        }
    };

    axios
      .put(url, data)
      .then((res) => {
        toast.success("Updated successfully");
        navigate("/patient/display");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    let url = "http://localhost:9002/api/getPatientById/" + pid;
    axios
      .get(url)
      .then((res) => {
        let p = res.data.patient;
        setPatientName(p.patientName);
        setPatientDOB(p.patientDOB);
        setPatientGender(p.patientGender);
        setPatientPN(p.patientPhoneNumber);
        setPatientMH(p.patientMedicalHistory);
        setPatientStatus(p.patientStatus);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [pid]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Patient</h3>
      <div className="mb-3">
      <label className="form-label">Patient Name </label>
      <input className="form-control" type="text" value={patientName} onChange={patientNameHandler} />
      </div>

      <div className="mb-3">
      <label className="form-label">Patient DOB </label>
      <input className="form-control" type="date" value={patientDOB} onChange={patientDOBHandler} />
      </div>

      <div className="mb-3">
        <label className="form-label">Patient Gender</label>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Male"
            checked={patientGender === "Male"}
            onChange={patientGenderHandler}
          />
          <label className="form-check-label">Male</label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Female"
            checked={patientGender === "Female"}
            onChange={patientGenderHandler}
          />
          <label className="form-check-label">Female</label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            value="Other"
            checked={patientGender === "Other"}
            onChange={patientGenderHandler}
          />
          <label className="form-check-label">Other</label>
        </div>
      </div>

      <div className="mb-3">
      <label className="form-label">Patient Phone Number </label>
      <input className="form-control" type="tel" value={patientPN} onChange={patientPNHandler} />
      </div>

      <div className="mb-3">
      <label className="form-label">Patient Medical History </label>
      <textarea className="form-control" value={patientMH} onChange={patientMHHandler} />
      </div>

      <div className="mb-3">
        <label className="form-label">Patient Status</label>
        <select
          className="form-select"
          value={patientStatus}
          onChange={patientStatusHandler}
        >
          <option value="">--Select Status--</option>
          <option value="Admitted">Admitted</option>
          <option value="Discharged">Discharged</option>
          <option value="Under Treatment">Under Treatment</option>
          <option value="Recovered">Recovered</option>
        </select>
      </div>

      <button className="btn btn-warning w-100" onClick={updateButtonHandler}>Update</button>
    </div>
  );
}
