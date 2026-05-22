import { useNavigate } from "react-router"
import {Outlet} from "react-router";

export default function AuditlogHome(){
    const navigate=useNavigate();
    const addAuditLogHandler=()=>{
        navigate("add")
    }

    const getAuditLogHandler=()=>{
        navigate("find")
    }

    return(
        <div>
            <button onClick={addAuditLogHandler}>Add AuditLog</button>
            <button onClick={getAuditLogHandler}>Get Auditlog</button>

            <Outlet />
        </div>
    )

}