import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import stylesLoader from './gestionClients.module.css'
import axios from 'axios';
import DocumentsTable from '../components/documentsTable'
import {IconDelete, IconEdit} from '../components/icons';
import SuccessMessage from '../components/succesMessage';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import {reloadPage} from '../Utils/actionUtils';
import EditDocImpressions from './EditDocImpressions';

function DocumentsImpression({onClose,onAjouter,dossierPk}) {
  
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState(false);
    const [documentData, setDocumentData] = useState([]);
    const [isLoadedDocument, setIsLoadedDocument] = useState(false);
    const  [filterData, setFilteredData] = useState([]);
    const [docToDelete, setDocToDelete] = useState(null);

    const headers = ['Nom Document', 'Date', 'Actions à faire'];

    const data = [{
        
    }]

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

    
    const tableActions = [
        <IconEdit key="edit" onClick={<EditDocImpressions/>} />
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
        <h3>Liste des documents à imprimer / Formulaires à remplir</h3>
        {!(isLoadedDocument) ? ( // Conditional rendering based on the loading state
          <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
              ) : (
                <>
                  <DocumentsTable data={filterData} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions} />
                  {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
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

export default DocumentsImpression