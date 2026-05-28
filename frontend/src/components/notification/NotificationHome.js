import { Link, Outlet } from "react-router-dom";

export default function NotificationHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/notification">
                        Notifications
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
                                    Add Notification
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="find">
                                    Get Notification
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="findall">
                                    Find All
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="paginated">
                                    Notification Pages
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