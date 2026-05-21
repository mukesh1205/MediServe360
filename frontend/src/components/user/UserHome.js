import { useNavigate } from "react-router";
import { Outlet } from "react-router";
export default function UserHome(){
    const navigate=useNavigate();
    const addUserHandler=()=>{
        navigate("adduser")
    }

    const findUserHandler=()=>{
        navigate("/finduser")
    }

    const updateUserHandler=()=>{
        navigate("/updateuser")
    }
    const deleteUserHandler=()=>{
        navigate("/deleteuser")
    }

    return(
        <div>
            <button onClick={addUserHandler} >Add User</button>
            <button onClick={findUserHandler} >Find User</button>
            <button onClick={updateUserHandler} >Update User</button>
            <button onClick={deleteUserHandler} >Delete User</button>

            <Outlet />
        </div>
    )
}