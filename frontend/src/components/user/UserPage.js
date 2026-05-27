import {useState,useEffect} from 'react';
import axios from 'axios';

export default function UserPage(){

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
        let url=`http://localhost:9002/user/fetchAllUsersPaginated`;
        const params={
                params:{
                    pgno:count,
                    size:size,
                    sorting:"userId",
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
                        <th>userId</th>
                        <th>user Name</th>
                        <th>user Role</th>
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
            <button onClick={prevhandler}>Prev</button>
            <span style={{margin:"0 10px"}}>Page {count+1} of {totalPages}</span>
            <button onClick={nexthandler}>Next</button>
        </div>
    )
}