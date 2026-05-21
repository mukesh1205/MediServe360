import './App.css';
import UserHome from './components/user/UserHome';
import { BrowserRouter as Router,Routes,Route } from 'react-router';
import AddUser from './components/user/AddUser';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/userhome" element={<UserHome />}>
          <Route path="adduser" element={<AddUser />}>
          </Route>
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
