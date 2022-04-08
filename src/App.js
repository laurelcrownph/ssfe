import './App.css';
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import logo from './logo.png';

import Transactions from './components/Transactions';
import Units from './components/Units';
import MUIDrawer from './components/MUIDrawer'
import Box from '@mui/material/Box';

function App() {
  return (
    <Router>
      <Box sx={{display: 'flex'}}>
        <MUIDrawer/>
        {/* <img src={logo} alt="FINT Logo" class="App-logo"/>
        <ul className="header">
          <li><NavLink to="/">Transactions</NavLink></li>
        </ul> */}
        <Routes>
          <Route path="/" element={<Transactions />} /> 
          <Route path="/peers" element={<Units />} /> 
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
