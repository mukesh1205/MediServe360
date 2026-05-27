import { useState } from "react";
import axios from "axios";

export default function AddUser() {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const nameHandler = (e) => setName(e.target.value);
    const roleHandler = (e) => setRole(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const phoneHandler = (e) => setPhone(e.target.value);

    async function submitHandler(e) {
        e.preventDefault(); // ✅ prevent reload

        const token = localStorage.getItem("token");

        if (!token) {
            alert("❌ Please login first");
            return;
        }

        // ✅ Correct data format
        const data = {
            userName: name,
            userRole: role,        // Make sure backend expects ROLE format if needed
            userEmail: email,
            userPhone: phone,
            password: "123456"
        };

        try {
            const res = await axios.post(
                "http://localhost:9002/api/users/add",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            alert(res.data.message || "✅ User added successfully");

            // ✅ clear form after success
            setName("");
            setRole("");
            setEmail("");
            setPhone("");

        } catch (err) {
            console.error(err);
            alert(err.response?.data || "❌ Error adding user");
        }
    }

    return (
        <div>
            <h2>Add User</h2>

            <form onSubmit={submitHandler}>

                <label>Name</label><br />
                <input type="text" value={name} onChange={nameHandler} required />
                <br /><br />

                <label>Role</label><br />
                <select value={role} onChange={roleHandler} required>
                    <option value="">Select Role</option>
                    <option value="ROLE_ADMIN">Admin</option>
                    <option value="ROLE_DOCTOR">Doctor</option>
                    <option value="ROLE_NURSE">Nurse</option>
                    <option value="ROLE_RECEPTIONIST">Receptionist</option>
                </select>
                <br /><br />

                <label>Email</label><br />
                <input type="email" value={email} onChange={emailHandler} required />
                <br /><br />

                <label>Phone</label><br />
                <input type="text" value={phone} onChange={phoneHandler} required />
                <br /><br />

                <button type="submit">Submit</button>

            </form>
        </div>
    );
}