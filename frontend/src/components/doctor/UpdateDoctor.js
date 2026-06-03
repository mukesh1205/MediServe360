import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateDoctor() {
    const { id } = useParams();   // route param
    const navigate = useNavigate();

    let [name, setName] = useState("");
    let [department, setDepartment] = useState("");
    let [availabilitySchedule, setAvailabilitySchedule] = useState("");

    // Load doctor details automatically
    useEffect(() => {
        axios.get(`http://localhost:9002/api/doctor/get/${id}`,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                let doc = res.data;
                setName(doc.name);
                setDepartment(doc.department);
                setAvailabilitySchedule(doc.availabilitySchedule);
            })
            .catch(() => alert("Doctor not found"));
    }, [id]);

    let updateHandler = () => {
        let url = "http://localhost:9002/api/doctor/update";

        // backend expects DoctorDTO with "doctor" wrapper
        let data = {
            doctor: {
                id: parseInt(id),
                name,
                department,
                availabilitySchedule
            }
        };

        axios.put(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                alert(res.data.message); // "Doctor updated successfully"
                navigate("/doctor/display"); // back to list
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.message || "Error updating doctor");
            });
    };

    return (
        <div>
            <h2>Edit Doctor {id}</h2>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} /><br />
            <label>Department</label>
            <input value={department} onChange={(e) => setDepartment(e.target.value)} /><br />
            <label>Availability</label>
            <input value={availabilitySchedule} onChange={(e) => setAvailabilitySchedule(e.target.value)} /><br />
            <button onClick={updateHandler}>Update</button>
        </div>
    );
}