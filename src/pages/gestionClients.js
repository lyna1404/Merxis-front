// HomePage.js
import React , {useState} from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';
import DetailsClient from './detailsClient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const data = [
    { id: 1, raisonSociale: 'Djezzy', somme: 30.000},
    { id: 2, raisonSociale: 'Ooredoo', somme: 30.000},
    { id: 3, raisonSociale: 'Maystro delivery', somme: 30.000},
    { id: 4, raisonSociale: 'adcf', somme: 30.000},
    { id: 1, raisonSociale: 'Djezzy', somme: 30.000},
    { id: 2, raisonSociale: 'Ooredoo', somme: 30.000},
    { id: 3, raisonSociale: 'Maystro delivery', somme: 30.000},
    { id: 4, raisonSociale: 'adcf', somme: 30.000},
    { id: 1, raisonSociale: 'Djezzy', somme: 30.000},
    { id: 2, raisonSociale: 'Ooredoo', somme: 30.000},
    { id: 3, raisonSociale: 'Maystro delivery', somme: 30.000},
    { id: 4, raisonSociale: 'adcf', somme: 30.000},
    { id: 1, raisonSociale: 'Djezzy', somme: 30.000},
    { id: 2, raisonSociale: 'Ooredoo', somme: 30.000},
    { id: 3, raisonSociale: 'Maystro delivery', somme: 30.000},
    { id: 4, raisonSociale: 'adcf', somme: 30.000},
    { id: 1, raisonSociale: 'Djezzy', somme: 30.000},
    { id: 2, raisonSociale: 'Ooredoo', somme: 30.000},
    { id: 3, raisonSociale: 'Maystro delivery', somme: 30.000},
    { id: 4, raisonSociale: 'adcf', somme: 30.000},
    // Add more rows as needed
  ];
const headers = ['ID', 'Raison Sociale', 'Somme'];


const GestionClients = () => {
    const [filteredData, setFilteredData] = useState(data);

    const handleFilterChange = (columnKey, filterValue) => {
      const filteredData = data.filter((item) =>
        item[columnKey].toString().toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredData(filteredData);
    };

    const handleReloadClick = () => {
      window.location.reload(false)
  };

  return (
    <>  
        <Breadcrumb/>
        <h1 className={styles.pageTitle}>Liste des Clients et leurs Sommes Dues</h1>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'id', label: 'ID' },
                { key: 'raisonSociale', label: 'Raison Sociale' },
                { key: 'somme', label: 'Somme' }
            ]} onFilterChange={handleFilterChange} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} onClick={() => handleReloadClick()} children='Actualiser' />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' />
            </span>
            
        </span>
        
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} linkToPage={'./detailsClient'}/>
        
    </>
  );
};

export default GestionClients;
