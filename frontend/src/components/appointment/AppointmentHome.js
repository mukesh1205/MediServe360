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
                    <Link to="find">Find Appointment</Link>
                </li>

                <li>
                    <Link to="display">Display Appointments</Link>
                </li>

            </ul>

        </nav>
        <Outlet></Outlet>
        </div>
    );
}