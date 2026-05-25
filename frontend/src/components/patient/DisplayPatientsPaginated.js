import axios from "axios";
import { useState } from "react";

export default function DisplayPatientsPaginated(){

    const [records,setRecords]=useState([]);
    const [pgno,setPgno] =useState(0);
    const [size,setSize]=useState(0);
    const [sorting,setSorting]=useState("");
    const [asc,setAsc]=useState(true);

    const buttonHandler=async()=>{
        try{
            const url="http://localhost:9002/api/fetchAllPatientsPaginated";
            const params={
                params:{
                    pgno:pgno,
                    size:size,
                    sorting:sorting,
                    asc:asc
                }
            }
            const res=await axios.get(url,params);
            setRecords(res.data.content);
        }
        catch(err){
            console.error(err);
        }
    }
    
    return(
        <div>
            <label>Enter Page NO</label>
            <input type="number" onChange={e=>setPgno(Number(e.target.value))}/>
            <br />
            
            <label>Enter size of Page</label>
            <input type="number" onChange={e=>setSize(Number(e.target.value))}/>
            <br />
            
            <label>Select sorting column</label>
            <select onChange={e=>setSorting(e.target.value)}>
                <option value="">--Select Column--</option>
                <option value="patientId">Patient Id</option>
                <option value="patientName" >Patient Name</option>
                <option value="patientGender">Patient Gender</option>
                <option value="patientDOB" >Patient DOB</option>
            </select>
            <br />
            
            <label>Order</label>

            <input
                type="radio"
                name="sortOrder"
                value="true"
                checked={asc === true}
                onChange={() => setAsc(true)}
            />
            <label>Ascending</label>

            <input
                type="radio"
                name="sortOrder"
                value="false"
                checked={asc === false}
                onChange={() => setAsc(false)}
            />
            <label>Descending</label>
            <br />
            <button onClick={buttonHandler}>Get Patients</button>
            {records.length>0 &&(
            <table border={1}>
                <thead>
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
                    {
                        records.map((e)=>{
                            return(
                                <tr key={e.patientId}>
                                    <td>{e.patientId}</td>
                                    <td>{e.patientName}</td>
                                    <td>{e.patientDOB}</td>
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
            )}
        </div>
    )
}