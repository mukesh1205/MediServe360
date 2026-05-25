import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FindAllBeds() {

    let [bedArr, setBedArr] = useState([]);

    useEffect(() => {
        let url = "http://localhost:9002/bed/getAllBeds";
        axios.get(url)
            .then((response) => {
                setBedArr(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>All Beds</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Bed ID</th>
                        <th>Bed Status</th>
                        <th>Patient ID</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bedArr.map((bed) => {
                            return (
                                <tr key={bed.bedId}>
                                    <td>{bed.bedId}</td>
                                    <td>{bed.bedStatus}</td>
                                    <td>{bed.patient ? bed.patient.patientId : "Not Assigned"}</td>
                                    <td>
                                        <Link to={"/bed/update/" + bed.bedId}>Update</Link>
                                    </td>
                                    <td>
                                        <Link to={"/bed/delete/" + bed.bedId}>Delete</Link>
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
