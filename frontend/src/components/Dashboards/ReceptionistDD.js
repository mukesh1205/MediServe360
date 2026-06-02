import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import DisplayPatients from "../patient/DisplayPatients";
import TopNavbar from "../common/TopNavbar";

export default function ReceptionistDD() {
  const location = useLocation();

  return (
    <div className="container-fluid">
      
      <TopNavbar/>

      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/receptionistdd" ? "active" : ""
                  }`}
                  to="/receptionistdd"
                >
                  📊 Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith("/patient") ? "active" : ""
                  }`}
                  to="/patient/display"
                >
                  🧾 Manage Patients
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith("/appointment") ? "active" : ""
                  }`}
                  to="/appointment"
                >
                  📅 Appointments
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith("/doctor") ? "active" : ""
                  }`}
                  to="/doctor"
                >
                  👨‍⚕️ Doctors
                </Link>
              </li>
            </ul>

            <hr />

            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                  to="/profile"
                >
                  👤 My Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  ⚙️ Settings
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="mt-3 mb-3 d-flex flex-wrap gap-2">
            <Link to="/patient/add" className="btn btn-primary">
              <i className="bi bi-person-plus me-1"></i>
              Add Patient
            </Link>

            <Link to="/appointment/add" className="btn btn-success">
              <i className="bi bi-calendar-check me-1"></i>
              Book Appointment
            </Link>

            <Link to="/doctor/display" className="btn btn-outline-dark">
              <i className="bi bi-hospital me-1"></i>
              View Doctors
            </Link>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Total Patients</h6>
                <h3>120</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Appointments Today</h6>
                <h3>35</h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>Doctors Available</h6>
                <h3>8</h3>
              </div>
            </div>
          </div>

          <DisplayPatients />
        </main>
      </div>
    </div>
  );
}