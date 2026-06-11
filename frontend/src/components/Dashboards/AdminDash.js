import { Link, Outlet, useLocation } from "react-router";
import Signout from "../Auth/Signout";
import { useState, useEffect } from "react";
import axios from "axios";

const navLinks = [
  { to: "userp", label: "User", icon: "👤" },
  { to: "patientp", label: "Patient", icon: "🏥" },
  { to: "doctorp", label: "Doctor", icon: "👨‍⚕️" },
  { to: "bedp", label: "Bed", icon: "🛏️" },
  { to: "wardp", label: "Ward", icon: "🏨" },
  { to: "adminp", label: "Audit Log", icon: "🔍" },
  { to: "notificationp", label: "Notification", icon: "🔔" },
  { to: "appointmentp", label: "Appointment", icon: "📅" },
  { to: "userapproval", label: "User Approval", icon: "✅" },
];

export default function AdminDash() {
  const location = useLocation();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalBeds, setTotalBeds] = useState(0);
  const [totalDoctors,setTotalDoctors]=useState(0);
  const stats = [
    { label: "Total Users", value: totalUsers, icon: "👤", color: "primary" },
    { label: "Active Patients", value: totalPatients, icon: "🏥", color: "success" },
    { label: "Beds Occupied", value: totalBeds, icon: "🛏️", color: "warning" },
    { label: "Active Doctors", value: totalDoctors, icon: "🧾", color: "danger" },
  ];

  async function getUsers() {
    try {
      const res = await axios.get("http://localhost:9002/user/fetchallusers", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setTotalUsers(res.data.length);
    } catch (err) {
      alert(err.message);
    }
  }

  async function getDoctors(){
    try{
      const res=await axios.get("http://localhost:9002/api/doctor/getAll",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token")
        },
      })
      setTotalDoctors(res.data.length);
    }catch(err){
      alert(err.message);
    }
  }

  async function getPatient() {
    try {
      const res = await axios.get("http://localhost:9002/api/patient/fetchAllPatients", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const count = res.data.filter((p) => p.patientStatus === "Admitted").length;
      setTotalPatients(count);
    } catch (err) {
      alert(err.message);
    }
  }

  async function getBeds() {
    try {
      const res = await axios.get("http://localhost:9002/api/beds/getAllBeds", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const count = res.data.filter((b) => b.bedStatus === "OCCUPIED").length;
      setTotalBeds(count);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    getUsers();
    getPatient();
    getBeds();
    getDoctors();
  }, []);

  const isSubRoute = navLinks.some((link) => location.pathname.startsWith(link.to));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f9fa" }}>

      <nav className="navbar navbar-dark bg-dark shadow-sm" style={{ flexShrink: 0 }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold fs-5">⚙️ Admin Portal</span>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Signout />
            </li>
          </ul>
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <aside
          style={{
            width: "220px",
            minWidth: "220px",
            backgroundColor: "#fff",
            borderRight: "1px solid #e5e7eb",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "14px 16px 10px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#9ca3af",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            Modules
          </div>

          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  color: isActive ? "#111827" : "#6b7280",
                  textDecoration: "none",
                  borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                  backgroundColor: isActive ? "#eff6ff" : "transparent",
                  fontWeight: isActive ? 600 : 400,
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "15px", width: "18px", textAlign: "center" }}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </aside>

        <main style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

          {!isSubRoute && (
            <>
              <div className="mb-3">
                <h4 className="fw-bold text-dark mb-1">Admin Dashboard</h4>
                <p className="text-muted small mb-0">Overview · System management · Operations</p>
              </div>

              <div className="row g-3 mb-3">
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
                          <h5 className="fw-bold mb-0">{s.value}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
}