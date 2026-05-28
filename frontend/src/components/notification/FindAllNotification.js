import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function FindAllNotification(){
    let [data,setData]=useState([]);
    const navigate=useNavigate();
    async function notificationget(){
        let url="http://localhost:9002/notification/fetchallnotifications"
        try{
            let res=await axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                });
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

    // function updatehandler(event){
    //     navigate(`/notification/update/${event.target.value}`)
    // }
    return(
        <div className="container mt-4">
            
            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
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
                                    <td>{m.notificationID}</td>
                                    <td>{m.category}</td>
                                    <td>{m.message}</td>
                                    <td>{m.status}</td>
                                    <button value={m.notificationID} onClick={deletehandler}>Delete</button>
                                    {/* <button value={m.notificationID} onClick={updatehandler}>Edit</button> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}