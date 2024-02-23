import { useState, useEffect } from 'react';
import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './Comptabilite.module.css';
import stylesLoader from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';
import TabBoredereau from './TabBordereau';
import {IconView,IconEdit,IconDelete} from '../components/icons';
import { openPageBasedOnId , reloadPage , handleFilterChange} from '../Utils/actionUtils';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import CustomMessage from '../components/customMessage';
import axios from 'axios';
import {formatDateToAPI} from '../Utils/dateUtils';


// Revoir ou placer la récupération de dossier soit ici soit dans AjouterBordereau
// le formulaire de modification contient l'ajout des documents 
// dans l'ajout d'un document, récupérer la liste des documents à partir de /api/documents-douane/
// ajouter le formulaire d'un nouveau document dans les options


function Bordereaux() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const [showForm, setShowForm] = useState(false);        
    const [filteredData, setFilteredData] = useState();
    const [errorMessages, setErrorMessages] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedDossier, setIsLoadedDossier] = useState(false);

    // Champs de la partie bordereaux
    const [bordereaux, setBordereaux] = useState([]);
    const headers = ['N° Bordereau', 'Date', 'N° Dossier', 'Client', 'Etat de récupération', 'Actions à faire'];
    const [bordereauToDelete, setBordereauToDelete] = useState([]);
    const [bordereauToModify, setBordereauToModify] = useState([]);

    const [listeDossiers, setListeDossiers] = useState([]);

    const handleFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,bordereaux, setFilteredData);
      };

    const handleReloadClick = () => {
        window.location.reload(false)
    };

    const handleNouveauClick = () => {
        setShowForm(true);
      };

      const handleFormClose = () => {
        setShowForm(false);
      };

      const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };

      const handleErrorClose = () => {
        setShowError(false);
      };

      const handleDialogClose = () => {
        setBordereauToDelete(null);
        setShowDialog(false);
      };

      const handleSuccess = () => {
        setShowSuccess(true);
      };

      const handleSuccessClose = () => {
        setShowSuccess(false);
        reloadPage();
      };

      const handleSuccessDeleteClose = () => {
        setShowSuccess(false);
        reloadPage();
      };

    // Récupérer la liste des bordereaux d'envoi
    useEffect(() => {
    const bordereaux = axios.get(`${apiUrl}/api/bordereaux-envoi/`)

      .then((response) => {
        const bordereauxData = response.data;
        if (typeof bordereauxData === 'object' && bordereauxData !== null) {
          const extractedBordereaux = Object.values(bordereauxData).map(item => ({
            id: item.bordereauEnvoi_pk,
            numBordereau: item.numBordereau,
            date: item.date,
            numDossier: item.dossier? item.dossier.numDossier : null,
            client: item.dossier ? item.dossier.client.raisonSociale : null,
            etatRecuperation: item.etatRecuperation == 0? "Non Reçu" : "Reçu"
          }));
          setBordereaux(extractedBordereaux);
          setFilteredData(extractedBordereaux);
          setIsLoaded(true);
        } else {
          console.error('Response data is not a JSON object:', bordereauxData);
          handleError(bordereauxData);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        console.log('Error:', error);
        handleError(error.request.response);
      });
    }, []); 

  // Récupération de la liste de dossiers
  useEffect(() => {
        
    const dossiers = axios.get(`${apiUrl}/api/dossiers/`)

    .then((response) => {
      const dossiersData = response.data;
      if (typeof dossiersData === 'object' && dossiersData !== null) {
        const extractedDossier = Object.values(dossiersData).map(item => ({
          dossierPk: item.dossier_pk,
          numDossier: item.numDossier,
        }));
      setListeDossiers(extractedDossier);
      setIsLoadedDossier(true)
      }
      else {
      console.error('Response data is not a JSON object:', dossiersData);
      handleError(dossiersData);
      setIsLoadedDossier(true);
    }
    })
    .catch((error) => {
      console.log('Error:', error);
      handleError(error.request.response);

    });
}, []);

    //Controler l'ajout d'un bordereau
    const handleAjouter = (data) => {
        
        setIsLoaded(false);

        const bordereau = {
          numBordereau: data.numBE,
          date: data.date? formatDateToAPI(data.date): null,
          dossier: data.dossierPk,
          etatRecuperation: data.etatRecup ==="Reçu"? 1 : 0,
        };
       
        const bordereauCreated =  axios.post(`${apiUrl}/api/bordereaux-envoi/`, JSON.stringify(bordereau), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const bordereauResponse = response.data;   
              setIsLoaded(true);
              handleSuccess();
          })
          .catch((error) => {
              setIsLoaded(true)
              console.log(error.request.response);  
              handleError(error.request.response);
          });
    };

  // Suppression de bordereau
  const handleDeleteClick = (event) => {
    const rowId = event.target.closest('tr').id;
    setBordereauToDelete(rowId);
    setShowDialog(true);
  };

  const handleDelete = () => {
    setShowDialog(false);
    setIsLoaded(false);
    axios
     .delete(`${apiUrl}/api/bordereaux-envoi/${bordereauToDelete}/`)
     .then(() => {
        setShowDialog(false);
        setIsLoaded(true);
        console.log("successfully deleted");
        handleSuccess();
        setBordereauToDelete(null);
     })
     .catch((error) => {
        setShowDialog(false);
        setIsLoaded(true);
        console.log('Delete request error:', error);
        handleError(error.request.response);
        setBordereauToDelete(null);
     });
  }; 
    
    const tableActions = [
        <IconView key="view"  onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, 'Bordereaux/ViewBordereau/')} />,
        <IconEdit key="edit" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, 'Bordereaux/EditBordereau/')} />,
        <IconDelete key="delete" onClick={handleDeleteClick} />
      ];


  return (
    <>
        <Breadcrumb/>
        <h1 className={styles.pageTitle}>Liste des Bordereaux d'envoi</h1>
        <span className={styles.filter_span}>
            <TableFilter columns={[
                { key: 'numBordereau', label: 'N° Bordereau' , inputType : 'text' },
                { key: 'date', label: 'Date', inputType : 'text' },
                { key: 'numDossier', label: 'N° Dossier', inputType : 'text' },
                { key: 'client', label: 'Client' , inputType : 'text'},
                { key: 'etatRecuperation', label: 'Etat de récupération' , inputType : 'text'},
                ]}
                onFilterChange={handleFilterChangeWrapper} />
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`}  onClick={() => handleReloadClick()} children='Actualiser' />  
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => handleNouveauClick()}/>  
                {showForm && <TabBoredereau onClose={handleFormClose} 
                                    onAjouter={handleAjouter} 
                                    listeDossiers={listeDossiers}
                                    isLoaded={isLoadedDossier}
                                    />}   
            </span>
        </span>
        {!isLoaded ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : (
        <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={false} addactions={true} actionIcons={tableActions} />
        )}
        {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDelete} message={"Souhaitez-vous vraiment supprimer ce bordereau ?"} />}
        {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
    </>   
  );
}

export default Bordereaux