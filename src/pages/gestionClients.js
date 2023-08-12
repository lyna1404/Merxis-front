import React , {useState} from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';


// Exemple de liste de clients
const data = [
    {  id: 'Djezzy', somme: 30000},
    {  id: 'Ooredoo', somme: 30000},
    {  id: 'Maystro delivery', somme: 30000},
    {  id: 'adcf', somme: 30000},
    {  id: 'Djezzy', somme: 30000},
    {  id: 'Ooredoo', somme: 30000},
    {  id: 'Maystro delivery', somme: 30000},
    {  id: 'adcf', somme: 30000},
    {  id: 'Djezzy', somme: 30000},
    {  id: 'Ooredoo', somme: 30000},
    {  id: 'Maystro delivery', somme: 30000},
    {  id: 'adcf', somme: 30000},
    {  id: 'Djezzy', somme: 30000},
    {  id: 'Ooredoo', somme: 30000},
    {  id: 'Maystro delivery', somme: 30000},
    {  id: 'adcf', somme: 30000},
    {  id: 'Djezzy', somme: 30000},
    {  id: 'Ooredoo', somme: 30000},
    {  id: 'Maystro delivery', somme: 30000},
    {  id: 'adcf', somme: 30000},

];
//Entete du tableau de gestion des clients
const headers = ['Raison Sociale', 'Somme Due'];


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
    const openNewCLient = () => {
      window.open("/gestionClients/NouveauClient", '_blank');
    };
  return (
    <>  
        <Breadcrumb/>
        <h1 className={styles.pageTitle}>Liste des Clients et leurs Sommes Dues</h1>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'id', label: 'Raison Sociale' },
                { key: 'somme', label: 'Somme Due' }
            ]} onFilterChange={handleFilterChange} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} onClick={() => handleReloadClick()} children='Actualiser' />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openNewCLient()}/>
            </span>
            
        </span>
        
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={true}/>
        
    </>
  );
};

export default GestionClients;
