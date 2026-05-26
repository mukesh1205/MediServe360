import { useState } from "react";
import axios from "axios";
export default function AddNotification(){

    let [message,setMessage]=useState("");
    let [category,setCategory]=useState("");
    let [status,setStatus]=useState("");
    

    const messageHandler=(event)=>{
        setMessage(event.target.value)
    }

    const categoryHandler=(event)=>{
        setCategory(event.target.value)
    }

    const statusHandler=(event)=>{
        setStatus(event.target.value)
    }

    async function submitHandler(){
        let date=new Date();
        let data={
                
                "notification": {
                    "message": message,
                    "category": category,
                    "status": status,
                    "createdDate": date,
                        "user": {
                        "userId": 5,
                        "userName": "Raghu Vardhan",
                        "userRole": "Patient",
                        "userEmail": "r@gmail.com",
                        "userPhone": "123456"
                        }
  }
                
            }
        try{
            let res=await axios.post("http://localhost:9002/notification/insertnotificationdata",data);
            alert(res.data.message)
        }catch(err){
            alert(err.message);
        }
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Message</label>
                <input type="text" placeholder="Enter message" onChange={messageHandler} />
                <br></br>

                <label>Category</label>
                <input type="test" placeholder="Enter category" onChange={categoryHandler} />
                <br></br>

                <label>Status</label>
                <input type="text" placeholder="Enter status" onChange={statusHandler} />
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}