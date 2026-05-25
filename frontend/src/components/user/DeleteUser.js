import axios from "axios";
import { useState } from "react";
export default function DeleteUser(){

    const [id,setId]=useState();
    const idHandler=(event)=>{
        setId(event.target.value)
    }

    async function submitHandler(){
        let url=`http://localhost:9002/user/deleteuser/${id}`;
        alert(id)
        try{

            let res=await axios.delete(url);
            alert("successfully deleted");

        }catch(err){
            console.log(err.message)
        }
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