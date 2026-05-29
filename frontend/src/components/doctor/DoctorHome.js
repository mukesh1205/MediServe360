import { Link, Outlet } from "react-router-dom";
import Signout from "../Auth/Signout";
export default function DoctorHome() {

    return (
        <div>

            <h2>Doctor Management</h2>

            <nav>
                <ul>

                    <li>
                        <Link to="add">Add Doctor</Link>
                    </li>

                    <li>
                        <Link to="find">Find Doctor</Link>
                    </li>

                    <li>
                        <Link to="display">Display Doctors</Link>
                    </li>

                    <li>
                        <Link to="displayPaginated">Display Paginated Doctors</Link>
                    </li>

                </ul>
                <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                        <Signout />
                                        </li>
                                    </ul>
            </nav>
            

            <Outlet />

        </div>
    );
}
