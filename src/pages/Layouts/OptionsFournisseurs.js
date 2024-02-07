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
import { IconDelete, IconEdit } from '../../components/icons';
import TabFournisseurs from './Tabs/TabFournisseurs';


function OptionsFournisseurs() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const [filteredData, setFilteredData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    

    // Champs de la parties marchandises
   const [fournisseurs, setFournisseurs] = useState([]);
   const [fournisseurToDelete, setFournisseurToDelete] = useState([]);
   const [fournisseurToModify, setFournisseurToModify] = useState([]);



   const headers = ["Raison Sociale", "Adresse", "Raison Sociale en arabe", "Actions à faire"]

    // Récupérer la liste des fournisseurs 
    useEffect(() => {
      axios.get(`${apiUrl}/api/fournisseurs/`)
      .then((response) => {
          const fournissData = response.data;
          if (typeof fournissData === 'object' && fournissData !== null) {
            const extractedFourniss = Object.values(fournissData).map(item => ({
              id: item.fournisseur_pk,
              raisonSociale: item.raisonSociale,
              adresse: item.adresse,
              raisonSocialeArabe: item.raisonSocialeArabe,
            }));
            setFournisseurs(extractedFourniss);
            setFilteredData(extractedFourniss);
            setIsLoaded(true);
          }
          else {
          console.error('Response data is not a JSON object:', fournissData);
          handleError(fournissData);
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
    const [showEditForm, setShowEditForm] = useState(false);

    const handleFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,fournisseurs, setFilteredData);
      };
    
      // Nouveau fournisseur
    const handleNouveauClick = () => {
        setShowForm(true);
      };

    const handleFormClose = () => {
        setShowForm(false);
      };

      // Modifier fournisseur
      const handleEditClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setFournisseurToModify(rowId);
        setShowEditForm(true);
      };

    const handleEditFormClose = () => {
        setShowEditForm(false);
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
        setFournisseurToDelete(null);
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

         //Controler l'ajout d'un fournisseur 
       const handleAjouter = (data) => {
        
        setIsLoaded(false);

        const fourniss = {
          raisonSociale: data.raisonSociale,
          adresse: data.adresse,
          raisonSocialeArabe: data.raisonSocialeArabe,
        };
       
        const fournissCreated =  axios.post(`${apiUrl}/api/fournisseurs/`, JSON.stringify(fourniss), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const fournissResponse = response.data;   
              setIsLoaded(true);
              handleSuccess();
          })
          .catch((error) => {
              setIsLoaded(true)
              console.log(error.request.response);  
              handleError(error.request.response);
          });
       };

        //Controler la modification d'un fournisseur 
       const handleModifier = (data) => {
        
        setIsLoaded(false);

        const fourniss = {
          raisonSociale: data.raisonSociale,
          adresse: data.adresse,
          raisonSocialeArabe: data.raisonSocialeArabe,
        };
       
        const fournissCreated =  axios.put(`${apiUrl}/api/fournisseurs/${fournisseurToModify}/`, JSON.stringify(fourniss), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const fournissResponse = response.data;   
              setIsLoaded(true);
              setFournisseurToModify(null);
              handleSuccess();
          })
          .catch((error) => {
              setIsLoaded(true)
              console.log(error.request.response);  
              setFournisseurToModify(null);
              handleError(error.request.response);
          });
       };

       const handleDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setFournisseurToDelete(rowId);
        setShowDialog(true);
      };

      const handleDeleteFournisseur = () => {
        setShowDialog(false);
        setIsLoaded(false);
        axios
         .delete(`${apiUrl}/api/fournisseurs/${fournisseurToDelete}/`)
         .then(() => {
            setShowDialog(false);
            setIsLoaded(true);
            handleSuccess();
            setFournisseurToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoaded(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setFournisseurToDelete(null);
         });
      };

       const tableActions = [
        <IconDelete key="delete" onClick={handleDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditClick} />,

      ];

  return (
    <>
     <Breadcrumb/>

      <div className={stylesO.contentWrapper}>
        <h1 className={stylesLine.pageTitle}>Liste des Fournisseurs</h1>
        <div className={styles.line}></div>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'raisonSociale', label: 'Raison Sociale' ,  inputType : 'text'},
                            { key: 'adresse', label: 'Adresse' ,  inputType : 'text'},
                            { key: 'raisonSocialeArabe', label: 'Raison Sociale en arabe', inputType : 'text' },
                        ]} onFilterChange={handleFilterChangeWrapper} />
        </span>
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions} />
        {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeleteFournisseur} message={"Souhaitez-vous vraiment supprimer ce fournisseur ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessDeleteClose} />}
        {showEditForm && <TabFournisseurs onClose={handleEditFormClose} 
                                onAjouter={handleModifier} 
                                isEdit={true}
                                toModify={fournisseurToModify}
                                />}  

        <span className={styles.addButton}>
        <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauClick}/> 
        {showForm && <TabFournisseurs onClose={handleFormClose} 
                                onAjouter={handleAjouter} 
                                isEdit={false}
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

export default OptionsFournisseurs