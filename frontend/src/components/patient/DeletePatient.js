import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function DeletePatient(){
    
    let {pid}=useParams();
    let navigate=useNavigate();
    useEffect(()=>{
        
<<<<<<< HEAD
        
        if (!window.confirm("Are you sure you want to delete this patient?")) {
                navigate("/patient");
                return;
        }

        let url="http://localhost:9002/api/deletePatient/"+pid;
        axios.delete(url)
=======
        let url="http://localhost:9002/api/patient/deletePatient/"+pid;
        axios.delete(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
>>>>>>> 0757f92c8fbce6f86f6ca66c9a6abae730f3f4db
        .then((res)=>{
            toast.success("Deleted successfully");
            navigate("/patient/display");

        })
        .catch((err)=>{
            toast.error(err.message);
        })
    },[pid,navigate])

    return(
        <div>
            <h3>Deleting Patient...</h3>
        </div>
    )
}

// export default function DeletePatient(){
//     return (
//         <h1>Delete</h1>
//     )
// }