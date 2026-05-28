import { useState } from "react"
import axios from 'axios';

export default function FindPatient(){
    const [name,setName]=useState("");

    const [records,setRecords]=useState([]);
    const nameHandler=(e)=>{
        setName(e.target.value);
    };

    const buttonHandler=async()=>{
        try{
            if (!name.trim()) {
                alert("Please enter a name");
                return;
            }
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
                
                alert(err.response.data.errorMessage || "No Patient Found");
                setRecords([]);
            } else {
                console.error(err);
                alert("Something went wrong");
            }
        }     
    }


    return(
        <div>
            <h1>This is  Find Patient component</h1>
            <label>Enter name</label>
            <input type="text" onChange={nameHandler}/>
            <br />
            <button onClick={buttonHandler}>Find</button>
            { records.length>0 &&(
            <div>
                <table border="1">
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
                        {records.map((e)=>{
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
            </div>
            )}
        </div>

    )
}