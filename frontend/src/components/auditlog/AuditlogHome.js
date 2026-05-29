import { Link, Outlet, useLocation } from "react-router";
import Signout from "../Auth/Signout";

const quickActions = [
  { to: "add",       label: "Add Log",        icon: "➕" },
  { to: "find",      label: "Find Log",       icon: "🔍" },
  { to: "findall",   label: "All Logs",       icon: "📋" },
  { to: "paginated", label: "Paginated View", icon: "📄" },
];

const auditInfo = [
  {
    icon: "🔐",
    title: "Login & Logout Events",
    desc: "Every staff login and logout across all roles is automatically recorded with a timestamp for security tracking.",
  },
  {
    icon: "🔄",
    title: "Role & Permission Changes",
    desc: "Any change to a user's role or access level is captured so administrators can trace who made the change and when.",
  },
  {
    icon: "📋",
    title: "Patient Record Access",
    desc: "Tracks which staff members accessed or modified patient records, supporting HIPAA and hospital compliance requirements.",
  },
  {
    icon: "💰",
    title: "Finance & Billing Actions",
    desc: "Invoice creation, approval, and insurance claim updates are logged to ensure financial accountability.",
  },
  {
    icon: "🚨",
    title: "Critical & Suspicious Events",
    desc: "Unauthorized access attempts and policy violations are flagged automatically for immediate review by the admin.",
  },
  {
    icon: "📅",
    title: "Appointment Modifications",
    desc: "All appointment bookings, reschedules, and cancellations are recorded against the responsible user.",
  },
];

export default function AuditlogHome() {
  const location = useLocation();
  const isHome = location.pathname === "/auditlog" || location.pathname === "/auditlog/";

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/auditlog">
            🔍 Audit Log
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="add">Add AuditLog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="find">Get AuditLog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="findall">Get All AuditLog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="paginated">AuditLog Paginated</Link>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Signout />
            </li>
          </ul>
        </div>
      </nav>

      {isHome && (
        <div className="container-fluid px-4 py-4">

          {/* Hero Banner */}
          <div
            className="rounded-3 p-4 mb-4 text-white d-flex align-items-center gap-4"
            style={{ background: "linear-gradient(135deg, #1a3c5e 0%, #0d4f73 100%)" }}
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
              <h4 className="fw-bold mb-1">MediServe360 — Audit Log</h4>
              <p className="mb-0 small" style={{ opacity: 0.85 }}>
                Every action performed across the hospital system is tracked here. Use audit logs to ensure
                accountability, meet compliance requirements, and investigate any suspicious activity across all roles.
              </p>
            </div>
          </div>

          {/* Quick Actions + Audit Info */}
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

            {/* What Gets Logged */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                  <h6 className="fw-bold mb-0 text-dark">📋 What Gets Logged in MediServe360</h6>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {auditInfo.map((item) => (
                      <li key={item.title} className="list-group-item border-0 px-3 py-3 d-flex align-items-start gap-3">
                        <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
                        <div>
                          <p className="fw-semibold mb-0 small text-dark">{item.title}</p>
                          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>{item.desc}</p>
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
