import { Outlet, useNavigate } from "react-router";
export default function NotificationHome(){

    const navigate=useNavigate();

    const addnotificatoinhandler=()=>{
        navigate("add")
    }

    const getnotificatoinhandler=()=>{
        navigate("find")
    }
    const findallnotificationhandler=()=>{
        navigate("findall")
    }
    const paginatedhandler=()=>{
        navigate("paginated");
    }
    return(
        <div>
            <button onClick={addnotificatoinhandler}>Add Notification</button>
           
            <button onClick={findallnotificationhandler}>Find all Notification</button>
            
            <button onClick={getnotificatoinhandler}>Get Notification</button>
            <button onClick={paginatedhandler}>Notification Pages</button>
            <Outlet />
        </div>
    )
}