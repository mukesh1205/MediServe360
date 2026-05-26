import { Link, Outlet } from "react-router-dom";

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

                </ul>
            </nav>

            <Outlet />

        </div>
    );
}
