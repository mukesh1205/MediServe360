import { useState } from "react";
import axios from "axios";
export default function AddAuditlog(){

    let [action,setAction]=useState("");
    

    const actionHandler=(event)=>{
        setAction(event.target.value)
    }

    async function submitHandler(){
        let date=new Date();
        let data={
                "auditLog": {
                    
                    "action":action,
                    "timestamp":date,
                    "user": {
                    "userId": 13,
                    "userName": "raghu",
                    "userRole": "Doctor",
                    "userEmail": "asfdas@gmail.com",
                    "userPhone": "1234234"
                    }
                }
                
            }
        try{
            let res=await axios.post("http://localhost:9002/auditlog/insertauditlog",data);
            alert(res.data.message)
        }catch(err){
            alert(err.message);
        }
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" placeholder="Enter Action" onChange={actionHandler} />
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}