import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddDoctor() {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [availabilitySchedule, setAvailabilitySchedule] = useState("");

    const nameHandler = (event) => setName(event.target.value);
    const departmentHandler = (event) => setDepartment(event.target.value);
    const availabilityHandler = (event) => setAvailabilitySchedule(event.target.value);

    const buttonHandler = () => {
        let url = "http://localhost:9002/api/doctors/add";

        if (!name.trim() || !department.trim() || !availabilitySchedule.trim()) {
            toast.warning("Please fill all fields");
            return;
        }

        const regex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
        if (!regex.test(availabilitySchedule)) {
            toast.warning("Enter availability in 24-hour format HH:mm-HH:mm (e.g., 08:00-20:00)");
            return;
        }

        const [start, end] = availabilitySchedule.split("-");
        if (start >= end) {
            toast.warning("Start time must be earlier than end time");
            return;
        }

        let data = {
            doctor: {
                name,
                department,
                availabilitySchedule
            }
        };

        axios.post(url, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            toast.success("Doctor added successfully");
            setName("");
            setDepartment("");
            setAvailabilitySchedule("");
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Error adding doctor");
        });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Add Doctor</h3>

            <div className="mb-3">
                <label className="form-label">Doctor Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={name}
                    placeholder="Enter doctor name"
                    onChange={nameHandler}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                    className="form-control"
                    type="text"
                    value={department}
                    placeholder="Enter department"
                    onChange={departmentHandler}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Availability Schedule</label>
                <input
                    className="form-control"
                    type="text"
                    value={availabilitySchedule}
                    placeholder="08:00-20:00"
                    onChange={availabilityHandler}
                    required
                />
                <small className="text-muted">Format: HH:mm-HH:mm (24‑hour)</small>
            </div>

            <button className="btn btn-primary w-100" onClick={buttonHandler}>
                Add Doctor
            </button>
        </div>
    );
}
