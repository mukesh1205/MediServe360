import {useState,useEffect} from "react";
import axios from "axios";
export default function FindAllAuditlog(){
    let [data,setData]=useState([]);

    async function notificationget(){
        let url="http://localhost:9002/auditlog/fetchallauditlog"
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
                        <th>auditId</th>
                        <th>Audit Action</th>
                        <th>User Id</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((m)=>{
                            return(
                                <tr>
                                    <td>{m.auditId}</td>
                                    <td>{m.action}</td>
                                    <td>{m.user.userId}</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}