import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        if(phoneNumber.length!==10){
            setError("Please enter correct phone number");
            return;
        }

        if(password.length<6){
            setError("Password must not be less than 6 Characters")
        }
        if (!userName || !email || !password || !role || !phoneNumber) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        axios.post("http://localhost:9002/api/auth/register", {
            userName,
            email,
            password,
            role,
            phoneNumber,
        })
        .then(() => {
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        })
        .catch((err) => {
            if (err.response?.status === 400) {
                setError("Email already registered. Try a different one.");
            } else {
                setError("Registration failed. Please try again.");
            }
            setLoading(false);
        });
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark py-4 px-3">
            <div className="card bg-black border border-secondary shadow-lg" style={{ width: "100%", maxWidth: 480 }}>
                <div className="card-body p-4 p-md-5">

                    {/* Header */}
                    <div className="mb-4">
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <div className="rounded-2 d-flex align-items-center justify-content-center bg-primary"
                                style={{ width: 32, height: 32, flexShrink: 0 }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 8c-1.93 0-3.64-.98-4.65-2.47.02-.97 3.1-1.5 4.65-1.5s4.63.53 4.65 1.5C11.64 11.52 9.93 12.5 8 12.5z" fill="white"/>
                                </svg>
                            </div>
                            <h5 className="mb-0 fw-bold text-white">MediServe</h5>
                        </div>
                        <p className="text-secondary small mb-0">Create your account</p>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="alert alert-danger py-2 small border-danger-subtle" role="alert">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success py-2 small border-success-subtle" role="alert">
                            {success}
                        </div>
                    )}

                    <form onSubmit={register}>
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label className="form-label text-secondary small fw-semibold">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark border-secondary text-white"
                                    placeholder="Jane Doe"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-secondary small fw-semibold">Phone</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark border-secondary text-white"
                                    placeholder="+91 00000 00000"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary small fw-semibold">Email address</label>
                            <input
                                type="email"
                                className="form-control bg-dark border-secondary text-white"
                                placeholder="jane@hospital.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary small fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control bg-dark border-secondary text-white"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-secondary small fw-semibold">Role</label>
                            <select
                                className="form-select bg-dark border-secondary text-white"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="PATIENT">Patient</option>
                                <option value="DOCTOR">Doctor</option>
                                <option value="NURSE">Nurse</option>
                                <option value="FINANCEOFFICER">Finance Officer</option>
                                <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 fw-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating account...
                                </>
                            ) : "Create Account"}
                        </button>
                    </form>

                    <hr className="border-secondary my-4" />

                    <p className="text-center text-secondary small mb-0">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
