import { Link, Outlet, useLocation } from "react-router-dom";
import Signout from "../Auth/Signout";

const quickActions = [
  { to: "add",       label: "Add User",       icon: "➕" },
  { to: "find",      label: "Find User",      icon: "🔍" },
  { to: "findall",   label: "All Users",      icon: "👥" },
  { to: "paginated", label: "Paginated View", icon: "📄" },
];

const roleInfo = [
  { role: "Admin",              icon: "⚙️",  desc: "Full system access, manages all modules and settings." },
  { role: "Doctor",             icon: "👨‍⚕️", desc: "Views and manages patient appointments and records." },
  { role: "Nurse",              icon: "🏥",  desc: "Handles bed and ward assignments for patients." },
  { role: "Patient",            icon: "🧑",  desc: "Can view personal appointments and health info." },
  { role: "Finance Officer",    icon: "💰",  desc: "Manages invoices, insurance claims and billing." },
  { role: "Compliance Officer", icon: "📋",  desc: "Oversees compliance reports and regulatory audits." },
];

export default function UserHome() {
  const location = useLocation();
  const isHome = location.pathname === "/user" || location.pathname === "/user/";

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/user">
            👤 User Management
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row gap-2">
              <li className="nav-item">
                <Link className="nav-link" to="add">Add User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="find">Find User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="findall">Get All Users</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link" to="paginated">Paginated</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Signout />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isHome && (
        <div className="container-fluid px-4 py-4">

          {/* Hero Banner */}
          <div
            className="rounded-3 p-4 mb-4 text-white d-flex align-items-center gap-4"
            style={{ background: "linear-gradient(135deg, #1a73a7 0%, #0d4f73 100%)" }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 64, height: 64, background: "rgba(255,255,255,0.15)" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="12" y="4" width="8" height="24" rx="2" fill="white"/>
                <rect x="4" y="12" width="24" height="8" rx="2" fill="white"/>
              </svg>
            </div>
            <div>
              <h4 className="fw-bold mb-1">MediServe360 — User Management</h4>
              <p className="mb-0 small" style={{ opacity: 0.85 }}>
                Manage hospital staff, patients, and role-based access from a single place.
                Use the actions below to add, search, or browse all registered users in the system.
              </p>
            </div>
          </div>

          {/* Quick Actions + Role Guide */}
          <div className="row g-3">

            {/* Quick Actions */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                  <h6 className="fw-bold mb-0 text-dark">⚡ Quick Actions</h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {quickActions.map((a) => (
                      <div className="col-6" key={a.to}>
                        <Link
                          to={a.to}
                          className="btn btn-outline-dark w-100 py-3 d-flex flex-column align-items-center gap-2 text-decoration-none"
                          style={{ borderRadius: "10px", minHeight: "80px" }}
                        >
                          <span style={{ fontSize: "1.4rem" }}>{a.icon}</span>
                          <span className="small fw-semibold" style={{ fontSize: "0.75rem" }}>{a.label}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Role Reference Guide */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                  <h6 className="fw-bold mb-0 text-dark">🏥 Hospital Role Guide</h6>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {roleInfo.map((r) => (
                      <li key={r.role} className="list-group-item border-0 px-3 py-3 d-flex align-items-start gap-3">
                        <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{r.icon}</span>
                        <div>
                          <p className="fw-semibold mb-0 small text-dark">{r.role}</p>
                          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>{r.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}
