import { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import styles from './listeFacture.module.css';
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb';
import styles2 from './gestionClients.module.css';
import { IconDelete } from '../components/icons';
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
import CustomMessage from '../components/customMessage';
import {formatDateFromAPI,formatDateToAPI} from '../Utils/dateUtils';
import Select from 'react-select';


function EditFactureProforma() {

    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [DebPresToDelete, setDebPresToDelete] = useState({});
    const [typeDebPresToDelete, setTypeDebPresToDelete] = useState('');
    const [isLoadedClient, setIsLoadedClient] = useState(false);
    const [isLoadedMarchandise, setIsLoadedMarchandise] = useState(false);
  

    const [listeClients, setListeClients] = useState([]);
    const [listeMarchandises, setListeMarchandises] = useState([]);

    const [facture, setFacture] = useState({});
    const [prestations, setPrestations] = useState({});
    const [debours, setDebours] = useState({});
    const [calcul, setCalculs] = useState({});

    const[debpres,setDebPres] = useState([])

    const [raisonSociale, setRaisonSociale] = useState('');
    const [clientPk, setClientPk] = useState(''); 

    const [natureMarchandise, setNatureMarchandise] = useState(''); 
    const [natureMarchandisePk, setNatureMarchandisePk] = useState(''); 

    const [numDossier, setNumDossier] = useState('');
    const [numFact, setNumFacture] = useState('');
    const [typeFacture, setTypeFacture] = useState("Proforma");  
    const [date, setDate] = useState('');
    
    const [nbrTc, setNbrTc] = useState('');
    const [poids, setPoids] = useState('');
    const [nbrColis, setNbrColis] = useState('');
    const [natureMarch, setNatureMarch] = useState('');
    const [tauxTVA, setTauxTVA] = useState('');
    const [montantTVA, setMontantTVA] = useState('');
    const [totalPresTTC, setTotalPresTTC] = useState('');
    const [totalPresDebours, setTotalPresDebours] = useState('');
    const [totalPres, setTotalPres] = useState('');
    const [totalDebours, setTotalDebours] = useState('');
    const [droitTimbre1, setDroitTimbre1] = useState('');
    const [totalPayement, setTotalPayement] = useState('');
    const [avance, setAvance] = useState('');
    const [netPayement, setNetPayement] = useState('');
    const [total_ttc, setTotalTTC] = useState('');
    const [modes, setModes] = useState([]);
    const [types, setTypes] = useState([]);
    const [typesPres, setTypesPres] = useState([]);

    const listeRaisonsSociales = listeClients.map(({client_pk, raisonSociale}) => ({ ['value'] : client_pk, ['label']:raisonSociale}))
    const [selectedRaisonSociale, setSelectedRaisonSociale] = useState({value: clientPk, label:raisonSociale});

    const listeNaturesMarchandise = listeMarchandises.map(({natureMarchandise_pk, designation}) => ({ ['value'] : natureMarchandise_pk, ['label']:designation}))
    const [selectedNatureMarchandise, setSelectedNatureMarchandise] = useState({value: natureMarchandisePk, label:natureMarchandise});


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
         .delete(`${apiUrl}/api/factures-proforma/${id}/prestations/${DebPresToDelete}`)
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
         .delete(`${apiUrl}/api/factures-proforma/${id}/debours/${DebPresToDelete}`)
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

          // Récupération de la liste de dossiers
    useEffect(() => {
        
      const clients = axios.get(`${apiUrl}/api/clients/`);
      const marchandises = axios.get(`${apiUrl}/api/natures-marchandise/`)
  
      Promise.all([clients, marchandises])
      .then((responses) => {

      const clientsData = responses[0].data;
      if (typeof clientsData === 'object' && clientsData !== null) {
        const extractedClient = Object.values(clientsData).map(item => ({
          client_pk: item.client_pk,
          raisonSociale: item.raisonSociale,
        }));
      setListeClients(extractedClient);
      setIsLoadedClient(true)
      }
      else {
      console.error('Response data is not a JSON object:', clientsData);
      handleError(clientsData);
      setIsLoadedClient(true);
    }

    const marchandisesData = responses[1].data;
    if (typeof marchandisesData === 'object' && marchandisesData !== null) {
      const extractedMarchandise = Object.values(marchandisesData).map(item => ({
        natureMarchandise_pk: item.natureMarchandise_pk,
        designation: item.designation,
      }));
    setListeMarchandises(extractedMarchandise);
    setIsLoadedMarchandise(true)
    }
    else {
    console.error('Response data is not a JSON object:', marchandisesData);
    handleError(marchandisesData);
    setListeMarchandises(true);
  }

      })
      .catch((error) => {
        console.log('Error:', error);
        handleError(error.request.response);
  
      });
  }, []);

    useEffect(() => {
        // Create axios requests for both data fetching
        while(id==null){}
        const facture = axios.get(`${apiUrl}/api/factures-proforma/${id}/`); // Replace with your other endpoint
        const debours = axios.get(`${apiUrl}/api/factures-proforma/${id}/debours/`);
        const prestations = axios.get(`${apiUrl}/api/factures-proforma/${id}/prestations/`);
        const calculs = axios.get(`${apiUrl}/api/factures-proforma/${id}/calcul/`);
        const tyoesDebours = axios.get(`${apiUrl}/api/types-debours/`);
        const modes = axios.get(`${apiUrl}/api/modes-paiement-debours/`);
        const typesPres = axios.get(`${apiUrl}/api/types-prestation/`);




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
            setTypesPres(extractedTypesPres);
            setFacture(FactureResponse);
            setCalculs(calculsResponse);
            setNumFacture(FactureResponse.numFacture);
            setDate(FactureResponse.date?formatDateFromAPI(FactureResponse.date):null);
            setClientPk(FactureResponse.client?FactureResponse.client.client_pk:null);
            setSelectedRaisonSociale({value: FactureResponse.client?FactureResponse.client.client_pk:null, label:FactureResponse.client?FactureResponse.client.raisonSociale:""});
            setNbrColis(FactureResponse.nbrColis);
            setNatureMarchandisePk(FactureResponse.natureMarchandise?FactureResponse.natureMarchandise.natureMarchandise_pk:null);
            setSelectedNatureMarchandise({value:FactureResponse.natureMarchandise?FactureResponse.natureMarchandise.natureMarchandise_pk:null, label:FactureResponse.natureMarchandise?FactureResponse.natureMarchandise.designation:""});
            setTotalDebours(calculsResponse.total_debours);
            setTotalPres(calculsResponse.total_prestations);
            setTotalPresDebours(calculsResponse.total_prestation_debours);
            setMontantTVA(calculsResponse.montant_TVA);
            setTotalPresTTC(calculsResponse.total_prestation_TTC);
            setTotalTTC(FactureResponse.total_TTC);
            setTauxTVA(FactureResponse.taux_tva)
            setTotalDebours(calculsResponse.total_debours);
            setTotalPres(calculsResponse.total_prestation);
            setNbrTc(FactureResponse.nbrTC);
            setPoids(FactureResponse.poids)
            setIsLoaded(true); 
          })
          .catch((error) => {
            setIsLoaded(true);
            console.log(error);
            //handleError(error.request.response);     
          });
      }, [id]); // Add 'id' as a dependency

    //entete du tableau des debours
    const headers = ['Type', 'Debours/Prestation', 'Montant', 'Action à faire'];


    const [disableInput, setDisableInput] = useState(false);


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
            .post(`${apiUrl}/api/factures-proforma/${id}/debours/`, JSON.stringify(data), {
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
            .post(`${apiUrl}/api/factures-proforma/${id}/prestations/`, JSON.stringify(data), {
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
            natureMarchandise : natureMarchandisePk,
            nbrTC : nbrTc,
            nbrColis : nbrColis,
            poids : poids,
            client : clientPk,
            total_TTC: totalPresDebours,
        };
        
        axios
        .put(`${apiUrl}/api/factures-proforma/${id}/`, fact, {
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

    const handleMarchandiseSelection = (searchTerm) => {
      setSelectedNatureMarchandise(searchTerm);
      setNatureMarchandise(searchTerm.label);
      setNatureMarchandisePk(searchTerm.value);
    };

    const handleClientSelection = (searchTerm) => {
      setSelectedRaisonSociale(searchTerm);
      setRaisonSociale(searchTerm.label);
      setClientPk(searchTerm.value); 
  };

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

    const handlePrint = () =>{
      axios.get(`${apiUrl}/api/factures-proforma/${id}/pdf/`, { responseType: 'blob'})

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
            <AdvancedBreadcrumb numDossier={numDossier} hideButtons={true} hideDocs={true} hidePrintable={false} onPrint={handlePrint}/>
            {!(isLoaded && isLoadedClient && isLoadedMarchandise) ? ( // Conditional rendering based on the loading state
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
                                                <label className={labelStyles.labelonleft}>Date
                                                <DatePicker selected={date} onChange={(e) => setDate(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                                                </label>
                                            </label>
                                            <label className={styles.info_field}>
                                              <label className={labelStyles.labelonleft}>Client
                                                <Select className={labelStyles.overaverage} styles={colorStyles} options={listeRaisonsSociales} value={selectedRaisonSociale} placeholder="Sélectionner un client" onChange={(e) => handleClientSelection(e)} isSearchable={true}/>
                                              </label>
                                            </label>
                                            <label className={styles.info_field}>
                                              <label className={labelStyles.labelonleft}>Nature Marchandise
                                                  <Select className={labelStyles.large} styles={colorStyles} options={listeNaturesMarchandise} value={selectedNatureMarchandise} placeholder="Sélectionner une nature marchandise" onChange={(e) => handleMarchandiseSelection(e)} isSearchable={true}/>
                                              </label>
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
                                label="montant TVA" 
                                size="small" 
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
                                value={totalPresTTC}
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
   
            </span>


            </div>  
                   )}
            <div className={styles.footerSpace}></div>    

            {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
                
        </>
        
    );
}

export default EditFactureProforma