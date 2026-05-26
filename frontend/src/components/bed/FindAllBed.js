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
                alert(error.message);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2>All Beds</h2>

            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
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
                                        <Link className="btn btn-warning btn-sm" to={"/bed/update/" + bed.bedId}>Update</Link>
                                    </td>
                                    <td>
                                        <Link className="btn btn-danger btn-sm" to={"/bed/delete/" + bed.bedId}>Delete</Link>
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
