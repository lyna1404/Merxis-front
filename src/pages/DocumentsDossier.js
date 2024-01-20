import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import stylesLoader from './gestionClients.module.css'
import axios from 'axios';
import DocumentsTable from '../components/documentsTable'
import {IconDelete} from '../components/icons';
import SuccessMessage from '../components/succesMessage';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import {reloadPage} from '../Utils/actionUtils';

function DocumentsDossier({onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile, dossierPk}) {
  
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState(false);
    const [documentData, setDocumentData] = useState([]);
    const [isLoadedDocument, setIsLoadedDocument] = useState(false);
    const  [filterData, setFilteredData] = useState([]);
    const [docToDelete, setDocToDelete] = useState(null);

    const headers = ['Nom Document', 'N° Document','Lieu Etablissement', 'Date', 'Actions'];

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

      // Suppression d'un document
      const handleDeleteClick = (event) => {
        console.log("delete");
        const rowId = event.target.closest('tr').id;
        setDocToDelete(rowId);
        setShowDialog(true);
      };
    
      const handleDelete = () => {
        setShowDialog(false);
        setIsLoadedDocument(false);
        console.log("delete");
        axios
         .delete(`/api/dossiers/${dossierPk}/documents/${docToDelete}/`)
         .then(() => {
            setShowDialog(false);
            setIsLoadedDocument(true);
            console.log("successfully deleted");
            handleSuccess();
            setDocToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoadedDocument(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setDocToDelete(null);
         });
      };
    
    
    const tableActions = [
        <IconDelete key="delete" onClick={handleDeleteClick} />
      ];

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
      setDocToDelete(null);
      setShowDialog(false);
    };

    // Récupérer les documents du dossier 
    useEffect(() => {
        const bordereau = axios.get(`/api/dossiers/${dossierPk}/documents/`)
    
          .then((response) => {
            const documentsData = response.data;
            console.log("data",response.data)
            if (typeof documentsData === 'object' && documentsData !== null) {
                const extractedDocs= Object.values(documentsData).map(item => ({
                  id: item.documentDossier_pk,
                  nomDocument: item.typeDocument.designation,
                  numDocument: item.numDocument,
                  lieuDocument: item.lieuEtablissement,
                  dateDocument: item.dateEtablissement,
                }));
                setDocumentData(extractedDocs);
                setFilteredData(extractedDocs);
                setIsLoadedDocument(true);
            }
            else {
                console.error('Response data is not a JSON object:', documentsData);
                handleError(documentsData);
                setIsLoadedDocument(true);
          }
        })

            .catch((error) => {
                console.log('Error:', error);
    
                if (error.response) {
                console.log('Status Code:', error.response.status);
                console.log('Response Data:', error.response.data);
                }       
            });
    }, [dossierPk]); 

    return (
    <div className={styles.tab}>
        <h3>Liste des documents relatifs au dossier</h3>
        {!(isLoadedDocument) ? ( // Conditional rendering based on the loading state
          <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
              ) : (
                <>
                  <DocumentsTable data={filterData} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions} />
                  {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
                  {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDelete} message={"Souhaitez-vous vraiment supprimer ce document ?"} />}
                  {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
                  <span className={styles.docsButtonSpan}>
                      <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                  </span>
                </>
              )
        }
    </div>
  )
}

export default DocumentsDossier