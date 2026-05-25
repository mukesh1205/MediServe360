import {useState,useEffect} from "react";
import axios from "axios";
export default function FindAllUser(){
    let [data,setData]=useState([]);

    async function notificationget(){
        let url="http://localhost:9002/user/fetchallusers"
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
                        <th>userId</th>
                        <th>User Name</th>
                        <th>User Role</th>
                        <th>User Email</th>
                        <th>User Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((m)=>{
                            return(
                                <tr>
                                    <td>{m.userId}</td>
                                    <td>{m.userName}</td>
                                    <td>{m.userRole}</td>
                                    <td>{m.userEmail}</td>
                                    <td>{m.userPhone}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}