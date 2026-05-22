import { Link, Outlet } from "react-router-dom";

export default function PatientHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add" >Add Patient</Link>
                    </li>
                    <li>
                        <Link to="update" >Update Patient</Link>
                    </li>
                    <li>
                        <Link to="delete" >Delete Patient</Link>
                    </li>
                    <li>
                        <Link to="find" >Find Patient</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}