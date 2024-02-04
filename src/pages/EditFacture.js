import { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import styles from './listeFacture.module.css';
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import InputField from '../components/InputField';
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TabDeboursPrestation from './TabDeboursPrestation';
import axios from 'axios';
import { reloadPage , handleFilterChange} from '../Utils/actionUtils';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import {formatDateFromAPI,formatDateToAPI} from '../Utils/dateUtils';

function EditFacture() {

    const { id } = useParams();
    console.log(id);
    
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [facture, setFacture] = useState({});
    const [prestations, setPrestations] = useState({});
    const [debours, setDebours] = useState({});
    const [calcul, setCalculs] = useState({});

    const[debpres,setDebPres] = useState([])



    const [numDossier, setNumDossier] = useState('');
    const [numFact, setNumFacture] = useState('');
    const [typeFacture, setTypeFacture] = useState("Définitive");  
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [numDeclaration, setNumDeclaration] = useState('');
    const [nomFournisseur, setNomFournisseur] = useState('');
    const [numFactFournisseur, setNumFactFournisseur] = useState('');
    const [montantFactFournisseur, setMontantFactFournisseur] = useState('');
    const [monnaieFactFournisseur, setMonnaieFactFournisseur] = useState('');
    const [numTitreTransport, setNumTitreTransport] = useState('');
    const [nbrTc, setNbrTc] = useState('');
    const [poids, setPoids] = useState('');
    const [nbrColis, setNbrColis] = useState('');
    const [natureMarch, setNatureMarch] = useState('');
    const [tauxTVA, setTauxTVA] = useState('');
    const [montantTVA, setMontantTVA] = useState('');
    const [totalTTC, setTotalTTC] = useState('');
    const [totalPresDebours, setTotalPresDebours] = useState('');
    const [totalPres, setTotalPres] = useState('');
    const [totalDebours, setTotalDebours] = useState('');
    const [droitTimbre1, setDroitTimbre1] = useState('');
    const [totalPayement, setTotalPayement] = useState('');
    const [avance, setAvance] = useState('');
    const [netPayement, setNetPayement] = useState('');
    
    const [modes, setModes] = useState([]);
    const [types, setTypes] = useState([]);
    const [typesPres, setTypesPres] = useState([]);


    useEffect(() => {
        // Create axios requests for both data fetching
        while(id==null){}
        const facture = axios.get(`/api/factures-definitives/${id}/`); // Replace with your other endpoint
        const debours = axios.get(`/api/factures-definitives/${id}/debours/`);
        const prestations = axios.get(`/api/factures-definitives/${id}/prestations/`);
        const calculs = axios.get(`/api/factures-definitives/${id}/calcul/`);
        const tyoesDebours = axios.get(`/api/types-debours/`);
        const modes = axios.get(`/api/modes-paiement-debours/`);
        const typesPres = axios.get(`/api/types-prestation/`);




        // Use Promise.all to wait for both requests to complete
        Promise.all([facture, debours, prestations, calculs, tyoesDebours, modes,typesPres])
          .then((responses) => {
            const FactureResponse = responses[0].data;
            const deboursResponse = responses[1].data;
            const PrestationResponse = responses[2].data;
            const calculsResponse = responses[3].data;
            const TypesDebours = responses[4].data;
            const modesData = responses[5].data;
            const typesPres = responses[6].data;


            console.log(FactureResponse);
            console.log(deboursResponse);
            console.log(PrestationResponse);
            console.log(calculsResponse);
            console.log(modesData);
            console.log(TypesDebours);
            console.log(typesPres);


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
            const extractedModes = modesData.results.map(status => ({
            value: status,
            label: status
            }));
            setModes(extractedModes);
            const extractedTypes = TypesDebours.map(type => ({
                id: type.typeDebours_pk,
                value: type.typeDebours_pk,
                label: type.designation
            }));
            console.log(extractedTypes);
            setTypes(extractedTypes);
            const extractedTypesPres = typesPres.map(type => ({
                id: type.typePrestation_pk,
                value: type.typePrestation_pk,
                label: type.designation
            }));
            console.log(extractedTypesPres);
            setTypesPres(extractedTypesPres);
            setFacture(FactureResponse);
            setCalculs(calculsResponse);
            setNumDossier(FactureResponse.dossier.numDossier);
            setNumFacture(FactureResponse.numFacture);
            setDate(new Date(FactureResponse.date));
            setClient(FactureResponse.dossier.client.raisonSociale);
            setNumDeclaration(FactureResponse.numDeclaration);
            setNomFournisseur(FactureResponse.dossier.fournisseur);
            setNumFactFournisseur(FactureResponse.numFactureFournisseur);
            setMontantFactFournisseur(FactureResponse.montantFactureFournisseur);
            setMonnaieFactFournisseur(FactureResponse.dossier.monnaie);
            setNumTitreTransport(FactureResponse.numTitreTransport);
            setNbrColis(FactureResponse.dossier.declaration.nbrColis);
            setNatureMarch(FactureResponse.dossier.natureMarchandise);
            setTotalDebours(calculsResponse.total_debours);
            setTotalPres(calculsResponse.total_prestations);
            setTotalPresDebours(calculsResponse.total_prestation_debours);
            setTauxTVA(FactureResponse.taux_tva);
            setMontantTVA(calculsResponse.montant_TVA);
            setTotalTTC(calculsResponse.total_prestation_TTC);
            setDroitTimbre1(calculsResponse.montant_droitTimbre);
            setTotalPayement(calculsResponse.total_a_payer);
            setNetPayement(calculsResponse.net_a_payer);
            setTotalDebours(calculsResponse.total_debours);
            setTotalPres(calculsResponse.total_prestation);
            setAvance(FactureResponse.avanceClient);
            setIsLoaded(true); 
          })
          .catch((error) => {
            setIsLoaded(true);
            console.log(error);
            //handleError(error.request.response);     
          });
      }, [id]); // Add 'id' as a dependency

    //entete du tableau des debours
    const headers = ['Type', 'Debours/Prestation', 'Montant'];

    //Mettre à jour l'historique des debours du client
    
    const setMontantDebours = (deboursPrestations) => {
        let montantDeb = 0;
        deboursPrestations.map((debours)=>{debours.montantDebours!='/'? 
                                                            montantDeb+=Number(String(debours.montantDebours).split(' ')[0])
                                                            : montantDeb+=0});
        return montantDeb + ' DZD';
    };

    const setMontantPrestations = (deboursPrestations) => {
        let montantPres = 0;
        deboursPrestations.map((prestation)=>{prestation.montantPrestations!='/'? 
                                                        montantPres+=Number(String(prestation.montantPrestations).split(' ')[0])  
                                                                : montantPres+=0});
        return montantPres + ' DZD';
    }

    const [disableInput, setDisableInput] = useState(false);

    const handleTypeFactChange = (event) => {
        const selectedType = event.target.value;
        setTypeFacture(selectedType)
        console.log(selectedType)
        {selectedType.toString() === "Proforma" ? setDisableInput(true) : setDisableInput(false)}
        
    };

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
        reloadPage();
      };
    
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
    
    const handleAjouterDeb = (data) => {
        console.log("this is the sent data");
        console.log(data);
        setIsLoaded(false);
        axios
            .post(`/api/factures-definitives/${id}/debours/`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setIsLoaded(true);
                const clientResponse = response.data;
                console.log(clientResponse);
                handleSuccess();
            })
            .catch((error) => {
                setIsLoaded(true);
                handleError(error.request.response);
            });

    };
    
    const handleAjouterPres = (data) => {
        console.log("this is the sent data");
        console.log(data);
        setIsLoaded(false);
        axios
            .post(`/api/factures-definitives/${id}/prestations/`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setIsLoaded(true);
                const clientResponse = response.data;
                console.log(clientResponse);
                handleSuccess();
            })
            .catch((error) => {
                setIsLoaded(true);
                handleError(error.request.response);
            });

    };

    const handleCalculerClick = () => {
    
        const fact = {
            numFacture : numFact,
            date : date ? formatDateToAPI(date) : null,
            taux_tva : tauxTVA,
            avance_client : avance,
            taux_droitTimbre : droitTimbre1,
            dossier : facture.dossier.dossier_pk
        };
        
        console.log(fact);
        axios
        .put(`/api/factures-definitives/${id}/`, fact, {
        headers: {
          'Content-Type': 'application/json',
        }
        })
        .then((response) => {
            const clientResponse = response.data;
            handleSuccess();
        })
        .catch((error) => {
            handleError(error.request.response);
        });
    };

    return (
        <>
            <AdvancedBreadcrumb numDossier={numDossier} />
            <div className={styles.main_grid}>
                <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                                        <label className={styles.info_field}>
                                            <label className={labelStyles.labelonleft}>Type Facture</label>
                                                <InputField 
                                                        display="labelonleft" 
                                                        label="Type Facture" 
                                                        size="small" 
                                                        type="text" 
                                                        value={typeFacture} 
                                                        readOnly={true}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField 
                                                        display="labelonleft" 
                                                        label="N° Dossier" 
                                                        size="small" 
                                                        type="text" 
                                                        value={numDossier} 
                                                        readOnly={true}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField 
                                                        display="labelonleft" 
                                                        label="N° Facture" 
                                                        size="small" 
                                                        type="text" 
                                                        value={numFact} 
                                                        onChange={(e) => setNumFacture(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <label className={labelStyles.labelonleft}>Date</label>
                                                <DatePicker selected={date} onChange={(e) => setDate(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField 
                                                    display="labelonleft"                                                             label="Nom Client" 
                                                    size="average" 
                                                    type="text" 
                                                    value={client} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                           <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="N° Declaration" 
                                                    size="small" 
                                                    type="number" 
                                                    value={numDeclaration}                                                         
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nom Fournisseur" 
                                                    size="average" 
                                                    type="text" 
                                                    value={nomFournisseur} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="N° Fact. Fournisseur" 
                                                    size="small" 
                                                    type="number" 
                                                    value={numFactFournisseur} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Montant" 
                                                    size="small" 
                                                    type="number" 
                                                    value={montantFactFournisseur} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Monnaie" 
                                                    size="verysmall" 
                                                    type="text" 
                                                    value={monnaieFactFournisseur} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="N° Titre Transport" 
                                                    size="belowaverage" 
                                                    type="number" 
                                                    value={numTitreTransport} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nbr Colis" 
                                                    size="verysmall" 
                                                    type="number" 
                                                    value={nbrColis} 
                                                    readOnly={true}
                                                    />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nature Marchandise" 
                                                    size="average" 
                                                    type="text" 
                                                    value={natureMarch} 
                                                    readOnly={true}
                                                    />
                                            </label>    
                    </div>                                                        
                    <div className={styles.horizontalLine}></div>
                </span>
                <span className={styles.table_grid}>
                    <ReusableTable data={debpres} headers={headers} itemsPerPage={5} addlink={false}/> 
                    <span className={styles.container}>
                        <label className={styles.label_style}>Total</label>
                        <input className={styles.input}
                            value={totalPresDebours}
                            onChange={(e) => setTotalPresDebours(e.target.value)} 
                            />
                        <label className={styles.label_style}>Total Debours</label>
                        <input className={styles.input}
                            value={totalDebours}
                            onChange={(e) => setTotalDebours(e.target.value)} 
                        />
                        <label className={styles.label_style}>Total Prestations</label>
                        <input className={styles.input}
                            value={totalPres}
                            onChange={(e) => setTotalPres(e.target.value)} 
                            />
                    </span>  
                    <span className={styles.buttons_grid}>
                        <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' onClick={handleNouveauClick} />
                        <button className={`${buttonStyles.primaryButtonB}`} children='Calculer' onClick={handleCalculerClick} />

                        {showForm && <TabDeboursPrestation  onClose={handleFormClose} 
                                                            onAjouterDeb={handleAjouterDeb} 
                                                            onAjouterPres={handleAjouterPres} 
                                                            onFileUpload={handleFileUpload} 
                                                            onFileUploadClick={handleFileUploadClick}
                                                            inputFile={inputFile}
                                                            modes={modes}
                                                            types={types}
                                                            typesPres={typesPres}/>} 
                    </span>
                    <div className={styles.verticalLine}></div>

                </span>
                <span className={styles.label_grid}>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Taux TVA" 
                                size="small" 
                                type="number" 
                                value={tauxTVA}
                                onChange={(e) => setTauxTVA(e.target.value)} 
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Montant TVA" 
                                size="belowaverage" 
                                type="number" 
                                value={montantTVA}
                                readOnly={true}
                                />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total prestation TTC" 
                                size="overaverage" 
                                type="number" 
                                value={totalTTC}
                                readOnly={true}
                                />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total prestation et debours" 
                                size="overaverage" 
                                type="number" 
                                value={totalPresDebours}
                                readOnly={true}
                                />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Droit de Timbre" 
                                size="small" 
                                type="number" 
                                disabled={disableInput}
                                value={droitTimbre1}
                                onChange={(e) => setDroitTimbre1(e.target.value)} 
                        />
                        
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total à payer" 
                                size="overaverage" 
                                type="number" 
                                disabled={disableInput}
                                value={totalPayement}
                                readOnly={true}
                                />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Avance" 
                                size="overaverage" 
                                type="number" 
                                disabled={disableInput}
                                value={avance}
                                onChange={(e) => setAvance(e.target.value)} 
                         />
                    </label>
                   <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Net à payer" 
                                size="overaverage" 
                                type="number" 
                                disabled={disableInput}
                                value={netPayement}
                                readOnly={true}
                        />
                    </label>
                    <div className={styles.footerSpace}></div>
            </span>
            </div>
            {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
        </>
    );
}

export default EditFacture