import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        axios.post("http://localhost:9002/api/auth/login", { email, password })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userName", res.data.userName);

            const role = res.data.role;
            if (role === "ADMIN")                   navigate("/user");
            else if (role === "NURSE")              navigate("/bed");
            else if (role === "PATIENT")            navigate("/patient");
            else if (role === "DOCTOR")             navigate("/doctor");
            else if (role === "FINANCEOFFICER")     navigate("/kpi_report");
            else if (role === "COMPLIANCE_OFFICER") navigate("/compilance_report");
        })
        .catch(() => {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        });
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark px-3">
            <div className="card bg-black border border-secondary shadow-lg" style={{ width: "100%", maxWidth: 420 }}>
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
                        <p className="text-secondary small mb-0">Sign in to your account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="alert alert-danger py-2 small border-danger-subtle" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={login}>

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

                        <div className="mb-4">
                            <label className="form-label text-secondary small fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control bg-dark border-secondary text-white"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 fw-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Signing in...
                                </>
                            ) : "Sign In"}
                        </button>

                    </form>

                    <hr className="border-secondary my-4" />

                    <p className="text-center text-secondary small mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}
