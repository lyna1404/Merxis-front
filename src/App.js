// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import GestionClients from './pages/gestionClients';
import DetailsClient from './pages/detailsClient';
import Comptabilite from './pages/Comptabilité';
import DeboursComptabilite from './pages/deboursComptabilite';
import NouveauClient from './pages/NouveauClient';
import './App.css';
import WebFont from 'webfontloader';
import ViewClient from './pages/ViewClient';
import EditClient from './pages/EditClient';
import Facturation from './pages/Facturation';
import ViewFactures from './pages/ViewFactures';
import ViewFacturesProforma from './pages/ViewFacturesProforma';
import AjouterFacture from './pages/AjouterFacture';
import EditFacture from './pages/EditFacture';
import EditFactureProforma from './pages/EditFactureProforma';
import Bordereaux from './pages/Bordereaux';
import AjouterBordereau from './pages/AjouterBordereau';
import ViewBordereau from './pages/ViewBordereau';
import EditBordereau from './pages/EditBordereau';
import Archivage from './pages/Archivage';
import AjouterDossier from './pages/AjouterDossier';
import AjoutEmballage from './pages/AjoutEmballage';
import EditDossier from './pages/EditDossier';
import ViewDossier from './pages/ViewDossier'
import Options from './pages/Options';
import OptionsDevises from './pages/Layouts/OptionsDevises';
import OptionsPays from './pages/Layouts/OptionsPays'
import OptionsMarchandises from './pages/Layouts/OptionsMarchandises'
import OptionsFournisseurs from './pages/Layouts/OptionsFournisseurs';
import OptionsBureaux from './pages/Layouts/OptionsBureaux';
import OptionsTransports from './pages/Layouts/OptionsTransports';
import OptionsEntrepots from './pages/Layouts/OptionsEntrepots';
import OptionsFactures from './pages/Layouts/OptionsFactures';
import OptionsDocuments from './pages/Layouts/OptionsDocuments';
import OptionsFraudes from './pages/Layouts/OptionsFraudes';



const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Montserrat']
      }
    });
   }, []);

  return (
    <Router basename='/merxis'>
      <div>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/gestionClients" element={<GestionClients />} />
          <Route path="/gestionClients/detailsClient/:id" element={<DetailsClient />} />
          <Route path="/gestionClients/NouveauClient" element={<NouveauClient />} />
          <Route path="/gestionClients/ViewClient/:id" element={<ViewClient />} />
          <Route path="/gestionClients/EditClient/:id" element={<EditClient />} />
          <Route path="/comptabilite" element={<Comptabilite/>}/>
          <Route path="/comptabilite/deboursComptabilite/:id" element={<DeboursComptabilite/>}/>
          <Route path="/facturation" element={<Facturation/>}/>
          <Route path="/facturation/detailsFacture/:id" element={<ViewFactures/>}/>
          <Route path="/facturation/EditFacture/:id" element={<EditFacture/>}/>
          <Route path="/facturation/EditFactureProforma/:id" element={<EditFactureProforma/>}/>
          <Route path="/facturation/detailsFactureProforma/:id" element={<ViewFacturesProforma/>}/>
          <Route path="/facturation/NouvelleFacture" element={<AjouterFacture/>}/>
          <Route path="/facturation/Bordereaux" element={<Bordereaux/>}/>
          <Route path="/facturation/Bordereaux/NouveauBordereau" element={<AjouterBordereau/>}/>
          <Route path="/facturation/Bordereaux/ViewBordereau/:id" element={<ViewBordereau/>}/>
          <Route path="/facturation/Bordereaux/EditBordereau/:id" element={<EditBordereau/>}/>
          <Route path="/archivage" element={<Archivage/>}/>
          <Route path="/archivage/EditDossier/:id" element={<EditDossier/>}/>
          <Route path="/archivage/ViewDossier/:id" element={<ViewDossier/>}/>
          <Route path="/archivage/NouveauDossier" element={<AjouterDossier/>}/>
          <Route path="/archivage/NouveauDossier/NouvelEmballage" element={<AjoutEmballage/>}/>
          <Route path="/options" element={<Options/>}/>
          <Route path="/options/devises" element={<OptionsDevises/>}/>
          <Route path="/options/pays" element={<OptionsPays/>}/>
          <Route path="/options/marchandises" element={<OptionsMarchandises/>}/>
          <Route path="/options/fournisseurs" element={<OptionsFournisseurs/>}/>
          <Route path="/options/douanes" element={<OptionsBureaux/>}/>
          <Route path="/options/transports" element={<OptionsTransports/>}/>
          <Route path="/options/entrepots" element={<OptionsEntrepots/>}/>
          <Route path="/options/factures" element={<OptionsFactures/>}/>
          <Route path="/options/documents" element={<OptionsDocuments/>}/>
          <Route path="/options/fraudes" element={<OptionsFraudes/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
