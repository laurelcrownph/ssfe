import './App.css';
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import logo from './logo.png';

import Transactions from './components/Transactions';
import States from './components/States';

function App() {
  return (
    <Router>
      <div>
          <img src={logo} alt="FINT Logo" class="App-logo"/>
          <ul className="header">
            <li><NavLink to="/">Transactions</NavLink></li>
          </ul>
        <Routes>
          <Route path="/" element={<Transactions />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
