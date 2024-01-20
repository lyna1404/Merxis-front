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
import axios from 'axios';
import { reloadPage , handleFilterChange} from '../../Utils/actionUtils';
import { useState, useEffect, useRef } from 'react';



function OptionsDevises() {

    const [filteredData, setFilteredData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    
    // Champs de la parties emballages
   const [devises, setDevises] = useState([]);
   const headers = ["Code", "Designation", "Taux de change", "Designation en arabe"]

    // Récupérer la liste de devises du dossier
    useEffect(() => {
      axios.get(`/api/devises/`)
      .then((response) => {
          const devisesData = response.data;

          if (typeof devisesData === 'object' && devisesData !== null) {
            const extractedDevises = Object.values(devisesData).map(item => ({
              id: item.devise_pk,
              code: item.code,
              designation: item.designation,
              tauxChange: item.tauxChange,
              designationArabe: item.designationArabe        
            }));
            setDevises(extractedDevises);
            setFilteredData(extractedDevises);
            setIsLoaded(true);
          }
          else {
          console.error('Response data is not a JSON object:', devisesData);
          handleError(devisesData);
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
        handleFilterChange(columnKey, filterValue,devises, setFilteredData);
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
          window.close();
        };

        const handleSuccessReload = () => {
          setShowSuccess(false);
          reloadPage();
        };

        const handleDialogClose = () => {
          setShowDialog(false);
        };

       //Controler la mises à jour des devises
       const [message, setMessage] = useState([]);

       const handleStatut = (async () => {

        setMessage("Mise à jour en cours...")

        await axios.get(`/api/devises/maj/`)
        .then((response) => {
            const majData = response.data;
            handleSuccess();
          }
        )
        .catch((error) => {
            console.log('Error:', error);
            
            if (error.response) {
            handleError(error.request.response)
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
        
        setShowDialog(true);

        axios.get(`/api/devises/status/`)
        .then((response) => {
            const majData = response.data;
            const part1 = "Dernière mise à jour éfféctuée le : " + majData.last_update.split('T')[0];
            const part2 = " à " + majData.last_update.split('T')[1].split('Z')[0];
            setMessage(part1 + part2)
            handleSuccess();
          }
        )
        .catch((error) => {
            console.log('Error:', error);
            if (error.response) {
            handleError(error.request.response)
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
       })


  return (
    <>
     <Breadcrumb/>
     <div className={stylesO.contentWrapper}>
        <h1 className={stylesLine.pageTitle}>Liste des Devises</h1>
        <div className={styles.line}></div>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'code', label: 'Code' ,  inputType : 'text'},
                            { key: 'designation', label: 'Designation', inputType : 'text' },
                            { key: 'tauxChange', label: 'Taux de change' , inputType : 'text'},
                            { key: 'designationArabe', label: 'Designation en arabe' , inputType : 'text'},
                        ]} onFilterChange={handleFilterChangeWrapper} />
        </span>
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={4} addlink={false} />
        <span className={styles.addButton}>
           <button className={`${buttonStyles.primaryButtonY}`} children='Mettre à jour'  onClick={handleStatut}/> 
       {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleSuccessReload} message={message.toString()} />}
        {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}

        </span>
        <div className={stylesLine.footerSpace}></div> 
        </>
        )}
     </div>

    </>
  )
}

export default OptionsDevises