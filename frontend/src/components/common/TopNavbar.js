import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TopNavbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "User";
  const role = localStorage.getItem("role") || "";

  const getDashboardRoute = () => {
    switch (role) {
      case "ADMIN": return "/admindd";
      case "DOCTOR": return "/doctordd";
      case "RECEPTIONIST": return "/receptionistdd";
      case "NURSE": return "/nursedd";
      case "FINANCEOFFICER": return "/financedd";
      case "COMPLIANCE_OFFICER": return "/compilancedd";
      default: return "/login";
    }
  };

  const toggleTheme = () => {
    const theme = document.documentElement.getAttribute("data-bs-theme");
    document.documentElement.setAttribute(
      "data-bs-theme",
      theme === "dark" ? "light" : "dark"
    );
  };

  return (
    <nav
  className="navbar sticky-top px-4 shadow d-flex align-items-center"
  style={{
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f3460 100%)",
    height: 64,
  }}
>

  {/* ✅ LEFT → Logo */}
  <div className="d-flex align-items-center">
    <Link to={getDashboardRoute()} className="text-decoration-none d-flex align-items-center gap-2">
      <div
        className="d-flex align-items-center justify-content-center rounded-3"
        style={{
          width: 40,
          height: 40,
          background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
        }}
      >
        <i className="bi bi-hospital text-white"></i>
      </div>

      <div>
        <div className="text-white fw-bold">MediServe360</div>
        <div style={{ fontSize: 10, color: "#ccc" }}>
          HOSPITAL SYSTEM
        </div>
      </div>
    </Link>
  </div>

  {/* ✅ CENTER → Search */}
  <div className="flex-grow-1 d-flex justify-content-center">
    <input
      className="form-control form-control-sm"
      placeholder="Search modules..."
      style={{ width: 300 }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* ✅ RIGHT → Icons + Profile */}
  <div className="d-flex align-items-center gap-3">

    {/* 🔔 Notification */}
    <button
      className="btn text-white"
      style={{ background: "rgba(255,255,255,0.07)" }}
    >
      <i className="bi bi-bell"></i>
    </button>

    {/* 🌙 Theme */}
    <button
      className="btn text-white"
      style={{ background: "rgba(255,255,255,0.07)" }}
      onClick={toggleTheme}
    >
      <i className="bi bi-moon-stars"></i>
    </button>

    {/* ✅ Profile Dropdown */}
    <div className="position-relative">

      <button
        className="btn d-flex align-items-center gap-2 text-white"
        style={{ background: "rgba(255,255,255,0.07)" }}
        onClick={() => setOpen(!open)}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32, background: "#3b82f6" }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>

        <span>{userName}</span>
        <i className="bi bi-caret-down-fill"></i>
      </button>

      {open && (
        <ul
          className="dropdown-menu show shadow animated-dropdown"
          style={{
            position: "absolute",
            right: 0,
            top: "110%",
            minWidth: 200,
          }}
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              My Profile
            </Link>
          </li>

          <li><hr className="dropdown-divider" /></li>

          <li>
            <button
              className="dropdown-item text-danger"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}

    </div>

  </div>

</nav>

  );
}