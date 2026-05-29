import {Link, Outlet} from 'react-router-dom';
import Signout from '../Auth/Signout';
export default function BedHome(){

    return(
        <div>
        <nav>

            <ul>
                <li>
                    <Link to="add">Add Bed</Link>
                </li>
              
                <li>
                    <Link to="find">Find Bed</Link>
                </li>
                <li>
                    <Link to="findAll">find all beds</Link>
                </li>
                <li>
                    <Link to="assignBed">Assign Bed to Patient</Link>
                </li>
                <li>
                    <Link to="dischargeBed">Discharge Bed </Link>
                </li>
                <li>
                    <Link to="pages">Pages</Link>
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