import {Link, Outlet} from  'react-router-dom';

export default function InvoiceHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="add">Add Invoice</Link>
                    </li>
                    <li>
                        <Link to="update">Update Invoice</Link>
                    </li>
                    <li>
                        <Link to="delete">Delete Invoice</Link>
                    </li>
                    <li>
                        <Link to="find">Find Invoice</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}