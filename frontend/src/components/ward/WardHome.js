import { Link, Outlet } from 'react-router-dom';

export default function WardHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add Ward</Link>
                    </li>
                    <li>
                        <Link to="delete">Delete Ward</Link>
                    </li>
                    <li>
                        <Link to="update">Update Ward</Link>
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
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
