import { useState, useRef, useEffect  } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './listeBordereau.module.css';
import buttonStyles from '../components/button.module.css';
import stylesLoader from './gestionClients.module.css'
import Breadcrumb from '../components/breadcrumb'
import ReusableTable from '../components/reusableTable';
import InputField from '../components/InputField';
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TabDocBordereau from './TabDocBordereau';
import {IconEdit,IconDelete} from '../components/icons';
import Select from 'react-select';
import { openPageBasedOnId , reloadPage , openPage , handleFilterChange} from '../Utils/actionUtils';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import CustomMessage from '../components/customMessage';
import axios from 'axios';
import { formatDateFromAPI } from '../Utils/dateUtils';

function EditBordereau() {

    const { id } = useParams();

    const [bordereauData, setBordereauData] = useState({});
    const [documentData, setDocumentData] = useState();
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);    
    const [isLoadedDocument, setIsLoadedDocument] = useState(false);  
    const [isLoadedDossier, setIsLoadedDossier] = useState(false); 
    const [showDialog, setShowDialog] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const [numBE, setNumBE] = useState(bordereauData.numBordereau || '');
    const [numDossier, setNumDossier] = useState('');
    const [dossierPk, setDossierPk] = useState(''); // à récupérer
    const [date, setDate] = useState(bordereauData.date || '');
    const listeEtatRecup = [{index:1, value:"Non Reçu"},{index:2, value:"Reçu"}];
    const [etatRecup, setEtatRecup] = useState(bordereauData.etatRecuperation || '');  
    const [client, setClient] = useState('');


    const [selectedDossier, setSelectedDossier] = useState({value: dossierPk, label:numDossier});
    const [listeDossiers, setListeDossiers] = useState([]);


    const [docToDelete, setDocToDelete] = useState(null);

    //entete du tableau des debours
    const headers = ['Document', 'N° Document', 'Type Document', 'Nbr Document', 'Observation', 'Actions à faire'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState();

    const listeNumDossiers = listeDossiers.map(({dossierPk, numDossier}) => ({ ['value'] : dossierPk, ['label']:numDossier}))

    
    const handleFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,documentData, setFilteredData);
      };

    //Controler le fomrulaire d'ajout de debours
    const [showForm, setShowForm] = useState(false);


    const handleReloadClick = () => {
        window.location.reload(false)
    };

    const handleNouveauClick = () => {
        setShowForm(true);
      };

      const handleFormClose = () => {
        setShowForm(false);
      };

      const handleErrorClose = () => {
        setShowError(false);
      };

      const handleDialogClose = () => {
        setDocToDelete(null);
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

    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };

    const handleDossierSelection = (searchTerm) => {
        setSelectedDossier(searchTerm);
        setNumDossier(searchTerm.label);
        setDossierPk(searchTerm.value); 
    };

    // Récupérer le bordereau d'envoi
    useEffect(() => {
    const bordereau = axios.get(`/api/bordereaux-envoi/${id}`)

      .then((response) => {
        const bordereauxData = response.data;
          const {numBordereau,date,dossier, etatRecuperation} = bordereauxData;
          setBordereauData(bordereauxData);
          setNumBE(numBordereau);
          etatRecuperation==1? setEtatRecup("Reçu") : setEtatRecup("Non Reçu");
          setNumDossier(dossier.numDossier);
          setDossierPk(dossier.dossier_pk);
          setSelectedDossier({value: dossier.dossier_pk, label:dossier.numDossier})
          setClient(dossier.client.raisonSociale);
         date? setDate(formatDateFromAPI(date)) : setDate(null); 
         setIsLoaded(true);
        })
        .catch((error) => {
            console.log('Error:', error);

            if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
            }       
        });
}, [id]); 

    // Récupérer les documents du bordereau d'envoi
    useEffect(() => {
        const bordereau = axios.get(`/api/bordereaux-envoi/${id}/documents/`)
    
          .then((response) => {
            const documentsData = response.data;
            console.log("data",response.data)
            if (typeof documentsData === 'object' && documentsData !== null) {
                const extractedDocs= Object.values(documentsData).map(item => ({
                  id: item.documentBordereau_pk,
                  nomDocument: item.document.typeDocument.designation,
                  numDocument: item.document.numDocument,
                  typeDocument: item.typeDocument,
                  nbrDocument: item.nbrDocument,
                  observation: item.observation,
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
    }, [id]); 
    
  // Récupération de la liste de dossiers 
  useEffect(() => {
        
    const dossiers = axios.get('/api/dossiers/')

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


    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
    
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
        }
      };

    const handleFileUploadClick = () => {
        inputFile.current.click();
      };
    
    //Controler l'ajout d'un document
    const handleAjouter = (data) => {
        const doc = {
          document: data.docPk,
          nbrDocument: data.nbrDocuments,
          typeDocument: data.typeDocument,
          observation: data.observation,
        }  

        const docAdded = axios.post(`/api/bordereaux-envoi/${id}/documents/`, JSON.stringify(doc), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const docResponse = response.data; 
              handleSuccess();
          })
          .catch((error) => {
              handleError(error.request.response);
          });
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
    setIsLoaded(false);
    console.log("delete");
    axios
     .delete(`/api/bordereaux-envoi/${id}/documents/${docToDelete}/`)
     .then(() => {
        setShowDialog(false);
        setIsLoaded(true);
        console.log("successfully deleted");
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

  const handleModifierBordereau = () => {
    setIsLoaded(false);
    const bordereau = {
        numBordereau:numBE,
        date:date,
        dossier:dossierPk,
        etatRecuperation: etatRecup==="Non Reçu"? 0 : 1,
    }

    const bordereauEdited =  axios.put(`/api/bordereaux-envoi/${id}/`, bordereau, {
        headers: {
        'Content-Type': 'application/json',
        }
      })
    
    .then((response) => {
        const dossierResponse = response.data;
        setIsLoaded(true);
        handleSuccess();
    })
    .catch((error) => {
        setIsLoaded(true);
        handleError(error.request.response);
    });
  }
  
    const tableActions = [
        <IconEdit key="edit" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/facturation/Bordereaux/EditBordereau/')} />,
        <IconDelete key="delete" onClick={handleDeleteClick} />
    ];

    // Styling des searchable dropdown de react-select
    const colorStyles = {
          
        control : styles => ({...styles, backgroundColor:'white',border:'none','box-shadow':'none', fontFamily:'Montserrat'}),
        option: (styles, {isFocused, isSelected}) => ({
          ...styles,
          backgroundColor: isFocused? '#e4e1e1' : isSelected? '#a3a7d8' : 'white',
          fontFamily: 'Montserrat',
        }),
        singleValue : styles => ({...styles, color:'black', fontFamily:'Montserrat', fontSize:'16px'})
    };
    return (
        <>
            <Breadcrumb numDossier={numDossier} hideParams={true}/>
            <div className={styles.main_grid}>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
                <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
                ) : (
                <>
                <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                           <label className={styles.info_field}>
                                <InputField 
                                    display="labelonleft" 
                                    label="N° Bordereau" 
                                    size="average" 
                                    type="text" 
                                    value={numBE} 
                                    onChange={(e) => setNumBE(e.target.value)}
                                />
                            </label>   
                            <label className={styles.info_field}>
                                <label className={labelStyles.labelonleft}>N° Dossier
                                    <Select className={labelStyles.average} styles={colorStyles} options={listeNumDossiers} value={selectedDossier} placeholder="Sélectionner un dossier" onChange={(e) => handleDossierSelection(e)} isSearchable={true}/>
                                </label> 
                            </label> 
                            <label className={styles.info_field}>
                                    <label className={labelStyles.labelonleft}>Date</label>
                                    <DatePicker selected={date} className={labelStyles.average}  onChange={(e) => setDate(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner" />
                            </label> 
                            <label className={styles.info_field}>
                                <label className={labelStyles.labelonleft}>Etat Récupération</label>
                                <select value={etatRecup} className={labelStyles.average}  onChange={(e) => setEtatRecup(e.target.value)}>
                                    <option value="">Sélectionner</option>
                                    {listeEtatRecup.map((etat) => (
                                        <option key={etat.index} value={etat.value}>
                                            {etat.value}
                                        </option>
                                    ))}
                                </select>
                            </label> 
                            <label className={styles.info_field}>
                                <InputField 
                                        display="labelonleft" 
                                        label="Client" 
                                        size="verylarge" 
                                        type="text" 
                                        value={client} 
                                        readOnly={true}
                                    />
                            </label>  
                        <div className={styles.horizontalLine}></div>
                    </div>
                </span>

               <span className={styles.table_grid}>
                    <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions}/> 
                    <span className={styles.buttons_grid}>
                        <button className={`${buttonStyles.primaryButtonB}`} children='Ajouter Doc' onClick={handleNouveauClick} />
                        {showForm && <TabDocBordereau onClose={handleFormClose} 
                                                            onAjouter={handleAjouter} 
                                                            onFileUpload={handleFileUpload} 
                                                            onFileUploadClick={handleFileUploadClick}
                                                            inputFile={inputFile}
                                                            dossierPk={dossierPk}/>} 
                        <button className={`${buttonStyles.primaryButtonY}`} children='Enregistrer' onClick={handleModifierBordereau} />
                        {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
                        {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDelete} message={"Souhaitez-vous vraiment supprimer ce bordereau ?"}/>}
                        {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
                        
                    </span>
                </span>
                </>
            )}
            </div>

        </>
    );
}

export default EditBordereau