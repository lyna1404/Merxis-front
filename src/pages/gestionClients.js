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
    window.close();
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
        }
      })
      .catch((error) => {
        console.log('Error:', error);
  
        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Data:', error.response.data);
        }
      });
  
  }, []);
  


    const handleFilterChange = (columnKey, filterValue) => {
      const filteredData = clients.filter((item) =>
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
    const handleViewClick = (event) => {
      console.log("view");
      const rowId = event.target.closest('tr').id;
      console.log(rowId);
      window.open(`/gestionClients/ViewClient/${rowId}`, '_blank');

    };
    const handleEditClick = (event) => {
      console.log("edit");
      const rowId = event.target.closest('tr').id;
      console.log(rowId);
      window.open(`/gestionClients/EditClient/${rowId}`, '_blank');
    };
    const handleDeleteClick = (event) => {
      console.log("delete");
      const rowId = event.target.closest('tr').id;
      setClientToDelete(rowId);
      setShowDialog(true);
    };

    const handleVersementClick = (event) => {
      console.log("versements");
      const rowId = event.target.closest('tr').id;
      window.open(`/gestionClients/detailsClient/${rowId}`, '_blank');

    };
    
    const handleDeleteClient = () => {
      setIsLoaded(false);
      console.log("delete");
      console.log(clientTodelete);
      axios
       .delete(`/api/clients/${clientTodelete}/`)
       .then(() => {
          setIsLoaded(true);
          handleSuccess();
          setClientToDelete(null);
       })
       .catch((error) => {
          console.log('Delete request error:', error);
          handleError(error.request.response);
          setClientToDelete(null);
       });
    };
    

    const tableActions = [
      <IconCash key="cash" onClick={handleVersementClick} />,
      <IconView key="view" onClick={handleViewClick} />,
      <IconEdit key="edit" onClick={handleEditClick} />,
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
            ]} onFilterChange={handleFilterChange} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} onClick={() => handleReloadClick()} children='Actualiser' />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openNewCLient()}/>
            </span>
            
        </span>
        
        {!isLoaded ? ( // Conditional rendering based on the loading state
        <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
      ) : (
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={false} addactions={true} actionIcons={tableActions} />
      )}
        {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeleteClient} message={"Souhaitez-vous vraiment supprimer ce client ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}


        
    </>
  );
};

export default GestionClients;