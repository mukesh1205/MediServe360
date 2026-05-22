import { Link, Outlet } from 'react-router-dom';

export default function InsuranceClaimHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add Insurance Claim</Link>
                    </li>
                    <li>
                        <Link to="update">Update Insurance Claim</Link>
                    </li>
                    <li>
                        <Link to="delete">Delete Insurance Claim</Link>
                    </li>
                    <li>
                        <Link to="find">Find Insurance Claim</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}