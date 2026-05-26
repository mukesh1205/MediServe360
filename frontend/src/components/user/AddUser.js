import { useState } from "react";
import axios from "axios";
export default function AddUser(){

    let [name,setName]=useState("");
    let [role,setRole]=useState("");
    let [phone,setPhone]=useState("");
    let [email,setEmail]=useState("");

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

    async function submitHandler(){
        let data={
                
                "user": {
                    
                    "userName": name,
                    "userRole": role,
                    "userEmail": email,
                    "userPhone": phone
                }
                
            }
        try{
            let res=await axios.post("http://localhost:9002/user/insertuserdata",data);
            alert(res.data.message)
        }catch(err){
            alert(err.message);
        }
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" placeholder="Enter name" onChange={nameHandler} />
                <br></br>

                <label>Role</label>
                <select onChange={roleHandler}>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Admin">Admin</option>
                    
                </select>
                <br></br>

                <label>Email</label>
                <input type="email" placeholder="Enter email" onChange={emailHandler} />
                <br></br>

                <label>Phone</label>
                <input type="text" placeholder="Enter phone number" onChange={phoneHandler} />
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}