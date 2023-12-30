import React , {useState,useEffect} from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';
import {IconView,IconEdit,IconDelete,IconCash} from '../components/icons';
import axios from 'axios';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import SuccessMessage from '../components/succesMessage';
import { openPageBasedOnId , reloadPage , openPage , handleFilterChange} from '../Utils/actionUtils';

//Entete du tableau de gestion des clients
const headers = ['Raison Sociale', 'Somme Due','Actions'];


const GestionClients = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [showError, setShowError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clients, setClients] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clientTodelete,setClientToDelete] = useState(null);

  const handleFilterChangeWrapper = (columnKey, filterValue) => {
    handleFilterChange(columnKey, filterValue,clients, setFilteredData);
  };

  const handleError = (errors) => {
    setShowError(true);
    setErrorMessages(errors);
  };
  
  const handleErrorClose = () => {
    setShowError(false);
  };

  const handleDialogClose = () => {
    setClientToDelete(null);
    setShowDialog(false);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };
  
  const handleSuccessClose = () => {
    setShowSuccess(false);
    reloadPage();
  };
  

  useEffect(() => {
    axios
      .get('/api/clients/')
      .then((response) => {
        const clientsData = response.data;
        console.log(clientsData);
  
        if (typeof clientsData === 'object' && clientsData !== null) {
          const extractedClients = Object.values(clientsData).map(item => ({
            id: item.client_pk,
            raisonSociale: item.raisonSociale,
            somme: item.sommeDue
          }));
  
          setClients(extractedClients);
          setFilteredData(extractedClients);
          setIsLoaded(true);
        } else {
          console.error('Response data is not a JSON object:', clientsData);
          handleError(clientsData);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        console.log('Error:', error);
        handleError(error.request.response);

      });
  
  }, []);
  
    const handleDeleteClick = (event) => {
      console.log("delete");
      const rowId = event.target.closest('tr').id;
      setClientToDelete(rowId);
      setShowDialog(true);
    };
    
    const handleDeleteClient = () => {
      setShowDialog(false);
      setIsLoaded(false);
      console.log("delete");
      console.log(clientTodelete);
      axios
       .delete(`/api/clients/${clientTodelete}/`)
       .then(() => {
          setShowDialog(false);
          setIsLoaded(true);
          console.log("successfully deleted");
          handleSuccess();
          setClientToDelete(null);
       })
       .catch((error) => {
          setShowDialog(false);
          setIsLoaded(true);
          console.log('Delete request error:', error);
          handleError(error.request.response);
          setClientToDelete(null);
       });
    };
    
    const tableActions = [
      <IconCash key="cash" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/gestionClients/detailsClient/')} />,
      <IconView key="view" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/gestionClients/ViewClient/')} />,
      <IconEdit key="edit" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/gestionClients/EditClient/')} />,
      <IconDelete key="delete" onClick={handleDeleteClick} />
      // Add more icon components for other actions
    ];
    
  return (
    <>  
        <Breadcrumb/>
        <h1 className={styles.pageTitle}>Liste des Clients et leurs Sommes Dues</h1>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'raisonSociale', label: 'Raison Sociale', inputType : "text" },
                { key: 'somme', label: 'Somme Due' , inputType : "number"}
            ]} onFilterChange={handleFilterChangeWrapper} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} onClick={() => reloadPage()} children='Actualiser' />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openPage("/gestionClients/NouveauClient")}/>
            </span>
            
        </span>
        
        {!isLoaded ? ( // Conditional rendering based on the loading state
        <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
      ) : (
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={false} addactions={true} actionIcons={tableActions} />
      )}
        {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeleteClient} message={"Souhaitez-vous vraiment supprimer ce client ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}


        
    </>
  );
};

export default GestionClients;