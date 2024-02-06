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
import { reloadPage} from '../Utils/actionUtils';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import {formatDateFromAPI,formatDateToAPI} from '../Utils/dateUtils';
import Select from 'react-select';
import styles2 from './gestionClients.module.css';
import CustomMessage from '../components/customMessage';
import { IconDelete } from '../components/icons';



function EditFacture() {

    const { id } = useParams();
    
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedDossier, setIsLoadedDossier] = useState(false);
    const [listeDossiers, setListeDossiers] = useState([]);

    const [DebPresToDelete, setDebPresToDelete] = useState({});
    const [typeDebPresToDelete, setTypeDebPresToDelete] = useState('');

    const [facture, setFacture] = useState({});
    const [prestations, setPrestations] = useState({});
    const [debours, setDebours] = useState({});
    const [calcul, setCalculs] = useState({});

    const[debpres,setDebPres] = useState([])

    const [numDossier, setNumDossier] = useState('');
    const [dossierPk, setDossierPk] = useState(''); 
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

    const listeNumDossiers = listeDossiers.map(({dossierPk, numDossier}) => ({ ['value'] : dossierPk, ['label']:numDossier}))
    const [selectedDossier, setSelectedDossier] = useState({value: dossierPk, label:numDossier});


    const handleDossierSelection = (searchTerm) => {
        setSelectedDossier(searchTerm);
        setNumDossier(searchTerm.label);
        setDossierPk(searchTerm.value); 
    };    

    const handleDialogClose = () => {
        setDebPresToDelete(null);
        setShowDialog(false);
      };

      const handleDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        const rowType = event.target.closest('tr').firstChild.innerText;
        setDebPresToDelete(rowId);
        setTypeDebPresToDelete(rowType);
        setShowDialog(true);
      };

      const handleDeletePres = () => {
        setShowDialog(false);
        setIsLoaded(false);
        axios
         .delete(`/api/factures-definitives/${id}/prestations/${DebPresToDelete}`)
         .then(() => {
            setShowDialog(false);
            setIsLoaded(true);
            handleSuccess();
            setDebPresToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoaded(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setDebPresToDelete(null);
         });
      };

      const handleDeleteDebours = () => {
        setShowDialog(false);
        setIsLoaded(false);
        axios
         .delete(`/api/factures-definitives/${id}/debours/${DebPresToDelete}`)
         .then(() => {
            setShowDialog(false);
            setIsLoaded(true);
            handleSuccess();
            setDebPresToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoaded(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setDebPresToDelete(null);
         });
      };

      const tableActions = [
        <IconDelete key="delete" onClick={handleDeleteClick} />,
      ];

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
        const dossiers = axios.get('/api/dossiers/');



        // Use Promise.all to wait for both requests to complete
        Promise.all([facture, debours, prestations, calculs, tyoesDebours, modes,typesPres, dossiers])
          .then((responses) => {
            const FactureResponse = responses[0].data;
            const deboursResponse = responses[1].data;
            const PrestationResponse = responses[2].data;
            const calculsResponse = responses[3].data;
            const TypesDebours = responses[4].data;
            const modesData = responses[5].data;
            const typesPres = responses[6].data;
            const dosssierResponse = responses[7].data;


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
            setTypes(extractedTypes);
            const extractedTypesPres = typesPres.map(type => ({
                id: type.typePrestation_pk,
                value: type.typePrestation_pk,
                label: type.designation
            }));
            const dossiersData = responses[7].data;
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
            setTypesPres(extractedTypesPres);
            setFacture(FactureResponse);
            setCalculs(calculsResponse);
            setNumDossier(FactureResponse.dossier?FactureResponse.dossier.numDossier:"");
            setDossierPk(FactureResponse.dossier?FactureResponse.dossier.dossier_pk:null);
            setSelectedDossier({value:FactureResponse.dossier?FactureResponse.dossier.dossier_pk:null, label:FactureResponse.dossier?FactureResponse.dossier.numDossier:""})
            setNumFacture(FactureResponse.numFacture);
            setDate(FactureResponse.date?formatDateFromAPI(FactureResponse.date):null);
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
    const headers = ['Type', 'Debours/Prestation', 'Montant', 'Actions à faire'];

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
                handleSuccess();
            })
            .catch((error) => {
                setIsLoaded(true);
                handleError(error.request.response);
            });

    };
    
    const handleAjouterPres = (data) => {
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
            dossier : dossierPk,
            net_payer: netPayement,
        };
        
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
            <AdvancedBreadcrumb numDossier={numDossier} hideButtons={true} hideDocs={true} hidePrintable={false} onPrint={handlePrint}/>
            {!(isLoaded && isLoadedDossier) ? ( // Conditional rendering based on the loading state
            <div className={styles2.loader_container}><span className={styles2.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <div className={styles.main_grid}>
                <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                                        <label className={styles.info_field}>
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
                                                <label className={labelStyles.labelonleft}>N° Dossier
                                                    <Select className={labelStyles.average} styles={colorStyles} options={listeNumDossiers} value={selectedDossier} placeholder="Sélectionner un dossier" onChange={(e) => handleDossierSelection(e)} isSearchable={true}/>
                                                </label>
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
                    <ReusableTable data={debpres} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActions}/> 
                    {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={typeDebPresToDelete==='Debours'?handleDeleteDebours:handleDeletePres} message={"Souhaitez-vous vraiment supprimer ce debours/prestation ?"} />}
                    {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
                    <span className={styles.container}>
                        <label className={styles.label_style}>Total</label>
                        <input className={styles.total}
                            value={totalPresDebours}
                            onChange={(e) => setTotalPresDebours(e.target.value)} 
                            />
                        <label className={styles.label_style}>Total Debours</label>
                        <input className={styles.total}
                            value={totalDebours}
                            onChange={(e) => setTotalDebours(e.target.value)} 
                        />
                        <label className={styles.label_style}>Total Prestations</label>
                        <input className={styles.total}
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
            </span>
            </div>
            )}
            <div className={styles.footerSpace}></div>

            {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
        </>
    );
}

export default EditFacture