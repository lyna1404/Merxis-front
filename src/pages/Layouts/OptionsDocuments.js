import React from 'react'
import styles from '../popupForm.module.css'
import stylesLine from '../listeFacture.module.css';
import buttonStyles from '../../components/button.module.css';
import stylesO from '../options.module.css'
import stylesLoader from '../gestionClients.module.css'
import Breadcrumb from '../../components/breadcrumb'
import TableFilter from '../../components/tableFilter';
import ReusableTable from '../../components/reusableTable';
import SuccessMessage from '../../components/succesMessage';
import ErrorMessage from '../../components/errorMessage';
import CustomMessage from '../../components/customMessage';
import axios from 'axios';
import { IconDelete } from '../../components/icons';
import { reloadPage , handleFilterChange} from '../../Utils/actionUtils';
import { useState, useEffect } from 'react';
import TabDocs from './Tabs/TabDocs'



function OptionsDocuments() {

    const [filteredData, setFilteredData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [docToDelete, setDocToDelete] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    
    // Champs de la parties emballages
   const [docs, setDocs] = useState([]);
   const headers = ["Designation", "Actions à faire"]

    // Récupérer la liste de devises du dossier
    useEffect(() => {
      axios.get(`${apiUrl}/api/types-document-dossier/`)
      .then((response) => {
          const docsData = response.data;

          if (typeof docsData === 'object' && docsData !== null) {
            const extractedDocs = Object.values(docsData).map(item => ({
              id: item.typeDocumentDossier_pk,
              designation: item.designation,
            }));
            setDocs(extractedDocs);
            setFilteredData(extractedDocs);
            setIsLoaded(true);
          }
          else {
          console.error('Response data is not a JSON object:', docsData);
          handleError(docsData);
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
        handleFilterChange(columnKey, filterValue,docs, setFilteredData);
      };

    // Nouveau doc
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
      
      const handleSuccess = () => {
          setShowSuccess(true);
        };
        
        const handleSuccessClose = () => {
          setShowSuccess(false);
          reloadPage()
        };

        const handleSuccessReload = () => {
          setShowSuccess(false);
          reloadPage();
        };

        const handleDialogClose = () => {
          setShowDialog(false);
        };

      //Controler l'ajout d'un document 
       const handleAjouter = (data) => {
        
        setIsLoaded(false);

        const doc = {
          designation: data.designation,
        };
       
        const docCreated =  axios.post(`${apiUrl}/api/types-document-dossier/`, JSON.stringify(doc), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const docResponse = response.data;   
              setIsLoaded(true);
              handleSuccess();
          })
          .catch((error) => {
              setIsLoaded(true)
              console.log(error.request.response);  
              handleError(error.request.response);
          });
       };


      // Suppression d'un document
      const handleDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setDocToDelete(rowId);
        setShowDialog(true);
      };
    
      const handleDelete = () => {
        setShowDialog(false);
        setIsLoaded(false);
        axios
         .delete(`${apiUrl}/api/types-document-dossier/${docToDelete}/`)
         .then(() => {
            setShowDialog(false);
            setIsLoaded(true);
            handleSuccess();
            setDocToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoaded(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setDocToDelete(null);
         });
      };


      const tableActions = [
        <IconDelete key="delete" onClick={handleDeleteClick} />
      ];

  return (
    <>
     <Breadcrumb/>
     <div className={stylesO.contentWrapper}>
        <h1 className={stylesLine.pageTitle}>Liste des Documents</h1>
        <div className={styles.line}></div>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'designation', label: 'Designation', inputType : 'text' },
                        ]} onFilterChange={handleFilterChangeWrapper} />
        </span>
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={6} addlink={false} addactions={true} actionIcons={tableActions}/>
         {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
          {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDelete} message={"Souhaitez-vous vraiment supprimer ce document ?"} />}
          {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
        <span className={styles.addButton}>
        <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauClick}/> 
        {showForm && <TabDocs onClose={handleFormClose} 
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

export default OptionsDocuments