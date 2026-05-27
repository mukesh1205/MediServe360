import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// USER
import UserHome from './components/user/UserHome';
import AddUser from './components/user/AddUser';
import DeleteUser from './components/user/DeleteUser';
import UpdateUser from './components/user/UpdateUser';
import FindUser from './components/user/FindUser';
import FindAllUser from './components/user/FindAllUser';

// AUDIT
import AuditlogHome from './components/auditlog/AuditlogHome';
import AddAuditlog from './components/auditlog/AddAuditlog';
import FindAuditlog from './components/auditlog/FindAuditlog';
import FindAllAuditlog from './components/auditlog/FindAllAuditlog';

// NOTIFICATION
import NotificationHome from './components/notification/NotificationHome';
import AddNotification from './components/notification/AddNotification';
import UpdateNotification from './components/notification/UpdateNotification';
import DeleteNotification from './components/notification/DeleteNotification';
import FindNotification from './components/notification/FindNotification';
import FindAllNotification from './components/notification/FindAllNotification';

// ✅ NEW: COMPLIANCE
import ComplianceReportHome from './components/compliance_report/ComplianceReportHome';
import AddCompliance from './components/compliance_report/AddCompliance';
import DisplayCompliance from './components/compliance_report/DisplayCompliance';
import DeleteCompliance from './components/compliance_report/DeleteCompliance';
import FindCompliance from './components/compliance_report/FindCompliance';
import UpdateCompliance from './components/compliance_report/UpdateCompliance';
import DisplayCompliancePaginated from './components/compliance_report/DisplayCompliancePaginated';



// ✅ NEW: KPI
import KpiReportHome from './components/kpi_report/KpiReportHome';
import AddKpiReport from './components/kpi_report/AddKpi';

import DisplayKpi from './components/kpi_report/DisplayKpi';
import FindKpi from './components/kpi_report/FindKpi';





function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    localStorage.clear();

    axios.post("http://localhost:9002/api/auth/login", {
      userEmail: "admin@gmail.com",
      password: "123456"
    })
    .then((res) => {

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userName", res.data.userName);

      console.log("✅ Auto logged in as Admin");

      setLoading(false);

    })
    .catch((err) => {
      console.log("❌ Login failed:", err.response?.data || err.message);
      setLoading(false);
    });

  }, []);

  if (loading) {
    return <div>Logging in...</div>;
  }

  return (
    <Router>

      <Routes>

        {/* ✅ USER */}
        <Route path="/user" element={<UserHome />}>
          <Route path="add" element={<AddUser />} />
          <Route path="update" element={<UpdateUser />} />
          <Route path="delete" element={<DeleteUser />} />
          <Route path="find" element={<FindUser />} />
          <Route path="findall" element={<FindAllUser />} />
        </Route>

        {/* ✅ AUDIT */}
        <Route path="/auditlog" element={<AuditlogHome />}>
          <Route path="add" element={<AddAuditlog />} />
          <Route path="find" element={<FindAuditlog />} />
          <Route path="findall" element={<FindAllAuditlog />} />
        </Route>

        {/* ✅ NOTIFICATION */}
        <Route path="/notification" element={<NotificationHome />}>
          <Route path="add" element={<AddNotification />} />
          <Route path="update" element={<UpdateNotification />} />
          <Route path="delete" element={<DeleteNotification />} />
          <Route path="find" element={<FindNotification />} />
          <Route path="findall" element={<FindAllNotification />} />
        </Route>

        {/* ✅ COMPLIANCE */}
        <Route path="/compliance-reports" element={<ComplianceReportHome />}>
          <Route path="add" element={<AddCompliance />} />
          
          <Route path="display" element={<DisplayCompliance />} />
          <Route path="delete/:id" element={<DeleteCompliance />} />
          
             <Route path="find" element={<FindCompliance />} />
          <Route path="update/:id" element={<UpdateCompliance />} />
          <Route path="paginated" element={<DisplayCompliancePaginated />} />



        </Route>

        {/* ✅ KPI */}
        <Route path="/kpi_report" element={<KpiReportHome />}>
          <Route path="add" element={<AddKpiReport />} />
          
            <Route path="display" element={<DisplayKpi />} />
          <Route path="find" element={<FindKpi />} />

        </Route>

      </Routes>

    </Router>
  );
}

export default App;