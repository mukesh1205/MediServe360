import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function FindAllUser(){
    let [data,setData]=useState([]);
    const navigate=useNavigate();

    async function notificationget(){
        let url="http://localhost:9002/user/fetchallusers"
        try{
            let res=await axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                });
            setData(res.data);
        }catch(err){
            alert(err.message);
        }
    }
    useEffect(()=>{
        notificationget();
    },[]);

    function deletehandler(event){
        navigate(`/user/delete/${event.target.value}`)
    }

    function edithandler(event){
        navigate(`/user/update/${event.target.value}`)
    }
    return(
        <div className="container mt-4">
            <h2>All Users</h2>
            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>userId</th>
                        <th>User Name</th>
                        <th>User Role</th>
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
                                    <td>{m.role}</td>
                                    <td>{m.email}</td>
                                    <td>{m.phoneNumber}</td>
                                    <button value={m.userId} onClick={deletehandler}>Delete</button>
                                    <button value={m.userId} onClick={edithandler}>Edit</button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}