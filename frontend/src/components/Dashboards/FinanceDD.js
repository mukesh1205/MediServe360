import { Link } from "react-router";
import Signout from "../Auth/Signout";

const navLinks = [
  { to: "/insuranceClaim", label: "Insurance Claim", icon: "🛡️" },
  { to: "/invoice",        label: "Invoice",         icon: "🧾" },
];

const stats = [
  { label: "Total Revenue",   value: "₹84.2L", change: "+12.4% this month",    pos: true,  icon: "💰", color: "primary" },
  { label: "Pending Claims",  value: "38",     change: "+5 since last week",    pos: false, icon: "🛡️", color: "warning" },
  { label: "Invoices Raised", value: "214",    change: "+18 this month",        pos: true,  icon: "🧾", color: "success" },
  { label: "Outstanding",     value: "₹12.7L", change: "-3.1% from last month", pos: true,  icon: "📊", color: "info"    },
];

const recentActivity = [
  { icon: "✅", text: "Insurance claim #CLM-441 approved for ₹58,000" },
  { icon: "💳", text: "Invoice INV-0091 marked as paid by Reliance Ltd." },
  { icon: "🕐", text: "New claim #CLM-442 submitted — under review" },
  { icon: "⚠️", text: "INV-0089 overdue by 7 days — reminder sent" },
  { icon: "📄", text: "Monthly reconciliation report generated" },
];

export default function FinanceDD() {
  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold fs-5">⬡ Finance Portal</span>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Signout />
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">

        {/* Page Header */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-1">Finance Dashboard</h4>
          <p className="text-muted small mb-0">Overview · FY 2025–26 · Updated just now</p>
        </div>

        {/* Stat Cards */}
        <div className="row g-3 mb-4">
          {stats.map((s) => (
            <div className="col-12 col-sm-6 col-xl-3" key={s.label}>
              <div className={`card border-0 shadow-sm h-100 border-start border-4 border-${s.color}`}>
                <div className="card-body d-flex align-items-center gap-3">
                  <div
                    className={`bg-${s.color} bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center`}
                    style={{ width: "52px", height: "52px", fontSize: "1.5rem", flexShrink: 0 }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                      {s.label}
                    </p>
                    <h5 className="fw-bold mb-1">{s.value}</h5>
                    <span className={`small text-${s.pos ? "success" : "danger"}`}>
                      {s.pos ? "▲" : "▼"} {s.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modules + Activity */}
        <div className="row g-3">

          {/* Module Grid */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0 text-dark">⬡ Modules</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {navLinks.map((link) => (
                    <div className="col-6 col-sm-4 col-md-3" key={link.to}>
                      <Link
                        to={link.to}
                        className="btn btn-outline-dark w-100 py-3 d-flex flex-column align-items-center gap-2 text-decoration-none"
                        style={{ borderRadius: "10px", minHeight: "90px" }}
                      >
                        <span style={{ fontSize: "1.6rem" }}>{link.icon}</span>
                        <span className="small fw-semibold" style={{ fontSize: "0.75rem" }}>{link.label}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0 text-dark">🔔 Recent Activity</h6>
              </div>
              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="list-group-item border-0 py-3 px-3 d-flex align-items-start gap-2">
                      <span className="mt-1">{a.icon}</span>
                      <span className="text-muted small" style={{ lineHeight: 1.5 }}>{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
