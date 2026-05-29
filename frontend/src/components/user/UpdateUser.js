import { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function UpdateUser(){

    const {id}=useParams();
    let [name,setName]=useState("");
    let [role,setRole]=useState("");
    let [phone,setPhone]=useState("");
    let [email,setEmail]=useState("");
    // let [id,setId]=useState();
    const nameHandler=(event)=>{
        setName(event.target.value)
    }

    const roleHandler=(event)=>{
        setRole(event.target.value)
    }

    const emailHandler=(event)=>{
        setEmail(event.target.value)
    }

    const phoneHandler=(event)=>{
        setPhone(event.target.value)
    }

    // const idHandler=(event)=>{
    //     setId(event.target.value);
    // }

    async function findById(){

        let url=`http://localhost:9002/user/findbyid/${id}`;
        try{

            let res=await axios.get(url);
            setName(res.data.user.userName);
            setEmail(res.data.user.userEmail);
            setRole(res.data.user.userRole);
            setPhone(res.data.user.userPhone);

        }catch(err){
            alert(err.message)
        }
    }

    useEffect(()=>{
        findById()
    },[])
    async function submitHandler(){
        let data={
                
                "user": {
                    "userId":id,
                    "userName": name,
                    "userRole": role,
                    "userEmail": email,
                    "userPhone": phone
                }
                
            }
        try{
            let res=await axios.put("http://localhost:9002/user/updateuser",data);
            alert(res.data.message)
        }catch(err){
            alert(err.message);
        }
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                {/* <label>Id</label>
                <input type="number" placeholder="Enter Id" value={id} onChange={idHandler} />
                <br></br> */}
                <p>Update the user with id {id}</p>
                <label>Name</label>
                <input type="text" placeholder="Enter name" value={name} onChange={nameHandler} />
                <br></br>

                <label>Role</label>
                <select onChange={roleHandler} value={role}>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Admin">Admin</option>
                    
                </select>
                <br></br>

                <label>Email</label>
                <input type="email" value={email} placeholder="Enter email" onChange={emailHandler} />
                <br></br>

                <label>Phone</label>
                <input type="text" value={phone} placeholder="Enter phone number" onChange={phoneHandler} />
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}