import './App.css';
// import { useEffect } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryListPage from './pages/CountryListPage';
import CountryDetailsPage from './pages/CountryDetailsPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CountryListPage />} />
          <Route path="/countries/:countryCode" element={<CountryDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
