import { Link, Outlet } from "react-router-dom";

export default function BedHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/bed">
                        Bed
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="add">
                                    Add Bed
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="find">
                                    Find Bed
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="findAll">
                                    Find All Beds
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="assignBed">
                                    Assign Bed to Patient
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="dischargeBed">
                                    Discharge Bed
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