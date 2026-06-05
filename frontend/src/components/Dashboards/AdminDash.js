import { Link } from "react-router-dom";
import TopNavbar from "../common/TopNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

const navLinks = [
  { to: "/user", label: "Users", icon: "👤" },
  { to: "/patient", label: "Patients", icon: "🏥" },
  { to: "/doctor", label: "Doctors", icon: "👨‍⚕️" },
  { to: "/bed", label: "Beds", icon: "🛏️" },
  { to: "/ward", label: "Ward", icon: "🏨" },
  { to: "/insuranceClaim", label: "Insurance", icon: "🛡️" },
  { to: "/compliance_report", label: "Compliance", icon: "📋" },
  { to: "/invoice", label: "Invoice", icon: "🧾" },
  { to: "/auditlog", label: "Audit Log", icon: "🔍" },
  { to: "/notification", label: "Notification", icon: "🔔" },
  { to: "/kpi_report", label: "KPI Report", icon: "📊" },
  { to: "/appointment", label: "Appointment", icon: "📅" },
];

const stats = [
  {
    label: "Total Users",
    value: "56",
    change: "+5 this week",
    pos: true,
    icon: "👤",
    color: "primary",
  },
  {
    label: "Total Doctors",
    value: "12",
    change: "+2 this week",
    pos: true,
    icon: "👨‍⚕️",
    color: "success",
  },
  {
    label: "Active Patients",
    value: "180",
    change: "+20 this month",
    pos: true,
    icon: "🏥",
    color: "warning",
  },
  {
    label: "System Alerts",
    value: "4",
    change: "-1 resolved",
    pos: false,
    icon: "🔔",
    color: "danger",
  },
];

const recentActivity = [
  { icon: "✅", text: "New user created successfully" },
  { icon: "🛏️", text: "Bed allocation updated" },
  { icon: "📄", text: "Audit log generated" },
  { icon: "⚠️", text: "Compliance issue flagged" },
  { icon: "📊", text: "KPI report updated" },
];

export default function AdminDash() {

    const [totalUsers,setTotalUsers]=useState(0);
    const [totalPatients,setTotalPatients]=useState(0);
    const [totalBeds,setTotalBeds]=useState(0);
    const userName=localStorage.getItem("userName");
    const stats = [
      {
        label: "Total Users",
        value: totalUsers,
        icon: "👤",
        color: "primary",
      },
      {
        label: "Active Patients",
        value: totalPatients,
        icon: "🏥",
        color: "success",
      },
      {
        label: "Beds Occupied",
        value: totalBeds,
        icon: "🛏️",
        color: "warning",
      },
      {
        label: "Pending Invoices",
        value: "17",
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

      {/* ✅ Global Navbar */}
      <TopNavbar />

      <div className="container-fluid px-4 py-4">

        {/* ✅ Header */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-1">Admin Dashboard</h4>
          <p className="text-muted small mb-0">
            Full system control · Manage all modules
          </p>
        </div>

        <div
          className="rounded-3 p-4 mb-4 text-white position-relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,110,253,0.85), rgba(10,88,202,0.85))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h4 className="mb-1">👋 Welcome back, {userName}!</h4>
          <p className="mb-0" style={{ opacity: 0.9 }}>
            Admin Dashboard · MediServe 360
          </p>
        </div>
        {/* ✅ Stats Cards */}
        <div className="row g-3 mb-4">
          {stats.map((s) => (
            <div className="col-12 col-sm-6 col-xl-3" key={s.label}>
              <div className={`card border-0 shadow-sm border-start border-4 border-${s.color}`}>
                <div className="card-body d-flex align-items-center gap-3">

                  <div
                    className={`bg-${s.color} bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center`}
                    style={{ width: 50, height: 50, fontSize: "1.5rem" }}
                  >
                    {s.icon}
                  </div>

                  <div>
                    <p className="text-muted small mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.7rem" }}>
                      {s.label}
                    </p>
                    <h5 className="fw-bold mb-1">{s.value}</h5>
                    {/* <span className={`small text-${s.pos ? "success" : "danger"}`}>
                      {s.pos ? "▲" : "▼"} {s.change}
                    </span> */}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Modules + Activity */}
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

          {/* ✅ Activity */}
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

      </div>
    </div>
  );
}