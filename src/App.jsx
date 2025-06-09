import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
// import Doctors from './pages/Doctors';
// import Appointments from './pages/Appointments';
// import Medications from './pages/Medications';
// import Reports from './pages/Reports';
// import Symptoms from './pages/Symptoms';
// import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <MainContent>
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              {/* <Route path="/admin/doctors" element={<Doctors />} />
              <Route path="/admin/appointments" element={<Appointments />} />
              <Route path="/admin/medications" element={<Medications />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/symptoms" element={<Symptoms />} />
              <Route path="/admin/settings" element={<Settings />} /> */}
            </Routes>
          </MainContent>
        </div>
      </div>
    </Router>
  );
}

export default App;