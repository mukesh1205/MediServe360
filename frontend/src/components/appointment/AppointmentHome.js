import {Link, Outlet} from 'react-router-dom';
import Signout from '../Auth/Signout';
export default function AppointmentHome(){

    return(
        <div>
        <nav>

            <ul>
                <li>
                    <Link to="add">Add Appointment</Link>
                </li>
                
                <li>
                    <Link to="find">Find Appointment</Link>
                </li>

                <li>
                    <Link to="display">Display Appointments</Link>
                </li>

                <li>
                    <Link to="displayPaginated">Display Paginated Appointments</Link>
                </li>

            </ul>
            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Signout />
                                </li>
                            </ul>
        </nav>
        <Outlet></Outlet>
        </div>
    );
}