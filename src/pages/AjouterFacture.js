import { useState, useRef } from 'react';
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
import { reloadPage , handleFilterChange} from '../Utils/actionUtils';
import axios from 'axios';
import {formatDateFromAPI,formatDateToAPI} from '../Utils/dateUtils';


function AjouterFacture() {

    const deboursPrestations = [
    {id:"1", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
    {id:"1", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
    {id:"1", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
    {id:"1", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
    {id:"1", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
    {id:"1", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
    {id:"1", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}]
    
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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

    const [numDossier, setNumDossier] = useState('');
    const [numFact, setNumFacture] = useState('');
    const [typeFacture, setTypeFacture] = useState("Définitive");  
    const ListeTypesFact = [ {index:"1", type:"Définitive"},{index:"2", type:"Proforma"}];
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
    const [droitTimbre1, setDroitTimbre1] = useState('');
    const [droitTimbre2, setDroitTimbre2] = useState('');
    const [totalPayement, setTotalPayement] = useState('');
    const [avance, setAvance] = useState('');
    const [netPayement, setNetPayement] = useState('');
    
    const modes = [{value:"1", label:"Cache"}, {value:"2",label:"Versement"}];
    const types = [{id:1, value:"1", label:"Transit"}, {id:2, value:2, label:"Magasinage"}];
    

    //entete du tableau des debours
    const headers = ['Debours/Prestation', 'Mode de paiement', 'Mont Debours', 'Mont Prestation'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState(deboursPrestations);
    
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
        setIsLoaded(false)
        if(typeFacture == "Proforma"){
            const facture = {
                numFacture : numFact,
            date : date ? formatDateToAPI(date) : null,
                client : 2,
                natureMarchandise : natureMarch,
                nbrTC : nbrTc,
                poids : poids,
                nbrColis : nbrColis,
                taux_tva : tauxTVA,
            }
            axios
            .post(`/api/factures-proforma/`, JSON.stringify(facture), {
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

        }
        else{
            const apiUrl = `/api/dossier?numDossier=${numDossier}`;
            axios.get(apiUrl)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            const facture = {
                numFacture : numFact,
                date : date,
                client : client,
                taux_droitTimbre : droitTimbre1,
                natureMarchandise : natureMarch,
                numDossier : numDossier,
                dossier : null,
                nbrColis : nbrColis,
                taux_tva : tauxTVA,
                avanceClient : avance,
            }
            axios
            .post(`/api/factures-definitives/`, JSON.stringify(facture), {
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
        }
    };


    return (
        <>
            <AdvancedBreadcrumb numDossier={numDossier} />
            <div className={styles.main_grid}>
                <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                        {
                            typeFacture !== "Proforma"?
                                    <>
                                        <label className={styles.info_field}>
                                            <label className={labelStyles.labelonleft}>Type Facture</label>
                                                <select value={typeFacture} onChange={handleTypeFactChange}>
                                                    <option value="">Sélectionner une option</option>
                                                        {ListeTypesFact.map((type) => (
                                                            <option key={type.index} value={type.type}>
                                                            {type.type}
                                                    </option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField 
                                                        display="labelonleft" 
                                                        label="N° Dossier" 
                                                        size="small" 
                                                        type="text" 
                                                        value={numDossier} 
                                                        onChange={(e) => setNumDossier(e.target.value)}
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
                                                    display="labelonleft"                                                             
                                                    label="Nom Client" 
                                                    size="average" 
                                                    type="text" 
                                                    value={client} 
                                                    onChange={(e) => setClient(e.target.value)}
                                                />
                                            </label>
                                           <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="N° Declaration" 
                                                    size="small" 
                                                    type="number" 
                                                    value={numDeclaration}                                                         
                                                    onChange={(e) => setNumDeclaration(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nom Fournisseur" 
                                                    size="average" 
                                                    type="text" 
                                                    value={nomFournisseur} 
                                                    onChange={(e) => setNomFournisseur(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="N° Fact. Fournisseur" 
                                                    size="small" 
                                                    type="number" 
                                                    value={numFactFournisseur} 
                                                    onChange={(e) => setNumFactFournisseur(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Montant" 
                                                    size="small" 
                                                    type="number" 
                                                    value={montantFactFournisseur} 
                                                    onChange={(e) => setMontantFactFournisseur(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Monnaie" 
                                                    size="verysmall" 
                                                    type="text" 
                                                    value={monnaieFactFournisseur} 
                                                    onChange={(e) => setMonnaieFactFournisseur(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="N° Titre Transport" 
                                                    size="belowaverage" 
                                                    type="number" 
                                                    value={numTitreTransport} 
                                                    onChange={(e) => setNumTitreTransport(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nbr Colis" 
                                                    size="verysmall" 
                                                    type="number" 
                                                    value={nbrColis} 
                                                    onChange={(e) => setNbrColis(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}>
                                                <InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nature Marchandise" 
                                                    size="average" 
                                                    type="text" 
                                                    value={natureMarch} 
                                                    onChange={(e) => setNatureMarch(e.target.value)} 
                                                    />
                                            </label>
                                    </>
                                    : 
                                    <>
                                        <label className={styles.info_field}>
                                            <label className={labelStyles.labelonleft}>Type Facture</label>
                                                <select value={typeFacture} onChange={handleTypeFactChange}>
                                                    <option value="">Sélectionner une option</option>
                                                    {ListeTypesFact.map((type) => (
                                                        <option key={type.index} value={type.type}>
                                                        {type.type}
                                                        </option>
                                                    ))}
                                                </select>
                                        </label>
                                            <label className={styles.info_field}>
                                            <InputField 
                                                    display="labelonleft" 
                                                    label="N° Facture Proforma" 
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
                                                            display="labelonleft" 
                                                            label="Nom Client" 
                                                            size="average" 
                                                            type="text" 
                                                            value={client} 
                                                            onChange={(e) => setClient(e.target.value)}
                                                    />
                                            </label>
                                            <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                                        label="Nature Marchandise" 
                                                        size="average" 
                                                        type="text" 
                                                        value={natureMarch} 
                                                        onChange={(e) => setNatureMarch(e.target.value)} 
                                                />
                                            </label>
                                            <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nbr TC" 
                                                    size="verysmall" 
                                                    type="number" 
                                                    value={nbrTc} 
                                                    onChange={(e) => setNbrTc(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                                    label="Poids" 
                                                    size="small" 
                                                    type="number" 
                                                    value={poids} 
                                                    onChange={(e) => setPoids(e.target.value)}
                                                />
                                            </label>
                                            <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                                    label="Nbr Colis" 
                                                    size="verysmall" 
                                                    type="number" 
                                                    value={nbrColis} 
                                                    onChange={(e) => setNbrColis(e.target.value)}
                                                />
                                            </label>
                                    </>
                        }
                        <div className={styles.horizontalLine}></div>
                    </div>
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
                                label="Avance" 
                                size="overaverage" 
                                type="number" 
                                disabled={disableInput}
                                value={avance}
                                onChange={(e) => setAvance(e.target.value)} 
                         />
                    </label>
                    <button className={`${buttonStyles.primaryButtonY}`} children='Ajouter' onClick={handleAjouter} />
                    <div className={styles.footerSpace}></div>
            </span>
            </div>

        </>
    );
}

export default AjouterFacture