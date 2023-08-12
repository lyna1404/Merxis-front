// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import GestionClients from './pages/gestionClients';
import DetailsClient from './pages/detailsClient';
import Comptabilite from './pages/Comptabilité';
import DeboursComptabilite from './pages/deboursComptabilite';
import './App.css';
import WebFont from 'webfontloader';
import NouveauClient from './pages/NouveauClient';




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
          <Route path="/gestionClients/:slug" element={<DetailsClient />} />
          <Route path="/gestionClients/NouveauClient" element={<NouveauClient />} />
          <Route path="/comptabilite" element={<Comptabilite/>}/>
          <Route path="/comptabilite/:slug" element={<DeboursComptabilite/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
