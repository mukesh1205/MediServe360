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
                        <Link to="find" >Find Patient By Name</Link>
                    </li>
                    <li>
                        <Link to="display" >Display Patients</Link>
                    </li>
                    <li>
                        <Link to="displayPaginated" >Display Patients Paginated</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}