import { useNavigate } from "react-router";
import { Outlet } from "react-router";
export default function UserHome(){
    const navigate=useNavigate();
    const addUserHandler=()=>{
        navigate("add")
    }

    const findUserHandler=()=>{
        navigate("find")
    }

    const updateUserHandler=()=>{
        navigate("update")
    }
    const deleteUserHandler=()=>{
        navigate("delete")
    }

    const findalluserhandler=()=>{
        navigate("findall")
    }
    return(
        <div>
            <button onClick={addUserHandler} >Add User</button>
            <button onClick={findUserHandler} >Find User</button>
            <button onClick={updateUserHandler} >Update User</button>
            <button onClick={deleteUserHandler} >Delete User</button>
            <button onClick={findalluserhandler}>get all users</button>
            <Outlet />
        </div>
    )
}