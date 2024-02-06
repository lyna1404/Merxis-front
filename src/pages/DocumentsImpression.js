import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import stylesLoader from './gestionClients.module.css'
import axios from 'axios';
import DocumentsTable from '../components/documentsTable'
import {IconPrint, IconEdit} from '../components/icons';
import SuccessMessage from '../components/succesMessage';
import ErrorMessage from '../components/errorMessage';
import {reloadPage} from '../Utils/actionUtils';
import EditDocImpressions from './EditDocImpressions';

function DocumentsImpression({onClose,onAjouter,dossierPk,dossier,declaration}) {
  
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState(false);
    const [documentData, setDocumentData] = useState([]);
    const [isLoadedDocument, setIsLoadedDocument] = useState(false);
    const  [filterData, setFilteredData] = useState([]);
    const [docToEdit, setDocToEdit] = useState(null);

    const headers = ['Nom Document', 'Relatif à', 'Actions à faire'];
    const [isReadyBs, setIsReadyBs] = useState('Pas enregistré')

    const data = [
        {
        id: 1,
        nomDocument: "Bulletin scanner",
        affectation: "Déclaration",
     },
     {
        id: 2,
        nomDocument: "D41",
        affectation: "Déclaration",
     },
     {
        id: 3,
        nomDocument: "Demande main levée - AHB",
        affectation: "Déclaration",
     },
     {
        id: 4,
        nomDocument: "Demande main levée - Bureau",
        affectation: "Déclaration",
     },
     {
        id: 5,
        nomDocument: "Engagement 1030",
        affectation: "Dossier",
     },
     {
        id: 6,
        nomDocument: "Fraude",
        affectation: "Déclaration",
     }
     ,
     {
        id: 7,
        nomDocument: "Note de details",
        affectation: "Déclaration",
     }
     ,
     {
        id: 8,
        nomDocument: "ONML",
        affectation: "Dossier",
     }
]

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

    const handleEditclick = (event) => {
        const rowId = event.target.closest('tr').id;
        setDocToEdit(rowId);
        setShowForm(true);
    }

    const handlePrintclick = (event) => {
      const rowId = event.target.closest('tr').id;
      { rowId==1?
          axios.get(`/api/dossiers/${dossierPk}/bulletin-scanner/pdf/`, { responseType: 'blob'})
  
          .then((response) => {
              const bsPDF = response.data;
              bsPDF.size<13000? setIsReadyBs("Non enregistré")
              : setIsReadyBs("Enregistré");

              const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});

              const pdfURL = URL.createObjectURL(file);
              window.open(pdfURL)
              
          })
          .catch((error) => {
              console.log('Error:', error);
      
              if (error.response) {
                console.log('Status Code:', error.response.status);
                console.log('Response Data:', error.response.data);
              }       
            })
      : rowId==2?

          axios.get(`/api/dossiers/${dossierPk}/d41/pdf/`, { responseType: 'blob'})
  
          .then((response) => {
              const d41PDF = response.data;
              const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});

              const pdfURL = URL.createObjectURL(file);
              window.open(pdfURL)
              
          })
          .catch((error) => {
              console.log('Error:', error);
      
              if (error.response) {
                console.log('Status Code:', error.response.status);
                console.log('Response Data:', error.response.data);
              }       
            })

      : rowId==3?
          axios.get(`/api/dossiers/${dossierPk}/demande-main-levee-ahb/pdf/`, { responseType: 'blob'})
  
          .then((response) => {
              const d41PDF = response.data;
              const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});

              const pdfURL = URL.createObjectURL(file);
              window.open(pdfURL)
              
          })
          .catch((error) => {
              console.log('Error:', error);
      
              if (error.response) {
                console.log('Status Code:', error.response.status);
                console.log('Response Data:', error.response.data);
              }       
            })

      :rowId==4?

      axios.get(`/api/dossiers/${dossierPk}/demande-main-levee-bureau/pdf/`, { responseType: 'blob'})

      .then((response) => {
          const d41PDF = response.data;
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});

          const pdfURL = URL.createObjectURL(file);
          window.open(pdfURL)
          
      })
      .catch((error) => {
          console.log('Error:', error);
  
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
          }       
        })
      : rowId==5?

      axios.get(`/api/dossiers/${dossierPk}/engagement-1030/pdf/`, { responseType: 'blob'})

      .then((response) => {
          const e1030PDF = response.data;
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});

          const pdfURL = URL.createObjectURL(file);
          window.open(pdfURL)
          
      })
      .catch((error) => {
          console.log('Error:', error);
  
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
          }       
        })
      : rowId==6?

      axios.get(`/api/dossiers/${dossierPk}/fraude/pdf/`, { responseType: 'blob'})

      .then((response) => {
          const fraudePDF = response.data;
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});

          const pdfURL = URL.createObjectURL(file);
          window.open(pdfURL)
          
      })
      .catch((error) => {
          console.log('Error:', error);
  
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
          }       
        })
      
      : rowId==8?

      axios.get(`/api/dossiers/${dossierPk}/onml/pdf/`, { responseType: 'blob'})

      .then((response) => {
          const onmlPDF = response.data;
          const file = new Blob(
            [response.data], 
            {type: 'application/pdf'});

          const pdfURL = URL.createObjectURL(file);
          window.open(pdfURL)
          
      })
      .catch((error) => {
          console.log('Error:', error);
  
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
          }       
        })
      :
      <>
      </>}
  }

    
    const tableActions = [
        <IconEdit key="edit" onClick={handleEditclick} />,
        <IconPrint key="print" onClick={handlePrintclick} />
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
      setDocToEdit(null);
      setShowDialog(false);
    };

    const handleAjouter = () => {
        console.log("ajout");
    }

    // Récupérer les documents du dossier 
    useEffect(() => {
        const bordereau = axios.get(`/api/dossiers/${dossierPk}/documents/`)
    
          .then((response) => {
            const documentsData = response.data;
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
                  <DocumentsTable data={data} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions} />
                  {showForm && <EditDocImpressions id={docToEdit} dossier={dossier} declaration={declaration} onAjouter={handleAjouter} onClose={handleFormClose}/>}
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