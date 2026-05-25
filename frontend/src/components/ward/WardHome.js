import {Link, Outlet } from "react-router";

export default function WardHome(){
    return(
        <div>
            <nav>
                <ul>
                <li>
                <Link to="add">add ward</Link>
                </li>
                 <li>
                <Link to="update">update ward</Link>
                </li>
                 <li>
                <Link to="delete">delete ward</Link>
                </li>
                 <li>
                <Link to="find">find ward</Link>
                </li>
                 <li>
                <Link to="findall">find all ward</Link>
                </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}