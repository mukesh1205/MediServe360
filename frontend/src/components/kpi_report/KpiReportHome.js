import { Link, Outlet } from "react-router-dom";
import Signout from "../Auth/Signout";
export default function KpiReportHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add KPI Report</Link>
                    </li>
                    <li>
                        <Link to="find">Find KPI Report</Link>
                    </li>
                    <li>
                        <Link to="display">Display KPI Reports</Link>
                    </li>
                    <li>
                        <Link to="displayPaginated">Display KPI Reports Paginated</Link>
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
