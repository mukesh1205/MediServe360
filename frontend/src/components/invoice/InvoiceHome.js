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
                        <Link to="display">Display Invoices</Link>
                    </li>
                    <li>
                        <Link to="displayPaginated">Display Invoices Paginated</Link>
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