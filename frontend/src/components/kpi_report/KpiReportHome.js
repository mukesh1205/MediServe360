import { Link, Outlet } from 'react-router-dom';

export default function KpiReportHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add KpiReport</Link>
                    </li>
                    <li>
                        <Link to="delete">Delete KpiReport</Link>
                    </li>
                    <li>
                        <Link to="update">Update KpiReport</Link>
                    </li>
                    <li>
                        <Link to="find">Find KpiReport</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}
