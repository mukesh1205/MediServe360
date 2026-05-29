import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
export default function DeleteUser(){
    const {id}=useParams();
    const navigate=useNavigate();
    
    // const idHandler=(event)=>{
    //     setId(event.target.value)
    // }
    const [data,setData]=useState("");
    async function submitHandler(){
        let url=`http://localhost:9002/user/deleteuser/${id}`;
        try{
            let res=await axios.delete(url);
            setData(res.data);

        }catch(err){
            alert(err.message)
        }
    }
    useEffect(()=>{
        submitHandler();
        navigate("/user")
    },[])
    return(
        <div>
            
                <div>
                    <p>{data}</p>
                </div>
            
        </div>
    )
}