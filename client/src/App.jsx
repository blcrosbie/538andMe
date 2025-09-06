// App.jsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BillsAndVotes from './pages/BillsAndVotes';
import Representatives from './pages/Representatives';
import Analysis from './pages/Analysis';
import Elections from './pages/Elections';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bills" element={<BillsAndVotes />} />
          <Route path="/representatives" element={<Representatives />} />
          <Route path="/representatives/:id" element={<Representatives />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/elections" element={<Elections />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;