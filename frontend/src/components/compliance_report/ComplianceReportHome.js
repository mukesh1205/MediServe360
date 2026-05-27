import { Link, Outlet } from "react-router-dom";

export default function ComplianceReportHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add Compliance Report</Link>
                    </li>
                    <li>
                        <Link to="find">Find Compliance Report</Link>
                    </li>
                    <li>
                        <Link to="display">Display Compliance Reports</Link>
                    </li>
                    <li>
                        <Link to="paginated">
                            Display Paginated Compliance Reports
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}