import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Appointment
import AppointmentHome from './components/appointment/AppointmentHome';
import AddAppointment from './components/appointment/AddAppointment';
import DeleteAppointment from './components/appointment/DeleteAppointment';
import UpdateAppointment from './components/appointment/UpdateAppointment';
import FindAppointment from './components/appointment/FindAppointment';

// Patient
import PatientHome from './components/patient/PatientHome';
import AddPatient from './components/patient/AddPatient';
import DeletePatient from './components/patient/DeletePatient';
import UpdatePatient from './components/patient/UpdatePatient';
import FindPatient from './components/patient/FindPatient';
import DisplayPatients from './components/patient/DisplayPatients';
import DisplayPatientsPaginated from './components/patient/DisplayPatientsPaginated';

// Invoice
import InvoiceHome from './components/invoice/InvoiceHome';
import AddInvoice from './components/invoice/AddInvoice';
import DeleteInvoice from './components/invoice/DeleteInvoice';
import UpdateInvoice from './components/invoice/UpdateInvoice';
import FindInvoice from './components/invoice/FindInvoice';
import DisplayInvoices from './components/invoice/DisplayInvoices';
import DisplayInvoicesPaginated from './components/invoice/DisplayInvoicesPaginated';

// Insurance Claim
import InsuranceClaimHome from './components/insurance_claim/InsuranceClaimHome';
import AddInsuranceClaim from './components/insurance_claim/AddInsuranceClaim';
import DeleteInsuranceClaim from './components/insurance_claim/DeleteInsuranceClaim';
import UpdateInsuranceClaim from './components/insurance_claim/UpdateInsuranceClaim';
import FindInsuranceClaim from './components/insurance_claim/FindInsuranceClaim';
import DisplayInsuranceClaims from './components/insurance_claim/DisplayInsuranceClaims';
import DisplayInsuranceClaimsPaginated from './components/insurance_claim/DisplayInsuranceClaimsPaginated';

// Compliance
import CompilanceReportHome from './components/compilance_report/CompilanceReportHome';
import AddCompilanceReport from './components/compilance_report/AddCompilance';
import DeleteCompilanceReport from './components/compilance_report/DeleteCompilance';
import UpdateCompilanceReport from './components/compilance_report/UpdateCompilance';
import FindCompilanceReport from './components/compilance_report/FindCompilance';
import DisplayComplianceReport from './components/compilance_report/DisplayCompliance';
import DisplayCompliancePaginated from './components/compilance_report/DisplayCompliancePaginated';

// KPI
import KpiReportHome from './components/kpi_report/KpiReportHome';
import AddKpiReport from './components/kpi_report/AddKpi';
import DeleteKpiReport from './components/kpi_report/DeleteKpi';
import UpdateKpiReport from './components/kpi_report/UpdateKpi';
import FindKpiReport from './components/kpi_report/FindKpi';
import DisplayKPiReport from './components/kpi_report/DisplayKpi';

// Other Modules
import UserHome from './components/user/UserHome';
import AddUser from './components/user/AddUser';
import DeleteUser from './components/user/DeleteUser';
import UpdateUser from './components/user/UpdateUser';
import FindUser from './components/user/FindUser';

import AuditlogHome from './components/auditlog/AuditlogHome';
import FindAuditlog from './components/auditlog/FindAuditlog';
import AddAuditlog from './components/auditlog/AddAuditlog';

import NotificationHome from './components/notification/NotificationHome';
import AddNotification from './components/notification/AddNotification';
import DeleteNotification from './components/notification/DeleteNotification';
import FindNotification from './components/notification/FindNotification';
import UpdateNotification from './components/notification/UpdateNotification';

function App() {
  return (
    <Router>

      <Routes>

        {/* Appointment */}
        <Route path="/appointment" element={<AppointmentHome />}>
          <Route path="add" element={<AddAppointment />} />
          <Route path="delete" element={<DeleteAppointment />} />
          <Route path="update" element={<UpdateAppointment />} />
          <Route path="find" element={<FindAppointment />} />
        </Route>

        {/* Patient */}
        <Route path="/patient" element={<PatientHome />}>
          <Route path="add" element={<AddPatient />} />
          <Route path="update/:pid" element={<UpdatePatient />} />
          <Route path="delete/:pid" element={<DeletePatient />} />
          <Route path="find" element={<FindPatient />} />
          <Route path="display" element={<DisplayPatients />} />
          <Route path="displayPaginated" element={<DisplayPatientsPaginated />} />
        </Route>

        {/* Invoice */}
        <Route path="/invoice" element={<InvoiceHome />}>
          <Route path="add" element={<AddInvoice />} />
          <Route path="update/:iid" element={<UpdateInvoice />} />
          <Route path="delete/:iid" element={<DeleteInvoice />} />
          <Route path="find" element={<FindInvoice />} />
          <Route path="display" element={<DisplayInvoices />} />
          <Route path="displayPaginated" element={<DisplayInvoicesPaginated />} />
        </Route>

        {/* Insurance */}
        <Route path="/insuranceClaim" element={<InsuranceClaimHome />}>
          <Route path="add" element={<AddInsuranceClaim />} />
          <Route path="update/:claimId" element={<UpdateInsuranceClaim />} />
          <Route path="delete/:claimId" element={<DeleteInsuranceClaim />} />
          <Route path="find" element={<FindInsuranceClaim />} />
          <Route path="display" element={<DisplayInsuranceClaims />} />
          <Route path="displayPaginated" element={<DisplayInsuranceClaimsPaginated />} />
        </Route>

        {/* Compliance */}
        <Route path="/compilance_report" element={<CompilanceReportHome />}>
          <Route path="add" element={<AddCompilanceReport />} />
          <Route path="update/:id" element={<UpdateCompilanceReport />} />
          <Route path="delete/:id" element={<DeleteCompilanceReport />} />
          <Route path="find" element={<FindCompilanceReport />} />
          <Route path="display" element={<DisplayComplianceReport />} />
          <Route path="displayPaginated" element={<DisplayCompliancePaginated />} />
        </Route>

        {/* KPI */}
        <Route path="/kpi_report" element={<KpiReportHome />}>
          <Route path="add" element={<AddKpiReport />} />
          <Route path="update/:id" element={<UpdateKpiReport />} />
          <Route path="delete/:id" element={<DeleteKpiReport />} />
          <Route path="find" element={<FindKpiReport />} />
          <Route path="display" element={<DisplayKPiReport />} />
        </Route>

        {/* User */}
        <Route path="/user" element={<UserHome />}>
          <Route path="add" element={<AddUser />} />
          <Route path="update" element={<UpdateUser />} />
          <Route path="delete" element={<DeleteUser />} />
          <Route path="find" element={<FindUser />} />
        </Route>

        {/* Audit */}
        <Route path="/auditlog" element={<AuditlogHome />}>
          <Route path="add" element={<AddAuditlog />} />
          <Route path="find" element={<FindAuditlog />} />
        </Route>

        {/* Notification */}
        <Route path="/notification" element={<NotificationHome />}>
          <Route path="add" element={<AddNotification />} />
          <Route path="update" element={<UpdateNotification />} />
          <Route path="delete" element={<DeleteNotification />} />
          <Route path="find" element={<FindNotification />} />
        </Route>

      </Routes>

    </Router>
  );
}

export default App;
