import axios from "axios";
import { useState } from "react";

export default function AddDoctor() {

    let [name, setName] = useState("");
    let [department, setDepartment] = useState("");
    let [availabilitySchedule, setAvailabilitySchedule] = useState("");

    let saveHandler = () => {

        // ✅ Validation
        if (!name || !department || !availabilitySchedule) {
            alert("Please fill all fields");
            return;
        }

        let url = "http://localhost:9002/api/doctor/add";

        let data = {
            "doctor": {
                "name": name,
                "department": department,
                "availabilitySchedule": availabilitySchedule
            }
        };

        axios.post(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((response) => {

                alert(response.data.message); // ✅ "Doctor added successfully"

                // ✅ Reset form
                setName("");
                setDepartment("");
                setAvailabilitySchedule("");

            })
            .catch((error) => {
                alert(
                    error.response?.data?.message ||
                    "Error adding doctor"
                );
            });
    };

    return (
        <div>

            <h2>Add Doctor</h2>

            <label>Name</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />

            <label>Department</label>
            <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <br />

            <label>Availability (HH:mm-HH:mm)</label>
            <input
                placeholder="08:00-20:00"
                value={availabilitySchedule}
                onChange={(e) => setAvailabilitySchedule(e.target.value)}
            />
            <br />

            <button onClick={saveHandler}>Save Doctor</button>

        </div>
    );
}