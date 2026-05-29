import { Link, Outlet } from "react-router-dom";

export default function InsuranceClaimHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/insurance">
                        Insurance Claim
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

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
                                <Link className="nav-link" to="displayPaginated">
                                    Display Paginated
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