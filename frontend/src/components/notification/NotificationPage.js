import {useState,useEffect} from 'react';
import axios from 'axios';

export default function AuditLogPage(){

    const [data,setData]=useState([]);
    const [count,setCount]=useState(0);
    const [totalPages,setTotalPages]=useState(0);

    const size=6;
    
    const nexthandler=()=>{
        if(count<(totalPages-1)){
            setCount(count+1);
        }
    }
    const prevhandler=()=>{
        if(count>0){
            setCount(count-1);
        }
    }

    async function fetchfunction(){
        let url=`http://localhost:9002/notification/fetchAllNotificationsPaginated`;
        
        try{
            let res=await axios.get(url,
                {params: {
                pgno: count,
                size: size,
                sorting: "notificationId",
                asc: true
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
                });
            setData(res.data.content);
            setTotalPages(res.data.totalPages);
        }catch(err){
            alert(err.message);
        }
    }
    useEffect(()=>{
        fetchfunction();
    },[count])
    return(
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Nootification Id</th>
                        <th>Notification message</th>
                        <th>Notification Category</th>
                        <th>Notification status</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            data.map((m)=>{
                                return(
                                    <tr>
                                        <td>{m.notificationId}</td>
                                        <td>{m.message}</td>
                                        <td>{m.category}</td>
                                        <td>{m.status}</td>
                                    </tr>
                                    
                                )
                            })
                        }
                   
                   
                </tbody>

            </table>
            <button onClick={prevhandler}>Prev</button>
            <span style={{margin:"0 10px"}}>Page {count+1} of {totalPages}</span>
            <button onClick={nexthandler}>Next</button>
        </div>
    )
}