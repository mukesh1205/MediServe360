import axios from "axios";
import { useState } from "react";
export default function FindUser(){

    const [id,setId]=useState();
    const idHandler=(event)=>{
        setId(event.target.value)
    }
    const [data,setData]=useState({});

    async function submitHandler(event){
        event.preventDefault();
        let url=`http://localhost:9002/user/findbyid/${id}`;
        try{
            console.log(id);
            let res=await axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
            // alert(res.data)
            setData(res.data);
            

        }catch(err){
            alert(err.message)
        }
    };
    if(data.userId){
        return(
            <div>
                
                <p>{data.userName}</p>
                <p>{data.role}</p>
                <p>{data.phoneNumber}</p>
                <p>{data.email}</p>
            </div>
        )
    }
    return(
        <div>
            
                <div>
                    <form onSubmit={submitHandler}>
                        <label>Id</label><br />
                        <input onChange={idHandler} text="number" placeholder="Enter userId" />
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            
        </div>
    )
}