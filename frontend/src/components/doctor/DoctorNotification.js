import {useState,useEffect} from "react";
import axios from "axios";
export default function DoctorNotification(){

    const [doctorData,setDoctorData]=useState([]);
    async function doctorget(){
        try{
            let id=localStorage.getItem("doctorId");
            alert(id);
            let url=`http://localhost:8760/notification/getdoctorbyid/${id}`;

            let res=await axios.get(url
            )
            setDoctorData(res.data);
        }catch(err){
            alert(err.message);
        }
    }
    useEffect(()=>{
        doctorget()
    },[])
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Notification Id</td>
                        <td>Doctor Id</td>
                        <td>Status</td>
                        <td>Category</td>
                        <td>Message</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctorData.map((m)=>{
                            return(
                                <tr>    
                                    <td>{m.notificationID}</td>
                                    <td>{m.doctorID}</td>
                                    <td>{m.status}</td>
                                    <td>{m.category}</td>
                                    <td>{m.message}</td>
                                
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}