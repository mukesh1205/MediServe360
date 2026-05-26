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
    const findalluserhandler=()=>{
        navigate("findall")
    }

    const paginatedhandler=()=>{
        navigate("paginated")
    }
    return(
        <div>
            <button onClick={addUserHandler} >Add User</button>
            <button onClick={findUserHandler} >Find User</button>
            <button onClick={findalluserhandler}>get all users</button>
            <button onClick={paginatedhandler}>Paginated</button>
            <Outlet />
        </div>
    )
}