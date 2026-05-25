import {useState,useEffect} from "react";
import axios from "axios";
export default function FindAllNotification(){
    let [data,setData]=useState([]);

    async function notificationget(){
        let url="http://localhost:9002/notification/fetchallnotifications"
        try{
            let res=await axios.get(url);
            setData(res.data);
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        notificationget();
    },[data])
    return(
        <div>
            
            <table border={2}>
                <thead>
                    <tr>
                        <th>NotificationId</th>
                        <th>Notification Category</th>
                        <th>Notificatoin message</th>
                        <th>Notification Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((m)=>{
                            return(
                                <tr>
                                    <td>{m.notificationId}</td>
                                    <td>{m.category}</td>
                                    <td>{m.message}</td>
                                    <td>{m.status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}