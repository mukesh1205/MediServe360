import { useState } from "react";
import axios from "axios";
export default function UpdateNotification(){

    let [message,setMessage]=useState("");
    let [category,setCategory]=useState("");
    let [status,setStatus]=useState("");
    let [id,setId]=useState(0);

    const idHandler=(event)=>{
        setId(event.target.value)
    }
    const messageHandler=(event)=>{
        setMessage(event.target.value)
    }

    const categoryHandler=(event)=>{
        setCategory(event.target.value)
    }

    const statusHandler=(event)=>{
        setStatus(event.target.value)
    }

    async function submitHandler(event){
        event.preventDefault();
        let date=new Date();
        let data={
                
                "notification": {
                    "notificationId":id,
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
            let res=await axios.put("http://localhost:9002/notification/updatenotification",data);
            alert(res.data.message)
        }catch(err){
            console.log(err.message);
        }
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Id</label>
                <input type="number" placeholder="Enter Id" onChange={idHandler} />
                <br></br>

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