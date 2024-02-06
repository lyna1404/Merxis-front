
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import styles from './listeFacture.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import InputField from '../components/InputField';
import axios from 'axios';
import styles2 from './gestionClients.module.css';


function ViewFactures() {
   
    //Recuperer le numero dossier choisie
    const { id } = useParams();
    
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [facture, setFacture] = useState({});
    const [prestations, setPrestations] = useState({});
    const [debours, setDebours] = useState({});
    const [calcul, setCalculs] = useState({});

    const[debpres,setDebPres] = useState([])


    useEffect(() => {
        // Create axios requests for both data fetching
        while(id==null){}
        const facture = axios.get(`/api/factures-definitives/${id}/`); // Replace with your other endpoint
        const debours = axios.get(`/api/factures-definitives/${id}/debours/`);
        const prestations = axios.get(`/api/factures-definitives/${id}/prestations/`);
        const calculs = axios.get(`/api/factures-definitives/${id}/calcul/`);



        // Use Promise.all to wait for both requests to complete
        Promise.all([facture, debours, prestations, calculs])
          .then((responses) => {
            const FactureResponse = responses[0].data;
            const deboursResponse = responses[1].data;
            const PrestationResponse = responses[2].data;
            const calculsResponse = responses[3].data;

            if (typeof deboursResponse === 'object' && deboursResponse !== null && typeof PrestationResponse === 'object' && PrestationResponse !== null) {
                const extractedDebours = Object.values(deboursResponse).map(item => ({
                  id: item.debours_pk,
                  type : "Debours",
                  designation : item.typeDebours.designation,
                  montant: item.montant
                }));
                const extractedPrestations = Object.values(PrestationResponse).map(item => ({
                    id: item.prestation_pk,
                    type : "Prestation",
                    designation : item.typePrestation.designation,
                    montant: item.montant
                  }));
                  setPrestations(extractedPrestations);
                  setDebours(extractedDebours);
                  setDebPres(extractedDebours.concat(extractedPrestations))
              } else {
                console.error('Response data is not a JSON object:');
                setIsLoaded(true);
              }
            setFacture(FactureResponse);
            setCalculs(calculsResponse);
            setIsLoaded(true); 
          })
          .catch((error) => {
            setIsLoaded(true);
            console.log(error.request.response);
            //handleError(error.request.response);     
          });
      }, [id]); // Add 'id' as a dependency

    
    //Exemple d'un historique de debours
    
    //entete du tableau des debours
    const headers = ['Type', 'Debours/Prestation', 'Montant'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState();

    

    const setMontantDebours = (dossier) => {
        let montantDeb = 0;
        dossier.deboursPrestations.map((debours)=>{debours.montantDebours!='/'? 
                                                            montantDeb+=Number(String(debours.montantDebours).split(' ')[0])
                                                            : montantDeb+=0});
        return montantDeb + ' DZD';
    };

    const setMontantPrestations = (dossier) => {
        let montantPres = 0;
        dossier.deboursPrestations.map((prestation)=>{prestation.montantPrestations!='/'? 
                                                        montantPres+=Number(String(prestation.montantPrestations).split(' ')[0])  
                                                                : montantPres+=0});
        return montantPres + ' DZD';
    }

    //Controler le fomrulaire d'ajout de debours
    const [showForm, setShowForm] = useState(false);

    const handleNouveauClick = () => {
      setShowForm(true);
    };
  
    const handleFormClose = () => {
      setShowForm(false);
    };

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
    
    //Controler l'ajout d'un debours 
    const handleAjouter = (data) => {
        setFilteredData((prevFilteredData) => [data,...prevFilteredData]);
      };

    const handlePrint = () =>{
        axios.get(`/api/factures-definitives/${id}/pdf/`, { responseType: 'blob'})

        .then((response) => {
            const facturePDF = response.data;
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
    }


    return (
        <>
            <AdvancedBreadcrumb numDossier={facture.dossier?facture.dossier.numDossier:facture.numDossier} hideParams={false} hideButtons={true} hideDocs={true} hidePrintable={false} onPrint={handlePrint}/>
            {!isLoaded ? ( // Conditional rendering based on the loading state
            <div className={styles2.loader_container}><span className={styles2.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <div className={styles.main_grid}>
            <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                        <label className={styles.info_field}>
                            <InputField 
                                    display="labelonleft" 
                                    label="N° Facture" 
                                    size="belowaverage" 
                                    type="text" 
                                    value={facture.numFacture} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                          <InputField 
                                    display="labelonleft" 
                                    label="Date" 
                                    size="belowaverage" 
                                    type="text" 
                                    value={facture.date} 
                                    onChange=""
                                    readOnly={true}
                            />
                            </label>
                        <label className={styles.info_field}>
                            <InputField 
                                    display="labelonleft" 
                                    label="Nom Client" 
                                    size="large" 
                                    type="text" 
                                    value={facture.dossier.client.raisonSociale} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="N° Declaration" 
                                    size="average" 
                                    type="text" 
                                    value={facture.numDeclaration} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="Nom Fournisseur" 
                                    size="overaverage" 
                                    type="text" 
                                    value={facture.dossier.fournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="N° Fact. Fournisseur" 
                                    size="average" 
                                    type="text" 
                                    value={facture.numFactureFournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="Montant" 
                                    size="belowaverage" 
                                    type="text" 
                                    value={facture.montantFactureFournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="Monnaie" 
                                    size="verysmall" 
                                    type="text" 
                                    value={facture.dossier.monnaie} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="N° Titre Transport" 
                                    size="belowaverage" 
                                    type="text" 
                                    value={facture.numTitreTransport} 
                                    onChange=""
                                    readOnly={true}                            />
                        </label>
                    <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                    label="Nbr Colis" 
                                    size="verysmall" 
                                    type="text" 
                                    value={facture.dossier.declaration.nbrColis} 
                                    onChange=""
                                    readOnly={true}                            />
                        </label>
                    <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                    label="Nature Marchandise" 
                                    size="verylarge" 
                                    type="text" 
                                    value={facture.dossier.natureMarchandise} 
                                    onChange=""
                                    readOnly={true}                            />
                        </label>
                        <div className={styles.horizontalLine}></div>
                    </div>
                </span>

               <span className={styles.table_grid}>
                    <ReusableTable data={debpres} headers={headers} itemsPerPage={5} addlink={false}/> 
                    <span className={styles.container}>
                        <label className={styles.label_style}>Total</label>
                        <input className={styles.total}
                            value={calcul.total_prestation_debours}
                            readOnly={true}
                        />
                        <label className={styles.label_style}>Total Debours</label>
                        <input className={styles.total}
                            value={calcul.total_debours}
                            readOnly={true}
                        />
                        <label className={styles.label_style}>Total Prestations</label>
                        <input className={styles.total}
                            value={calcul.total_prestation}
                            readOnly={true}
                        />
                    </span>  
                    <div className={styles.verticalLine}></div>
                </span>
                
                <span className={styles.label_grid}>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Taux TVA" 
                                size="small" 
                                type="text" 
                                value={facture.taux_tva}
                                onChange="" 
                                readOnly="false"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Montant TVA" 
                                size="belowaverage" 
                                type="text" 
                                value={calcul.montant_TVA}
                                onChange="" 
                                readOnly="false"
                         />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total prestation TTC" 
                                size="overaverage" 
                                type="text" 
                                value={calcul.total_prestation_TTC}
                                onChange="" 
                                readOnly="true"
                         />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total prestation et debours" 
                                size="overaverage" 
                                type="text" 
                                value={calcul.total_prestation_debours}
                                onChange="" 
                                readOnly="true"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Droits de Timbre" 
                                size="small" 
                                type="text" 
                                value={calcul.montant_droitTimbre}
                                onChange="" 
                                readOnly="true"
                        />
                        
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total à payer" 
                                size="overaverage" 
                                type="text" 
                                value={calcul.total_a_payer}
                                onChange="" 
                                readOnly="true"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Net à payer" 
                                size="overaverage" 
                                type="text" 
                                value={calcul.net_a_payer}
                                onChange="" 
                                readOnly="true"
                         />
                    </label>
                    <div className={styles.footerSpace}></div>
            </span>
            </div>
        )}

        </>
    );
}

export default ViewFactures