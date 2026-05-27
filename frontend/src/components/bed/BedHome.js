import {Link, Outlet} from 'react-router-dom';
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

        </nav>
        <Outlet></Outlet>
        </div>
    );
}