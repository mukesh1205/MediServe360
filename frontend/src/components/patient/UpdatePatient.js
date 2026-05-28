import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    let url = "http://localhost:9002/api/patient/updatePatient";
    alert(pid);
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
      .put(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
      .then((res) => {
        alert("Updated successfully");
        navigate("/patient/display");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    let url = "http://localhost:9002/api/patient/getPatientById/" + pid;
    axios
      .get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
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
        console.error(err);
      });
  }, [pid]);

  return (
    <div>
      <label>Patient Name </label>
      <input value={patientName} onChange={patientNameHandler} />
      <br />

      <label>Patient DOB </label>
      <input type="date" value={patientDOB} onChange={patientDOBHandler} />
      <br />

      <label>Patient Gender </label>
      <input value={patientGender} onChange={patientGenderHandler} />
      <br />

      <label>Patient Phone Number </label>
      <input type="number" value={patientPN} onChange={patientPNHandler} />
      <br />

      <label>Patient Medical History </label>
      <input value={patientMH} onChange={patientMHHandler} />
      <br />

      <label>Patient Status </label>
      <input value={patientStatus} onChange={patientStatusHandler} />
      <br />

      <button onClick={updateButtonHandler}>Update</button>
    </div>
  );
}
