import { Link, Outlet } from "react-router-dom";

export default function ComplianceReportHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/compliance">
                        Compliance Report
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="add">
                                    Add Compliance Report
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="find">
                                    Find Compliance Report
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="display">
                                    Display Compliance Reports
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="paginated">
                                    Display Paginated Compliance Reports
                                </Link>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>

            <Outlet />
        </div>
    );
}