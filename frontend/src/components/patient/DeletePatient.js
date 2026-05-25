import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function DeletePatient(){
    
    let {pid}=useParams();
    let navigate=useNavigate();
    useEffect(()=>{
        
        let url="http://localhost:9002/api/deletePatient/"+pid;
        axios.delete(url)
        .then((res)=>{
            alert("Deleted successfully");
            navigate("/patient");

        })
        .catch((err)=>{
            console.error(err);
        })
    })

    return(
        <div>
            <h3>This is delete Patient</h3>
        </div>
    )
}

// export default function DeletePatient(){
//     return (
//         <h1>Delete</h1>
//     )
// }