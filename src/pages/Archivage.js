
import { useState,useEffect } from 'react';

import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';
import axios from 'axios';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import SuccessMessage from '../components/succesMessage';
import {IconView,IconEdit,IconDelete} from '../components/icons';
import { openPageBasedOnId , reloadPage , openPage , handleFilterChange} from '../Utils/actionUtils';


const headers = ['N° Dossier', 'N° Repertoire', 'Regime douanier', 'Client', 'Nature marchandise', 'Statut dossier', 'Actions à faire',];

// J'ai affiché même les dossiers non déclarés car nous n'avons pas fait la partie déclaration

  
function Archivage() {
    const params = {
        is_declared: 'True'
        };
  const [errorMessages, setErrorMessages] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dossiers, setDossiers] = useState([]);
  const [etats, setEtats] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dossierTodelete,setDossierToDelete] = useState(null);

  const handleFilterChangeWrapper = (columnKey, filterValue) => {
    handleFilterChange(columnKey, filterValue,dossiers, setFilteredData);
  };

  const handleError = (errors) => {
    setShowError(true);
    setErrorMessages(errors);
  };
  
  const handleErrorClose = () => {
    setShowError(false);
  };

  const handleDialogClose = () => {
    setDossierToDelete(null);
    setShowDialog(false);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };
  
  const handleSuccessClose = () => {
    setShowSuccess(false);
    reloadPage();
  };

  // Récupérer la liste des dossiers et états dossiers
  useEffect(() => {
    // Create axios requests for both data fetching
    const dossiers = axios.get(`/api/dossiers/`); 
    const etats = axios.get(`/api/etats-dossier/`);

    // Use Promise.all to wait for both requests to complete
    Promise.all([dossiers, etats])
      .then((responses) => {
        const dossiersData = responses[0].data;
        const etatsData = responses[1].data;
        if (typeof dossiersData === 'object' && dossiersData !== null) {
          const extractedDossiers = Object.values(dossiersData).map(item => ({
            id: item.dossier_pk,
            numDossier: item.numDossier,
            numRep: item.declaration ? item.declaration.numRepertoire : null,
            regime: item.declaration ? (item.declaration.regime ? item.declaration.regime.designation : null) : null,
            client: item.client ? item.client.raisonSociale : null,
            natureMarch: item.natureMarchandise ? (item.natureMarchandise.designation ? item.natureMarchandise.designation : null) : null,
            statutDossier: item.etatDossier
          }));
          setDossiers(extractedDossiers);
          setFilteredData(extractedDossiers);
          const extractedEtats = etatsData.results.map(status => ({
            value: status,
            label: status
          }));
          setEtats(extractedEtats);
          setIsLoaded(true);
        } else {
          console.error('Response data is not a JSON object:', dossiersData);
          handleError(dossiersData);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        console.log('Error:', error);
        handleError(error.request.response);
      });
  }, []); 

  // Suppression de dossier
  const handleDeleteClick = (event) => {
    const rowId = event.target.closest('tr').id;
    setDossierToDelete(rowId);
    setShowDialog(true);
  };

  const handleDeleteDossier = () => {
    setShowDialog(false);
    setIsLoaded(false);
    axios
     .delete(`/api/dossiers/${dossierTodelete}/`)
     .then(() => {
        setShowDialog(false);
        setIsLoaded(true);
        handleSuccess();
        setDossierToDelete(null);
     })
     .catch((error) => {
        setShowDialog(false);
        setIsLoaded(true);
        console.log('Delete request error:', error);
        handleError(error.request.response);
        setDossierToDelete(null);
     });
  };
    
    const tableActions = [
        <IconView key="view"  onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/archivage/ViewDossier/')} />,
        <IconEdit key="edit" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/archivage/EditDossier/')} />,
        <IconDelete key="delete" onClick={handleDeleteClick} />
      ];

  return (
    <>

      <Breadcrumb/>
      <h1 className={styles.pageTitle}>Liste des Dossiers</h1>
      
      <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'numDossier', label: 'N° Dossier', inputType : 'text' },
                { key: 'numRep', label: 'N° Repertoire' ,  inputType : 'text'},
                { key: 'regime', label: 'Régime douanier', inputType : 'text' },
                { key: 'client', label: 'Client' , inputType : 'text'},
                { key: 'natureMarch', label: 'Nature marchandise' , inputType : 'text'},
                { key: 'statutDossier', label: 'Statut dossier' , inputType : 'select', options: etats },
            ]} onFilterChange={handleFilterChangeWrapper} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`}  onClick={() => reloadPage()} children='Actualiser' />  
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openPage("/archivage/NouveauDossier")}/>  
            </span>
            
        </span>
        {!isLoaded ? ( // Conditional rendering based on the loading state
        <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
      ) : (
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={false} addactions={true} actionIcons={tableActions} />
      )}
        {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeleteDossier} message={"Souhaitez-vous vraiment supprimer ce dossier ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
        

  </>
  );
}

export default Archivage;