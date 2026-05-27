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
                        Authorization: "Bearer " + localStorage.getItem("token") // ✅ JWT
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
        <div>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" placeholder="Enter name" onChange={nameHandler} />
                <br></br>

                <label>Role</label>
                <select onChange={roleHandler}>
                    <option value="PATIENT">Patient</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="NURSE">Nurse</option>
                    <option value="ADMIN">Admin</option>
                    
                </select>
                <br></br>

                <label>Email</label>
                <input type="email" placeholder="Enter email" onChange={emailHandler} />
                <br></br>

                <label>Phone</label>
                <input type="text" placeholder="Enter phone number" onChange={phoneHandler} />
                <br></br>

                <label>Password</label>
                <input type="text" placeholder="Enter Password (min 6 Chars)" onChange={passwordHandler} />
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}