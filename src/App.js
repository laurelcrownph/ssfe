import './App.css';
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import logo from './logo.png';

import Advisors from './components/Advisors';
import Logs from './components/Logs';
import Units from './components/Units';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <div>
        <img src={logo} alt="My logo" class="App-logo"/>
        
        <ul className="header">
          <li><NavLink to="/">Transactions</NavLink></li>
          <li><NavLink to="/units">Peers</NavLink></li>
          <li><NavLink to="/advisors">Notaries</NavLink></li>
          <li><NavLink to="/reports">Reports</NavLink></li>
          <li><NavLink to="/clients">Clients</NavLink></li>
          <li><NavLink to="/logs">Logs</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" element={<Advisors />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/advisors" element={<Advisors />} />
          <Route path="/units" element={<Units />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
