import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateUser() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetchUser();
    }, [id]);

    async function fetchUser() {
        const url = `http://localhost:9002/user/findbyid/${id}`;

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setName(res.data.userName);
            setRole(res.data.role);
            setPhone(res.data.phoneNumber);
            setPassword("");
        } catch (err) {
            toast.error(err.message);
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (!name || !role || !phone) {
            toast.warning("Please fill all required fields");
            return;
        }

        const data = {
            userName: name,
            userRole: role,
            phonenumber: phone,
            password: password
        };

        try {
            await axios.put(
                `http://localhost:9002/user/updateuser/${id}`,
                data,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            toast.success("User updated successfully");
            navigate("/user/findall");
        } catch (err) {
            toast.error(err.response.data.errorMessage);
        }
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Update User</h3>

            <form onSubmit={submitHandler}>

                <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input
                        className="form-control"
                        type="text"
                        value={id}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">--Select Role--</option>
                        <option value="PATIENT">Patient</option>
                        <option value="DOCTOR">Doctor</option>
                        <option value="NURSE">Nurse</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FINANCEOFFICER">Finance Officer</option>
                        <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        className="form-control"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="text"
                        value={password}
                        placeholder="Leave blank to keep current password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-warning w-100" type="submit">
                    Update
                </button>

            </form>
        </div>
    );
}