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
import TabMarchandises from './Tabs/TabMarchandises'
import axios from 'axios';
import { reloadPage , handleFilterChange} from '../../Utils/actionUtils';
import { useState, useEffect} from 'react';
import { IconDelete } from '../../components/icons';


function OptionsDevises() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const [filteredData, setFilteredData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    

    // Champs de la parties marchandises
   const [marchandises, setMarchandises] = useState([]);
   const [marchandiseToDelete, setMarchandiseToDelete] = useState([]);

   const headers = ["Designation", "Designation en arabe", "Actions à faire"]

    // Récupérer la liste des marchandises 
    useEffect(() => {
      axios.get(`${apiUrl}/api/natures-marchandise/`)
      .then((response) => {
          const marchandisesData = response.data;
          if (typeof marchandisesData === 'object' && marchandisesData !== null) {
            const extractedMarchandise = Object.values(marchandisesData).map(item => ({
              id: item.natureMarchandise_pk,
              designation: item.designation,
              designationArabe: item.designationArabe,
            }));
            setMarchandises(extractedMarchandise);
            setFilteredData(extractedMarchandise);
            setIsLoaded(true);
          }
          else {
          console.error('Response data is not a JSON object:', marchandisesData);
          handleError(marchandisesData);
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
        handleFilterChange(columnKey, filterValue,marchandises, setFilteredData);
      };
    
      // Nouvelle marchandise
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
        setMarchandiseToDelete(null);
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

         //Controler l'ajout d'un emballage 
       const handleAjouter = (data) => {
        
        setIsLoaded(false);

        const march = {
          designation: data.designation,
          designationArabe: data.designationArabe,
        };
       
        const marchCreated =  axios.post(`${apiUrl}/api/natures-marchandise/`, JSON.stringify(march), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const marchResponse = response.data;   
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
        setMarchandiseToDelete(rowId);
        setShowDialog(true);
      };

      const handleDeleteMarchandise = () => {
        setShowDialog(false);
        setIsLoaded(false);
        axios
         .delete(`${apiUrl}/api/natures-marchandise/${marchandiseToDelete}/`)
         .then(() => {
            setShowDialog(false);
            setIsLoaded(true);
            handleSuccess();
            setMarchandiseToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoaded(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setMarchandiseToDelete(null);
         });
      };

       const tableActions = [
        <IconDelete key="delete" onClick={handleDeleteClick} />
      ];

  return (
    <>
     <Breadcrumb/>

      <div className={stylesO.contentWrapper}>
        <h1 className={stylesLine.pageTitle}>Liste des Marchandises</h1>
        <div className={styles.line}></div>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'designation', label: 'Designation' ,  inputType : 'text'},
                            { key: 'designationArabe', label: 'Designation en arabe', inputType : 'text' },
                        ]} onFilterChange={handleFilterChangeWrapper} />
        </span>
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions} />
        {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeleteMarchandise} message={"Souhaitez-vous vraiment supprimer cette marchandise ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessDeleteClose} />}
                 
        <span className={styles.addButton}>
        <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauClick}/> 
        {showForm && <TabMarchandises onClose={handleFormClose} 
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