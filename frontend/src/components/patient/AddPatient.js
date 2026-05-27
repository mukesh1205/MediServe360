import axios from 'axios';
import { useState } from 'react';

export default function AddPatient(){
    let [patientName,setPatientName]=useState("");
    let [patientDOB,setPatientDOB]=useState("");
    let [patientGender,setPatientGender]=useState("");
    let [patientPN,setPatientPN]=useState("");
    let [patientMH,setPatientMH]=useState("");
    let [patientStatus,setPatientStatus]=useState("");

    let patientNameHandler=(event)=>{
        setPatientName(event.target.value);
    }

    let patientDOBHandler=(event)=>{
        setPatientDOB(event.target.value);
    }

    let patientGenderHandler=(event)=>{
        setPatientGender(event.target.value);
    }

    let patientPNHandler=(event)=>{
        setPatientPN(event.target.value);
    }

    let patientMHHandler=(event)=>{
        setPatientMH(event.target.value);
    }

    let patientStatusHandler=(event)=>{
        setPatientStatus(event.target.value);
    }

    let buttonHandler=()=>{
        let url="http://localhost:9002/api/addPatient";
        let data={
            "patient":{
                "patientName": patientName,
                "patientDOB": patientDOB,
                "patientGender": patientGender,
                "patientPhoneNumber": patientPN,
                "patientMedicalHistory": patientMH,
                "patientStatus": patientStatus
            }
        };
        axios.post(url,data)
            .then((response)=>{
                alert("Patient Added successfully"+response.data);
            })
            .catch((error)=>{
                alert(error.message);
            })
    }

    return(
        <div>
            <h3>Add Patient component</h3>
            <label>Patient Name</label>
            <input type='text' onChange={patientNameHandler} required/>
            <br />

            <label>Patient DOB</label>
            <input type='date' onChange={patientDOBHandler} required/>
            <br />

            <label>Patient Gender</label>
            <input type="text" onChange={patientGenderHandler} required/>
            <br />

            <label>Patient PhoneNumber</label>
            <input type='text' onChange={patientPNHandler} required/>
            <br />

            <label>Patient MedicalHistory</label>
            <textarea onChange={patientMHHandler} required></textarea>
            <br />

            <label>Patient Status</label>
            <textarea onChange={patientStatusHandler} required></textarea>
            <br />

            <button onClick={buttonHandler} >Add Patient</button>
        </div>
    )
} 