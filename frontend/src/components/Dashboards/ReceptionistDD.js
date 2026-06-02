import { Link } from "react-router-dom";
import TopNavbar from "../common/TopNavbar";

const navLinks = [
  { to: "/patient", label: "Patients", icon: "🧾" },
  { to: "/appointment", label: "Appointments", icon: "📅" },
  { to: "/doctor", label: "Doctors", icon: "👨‍⚕️" },
];

const stats = [
  {
    label: "Total Patients",
    value: "120",
    change: "+12 this week",
    pos: true,
    icon: "🧾",
    color: "primary",
  },
  {
    label: "Appointments Today",
    value: "35",
    change: "+5 compared yesterday",
    pos: true,
    icon: "📅",
    color: "success",
  },
  {
    label: "Doctors Available",
    value: "8",
    change: "-2 unavailable",
    pos: false,
    icon: "👨‍⚕️",
    color: "warning",
  },
  {
    label: "Completed Appointments",
    value: "28",
    change: "+3 since yesterday",
    pos: true,
    icon: "✅",
    color: "info",
  },
];


const recentActivity = [
  { icon: "✅", text: "New patient registered successfully" },
  { icon: "📅", text: "Appointment booked for Patient #102" },
  { icon: "❌", text: "Appointment #55 cancelled" },
  { icon: "👨‍⚕️", text: "Doctor Dr. Kumar marked unavailable" },
  { icon: "📄", text: "Patient report generated" },
];

const quickActions = [
  { to: "/patient/add", label: "Add Patient", icon: "➕", color: "primary" },
  { to: "/appointment/add", label: "Book Appointment", icon: "📅", color: "success" },
  { to: "/doctor/display", label: "View Doctors", icon: "👨‍⚕️", color: "dark" },
];

export default function ReceptionistDD() {

  return (
    <div className="min-vh-100 bg-light">

      {/* ✅ Navbar */}
      <TopNavbar />

      <div className="container-fluid px-4 py-4">

        {/* ✅ Header */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-1">Reception Dashboard</h4>
          <p className="text-muted small mb-0">
            Overview · Daily operations · Patient flow
          </p>
        </div>

        {/* ✅ Stats */}
        <div className="row g-3 mb-4">
          {stats.map((s) => (
            <div className="col-12 col-sm-6 col-xl-3" key={s.label}>
              <div className={`card border-0 shadow-sm border-start border-4 border-${s.color}`}>
                <div className="card-body d-flex align-items-center gap-3">

                  <div
                    className={`bg-${s.color} bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center`}
                    style={{ width: "52px", height: "52px", fontSize: "1.4rem" }}
                  >
                    {s.icon}
                  </div>

                  <div>
                    <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.7rem" }}>
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

        {/* ✅ MODULES + ACTIVITY */}
        <div className="row g-3">

          {/* ✅ Modules */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">⬡ Modules</h6>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {navLinks.map((link) => (
                    <div className="col-6 col-sm-4 col-md-3" key={link.to}>
                      <Link
                        to={link.to}
                        className="btn btn-outline-dark w-100 py-3 d-flex flex-column align-items-center gap-2"
                        style={{ borderRadius: "10px" }}
                      >
                        <span style={{ fontSize: "1.6rem" }}>{link.icon}</span>
                        <span className="small fw-semibold">{link.label}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Recent Activity */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="fw-bold mb-0">🔔 Recent Activity</h6>
              </div>

              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="list-group-item border-0 py-3 px-3 d-flex gap-2">
                      <span>{a.icon}</span>
                      <span className="text-muted small">{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ✅ Quick Actions */}
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-header bg-white border-bottom">
            <h6 className="fw-bold mb-0">⚡ Quick Actions</h6>
          </div>

          <div className="card-body d-flex flex-wrap gap-2">
            {quickActions.map((btn) => (
              <Link
                key={btn.to}
                to={btn.to}
                className={`btn btn-${btn.color}`}
              >
                {btn.icon} {btn.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}