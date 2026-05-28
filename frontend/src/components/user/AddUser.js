import { useState } from "react";
import axios from "axios";
export default function AddUser(){

    let [name,setName]=useState("");
    let [role,setRole]=useState("");
    let [phone,setPhone]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    const nameHandler=(event)=>{
        setName(event.target.value)
    }

    const roleHandler=(event)=>{
        setRole(event.target.value)
    }

    const emailHandler=(event)=>{
        setEmail(event.target.value)
    }

    const phoneHandler=(event)=>{
        setPhone(event.target.value)
    }
    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    }

    async function submitHandler(){
        let data={
                
                    "userName": name,
                    "userRole": role,
                    "userEmail": email,
                    "phonenumber": phone,
                    "password":password
                
            }
             try {
            const res = await axios.post(
                "http://localhost:9002/user/insertuserdata",
                data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                }
            );
            alert(res.data.userName);
        }
        catch(err){
            alert(err.message);
        }
    }
    return(
        <div className="container mt-4">
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input className="form-control" type="text" placeholder="Enter name" onChange={nameHandler} />
            </div>

            <div>
                <label className="form-label">Role</label>
                <select onChange={roleHandler}>
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="NURSE">Nurse</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FINANCEOFFICER">Finance Officer</option>
                    <option value="COMPLIANCE_OFFICER">Compilance officer</option>
                    
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" placeholder="Enter email" onChange={emailHandler} />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone</label>
                <input className="form-control" type="text" placeholder="Enter phone number" onChange={phoneHandler} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" type="text" placeholder="Enter Password (min 6 Chars)" onChange={passwordHandler} />
            </div>

                <button class="btn btn-secondary btn-sm dropdown-toggle" onClick={submitHandler} type="submit">Submit</button>
           
        </div>
    )
}