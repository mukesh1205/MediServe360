import axios from "axios";
import { useState } from "react";

export default function FindDoctor() {

    let [id, setId] = useState("");
    let [doctor, setDoctor] = useState(null);

    let findHandler = () => {

        if (!id) {
            alert("Enter Doctor ID");
            return;
        }

        let url = `http://localhost:9002/api/doctors/get/${id}`;

        axios.get(url)
            .then((res) => {
                setDoctor(res.data);   // ✅ Doctor returned directly (not DTO)
            })
            .catch((err) => {
                console.error(err);
                alert("Doctor not found");
                setDoctor(null);
            });
    };

    return (
        <div>

            <h3>Find Doctor</h3>

            <input
                placeholder="Enter Doctor ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <button onClick={findHandler}>Search</button>

            <br /><br />

            {doctor && (
                <div>
                    <h4>Doctor Details</h4>

                    <p><strong>ID:</strong> {doctor.id}</p>
                    <p><strong>Name:</strong> {doctor.name}</p>
                    <p><strong>Department:</strong> {doctor.department}</p>
                    <p>
                        <strong>Availability:</strong> {doctor.availabilitySchedule}
                    </p>
                </div>
            )}

        </div>
    );
}