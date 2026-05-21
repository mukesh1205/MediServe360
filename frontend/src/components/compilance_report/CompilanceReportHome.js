import { Link, Outlet } from 'react-router-dom';

export default function CompilanceReportHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add CompilanceReport</Link>
                    </li>
                    <li>
                        <Link to="delete">Delete CompilanceReport</Link>
                    </li>
                    <li>
                        <Link to="update">Update CompilanceReport</Link>
                    </li>
                    <li>
                        <Link to="find">Find CompilanceReport</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}