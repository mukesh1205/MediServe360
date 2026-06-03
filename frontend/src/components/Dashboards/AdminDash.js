import { Link } from "react-router";
import Signout from "../Auth/Signout";
import { useState,useEffect } from "react";
import axios from "axios";

const navLinks = [
  { to: "/user", label: "User", icon: "👤" },
  { to: "/patient", label: "Patient", icon: "🏥" },
  { to: "/doctor", label: "Doctor", icon: "👨‍⚕️" },
  { to: "/bed", label: "Bed", icon: "🛏️" },
  { to: "/ward", label: "Ward", icon: "🏨" },
  { to: "/insuranceClaim", label: "Insurance Claim", icon: "🛡️" },
  { to: "/compliance_report", label: "Compliance Report", icon: "📋" },
  { to: "/invoice", label: "Invoice", icon: "🧾" },
  { to: "/auditlog", label: "Audit Log", icon: "🔍" },
  { to: "/notification", label: "Notification", icon: "🔔" },
  { to: "/kpi_report", label: "KPI Report", icon: "📊" },
  { to: "/appointment", label: "Appointment", icon: "📅" },
];



const recentActivity = [
  { icon: "👤", text: "New user account created for Dr. Sharma" },
  { icon: "🛡️", text: "Insurance claim #88 submitted" },
  { icon: "📋", text: "Compliance report generated for June" },
  { icon: "🔍", text: "Audit log reviewed by Admin" },
  { icon: "📊", text: "KPI report updated with latest metrics" },
];

const quickActions = [
  { to: "/user/add", label: "Add User", icon: "➕", color: "primary" },
  { to: "/invoice/add", label: "Create Invoice", icon: "🧾", color: "success" },
  { to: "/kpi_report", label: "View KPI Report", icon: "📊", color: "dark" },
];

export default function AdminDash() {

    const [totalUsers,setTotalUsers]=useState(0);
    const [totalPatients,setTotalPatients]=useState(0);
    const [totalBeds,setTotalBeds]=useState(0);

    const stats = [
      {
        label: "Total Users",
        value: totalUsers,
        change: "+3 this week",
        pos: true,
        icon: "👤",
        color: "primary",
      },
      {
        label: "Active Patients",
        value: totalPatients,
        change: "+8 since yesterday",
        pos: true,
        icon: "🏥",
        color: "success",
      },
      {
        label: "Beds Occupied",
        value: totalBeds,
        change: "-5 available",
        pos: false,
        icon: "🛏️",
        color: "warning",
      },
      {
        label: "Pending Invoices",
        value: "17",
        change: "+2 since yesterday",
        pos: false,
        icon: "🧾",
        color: "danger",
      },
    ];
    const [userData,setUserData]=useState([]);
    const [patientData,setPatientData]=useState([]);
    async function getUsers(){
      try{
        let url="http://localhost:9002/user/fetchallusers";
        let res=await axios.get(url,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

        setUserData(res.data);
        setTotalUsers(res.data.length);

      }catch(err){
        alert(err.message)
      }
    }

    async function getpatient(){
      try{
        let url="http://localhost:9002/api/patient/fetchAllPatients";
        let res=await axios.get(url,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
        setPatientData(res.data);

        let count=0;
        for(let i=0;i<(res.data.length);i++){
          if(res.data[i].patientStatus==="Admitted"){
            count++;
          }
        }

        setTotalPatients(count);
      }
      catch(err){
        alert(err.message);
      }
    }
    const [bedData,setBedData]=useState([]);
    async function getBeds(){
      try{

        let url="http://localhost:9002/api/beds/getAllBeds"

        let res=await axios.get(url,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

        setBedData(res.data);
        let count=0;
        for(let i=0;i<(res.data.length);i++){
          if(res.data[i].bedStatus==="OCCUPIED"){
            count++;
          }
        }

        setTotalBeds(count);

      }catch(err){
        alert(err.message);
      }
    }

    useEffect(()=>{
      getUsers();
      getpatient();
      getBeds();
    },[])
  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold fs-5">⚙️ Admin Portal</span>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Signout />
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">

        {/* Header */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-1">Admin Dashboard</h4>
          <p className="text-muted small mb-0">
            Overview · System management · Operations
          </p>
        </div>

        {/* Stats */}
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

        {/* Modules + Activity */}
        <div className="row g-3">

          {/* Modules */}
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
                        className="btn btn-outline-dark w-100 py-3 d-flex flex-column align-items-center gap-2 text-decoration-none"
                        style={{ borderRadius: "10px" }}
                      >
                        <span style={{ fontSize: "1.6rem" }}>{link.icon}</span>
                        <span className="small fw-semibold" style={{ fontSize: "0.78rem" }}>{link.label}</span>
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

        {/* Quick Actions */}
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
