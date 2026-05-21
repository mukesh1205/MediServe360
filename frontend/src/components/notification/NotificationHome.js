import { Outlet, useNavigate } from "react-router";
import {Outlet} from "react-router";
export default function NotificationHome(){

    const navigate=useNavigate();

    const addnotificatoinhandler=()=>{
        navigate("/add")
    }

    const updatenotificatoinhandler=()=>{
        navigate("/update")
    }

    const deletenotificatoinhandler=()=>{
        navigate("/delete")
    }
    const getnotificatoinhandler=()=>{
        navigate("/find")
    }
    return(
        <div>
            <button onClick={addnotificatoinhandler}>Add Notification</button>
            <button onClick={updatenotificatoinhandler}>update Notification</button>

            <button onClick={deletenotificatoinhandler}>Delete Notification</button>
            <button onClick={getnotificatoinhandler}>Get Notification</button>

            <Outlet />
        </div>
    )
}