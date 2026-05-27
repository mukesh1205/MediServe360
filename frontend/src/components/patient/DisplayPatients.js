import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router";

export default function DisplayPatients(){
    let [patient,setPatient]=useState([]);

    useEffect(()=>{
        let url="http://localhost:9002/api/fetchAllPatients";
        axios.get(url)
            .then((res)=>{
                setPatient(res.data);
            })
            .catch((err)=>{
                alert(err.message);
            })
    },[])
    return(
        <div>
            <h3>Display all Patients</h3>
            <table className="table table-bordered">
                <thead>
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
                        patient.map((e)=>{
                            return(
                                <tr key={e.patientId}>
                                    <td>{e.patientId}</td>
                                    <td>{e.patientName}</td>
                                    <td>{e.patientDOB}</td>
                                    <td>{e.patientGender}</td>
                                    <td>{e.patientPhoneNumber}</td>
                                    <td>{e.patientMedicalHistory}</td>
                                    <td>{e.patientStatus}</td>
                                    <td>
                                        <Link to={"/patient/update/"+e.patientId}>Update</Link>
                                    </td>
                                    <td>
                                        <Link to={"/patient/delete/"+e.patientId}>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}