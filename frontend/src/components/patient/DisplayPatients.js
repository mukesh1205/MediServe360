import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';

export default function DisplayPatients(){
    const [patients,setPatients]=useState([]);

    useEffect(()=>{
        let url="http://localhost:9002/api/fetchAllPatients";
        axios.get(url)
            .then((res)=>{
                setPatients(res.data);
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    },[])
    return(
        <div className="container mt-4">
            
            <h3 className="mb-4">Display all Patients</h3>
            
            {patients.length === 0 ? (
            <p>No patients found</p>
            ) :
            (<div className="table-responsive">
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
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patients.map((e)=>{
                            return(
                                <tr key={e.patientId}>
                                    <td>{e.patientId}</td>
                                    <td>{e.patientName}</td>
                                    <td>{new Date(e.patientDOB).toLocaleDateString()}</td>
                                    <td>{e.patientGender}</td>
                                    <td>{e.patientPhoneNumber}</td>
                                    <td>{e.patientMedicalHistory}</td>
                                    <td>{e.patientStatus}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-warning btn-sm" to={"/patient/update/"+e.patientId}>Update</Link>
                                    </td>
                                    <td className="text-center">
                                        <Link className="btn btn-danger btn-sm" to={"/patient/delete/"+e.patientId}>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>)}
        </div>
    )
}