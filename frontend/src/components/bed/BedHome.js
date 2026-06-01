import { Link, Outlet, useLocation } from 'react-router-dom';
import Signout from '../Auth/Signout';

export default function BedHome() {
    const location = useLocation();

    const navLinks = [
        { to: "add", label: "Add Bed", icon: "➕" },
        { to: "find", label: "Find Bed", icon: "🔍" },
        { to: "findAll", label: "All Beds", icon: "🛏️" },
        { to: "assignBed", label: "Assign Bed", icon: "👤" },
        { to: "dischargeBed", label: "Discharge", icon: "🚪" },
        { to: "pages", label: "Pages", icon: "📄" },
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
            {/* Top Header Bar */}
            <div style={{ backgroundColor: "#0d6efd", padding: "10px 0" }}>
                <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: "1.5rem" }}>🏥</span>
                        <span style={{ color: "white", fontWeight: "700", fontSize: "1.3rem", letterSpacing: "0.5px" }}>
                            MediServe <span style={{ color: "#cfe2ff" }}>360</span>
                        </span>
                        <span style={{ color: "#cfe2ff", marginLeft: "8px", fontSize: "0.85rem" }}>| Bed Management</span>
                    </div>
                    <Signout />
                </div>
            </div>

            {/* Navigation Bar */}
            <div style={{ backgroundColor: "white", borderBottom: "2px solid #e9ecef", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="container-fluid px-4">
                    <ul className="nav" style={{ gap: "4px" }}>
                        {navLinks.map(link => {
                            const isActive = location.pathname.includes(link.to);
                            return (
                                <li className="nav-item" key={link.to}>
                                    <Link
                                        className="nav-link d-flex align-items-center gap-1"
                                        to={link.to}
                                        style={{
                                            color: isActive ? "#0d6efd" : "#495057",
                                            fontWeight: isActive ? "600" : "400",
                                            borderBottom: isActive ? "3px solid #0d6efd" : "3px solid transparent",
                                            borderRadius: "0",
                                            padding: "14px 16px",
                                            fontSize: "0.9rem",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <span>{link.icon}</span>
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Page Content */}
            <div className="container-fluid px-4 py-4">
                <Outlet />
            </div>
        </div>
    );
}
