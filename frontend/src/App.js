import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AppointmentHome from './components/appointment/AppointmentHome';
import AddAppointment from './components/appointment/AddAppointment';
import DeleteAppointment from './components/appointment/DeleteAppointment';
import UpdateAppointment from './components/appointment/UpdateAppointment';
import FindAppointment from './components/appointment/FindAppointment';

// Patient Imports
import PatientHome from './components/patient/PatientHome';
import AddPatient from './components/patient/AddPatient';
import DeletePatient from './components/patient/DeletePatient';
import UpdatePatient from './components/patient/UpdatePatient';
import FindPatient from './components/patient/FindPatient';
import DisplayPatients from './components/patient/DisplayPatients';

// Invoice Imports
import InvoiceHome from './components/invoice/InvoiceHome';
import AddInvoice from './components/invoice/AddInvoice';
import DeleteInvoice from './components/invoice/DeleteInvoice';
import UpdateInvoice from './components/invoice/UpdateInvoice';
import FindInvoice from './components/invoice/FindInvoice';

// Insurance Claim Imports
import InsuranceClaimHome from './components/insurance_claim/InsuranceClaimHome';
import AddInsuranceClaim from './components/insurance_claim/AddInsuranceClaim';
import DeleteInsuranceClaim from './components/insurance_claim/DeleteInsuranceClaim';
import UpdateInsuranceClaim from './components/insurance_claim/UpdateInsuranceClaim';
import FindInsuranceClaim from './components/insurance_claim/FindInsuranceClaim';

// Compilance Report Imports
import CompilanceReportHome from './components/compilance_report/CompilanceReportHome';
import AddCompilanceReport from './components/compilance_report/AddCompilance';
import DeleteCompilanceReport from './components/compilance_report/DeleteCompilance';
import UpdateCompilanceReport from './components/compilance_report/UpdateCompilance';
import FindCompilanceReport from './components/compilance_report/FindCompilance';

// KPI Report Imports
import KpiReportHome from './components/kpi_report/KpiReportHome';
import AddKpiReport from './components/kpi_report/AddKpi';
import DeleteKpiReport from './components/kpi_report/DeleteKpi';
import UpdateKpiReport from './components/kpi_report/UpdateKpi';
import FindKpiReport from './components/kpi_report/FindKpi';

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


import DisplayPatientsPaginated from './components/patient/DisplayPatientsPaginated';
import DisplayInvoices from './components/invoice/DisplayInvoices';
import DisplayInsuranceClaims from './components/insurance_claim/DisplayInsuranceClaims';
import DisplayInsuranceClaimsPaginated from './components/insurance_claim/DisplayInsuranceClaimsPaginated';
import DisplayInvoicesPaginated from './components/invoice/DisplayInvoicesPaginated';
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/appointment" element={<AppointmentHome/>}>
            <Route path="add" element={<AddAppointment/>}></Route>
            <Route path="delete" element={<DeleteAppointment/>}></Route>
            <Route path="update" element={<UpdateAppointment />}></Route>
            <Route path="find" element={<FindAppointment />}></Route>
        </Route>

        <Route path="/patient" element={<PatientHome />}>
            <Route path="add" element={<AddPatient />} ></Route>
            <Route path="update/:pid" element={<UpdatePatient />} ></Route>
            <Route path="find" element={<FindPatient />}></Route>
            <Route path="display" element={<DisplayPatients/>}></Route>
            <Route path="displayPaginated" element={<DisplayPatientsPaginated/>}></Route>
            <Route path="delete/:pid" element={<DeletePatient/>}></Route>
        </Route>

        {/* Invoice Routes */}
        <Route path="/invoice" element={<InvoiceHome />}>
            <Route path="add" element={<AddInvoice />} />
            <Route path="delete/:iid" element={<DeleteInvoice />} />
            <Route path="display" element={<DisplayInvoices />} />
            <Route path="displayPaginated" element={<DisplayInvoicesPaginated />} />
            <Route path="update/:iid" element={<UpdateInvoice />} />
            <Route path="find" element={<FindInvoice />} />
        </Route>

        {/* Insurance Claim Routes */}
        <Route path="/insuranceClaim" element={<InsuranceClaimHome />}>
            <Route path="add" element={<AddInsuranceClaim />} />
            <Route path="delete/:claimId" element={<DeleteInsuranceClaim />} />
            <Route path="update/:claimId" element={<UpdateInsuranceClaim />} />
            <Route path="find" element={<FindInsuranceClaim />} />
            <Route path="display" element={<DisplayInsuranceClaims />} />
            <Route path="displayPaginated" element={<DisplayInsuranceClaimsPaginated />} />
        </Route>

        <Route path="/compilance_report" element={<CompilanceReportHome />}>
            <Route path="add" element={<AddCompilanceReport />} />
            <Route path="delete" element={<DeleteCompilanceReport />} />
            <Route path="update" element={<UpdateCompilanceReport />} />
            <Route path="find" element={<FindCompilanceReport />} />
        </Route>

        <Route path="/kpi_report" element={<KpiReportHome />}>
            <Route path="add" element={<AddKpiReport />} />
            <Route path="delete" element={<DeleteKpiReport />} />
            <Route path="update" element={<UpdateKpiReport />} />
            <Route path="find" element={<FindKpiReport />} />
        </Route>

        <Route path="/user" element={<UserHome />}>
            <Route path="add" element={<AddUser />} />
            <Route path="delete" element={<DeleteUser />} />
            <Route path="update" element={<UpdateUser />} />
            <Route path="find" element={<FindUser />} />
        </Route>

        <Route path="/auditlog" element={<AuditlogHome />}>
            <Route path="add" element={<AddAuditlog />} />
            <Route path="find" element={<FindAuditlog />} />
        </Route>
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