import { Link, Outlet } from "react-router-dom";

export default function KpiReportHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/kpi">
                        KPI Report
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="add">
                                    Add KPI Report
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="find">
                                    Find KPI Report
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="display">
                                    Display KPI Reports
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="displayPaginated">
                                    Display KPI Reports Paginated
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