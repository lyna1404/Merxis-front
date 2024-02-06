import React from 'react'
import styles from './popupForm.module.css'
import stylesLine from './listeFacture.module.css';
import stylesLoader from './gestionClients.module.css'
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import InputField from '../components/InputField';
import labelStyles from "../components/inputField.module.css";
import { useState, useRef, useEffect  } from 'react';
import axios from 'axios';
import {formatDateHoursToAPI,formatDateToAPI} from '../Utils/dateUtils';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

// Date et heure reception a utilisé avec datepicker

function AjouterDossier() {

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoadedDossier, setIsLoadedDossier] = useState(false);
    const [isLoadedDeclaration, setIsLoadedDeclaration] = useState(false);
    const [activeTab, setActiveTab] = useState("tab1");

  // Listes déroulantes de la partie Informations Générales
    const [listeClients, setListeClients] = useState([]);
    const  [clientPk, setClientPk] = useState(null);
    const [listeFournisseurs, setListeFournisseurs] = useState([]);
    const  [fournisseurPk, setFournisseurPk] = useState(null);
    const [listeDevises, setListeDevises] = useState([]);
    const [devisePk, setDevisePk] = useState(162); 
   const [listeTransports, setListeTransports] = useState([]);
   const [moyenTransportPk, setMoyenTransportPk] = useState(null);
   const [listeCompagnies, setListeCompagnies] = useState([]);
   const [compagnieTransportPk,setCompagnieTransportPk] = useState(null);
   const [listeMarchandises, setListeMarchandises] = useState([]);
   const [natureMarchandisePk,setNatureMarchandisePk] = useState(null);
   const [listeEntreposages, setListeEntreposages] = useState([]);
   const [lieuEntreposagePk,setLieuEntreposagePk] = useState(null);
   const [listeLivraisons, setListeLivraisons] = useState([]);
   const [lieuLivraisonPk,setLieuLivraisonPk] = useState(null);
   const [parcAVidePk,setParcAVidePk] = useState(null);
   const [listeEtatsDossiers, setListeEtatsDossiers] = useState([]);
   const [listeNaturesDossiers, setListeNaturesDossiers] = useState([]);
   const [listeTypesTransport, setListeTypesTransport] = useState([]);

  // Récupération des listes pour les searchable drop down dans Informations Générales
  useEffect(() => {
        
    const clients = axios.get('/api/clients/');
    const fournisseurs = axios.get('/api/fournisseurs/');
    const devises = axios.get('/api/devises/');
    const transports = axios.get('/api/moyens-transport/');
    const compagnies = axios.get('/api/compagnies-transport/');
    const marchandises = axios.get('/api/natures-marchandise/');
    const entreposages = axios.get('/api/entrepots/');
    const livraisons = axios.get('/api/lieux-livraison/');

    
    Promise.all([clients, fournisseurs, devises, transports, compagnies, marchandises, entreposages, livraisons])
    .then((responses) => {
      const clientsData = responses[0].data;
      const fournisseursData = responses[1].data;
      const deviseData = responses[2].data;
      const transportsData = responses[3].data;
      const compagniesData = responses[4].data;
      const marchandisesData = responses[5].data;
      const entreposagesData = responses[6].data;
      const livraisonsData = responses[7].data;

      setListeClients(clientsData);
      setIsLoadedDossier(true);
      setListeFournisseurs(fournisseursData);
      setListeDevises(deviseData);
      setListeTransports(transportsData);
      setListeCompagnies(compagniesData);
      setListeMarchandises(marchandisesData);
      setListeEntreposages(entreposagesData);
      setListeLivraisons(livraisonsData);
    })
    .catch((error) => {
      console.log('Error:', error);
      handleError(error.request.response);

    });
}, []);

// Récupération des listes statiques dans Informations Générales
useEffect(() => {
  
  const etats = axios.get('/api/etats-dossier/');
  const natures = axios.get('/api/natures-dossier/');
  const typesTransport = axios.get('/api/types-transport/');
  
  Promise.all([etats, natures, typesTransport])
  .then((responses) => {
    const etatsData = responses[0].data;
    const naturesData = responses[1].data;
    const typesTransportData = responses[2].data;

    setListeEtatsDossiers(etatsData.results);
    setListeNaturesDossiers(naturesData.results);
    setListeTypesTransport(typesTransportData.results);
  })
  .catch((error) => {
    console.log('Error:', error);
    handleError(error.request.response);

  });
}, []);

    const [listeModesPaiement, setListeModesPaiement] = useState([]);
    const [listeModesFinancement, setListeModesFinancement] = useState([]);
    const [listeTypesOperations, setListeTypesOperations] = useState([]);

    const [listeModesLivraisons, setListeModesLivraison] = useState([]);
    const [listeRegimes, setListeRegimes] = useState([]);
    const [listePays, setListePays] = useState([]);
    const [listeBureaux, setListeBureaux] = useState([]);
    const [regimePk, setRegimePk] = useState(null);
    const [paysAVPk, setPaysAVPk] = useState(null);
    const [paysProvPk, setPaysProvPk] = useState(null);
    const [bureauPk, setBureauPk] = useState(null);

   // Récupérations des listes pour les searchable drop down dans Informations de déclaration
   useEffect(() => {
    const livraisons = axios.get('/api/modes-livraison/');
    const regimes = axios.get('/api/regimes-douaniers/');
    const pays = axios.get('/api/pays/');
    const bureaux = axios.get('/api/bureaux-douane/');

    Promise.all([livraisons, regimes, pays, bureaux])
    .then((responses) => {
      const livraisonData = responses[0].data;
      const regimesData = responses[1].data;
      const paysData = responses[2].data;
      const bureauData = responses[3].data;

      setListeRegimes(regimesData);
      setIsLoadedDeclaration(true);
      setListeModesLivraison(livraisonData.results);
      setListePays(paysData);
      setListeBureaux(bureauData);
    })

  }, [])

  // Récupération des listes statiques dans Informations de déclaration
  useEffect(() => {
    const paiements = axios.get('/api/modes-paiement/');
    const financements = axios.get('/api/modes-financement/');
    const operations = axios.get('/api/types-operation/');

    Promise.all([paiements, financements, operations])
    .then((responses) => {
      const paiementData = responses[0].data;
      const financementsData = responses[1].data;
      const operationData = responses[2].data;

      setListeModesPaiement(paiementData.results);
      setListeModesFinancement(financementsData.results);
      setListeTypesOperations(operationData.results);
    })
    .catch((error) => {
      console.log('Error:', error);
      handleError(error.request.response);

    });
  }, []) 


    // informations générales
    const [numDossier, setNumDossier] = useState('');
    const [nomClient, setNomClient] = useState('');
    const [natureDossier, setNatureDossier] = useState('');
    const [etatDossier, setEtatDossier] = useState('');
    const [dateHeureReception1, setDateHeureReception1] = useState('');
    const [dateHeureReception2, setDateHeureReception2] = useState('');
    const [nomFournisseur, setNomFournisseur] = useState(null);
    const [numFactFournisseur, setNumFactFournisseur] = useState('');
    const [dateFactFournisseur, setDateFactFournisseur] = useState('');
    const [montantFactFournisseur, setMontantFactFournisseur] = useState('');
    const [monnaie, setMonnaie] = useState('USD');
    const [moyenTransport, setMoyenTransport] = useState('');
    const [modeTransport, setModeTransport] = useState('');
    const [compagnieTransport, setCompagnieTransport] = useState('');
    const [numTitreTransport, setNumTitreTransport] = useState('');
    const [natureMarchandise, setNatureMarchandise] = useState('');
    const [nbrEmb, setNbrEmb] = useState('');
    const [nbrColis, setNbrColis] = useState(); 
    const [lieuEntreposage, setLieuEntreposage] = useState('');
    const [dateArrivée, setDateArrivée] = useState('');
    const [dateMainLevée, setDateMainLevée] = useState('');
    const [dateEchange, setDateEchange] = useState('');
    const [dateDeclaration, setDateDeclaration] = useState('');
    const [dateVisiteDouane, setDateVisiteDouane] = useState('');
    const [dateLiquidation, setDateLiquidation] = useState('');
    const [dateRecevCheque, setDateRecevCheque] = useState('');
    const [dateAcquittement, setDateAcquittement] = useState('');
    const [dateRetraitBonEnlever, setDateRetraitBonEnlever] = useState('');
    const [dateLivraison, setDateLivraison] = useState('');
    const [lieuLivraison, setLieuLivraison] = useState('');
    const [parcAVide, setParcAVide] = useState('');
    const [nomDeclarant, setNomDeclarant] = useState('');
    const [numDeclaration, setNumDeclaration] = useState('');
    const [observation, setObservation] = useState('');

    // informations de déclaration
    const [numRep, setNumRep] = useState('');
    const [régime1, setRegime1] = useState();
    const [régime2, setRegime2] = useState('');
    const [modePaiement, setModePaiement] = useState('');
    const [gros1, setGros1] = useState();
    const [gros2, setGros2] = useState('');
    const [article, setArticle] = useState('');
    const [sg, setSG] = useState('');
    const [poidsBrutDecl, setPoidsBrutDecl] = useState('');
    const [poidsNetDecl, setPoidsNetDecl] = useState('');
    const [modeLivraison1, setModeLivraison1] = useState('');
    const [modeLivraison2, setModeLivraison2] = useState('');
    const [modeFinancement, setModeFinancement] = useState('');
    const [typeOp, setTypeOp] = useState('');
    const [paysAchatVente1, setPaysAchatVente1] = useState('');
    const [paysAchatVente2, setPaysAchatVente2] = useState('');
    const [paysProvenance1, setPaysProvenance1] = useState('');
    const [paysProvenance2, setPaysProvenance2] = useState('');
    const [bureauDouane1, setBureauDouane1] = useState('');
    const [bureauDouane2, setBureauDouane2] = useState('');
    const [receveurDouane, setReceveurDouane] = useState('');
    const [montantDroitTaxe, setMontantDroitTaxe] = useState('');


    // Switching entre les parties
    const handleTab1 = () => {
        setActiveTab("tab1")
    }
    const handleTab2 = () => {
        setActiveTab("tab2")
    }

    const [showForm, setShowForm] = useState(false);


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

  
      // Controle d'erreurs
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
          window.close();
        };

        // Gérer la séléction dans un searchable drop down
        const handleClientSelection = (searchTerm) => {
              setSelectedRaisonSocial(searchTerm);
              setNomClient(searchTerm.label);
              setClientPk(searchTerm.value); 

          };

          const handleFournisseurSelection = (searchTerm) => {
            setSelectedRaisonSocialFournisseur(searchTerm);
            setNomFournisseur(searchTerm.label);
            setFournisseurPk(searchTerm.value);
            
          };

          const handleDeviseSelection = (searchTerm) => {
            setSelectedCodeDevise(searchTerm)
            setMonnaie(searchTerm.label);
            setDevisePk(searchTerm.value)
          };

          const handleTransportSelection = (searchTerm) => {
            setSelectedTransport(searchTerm);
            setMoyenTransport(searchTerm.label);
            setMoyenTransportPk(searchTerm.value);
          };

          const handleCompagnieSelection = (searchTerm) => {
            setSelectedCompagnie(searchTerm)
            setCompagnieTransport(searchTerm.label);
            setCompagnieTransportPk(searchTerm.value);
        }

          const handleParcSelection = (searchTerm) => {
            setSelectedParc(searchTerm);
            setParcAVide(searchTerm.label);
            setParcAVidePk(searchTerm.value);
          };

          const handleMarchandiseSelection = (searchTerm) => {
            setSelectedMarchandise(searchTerm);
            setNatureMarchandise(searchTerm.label);
            setNatureMarchandisePk(searchTerm.value);
          };

          const handleEntreposageSelection = (searchTerm) => {
            setSelectedEntreposage(searchTerm);
            setLieuEntreposage(searchTerm.label);
            setLieuEntreposagePk(searchTerm.value);
          };

          const handleLivraisonSelection = (searchTerm) => {
            setSelectedLivraison(searchTerm);
            setLieuLivraison(searchTerm.label);
            setLieuLivraisonPk(searchTerm.value);
          };

          const handleRegimeSelection = (searchTerm) => {
            setRegime(searchTerm);
            setRegime1(searchTerm.label);
            setRegimePk(searchTerm.value);
            const regime2 = listeRegimes.filter((regime) => regime.code.includes(searchTerm.value))[0];
            setRegime2(regime2.designation);
          }

          const handlePaysAVSelection = (searchTerm) => {
            setPaysAV(searchTerm);
            setPaysAchatVente1(searchTerm.label);
            setPaysAVPk(searchTerm.value);
            const pays2 = listePays.filter((pays) => pays.code.toString().includes(searchTerm.label.toString()))[0];
            setPaysAchatVente2(pays2.nom);
          }

          const handlePaysPSelection = (searchTerm) => {
            setPaysP(searchTerm);
            setPaysProvenance1(searchTerm.label);
            setPaysProvPk(searchTerm.value);
            const pays2 = listePays.filter((pays) => pays.code.toString().includes(searchTerm.label.toString()))[0];
            setPaysProvenance2(pays2.nom);
          }

          const handleModeLivraisonSelection= (searchTerm) => {
            setModeLivraison1(searchTerm);
           const mode2 = listeModesLivraisons.filter((mode) => mode.code.includes(searchTerm))[0];
            setModeLivraison2(mode2.designation);
        
          };

          const handleBureauSelection = (searchTerm) => {
            setBureau(searchTerm);
            setBureauDouane1(searchTerm.label);
            setBureauPk(searchTerm.value);
            const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
            setBureauDouane2(bureau.nomBureau);
            setReceveurDouane(bureau.receveurDouane);
          }
        
          const [dossierResponse, setDossierResponse] = useState(null);

        // Controle d'envoie du dossier et déclaration 
        const handleAjouterDossier = (async () => {

            const dateHR = dateHeureReception1 + " " + dateHeureReception2;

            setIsLoadedDeclaration(false);
            const declaration = {
              numRepertoire: numRep,
              regime: regimePk,
              modePaiement: modePaiement,
              anneeGros: gros1,
              numGros: gros2,
              numArticle: article,
              sg: sg,
              nbrColis: nbrColis,
              poidsBrut: poidsBrutDecl,
              poidsNet: poidsNetDecl,
              modeLivraison: modeLivraison2,
              modeFinancement: modeFinancement,
              typeOperation: typeOp,
              paysAchatVente: paysAVPk,
              paysProvenance: paysProvPk,
              bureauEnregistrement: bureauPk //
            }

            setIsLoadedDossier(false);
            const dossier = {
              numDossier: numDossier,
              client: selectedRaisonSocial.value, // objet
              natureDossier: natureDossier,
              etatDossier: etatDossier,
              dateHeureReception: dateHR ? formatDateHoursToAPI(dateHR) : null,
              fournisseur: selectedRaisonSocialFournisseur.value, //objet
              numFactureFournisseur: numFactFournisseur,
              dateFactureFournisseur: dateFactFournisseur ? formatDateToAPI(dateFactFournisseur) : null,
              montantFactureFournisseur: montantFactFournisseur,
              monnaie: selectedCodeDevise.value, //objet
              moyenTransport: selectedTransport.value, //objet
              typeTransportExterieur: modeTransport,
              compagnieTransport: selectedCompagnie.value, //objet
              numTitreTransport: numTitreTransport,
              natureMarchandise: selectedMarchandise.value, //objet
              nbrTC: nbrEmb,
              lieuEntreposage: selectedEntreposage.value, //objet
              dateArrivee: dateArrivée ? formatDateToAPI(dateArrivée) : null,
              dateMainLevee: dateMainLevée ? formatDateToAPI(dateMainLevée) : null,
              dateEchange: dateEchange ? formatDateToAPI(dateEchange) : null,
              dateDeclaration: dateDeclaration ? formatDateToAPI(dateDeclaration) : null,
              dateVisiteDouane: dateVisiteDouane ? formatDateToAPI(dateVisiteDouane) : null,
              dateLiquidation: dateLiquidation ? formatDateToAPI(dateLiquidation) : null,
              dateRecevabiliteCheque: dateRecevCheque ? formatDateToAPI(dateRecevCheque) : null,
              dateAcquitement: dateAcquittement ? formatDateToAPI(dateAcquittement) : null,
              dateRetraitBonEnlever: dateRetraitBonEnlever ? formatDateToAPI(dateRetraitBonEnlever) : null,
              dateLivraison: dateLivraison ? formatDateToAPI(dateLivraison) : null,
              lieuLivraison: selectedLivraison.value, //objet
              parcAVide: selectedParc.value, //objet
              nomDeclarant: nomDeclarant,
              numDeclaration: numDeclaration,
              observation: observation,
            };
            
            const dossierCreated =  await axios.post(`/api/dossiers/`, JSON.stringify(dossier), {
            headers: {
              'Content-Type': 'application/json',
            }
            })

            .then((response) => {
                const rep = response.data;
                setDossierResponse(rep);
                {
                    const declarationCreated =  axios.post(`/api/dossiers/${rep.dossier_pk}/declaration/`, declaration, {
                        headers: {
                          'Content-Type': 'application/json',
                        }
                    })
                    .then((response) => {
                      setIsLoadedDeclaration(true);
                      setIsLoadedDossier(true);
                        const declarationResponse = response.data;   
                    })
                    .catch((error) => {
                      setIsLoadedDeclaration(true);
                      setIsLoadedDossier(true);
                        handleError(error.request.response);
                    });
                }
                setIsLoadedDossier(true);
                setIsLoadedDeclaration(true);
                handleSuccess();                
            })
            .catch((error) => {
                setIsLoadedDossier(true);
                setIsLoadedDeclaration(true);
                handleError(error.request.response);
            });

   
        });
      
        // Formattages des listes d'Information Générales sous format ['value', 'label]
        const listeRaisonsSocial = listeClients.map(({client_pk, raisonSociale}) => ({ ['value'] : client_pk, ['label']:raisonSociale}))
        const listeRaisonsSocialFournisseurs = listeFournisseurs.map(({fournisseur_pk, raisonSociale}) => ({ ['value'] : fournisseur_pk, ['label']:raisonSociale}))
        const listeCodeDevises = listeDevises.map(({devise_pk, code}) => ({ ['value'] : devise_pk, ['label']:code}))
        const listeMoyensTransports = listeTransports.map(({moyenTransport_pk, nom}) => ({ ['value'] : moyenTransport_pk, ['label']:nom}))
        const listeLieuxLivraison = listeLivraisons.map(({lieuLivraison_pk, nomLieu}) => ({ ['value'] : lieuLivraison_pk, ['label']:nomLieu}))
        const listeLieuxEntreposage = listeEntreposages.map(({compagnie_pk, nom}) => ({ ['value'] : compagnie_pk, ['label']:nom}))
        const listeCompagniesTransport = listeCompagnies.map(({compagnie_pk, nom}) => ({ ['value'] : compagnie_pk, ['label']:nom}))
        const listeNaturesMarchandise = listeMarchandises.map(({natureMarchandise_pk, designation}) => ({ ['value'] : natureMarchandise_pk, ['label']:designation}))

        // Formattages des listes d'Information de déclaration sous format ['value', 'label]
        const listeRegimesDouanier = listeRegimes.map(({regimeDouanier_pk, code}) => ({ ['value'] : regimeDouanier_pk, ['label']:code}))
        const listeCodePays = listePays.map(({pays_pk, code}) => ({ ['value'] : pays_pk, ['label']:code}));
        const listeBureauxDouane = listeBureaux.map(({bureauDouane_pk, code})=> ({ ['value'] : bureauDouane_pk, ['label']:code}));
   
        // Les options séléctionnées dans les listes d'Information Générales 
        const [selectedRaisonSocial, setSelectedRaisonSocial] = useState({value: clientPk, label: nomClient});
        const [selectedRaisonSocialFournisseur, setSelectedRaisonSocialFournisseur] = useState({value: fournisseurPk, label:nomFournisseur});
        const [selectedCodeDevise, setSelectedCodeDevise] = useState({value: devisePk, label:monnaie});
        const [selectedTransport, setSelectedTransport] = useState({value: moyenTransportPk, label:moyenTransport});
        const [selectedLivraison, setSelectedLivraison] = useState({value: lieuLivraisonPk, label:lieuLivraison});
        const [selectedParc, setSelectedParc] = useState({value: parcAVidePk, label:parcAVide});
        const [selectedCompagnie, setSelectedCompagnie] = useState({value: compagnieTransportPk, label:compagnieTransport});
        const [selectedEntreposage, setSelectedEntreposage] = useState({value: lieuEntreposagePk, label:lieuEntreposage});
        const [selectedMarchandise, setSelectedMarchandise] = useState({value: natureMarchandisePk, label:natureMarchandise});
        
        // Les options séléctionnées dans les listes d'Information de déclaration 
        const [regime, setRegime] = useState({value:regimePk, label:régime1});
        const [livraisonMode, setLivraisonMode] = useState([]);
        const [paysAV, setPaysAV] = useState({value:paysAVPk, label:paysAchatVente1});
        const [paysP, setPaysP] = useState({value:paysProvPk, label:paysProvenance1});
        const [bureau, setBureau] = useState({value:bureauPk, label:bureauDouane1});

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
        <AdvancedBreadcrumb numDossier={numDossier} hideDocs={true} showError={showError} showSuccess={showSuccess}
                            onClick={handleAjouterDossier} onErrorClose={handleErrorClose} onSuccessClose={handleSuccessClose} errorMessages={errorMessages}/>
        <div>
            <div className={styles.navbar}>
                <ul>
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Informations générales</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Informations sur la déclaration</li>
                </ul>
            </div>
            <div className={styles.mainContent}>
            {!(isLoadedDeclaration && isLoadedDossier) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : (
              <>
            {activeTab === "tab2" ? 
                <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                        <div className={styles.many_fields}>    
                            <InputField display="labelonleft" label="N° répertoire *" size="small" type="text" value={numRep} onChange={(e) => setNumRep(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Régime *</label>
                            <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeRegimesDouanier} value={regime} placeholder="Sélectionner un régime" onChange={(e) => handleRegimeSelection(e)} isSearchable={true}/>
                            <InputField readOnly={true} size="extralarge" type="text" value={régime2} onChange={(e) => setRegime2(e.target.value)} />

                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>   
                            <InputField display="labelonleft" label="Gros" size="verysmall" type="text" value={gros1} onChange={(e) => setGros1(e.target.value)} />
                            <InputField size="small" type="text" value={gros2} onChange={(e) => setGros2(e.target.value)} />
                            <InputField display="labelonleft" label="Article" size="small" type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
                            <InputField display="labelonleft" label="S/G" size="verysmall" type="text" value={sg} onChange={(e) => setSG(e.target.value)} />
                            <InputField display="labelonleft" label="Poids brut déclaré" size="small" type="text" value={poidsBrutDecl} onChange={(e) => setPoidsBrutDecl(e.target.value)} />
                            <InputField display="labelonleft" label="Poids net déclaré" size="small" type="text" value={poidsNetDecl} onChange={(e) => setPoidsNetDecl(e.target.value)} />
                       
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                          <label className={labelStyles.labelonleft}>Mode paiement</label>   
                          <select className={labelStyles.average} value={modePaiement} onChange={(e) => setModePaiement(e.target.value)}>
                             <option value="">Selectionner</option>
                              {listeModesPaiement.map((statut, index) => (
                                  <option key={index} value={statut}>
                                  {statut}
                                  </option>
                              ))}
                          </select> 
                            <label className={labelStyles.labelonleft}>Mode livraison</label>   
                            <select className={labelStyles.small}  value={modeLivraison1} onChange={(e) => handleModeLivraisonSelection(e.target.value)}>
                                <option value="">Selectionner</option>
                                {listeModesLivraisons.map((mode) => (
                                    <option key={mode.code} value={mode.code}>
                                    {mode.code}
                                    </option>
                                ))}
                            </select> 
                            <InputField readOnly={true} size="verylarge" type="text" value={modeLivraison2} onChange={(e) => setModeLivraison2(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Mode financement </label>   
                            <select className={labelStyles.verylarge}  value={modeFinancement} onChange={(e) => setModeFinancement(e.target.value)}>
                                <option value="">Selectionner</option>
                                {listeModesFinancement.map((statut, index) => (
                                    <option key={index} value={statut}>
                                    {statut}
                                    </option>
                                ))}
                            </select> 
                            <label className={labelStyles.labelonleft}>Type opération</label>   
                            <select className={labelStyles.overaverage}  value={typeOp} onChange={(e) => setTypeOp(e.target.value)}>
                                <option value="">Selectionner</option>
                                {listeTypesOperations.map((statut, index) => (
                                    <option key={index} value={statut}>
                                    {statut}
                                    </option>
                                ))}
                            </select> 
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                            <label className={labelStyles.labelonleft}>Pays achat/vente</label>
                            <Select className={labelStyles.undersmall} styles={colorStyles} options={listeCodePays} value={paysAV} placeholder="Sélectionner un pays" onChange={(e) => handlePaysAVSelection(e)} isSearchable={true}/>
                            <InputField  readOnly={true} size="large" type="text" value={paysAchatVente2} onChange={(e) => setPaysAchatVente2(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Pays provenance</label>
                            <Select className={labelStyles.undersmall} styles={colorStyles} options={listeCodePays} value={paysP} placeholder="Sélectionner un pays" onChange={(e) => handlePaysPSelection(e)} isSearchable={true}/>
                            <InputField readOnly={true} size="large" type="text" value={paysProvenance2} onChange={(e) => setPaysProvenance2(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                            <label className={labelStyles.labelonleft}>Bureau douane</label>
                            <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureau} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauSelection(e)} isSearchable={true}/>
                            <InputField readOnly={true} size="large" type="text" value={bureauDouane2} onChange={(e) => setBureauDouane2(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Receveur douane" size="large" type="text" value={receveurDouane} onChange={(e) => setReceveurDouane(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Montant droits/taxes" size="average" type="text" value={montantDroitTaxe} onChange={(e) => setMontantDroitTaxe(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                    </div>  
            </>
                :     
              <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                    <div className={styles.many_fields}>    
                        <InputField display="labelonleft" label="N° dossier *" size="small" type="text" value={numDossier} onChange={(e) => setNumDossier(e.target.value)} />
                        
                        <label className={labelStyles.labelonleft}>Nom client *</label>
                        <Select className={labelStyles.overaverage} styles={colorStyles} options={listeRaisonsSocial} value={selectedRaisonSocial} placeholder="Sélectionner un nom" onChange={(e) => handleClientSelection(e)} isSearchable={true}/>
                        
                        <label className={labelStyles.labelonleft}>Nature dossier </label>   
                        <select className={labelStyles.belowaverage}  value={natureDossier} onChange={(e) => setNatureDossier(e.target.value)}>
                            <option value="">Selectionner</option>
                            {listeNaturesDossiers.map((statut, index) => (
                                <option key={index} value={statut}>
                                {statut}
                                </option>
                            ))}
                        </select>                                 
                        <label className={labelStyles.labelonleft}>Etat dossier </label>   
                        <select className={labelStyles.belowaverage}  value={etatDossier} onChange={(e) => setEtatDossier(e.target.value)}>
                            <option value="">Selectionner</option>
                            {listeEtatsDossiers.map((statut, index) => (
                                <option key={index} value={statut}>
                                {statut}
                                </option>
                            ))}
                        </select>          
                                   
                        <InputField display="labelonleft" label="Date et heure réception *" size="average" type="texte" value={dateHeureReception1} onChange={(e) => setDateHeureReception1(e.target.value)} />
                        <InputField size="verysmall" type="texte" value={dateHeureReception2} onChange={(e) => setDateHeureReception2(e.target.value)} />
                        <label className={labelStyles.labelonleft}>Nom fournisseur</label>
                        <Select className={labelStyles.average} styles={colorStyles} options={listeRaisonsSocialFournisseurs} value={selectedRaisonSocialFournisseur} placeholder="Sélectionner un nom" onChange={(e) => handleFournisseurSelection(e)} isSearchable={true}/>
                        <InputField display="labelonleft" label="N° fact. fournisseur" size="average" type="texte" value={numFactFournisseur} onChange={(e) => setNumFactFournisseur(e.target.value)} />
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date facture fournisseur</label>
                            <DatePicker className={labelStyles.average} selected={dateFactFournisseur} onChange={(e) => setDateFactFournisseur(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                        </label>
                        <InputField display="labelonleft" label="Montant facture fournisseur" size="belowaverage" type="texte" value={montantFactFournisseur} onChange={(e) => setMontantFactFournisseur(e.target.value)} />
                        <label className={labelStyles.labelonleft}>Monnaie </label>
                        <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeCodeDevises} value={selectedCodeDevise} placeholder="Sélectionner un code" onChange={(e) => handleDeviseSelection(e)} isSearchable={true}/>
                        
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <label className={labelStyles.labelonleft}>Moyen transport extérieur</label>
                        <Select className={labelStyles.verylarge} styles={colorStyles} options={listeMoyensTransports} value={selectedTransport} placeholder="Sélectionner un nom" onChange={(e) => handleTransportSelection(e)} isSearchable={true}/>
                       
                        <label className={labelStyles.labelonleft}>Type transport extérieur</label> 
                        <select className={labelStyles.average}  value={modeTransport} onChange={(e) => setModeTransport(e.target.value)}>
                            <option value="">Selectionner</option>
                            {listeTypesTransport.map((statut, index) => (
                                <option key={index} value={statut}>
                                {statut}
                                </option>
                            ))}
                        </select>                            
                        <label className={labelStyles.labelonleft}>Compagnie transport </label>
                        <Select className={labelStyles.verylarge} styles={colorStyles} options={listeCompagniesTransport} value={selectedCompagnie} placeholder="Sélectionner un nom" onChange={(e) => handleCompagnieSelection(e)} isSearchable={true}/>
                        <InputField display="labelonleft" label="N° titre transport" size="average" type="texte" value={numTitreTransport} onChange={(e) => setNumTitreTransport(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <label className={labelStyles.labelonleft}>Nature marchandise </label>
                        <Select className={labelStyles.extralarge} styles={colorStyles} options={listeNaturesMarchandise} value={selectedMarchandise} placeholder="Sélectionner un nom" onChange={(e) => handleMarchandiseSelection(e)} isSearchable={true}/>
                        <InputField display="labelonleft" label="Nbr TC" size="belowaverage" type="text" value={nbrEmb} onChange={(e) => setNbrEmb(e.target.value)} />
                        <InputField display="labelonleft" label="Nbr colis" size="verysmall" type="text" value={nbrColis} onChange={(e) => setNbrColis(e.target.value)} />
                        <label className={labelStyles.labelonleft}>Lieu entreposage </label>
                        <Select className={labelStyles.extralarge} styles={colorStyles} options={listeLieuxEntreposage} value={selectedEntreposage} placeholder="Sélectionner un nom" onChange={(e) => handleEntreposageSelection(e)} isSearchable={true}/>
                        
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date arrivée</label>
                            <DatePicker className={labelStyles.average} selected={dateArrivée} onChange={(e) => setDateArrivée(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                        
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date main levée</label>
                            <DatePicker className={labelStyles.average} selected={dateMainLevée} onChange={(e) => setDateMainLevée(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                         
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date échange</label>
                            <DatePicker className={labelStyles.average} selected={dateEchange} onChange={(e) => setDateEchange(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>    
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date déclaration</label>
                            <DatePicker className={labelStyles.average} selected={dateDeclaration} onChange={(e) => setDateDeclaration(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                            
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date visite douane</label>
                            <DatePicker className={labelStyles.average} selected={dateVisiteDouane} onChange={(e) => setDateVisiteDouane(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                            
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date liquidation</label>
                            <DatePicker className={labelStyles.average} selected={dateLiquidation} onChange={(e) => setDateLiquidation(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                            
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date recevabilité chèque</label>
                            <DatePicker className={labelStyles.average} selected={dateRecevCheque} onChange={(e) => setDateRecevCheque(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                            
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date acquittement</label>
                            <DatePicker className={labelStyles.average} selected={dateAcquittement} onChange={(e) => setDateAcquittement(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                        
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date retrait bon à enlever</label>
                            <DatePicker className={labelStyles.average} selected={dateRetraitBonEnlever} onChange={(e) => setDateRetraitBonEnlever(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                            
                        <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date livraison</label>
                            <DatePicker className={labelStyles.average} selected={dateLivraison} onChange={(e) => setDateLivraison(e)} dateFormat="dd/MM/yyyy" placeholderText="Sélectionner une date" />
                        </label>                            
                        <label className={labelStyles.labelonleft}>Lieu livraison</label>
                        <Select className={labelStyles.overaverage} styles={colorStyles} options={listeLieuxLivraison} value={selectedLivraison} placeholder="Sélectionner un nom" onChange={(e) => handleLivraisonSelection(e)} isSearchable={true}/>
                        <label className={labelStyles.labelonleft}>Parc à vide</label>
                        <Select className={labelStyles.extralarge} styles={colorStyles} options={listeLieuxEntreposage} value={selectedParc} placeholder="Sélectionner un nom" onChange={(e) => handleParcSelection(e)} isSearchable={true}/>
                        
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <InputField display="labelonleft" label="Nom déclarant" size="overaverage" type="text" value={nomDeclarant} onChange={(e) => setNomDeclarant(e.target.value)} />
                        <InputField display="labelonleft" label="N° déclaration" size="belowaverage" type="text" value={numDeclaration} onChange={(e) => setNumDeclaration(e.target.value)} />
                        <InputField display="labelonleft" label="Observation" size="large" type="text" value={observation} onChange={(e) => setObservation(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={stylesLine.footerSpace}></div>
                </div>
            </>
                }
              </>)}
            </div>
        </div>

    </>
  )
}

export default AjouterDossier