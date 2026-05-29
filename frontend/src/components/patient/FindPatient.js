import { useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify';

export default function FindPatient(){
    const [name,setName]=useState("");
    const [searched,setSearched]=useState(false);
    const [records,setRecords]=useState([]);
    const nameHandler=(e)=>{
        setName(e.target.value);
    };

    const buttonHandler=async()=>{
        try{
            if (!name.trim()) {
                toast.warning("Please enter a name");
                return;
            }
            setRecords([]);
            setSearched(false);
            const url="http://localhost:9002/api/patient/getPatientByName/"+name;
            const res=await axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                });

            
            const patients = res.data.patients;
            setRecords(patients);
        }
        catch(err){
            if(err.response && err.response.status===404){
                setRecords([]);
            } else {
                toast.error(err.message);
            }
        }
        setSearched(true);     
    }


    return(
        <div className="container mt-4">
            <h3 className="mb-4">Find Patient by Name</h3>
            <div className="mb-3">
                <label className="form-label">Enter name</label>
                <input 
                    className='form-control' 
                    type="text" 
                    value={name}
                    onChange={nameHandler}
                    onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                buttonHandler();
                            }
                    }}
                />
            </div>

            <button className='btn btn-primary w-100' 
                onClick={buttonHandler}
                disabled={!name.trim()}>
                Find
            </button>
            {searched && records.length === 0 && name && <p className="mt-3 text-danger">No records found</p>}
            { records.length>0 &&(
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Medical History</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((e)=>{
                            return(
                                <tr key={e.patientId}>
                                    <td>{e.patientId}</td>
                                    <td>{e.patientName}</td>
                                    <td>{new Date(e.patientDOB).toLocaleDateString()}</td>
                                    <td>{e.patientGender}</td>
                                    <td>{e.patientPhoneNumber}</td>
                                    <td>{e.patientMedicalHistory}</td>
                                    <td>{e.patientStatus}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            )}
        </div>

    )
}