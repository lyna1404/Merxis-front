// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import GestionClients from './pages/gestionClients';
import DetailsClient from './pages/detailsClient';
import './App.css';
import WebFont from 'webfontloader';




const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Montserrat']
      }
    });
   }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gestionClients" element={<GestionClients />} />
          <Route path="/gestionClients/detailsClient" element={<DetailsClient />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
