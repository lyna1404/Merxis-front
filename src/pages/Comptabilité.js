
import { useState } from 'react';

import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './Comptabilite.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';


const data = [
    {
        id : "01",
        numDossier:"01/23",
        rep:"01",
        regDouane:"xxx",
        numFact:"01/23",
        client:"Sarl MERXIS",
        natureMarch:"Alimentation",
        statutDossier:"Livré"
    },
    {
        id : "02",
        numDossier:"02/23",
        rep:"01",
        regDouane:"xxx",
        numFact:"02/23",
        client:"SARL Merxis",
        natureMarch:"Electronique",
        statutDossier:"Archivé"
    },
    {
        id : "03",
        numDossier:"03/23",
        rep:"02",
        regDouane:"xxx",
        numFact:"03/23",
        client:"SARL Transit Amel",
        natureMarch:"Electromenager",
        statutDossier:"En livraison"
    },
    {
        id : "04",
        numDossier:"04/23",
        rep:"03",
        regDouane:"xxx",
        numFact:"04/23",
        client:"SARL Golden Tulip Hotel Series",
        natureMarch:"Cosmétiques",
        statutDossier:"En dédouanement"
    },
    {   
        id : "05",
        numDossier:"05/23",
        rep:"03",
        regDouane:"xxx",
        numFact:"05/23",
        client:"SARL Golden Tulip Hotel Series",
        natureMarch:"Alimentation",
        statutDossier:"Livré"
    },
    {  
        id : "06",
        numDossier:"06/23",
        rep:"04",
        regDouane:"xxx",
        numFact:"06/23",
        client:"ESI",
        natureMarch:"Meubles",
        statutDossier:"Livré"
    },
    {
        id : "07",
        numDossier:"07/23",
        rep:"04",
        regDouane:"xxx",
        numFact:"07/23",
        client:"SARL Green",
        natureMarch:"Gazon",
        statutDossier:"Livré"
    },
    {
        id : "08",
        numDossier:"08/23",
        rep:"05",
        regDouane:"xxx",
        numFact:"08/23",
        client:"SARL Transit Amel",
        natureMarch:"Alimentation",
        statutDossier:"En dédouanement"
    },
    {
        id : "09",
        numDossier:"09/23",
        rep:"05",
        regDouane:"xxx",
        numFact:"09/23",
        client:"SARL Transit Amel",
        natureMarch:"Produit Chimique",
        statutDossier:"En livraison"
    },
    {
        id : "10",
        numDossier:"10/23",
        rep:"06",
        regDouane:"xxx",
        numFact:"09/23",
        client:"SARL Merxis",
        natureMarch:"Produit de nettoyage",
        statutDossier:"En livraison"
    }
];

const headers = ['ID Dossier', 'N° Dossier', 'N° Repertoire', 'Regime douanier', 'N° Facture', 'Client', 'Nature marchandise', 'Statut dossier'];


function Comptabilite() {
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
      <h1 className={styles.pageTitle}>Liste des Dossiers</h1>
      
      <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'id', label: 'ID' },
                { key: 'numDossier', label: 'N° Dossier' },
                { key: 'rep', label: 'N° Repertoire' },
                { key: 'numFact', label: 'N° Facture' },
                { key: 'client', label: 'Client' },
                { key: 'natureMarch', label: 'Nature marchandise' },
                { key: 'statutDossier', label: 'Statut dossier' },
            ]} onFilterChange={handleFilterChange} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`}  onClick={() => handleReloadClick()} children='Actualiser' />    
            </span>
            
        </span>
        
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={true}/>

  </>
  );
}

export default Comptabilite;
