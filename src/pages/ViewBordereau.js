import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import styles from './listeBordereau.module.css';
import Breadcrumb from '../components/breadcrumb'
import ReusableTable from '../components/reusableTable';
import stylesLoader from './gestionClients.module.css'
import InputField from '../components/InputField';
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { formatDateFromAPI } from '../Utils/dateUtils';

function ViewBordereau() {
    const { id } = useParams();

    const [bordereauData, setBordereauData] = useState({});
    const [documentData, setDocumentData] = useState();
    console.log(documentData)
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);    
    const [isLoadedDocument, setIsLoadedDocument] = useState(false);       
    const [numBE, setNumBE] = useState(bordereauData.numBordereau || '');
    const [numDossier, setNumDossier] = useState('');
    const [date, setDate] = useState(bordereauData.date || '');
    const [etatRecup, setEtatRecup] = useState(bordereauData.etatRecuperation || '');  
    const [client, setClient] = useState('');
    
    //entete du tableau des debours
    const headers = ['Document', 'N° Document', 'Type Document', 'Nbr Document', 'Observation'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState();

    //Controler le fomrulaire d'ajout de debours
    const [showForm, setShowForm] = useState(false);


    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
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
                                    readOnly={true}
                                />
                            </label>  
                            <label className={styles.info_field}>
                                <InputField 
                                    display="labelonleft" 
                                    label="N° Dossier" 
                                    size="average" 
                                    type="text" 
                                    value={numDossier} 
                                    readOnly={true}
                                />
                            </label> 
                            <label className={styles.info_field}>
                                    <label className={labelStyles.labelonleft}>Date</label>
                                    <DatePicker selected={date} className={labelStyles.average} readOnly={true} dateFormat="dd/MM/yyyy" placeholderText="Aucune date" />
                            </label>  
                            <label className={styles.info_field}>
                            <InputField 
                                    display="labelonleft" 
                                    label="Etat Récupération" 
                                    size="belowaverage" 
                                    type="text" 
                                    value={etatRecup} 
                                    readOnly={true}
                                />
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
                    <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false}/> 
                </span>
            </>
            )}
            </div>

        </>
    );
}

export default ViewBordereau