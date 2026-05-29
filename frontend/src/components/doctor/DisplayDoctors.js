import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DisplayDoctors() {

    let [doctors, setDoctors] = useState([]);

    useEffect(() => {
        let url = "http://localhost:9002/api/doctor/getAll"; // ✅ use correct endpoint

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((response) => {
                // If backend returns array directly:
                setDoctors(response.data);

                // If backend wraps in DTO:
                // setDoctors(response.data.doctors);
            })
            .catch((error) => {
                console.error("Error fetching doctors", error);
            });

    }, []);

    return (
        <div>
            <h2>Doctors List</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Availability</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        doctors.map((d) => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.department}</td>
                                <td>{d.availabilitySchedule}</td>
                                <td>
                                    <Link to={`/doctor/delete/${d.id}`}>Delete</Link>
                                </td>
                                <td>
                                    <Link to={`/doctor/update/${d.id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
