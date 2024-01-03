import { useState } from 'react';
import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './Comptabilite.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';

const data = [
    {
        id : "01",
        numBE:"01xxx",
        date:"xx/xx/xx",
        numDossier:"01/23",
        client:"Sarl MERXIS",
        etatRecup:"Reçu"
    },
    {
        id : "02",
        numBE:"02xxx",
        date:"xx/xx/xx",
        numDossier:"01/23",
        client:"Sarl MERXIS",
        etatRecup:"Non Reçu",
    },
    {
        id : "03",
        numBE:"03xxx",
        date:"xx/xx/xx",
        numDossier:"02/23",
        client:"Sarl Golden Tulip Hotel Series",
        etatRecup:"Reçu",
    },
    {
        id : "04",
        numBE:"04xxx",
        date:"xx/xx/xx",
        numDossier:"03/23",
        client:"Sarl Golden Tulip Hotel Series",
        etatRecup:"Reçu",
    },
]

const headers = ['N° Bordereau', 'Date', 'N° Dossier', 'Client', 'Etat de récupération'];

function Bordereaux() {

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

    const openNewBordereau = () => {
        window.open("./Bordereaux/NouveauBordereau", '_blank')
    };

  return (
    <>
        <Breadcrumb/>
        <h1 className={styles.pageTitle}>Liste des Bordereaux d'envoi</h1>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'numBE', label: 'N° Bordereau' , inputType : 'text' },
                { key: 'date', label: 'Date', inputType : 'text' },
                { key: 'numDossier', label: 'N° Dossier', inputType : 'text' },
                { key: 'client', label: 'Client' , inputType : 'text'},
                { key: 'etatRecup', label: 'Etat de récupération' , inputType : 'text'},
                ]}
                onFilterChange={handleFilterChange} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`}  onClick={() => handleReloadClick()} children='Actualiser' />  
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openNewBordereau()}/>  
            </span>
        </span>
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={true}/>
 
    </>   
  );
}

export default Bordereaux