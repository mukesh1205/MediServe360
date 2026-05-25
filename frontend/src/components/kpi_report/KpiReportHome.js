import { Link, Outlet } from "react-router-dom";

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
            <Outlet></Outlet>
        </div>
    );
}
