import logo from './logo.svg';
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
import DisplayComplianceReport from './components/compilance_report/DisplayCompliance';

// KPI Report Imports
import KpiReportHome from './components/kpi_report/KpiReportHome';
import AddKpiReport from './components/kpi_report/AddKpi';
import DeleteKpiReport from './components/kpi_report/DeleteKpi';
import UpdateKpiReport from './components/kpi_report/UpdateKpi';
import FindKpiReport from './components/kpi_report/FindKpi';
import DisplayKPiReport from './components/kpi_report/DisplayKpi';

function App() {
    return (
        <Router>

            <Routes>
                <Route path="/appointment" element={<AppointmentHome />}>
                    <Route path="add" element={<AddAppointment />}></Route>
                    <Route path="delete" element={<DeleteAppointment />}></Route>
                    <Route path="update" element={<UpdateAppointment />}></Route>
                    <Route path="find" element={<FindAppointment />}></Route>
                </Route>


                {/* Patient Routes */}
                <Route path="/patient" element={<PatientHome />}>
                    <Route path="add" element={<AddPatient />} />
                    <Route path="delete" element={<DeletePatient />} />
                    <Route path="update" element={<UpdatePatient />} />
                    <Route path="find" element={<FindPatient />} />
                </Route>

                {/* Invoice Routes */}
                <Route path="/invoice" element={<InvoiceHome />}>
                    <Route path="add" element={<AddInvoice />} />
                    <Route path="delete" element={<DeleteInvoice />} />
                    <Route path="update" element={<UpdateInvoice />} />
                    <Route path="find" element={<FindInvoice />} />
                </Route>

                {/* Insurance Claim Routes */}
                <Route path="/insuranceClaim" element={<InsuranceClaimHome />}>
                    <Route path="add" element={<AddInsuranceClaim />} />
                    <Route path="delete" element={<DeleteInsuranceClaim />} />
                    <Route path="update" element={<UpdateInsuranceClaim />} />
                    <Route path="find" element={<FindInsuranceClaim />} />
                </Route>

                <Route path="/compilance_report" element={<CompilanceReportHome />}>
                    <Route path="add" element={<AddCompilanceReport />} />
                    <Route path="delete/:id" element={<DeleteCompilanceReport />} />
                    <Route path="update/:id" element={<UpdateCompilanceReport />} />
                    <Route path="find" element={<FindCompilanceReport />} />
                    <Route path="display" element={<DisplayComplianceReport />} />
                </Route>

                <Route path="/kpi_report" element={<KpiReportHome />}>
                    <Route path="add" element={<AddKpiReport />} />
                    <Route path="delete/:id" element={<DeleteKpiReport />} />
                    <Route path="update/:id" element={<UpdateKpiReport />} />
                    <Route path="find" element={<FindKpiReport />} />
                    <Route path="display" element={<DisplayKPiReport />} />
                </Route>

            </Routes>

        </Router>
    );
}

export default App;
