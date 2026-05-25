import axios from "axios";
import { useState } from "react";
export default function FindNotification(){

    const [id,setId]=useState();
    const idHandler=(event)=>{
        setId(event.target.value)
    }
    const [data,setData]=useState({});

    async function submitHandler(event){
        event.preventDefault();
        let url=`http://localhost:9002/notification/findNotificationById/${id}`;
        try{

            let res=await axios.get(url);
            alert(res.data);
            setData(res.data);
            

        }catch(err){
            console.log(err.message)
        }
    };
    if(data.notificationId){
        return(
            <div>
                <p>{data.message}</p>
                <p>{data.category}</p>
            </div>
        )
    }
    return(
        <div>
            
                <div>
                    <form onSubmit={submitHandler}>
                        <label>Id</label><br />
                        <input onChange={idHandler} text="number" placeholder="Enter NotificationId" />
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            
        </div>
    )
}