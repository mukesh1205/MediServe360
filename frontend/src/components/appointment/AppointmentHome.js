import {Link, Outlet} from 'react-router-dom';
export default function AppointmentHome(){

    return(
        <div>
        <nav>

            <ul>
                <li>
                    <Link to="add">Add Appointment</Link>
                </li>
                <li>
                    <Link to="delete">Delete Appointment</Link>
                </li>
                <li>
                    <Link to="update">Update Appointment</Link>
                </li>
                <li>
                    <Link to="find">Find Appointment</Link>
                </li>

            </ul>

        </nav>
        <Outlet></Outlet>
        </div>
    );
}