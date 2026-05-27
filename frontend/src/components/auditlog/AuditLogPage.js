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
        let url=`http://localhost:9002/auditlog/fetchAllAuditlogsPaginated`;
        const params={
                params:{
                    pgno:count,
                    size:size,
                    sorting:"auditId",
                    asc:true
                }
            }
        try{
            let res=await axios.get(url,params);
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
                        <th>auditId</th>
                        <th>audit Action</th>
                        <th>audit timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            data.map((m)=>{
                                return(
                                    <tr>
                                        <td>{m.auditId}</td>
                                        <td>{m.action}</td>
                                        <td>{m.timestamp}</td>
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