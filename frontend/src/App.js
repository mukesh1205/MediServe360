import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Appointment
import AppointmentHome from './components/appointment/AppointmentHome';
import AddAppointment from './components/appointment/AddAppointment';
import DeleteAppointment from './components/appointment/DeleteAppointment';
import UpdateAppointment from './components/appointment/UpdateAppointment';
import FindAppointment from './components/appointment/FindAppointment';
import DisplayAppointments from './components/appointment/DisplayAppointments';
import DisplayAppointmentsPaginated from './components/appointment/DisplayAppointmentsPaginated';

// ✅ Doctor Imports
import DoctorHome from './components/doctor/DoctorHome';
import AddDoctor from './components/doctor/AddDoctor';
import DeleteDoctor from './components/doctor/DeleteDoctor';
import UpdateDoctor from './components/doctor/UpdateDoctor';
import FindDoctor from './components/doctor/FindDoctor';
import DisplayDoctors from './components/doctor/DisplayDoctors';
import DisplayDoctorsPaginated from './components/doctor/DisplayDoctorsPaginated';


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
import DisplayCompilanceReport from './components/compilance_report/DisplayCompilance';
import DisplayCompilancePaginated from './components/compilance_report/DisplayCompilancePaginated';

// KPI

import KpiReportHome from './components/kpi_report/KpiReportHome';
import AddKpiReport from './components/kpi_report/AddKpi';
import FindKpiReport from './components/kpi_report/FindKpi';
import DisplayKPiReport from './components/kpi_report/DisplayKpi';
import DisplayKpiPaginated from './components/kpi_report/DisplayKpiPaginated';


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


import BedHome from './components/bed/BedHome';
import AddBed from './components/bed/AddBed';
import DeleteBed from './components/bed/DeleteBed';
import FindBed from './components/bed/FindBed';
import UpdateBed from './components/bed/UpdateBed';
import FindAllBed from './components/bed/FindAllBed';
import AssignBed from './components/bed/AssignBed';
import DischargeBed from './components/bed/DischargeBed';
import PaginatedBed from './components/bed/PaginatedBed';

import WardHome from './components/ward/WardHome';
import AddWard from './components/ward/AddWard';
import UpdateWard from './components/ward/UpdateWard';
import DeleteWard from './components/ward/DeleteWard';
import FindWard from './components/ward/FindWard';
import FindAllWard from './components/ward/FindAllWard';
import WardOccupancyReport from './components/ward/WardOccupancyReport';
import PaginatedWard from './components/ward/PaginatedWard';

import UpdateNotification from './components/notification/UpdateNotification';
import FindAllNotification from './components/notification/FindAllNotification';
import FindAllUser from './components/user/FindAllUser';
import FindAllAuditlog from './components/auditlog/FindAllAuditlog';


import AuditLogPage from './components/auditlog/AuditLogPage';
import UserPage from './components/user/UserPage';
import NotificationPage from './components/notification/NotificationPage'
function App() {
  return (
    <Router>

      <Routes>

        {/* Appointment */}
        <Route path="/appointment" element={<AppointmentHome/>}>
            <Route path="add" element={<AddAppointment/>}></Route>
            <Route path="delete/:aid" element={<DeleteAppointment/>}></Route>
            <Route path="edit/:aid" element={<UpdateAppointment />}></Route>
            <Route path="find" element={<FindAppointment />}></Route>
            <Route path="display" element={<DisplayAppointments />}></Route>
            <Route path="displayPaginated" element={<DisplayAppointmentsPaginated />} /> 
        </Route>

      {/* Doctor */}
      <Route path="/doctor" element={<DoctorHome />}>
            <Route path="delete/:id" element={<DeleteDoctor />} />
            <Route path="update/:id" element={<UpdateDoctor />} />
            <Route path="add" element={<AddDoctor />} />
            <Route path="find" element={<FindDoctor />} />
            <Route path="display" element={<DisplayDoctors />} />
            <Route path="displayPaginated" element={<DisplayDoctorsPaginated />} />
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
          <Route path="display" element={<DisplayCompilanceReport />} />
          <Route path="displayPaginated" element={<DisplayCompilancePaginated />} />
        </Route>

        

        <Route path="/user" element={<UserHome />}>
            <Route path="add" element={<AddUser />} />
            <Route path="delete/:id" element={<DeleteUser />} />
            <Route path="update/:id" element={<UpdateUser />} />
            <Route path="find" element={<FindUser />} />
            <Route path="findall" element={<FindAllUser />} />
            <Route path="paginated" element={<UserPage />} />
        </Route>

        <Route path="/auditlog" element={<AuditlogHome />}>
            <Route path="add" element={<AddAuditlog />} />
            <Route path="find" element={<FindAuditlog />} />
            <Route path="findall" element={<FindAllAuditlog />} />
            <Route path="paginated" element={<AuditLogPage/>} />
        </Route>
        <Route path="/notification" element={<NotificationHome />}>
            <Route path="add" element={<AddNotification />} />
            <Route path="update/:id" element={<UpdateNotification />} />
            <Route path="delete/:id" element={<DeleteNotification />} />
            <Route path="find" element={<FindNotification />} />
            <Route path="findall" element={<FindAllNotification />} />
            <Route path="paginated" element={<NotificationPage />} />
        </Route>

        <Route path="/bed" element={<BedHome />}>
            <Route path="add" element={<AddBed/>}/>
            <Route path="update/:bedId" element={<UpdateBed/>}/>
            <Route path="delete/:bedId" element={<DeleteBed/>}/>
            <Route path="find" element={<FindBed/>}/>
            <Route path="findAll" element={<FindAllBed/>}/>
            <Route path="assignBed" element={<AssignBed/>}/>
            <Route path="dischargeBed" element={<DischargeBed/>}/>
            <Route path="pages" element={<PaginatedBed/>}/>
        </Route>
         <Route path="/ward" element={<WardHome />}>
            <Route path="add" element={<AddWard/>}/>
            <Route path="update/:wardId" element={<UpdateWard/>}/>
           <Route path="delete/:wardId" element={<DeleteWard/>}/>
            <Route path="find" element={<FindWard/>}/>
            <Route path="findAll" element={<FindAllWard/>}/>
            <Route path="occupancy" element={<WardOccupancyReport/>}/>
            <Route path="pages" element={<PaginatedWard/>}/>

        </Route>
        
          <Route path="/kpi_report" element={<KpiReportHome />}>
          <Route path="add" element={<AddKpiReport />} />
          <Route path="find" element={<FindKpiReport />} />
          <Route path="display" element={<DisplayKPiReport />} />
          
    
          <Route path="displayPaginated" element={<DisplayKpiPaginated />} />

        </Route>

      </Routes>

    </Router>
  );
}

export default App;


