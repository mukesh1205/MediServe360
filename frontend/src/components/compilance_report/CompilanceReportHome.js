import { Link, Outlet } from "react-router-dom";
import Signout from "../Auth/Signout";
export default function ComplianceReportHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add Compilance Report</Link>
                    </li>
                    <li>
                        <Link to="find">Find Compilance Report</Link>
                    </li>
                    <li>
                        <Link to="display">Display Compilance Reports</Link>
                    </li>
                    <li>
                        <Link to="displayPaginated">Display Compilance Reports Paginated</Link>
                    </li>
                </ul>
            </nav>
            <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                        <Signout />
                                        </li>
                                    </ul>
            <Outlet></Outlet>
        </div>
    );
}