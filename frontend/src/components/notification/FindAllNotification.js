import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function FindAllNotification(){
    let [data,setData]=useState([]);
    const navigate=useNavigate();
    async function notificationget(){
        let url="http://localhost:9002/notification/fetchallnotifications"
        try{
            let res=await axios.get(url);
            setData(res.data);
        }catch(err){
            alert(err.message);
        }
    }
    useEffect(()=>{
        notificationget();
    },[])

    function deletehandler(event){
        navigate(`/notification/delete/${event.target.value}`)
    }

    function updatehandler(event){
        navigate(`/notification/update/${event.target.value}`)
    }
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
                                    <button value={m.notificationId} onClick={deletehandler}>Delete</button>
                                    <button value={m.notificationId} onClick={updatehandler}>Edit</button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}