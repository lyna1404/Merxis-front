import React from 'react'
import styles from '../popupForm.module.css'
import stylesLine from '../listeFacture.module.css';
import buttonStyles from '../../components/button.module.css';
import stylesO from '../options.module.css'
import stylesLoader from '../gestionClients.module.css'
import Breadcrumb from '../../components/breadcrumb'
import TableFilter from '../../components/tableFilter';
import ReusableTable from '../../components/reusableTable';
import ErrorMessage from '../../components/errorMessage';
import CustomMessage from '../../components/customMessage';
import SuccessMessage from '../../components/succesMessage';
import axios from 'axios';
import { reloadPage , handleFilterChange} from '../../Utils/actionUtils';
import { useState, useEffect} from 'react';
import { IconDelete } from '../../components/icons';
import TabPays from './Tabs/TabPays';


function OptionsDevises() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const [filteredData, setFilteredData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    
    // Champs de la parties pays
   const [pays, setPays] = useState([]);
   const [paysToDelete, setPaysToDelete] = useState([]);

   const headers = ["Code", "Nom", "Actions à faire"]

    // Récupérer la liste des pays 
    useEffect(() => {
      axios.get(`${apiUrl}/api/pays/`)
      .then((response) => {
          const paysData = response.data;

          if (typeof paysData === 'object' && paysData !== null) {
            const extractedPays = Object.values(paysData).map(item => ({
              id: item.pays_pk,
              code: item.code,
              nom: item.nom,
            }));
            setPays(extractedPays);
            setFilteredData(extractedPays);
            setIsLoaded(true);
          }
          else {
          console.error('Response data is not a JSON object:', paysData);
          handleError(paysData);
          setIsLoaded(true);
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


    const [showForm, setShowForm] = useState(false);

    const handleFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,pays, setFilteredData);
      };
    
      // Nouveau pays
    const handleNouveauClick = () => {
        setShowForm(true);
      };

    const handleFormClose = () => {
        setShowForm(false);
      };
        
      // Controle d'erreurs
      const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };
      
      const handleErrorClose = () => {
        setShowError(false);
      };

      const handleDialogClose = () => {
        setPaysToDelete(null);
        setShowDialog(false);
      };
      
      const handleSuccess = () => {
          setShowSuccess(true);
        };
        
        const handleSuccessClose = () => {
          setShowSuccess(false);
          window.close();
        };

        const handleSuccessDeleteClose = () => {
          setShowSuccess(false);
          reloadPage();
        };

         //Controler l'ajout d'un pays 
       const handleAjouter = (data) => {
        
        setIsLoaded(false);

        const pays = {
          code: data.code,
          nom: data.nom,
        };
       
        const paysCreated =  axios.post(`${apiUrl}/api/pays/`, JSON.stringify(pays), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const paysResponse = response.data;   
              setIsLoaded(true);
              handleSuccess();
          })
          .catch((error) => {
              setIsLoaded(true)
              console.log(error.request.response);  
              handleError(error.request.response);
          });
       };

       const handleDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setPaysToDelete(rowId);
        setShowDialog(true);
      };

      const handleDeletePays = () => {
        setShowDialog(false);
        setIsLoaded(false);
        axios
         .delete(`${apiUrl}/api/pays/${paysToDelete}/`)
         .then(() => {
            setShowDialog(false);
            setIsLoaded(true);
            handleSuccess();
            setPaysToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoaded(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setPaysToDelete(null);
         });
      };

       const tableActions = [
        <IconDelete key="delete" onClick={handleDeleteClick} />
      ];

  return (
    <>
     <Breadcrumb/>
     <div className={stylesO.contentWrapper}>
        <h1 className={stylesLine.pageTitle}>Liste des Pays</h1>
        <div className={styles.line}></div>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'code', label: 'Code' ,  inputType : 'text'},
                            { key: 'nom', label: 'Designation', inputType : 'text' },
                        ]} onFilterChange={handleFilterChangeWrapper} />
        </span>
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions} />
        {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeletePays} message={"Souhaitez-vous vraiment supprimer ce pays ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessDeleteClose} />}
                 
        <span className={styles.addButton}>
        <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauClick}/> 
        {showForm && <TabPays onClose={handleFormClose} 
                                onAjouter={handleAjouter} 
                                />}  
        {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}

        </span>
        <div className={stylesLine.footerSpace}></div> 
        </>
        )}

     </div>

    </>
  )
}

export default OptionsDevises