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

    const findallauditlogHandler=()=>{
        navigate("findall")
    }

    const paginatedauditlog=()=>{
        navigate("paginated")
    }

    return(
        <div>
            <button onClick={addAuditLogHandler}>Add AuditLog</button>
            <button onClick={getAuditLogHandler}>Get Auditlog</button>
            <button onClick={findallauditlogHandler}>Get All Auditlog</button>
            <button onClick={paginatedauditlog}>Auditlog Paginated</button>
            <Outlet />
        </div>
    )

}