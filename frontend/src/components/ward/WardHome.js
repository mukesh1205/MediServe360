import { Link, Outlet } from 'react-router-dom';
import Signout from '../Auth/Signout';
export default function WardHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add Ward</Link>
                    </li>
                    <li>
                        <Link to="find">Find Ward</Link>
                    </li>
                    <li>
                        <Link to="findAll">Find All Wards</Link>
                    </li>
                    <li>
                        <Link to="occupancy">Ward Occupancy Report</Link>
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
            <Outlet />
        </div>
    );
}
