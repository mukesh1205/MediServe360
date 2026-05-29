import { Link, Outlet } from "react-router-dom";

export default function WardHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/ward">
                        Ward
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="add">
                                    Add Ward
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="find">
                                    Find Ward
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="findAll">
                                    Find All Wards
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="occupancy">
                                    Ward Occupancy Report
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="pages">
                                    Pages
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