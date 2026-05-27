import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeletePatient(){
    
    let {pid}=useParams();
    let navigate=useNavigate();
    useEffect(()=>{
        
        
        if (!window.confirm("Are you sure you want to delete this patient?")) {
                navigate("/patient");
                return;
        }

        let url="http://localhost:9002/api/deletePatient/"+pid;
        axios.delete(url)
        .then((res)=>{
            alert("Deleted successfully");
            navigate("/patient/display");

        })
        .catch((err)=>{
            alert(err.message);
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