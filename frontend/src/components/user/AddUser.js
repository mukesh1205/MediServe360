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
        e.preventDefault(); // ✅ PREVENT FORM REFRESH

        // ✅ CORRECT DATA FORMAT (IMPORTANT)
        const data = {
            userName: name,
            userRole: role,
            userEmail: email,
            userPhone: phone,
            password: "123456" // ✅ required by backend
        };

        try {
            const res = await axios.post(
                "http://localhost:9002/api/users/add",
                data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") // ✅ JWT
                    }
                }
            );

            alert(res.data.message);

        } catch (err) {
            console.log(err);
            alert("Error: " + err.response?.data?.message || err.message);
        }
    }

    return (
        <div>
            <h2>Add User</h2>

            <form onSubmit={submitHandler}>

                <label>Name</label><br/>
                <input type="text" onChange={nameHandler} required /><br/><br/>

                <label>Role</label><br/>
                <select onChange={roleHandler} required>
                    <option value="">Select Role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="NURSE">Nurse</option>
                    <option value="RECEPTIONIST">Receptionist</option>
                </select><br/><br/>

                <label>Email</label><br/>
                <input type="email" onChange={emailHandler} required /><br/><br/>

                <label>Phone</label><br/>
                <input type="text" onChange={phoneHandler} required /><br/><br/>

                <button type="submit">Submit</button>

            </form>
        </div>
    );
}