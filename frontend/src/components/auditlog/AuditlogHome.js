import { useNavigate } from "react-router"
export default function AuditlogHome(){
    const navigate=useNavigate();
    const addAuditLogHandler=()=>{
        navigate("/addauditlog")
    }

    const getAuditLogHandler=()=>{
        navigate("/getauditlog")
    }

    return(
        <div>
            <button onClick={addAuditLogHandler}>Add AuditLog</button>
            <button onClick={getAuditLogHandler}>Get Auditlog</button>

            <Outlet />
        </div>
    )

}