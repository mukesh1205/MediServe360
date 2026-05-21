import { useNavigate } from "react-router"
export default function NotificationHome(){

    const navigate=useNavigate();

    const addnotificatoinhandler=()=>{
        navigate("/addnotification")
    }

    const updatenotificatoinhandler=()=>{
        navigate("/addnotification")
    }

    const deletenotificatoinhandler=()=>{
        navigate("/addnotification")
    }
    const getnotificatoinhandler=()=>{
        navigate("/addnotification")
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