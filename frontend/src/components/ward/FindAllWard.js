import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FindAllWard() {

    let [wardArr, setWardArr] = useState([]);

    useEffect(() => {
        let url = "http://localhost:9002/ward/getAllWards";
        axios.get(url)
            .then((response) => {
                setWardArr(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>All Wards</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Ward ID</th>
                        <th>Ward Name</th>
                        <th>Ward Capacity</th>
                        <th>Ward Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wardArr.map((ward) => {
                            return (
                                <tr key={ward.wardId}>
                                    <td>{ward.wardId}</td>
                                    <td>{ward.wardname}</td>
                                    <td>{ward.wardcapacity}</td>
                                    <td>{ward.wardstatus}</td>
                                    <td>
                                        <Link to={"/ward/update/" + ward.wardId}>Update</Link>
                                    </td>
                                    <td>
                                        <Link to={"/ward/delete/" + ward.wardId}>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
