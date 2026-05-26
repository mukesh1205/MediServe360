import { Link, Outlet } from "react-router-dom";

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
            <Outlet></Outlet>
        </div>
    );
}