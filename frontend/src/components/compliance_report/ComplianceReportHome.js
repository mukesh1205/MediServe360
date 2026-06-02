import { Link, Outlet } from "react-router-dom";
import Signout from "../Auth/Signout";
export default function ComplianceReportHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/compliance_report">
                        Compliance Report
                    </Link>

                    {/*  Added navbar toggler like PatientHome */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Added ID for collapse */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="add">
                                    Add
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="find">
                                    Find
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="display">
                                    Display
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="paginated">
                                    Paginated
                                </Link>
                            </li>
                            <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                    <Signout />
                                    </li>
                                </ul>
                        </ul>
                    </div>

                </div>
            </nav>

            <Outlet />
        </div>
    );
}