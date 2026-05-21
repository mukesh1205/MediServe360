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

      </Routes>

    </Router>
     );
}

export default App;
