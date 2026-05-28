import axios from 'axios';
import { useState } from 'react';
import { toast } from "react-toastify";

export default function AddPatient(){
    const [patientName,setPatientName]=useState("");
    const [patientDOB,setPatientDOB]=useState("");
    const [patientGender,setPatientGender]=useState("");
    const [patientPN,setPatientPN]=useState("");
    const [patientMH,setPatientMH]=useState("");
    const [patientStatus,setPatientStatus]=useState("");

    const patientNameHandler=(event)=>{
        setPatientName(event.target.value);
    }

    const patientDOBHandler=(event)=>{
        setPatientDOB(event.target.value);
    }

    const patientGenderHandler=(event)=>{
        setPatientGender(event.target.value);
    }

    const patientPNHandler=(event)=>{
        setPatientPN(event.target.value);
    }

    const patientMHHandler=(event)=>{
        setPatientMH(event.target.value);
    }

    const patientStatusHandler=(event)=>{
        setPatientStatus(event.target.value);
    }

    const buttonHandler=()=>{
        let url="http://localhost:9002/api/addPatient";

        if (!patientName || !patientDOB || !patientGender || !patientPN || !patientMH || !patientStatus) {
            toast.warning("Please fill all fields");
            return;
        }

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
                toast.success("Patient Added successfully");
                setPatientName("");
                setPatientDOB("");
                setPatientGender("");
                setPatientPN("");
                setPatientMH("");
                setPatientStatus("");

            })
            .catch((error)=>{
                toast.error(error.message);
            })
    }

    return(
        <div className='container mt-4'>

            <h3 className="mb-4">Add Patient component</h3>

            <div className='mb-3'>
                <label className='form-label'>Patient Name</label>
                <input 
                    className='form-control' 
                    type='text'
                    value={patientName}
                    placeholder="Enter patient name" 
                    onChange={patientNameHandler} required
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Patient DOB</label>
                <input 
                    className='form-control' 
                    type='date'
                    value={patientDOB} 
                    onChange={patientDOBHandler} required
                />
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

            <div className='mb-3'>
                <label className='form-label'>Patient PhoneNumber</label>
                <input 
                    className='form-control' 
                    type='tel'
                    value={patientPN}
                    placeholder="Enter patient phone number" 
                    onChange={patientPNHandler} required/>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Patient MedicalHistory</label>
                <textarea 
                    className='form-control'
                    value={patientMH}
                    placeholder="Enter patient medical history" 
                    onChange={patientMHHandler} 
                    required 
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Patient Status</label>

                <select
                    className='form-select'
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


            <button className='btn btn-primary w-100' onClick={buttonHandler} >Add Patient</button>
        </div>
    )
} 