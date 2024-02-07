import React from 'react'
import styles from './popupForm.module.css'
import stylesLine from './listeFacture.module.css';
import stylesLoader from './gestionClients.module.css'
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import buttonStyles from '../components/button.module.css';
import InputField from '../components/InputField';
import TableFilter from '../components/tableFilter';
import labelStyles from "../components/inputField.module.css";
import { useState, useRef, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {formatDateFromAPI,formatDateToAPI} from '../Utils/dateUtils';
import SuccessMessage from '../components/succesMessage';
import TabEmballages from './TabEmballages';
import Select from 'react-select';
import {IconDelete} from '../components/icons';
import { reloadPage , handleFilterChange} from '../Utils/actionUtils';



// Date et heure reception a utilisé avec datepicker

function EditDossier() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const { id } = useParams();
    const [dossierData, setDossierData] = useState({});
    const [declarationData, setDeclarationData] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [emballageTodelete,setEmballageToDelete] = useState(null);
    const [errorMessages, setErrorMessages] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoadedDossier, setIsLoadedDossier] = useState(false);
    const [isLoadedDeclaration, setIsLoadedDeclaration] = useState(false);
    const [isLoadedEmballage, setIsLoadedEmballage] = useState(false);

    const [activeTab, setActiveTab] = useState("tab1");

    const [dateHR, setDateHR] = useState([]);

    // Récupérer le dossier
    useEffect(() => {

        axios.get(`${apiUrl}/api/dossiers/${id}/`)
        .then((response) => {
          const dossierResponse = response.data;
          setDossierData(dossierResponse);
          const {numDossier,client,etatDossier,natureDossier,dateHeureReception,
            fournisseur,numFactureFournisseur,dateFactureFournisseur,montantFactureFournisseur,
        monnaie,moyenTransport,compagnieTransport,numTitreTransport,nbrTC,natureMarchandise,typeTransportExterieur,lieuEntreposage,
        dateAcquitement,dateArrivee,dateMainLevee,dateEchange,dateDeclaration,dateVisiteDouane,dateLiquidation,dateRecevabiliteCheque,dateRetraitBonEnlever,dateLivraison,lieuLivraison,parcAVide,observation,nomDeclarant,numDeclaration } = dossierResponse;
           setNumDossier(numDossier?numDossier:'');
            setSelectedRaisonSocial({value:client?client.client_pk:null,label:client?client.raisonSociale:''}); // client done
            setClientPk(client?client.client_pk:null); 
            setNomClient(client?client.raisonSociale:'');
            setIsLoadedDossier(true);
            setEtatDossier(etatDossier);
            setNatureDossier(natureDossier);
            const dateHR2 = dateHeureReception.split(" ");
            setDateHR(dateHR2);
            setDateHeureReception1(formatDateFromAPI(dateHR2[0]));
            setDateHeureReception2(dateHR2[1]);
            setSelectedRaisonSocialFournisseur({value:fournisseur.fournisseur_pk, label:fournisseur.raisonSociale}); // fournisseur done
            setFournisseurPk(fournisseur.fournisseurPk); 
            setNomFournisseur(fournisseur.raisonSociale);
            setNumFactFournisseur(numFactureFournisseur);
            setDateFactFournisseur(dateFactureFournisseur? formatDateFromAPI(dateFactureFournisseur): '');
            setMontantFactFournisseur(montantFactureFournisseur);
            setSelectedCodeDevise({value:monnaie.devise_pk, label:monnaie.code}); // monnaie done
            setMonnaie(monnaie.code);
            setDevisePk(monnaie.devise_pk);
            setSelectedTransport({value:moyenTransport.moyenTransport_pk, label:moyenTransport.nom}); // moyen done
            setMoyenTransport(moyenTransport.nom);
            setMoyenTransportPk(moyenTransport.moyenTransport_pk)
            setSelectedCompagnie({value:compagnieTransport.compagnie_pk, label:compagnieTransport.nom}); // compagnie done
            setCompagnieTransport(compagnieTransport.nom);
            setCompagnieTransportPk(compagnieTransport.compagnie_pk);
            setNumTitreTransport(numTitreTransport);
            setNbrEmb(nbrTC);
            setSelectedMarchandise({value:natureMarchandise.natureMarchandise_pk, label:natureMarchandise.designation}); // nature march done
            setNatureMarchandise(natureMarchandise.designation);
            setNatureMarchandisePk(natureMarchandise.natureMarchandise_pk);
            setModeTransport(typeTransportExterieur);
            setSelectedEntreposage({value:lieuEntreposage.compagnie_pk, label:lieuEntreposage.nom}); // done
            setLieuEntreposage(lieuEntreposage.nom);
            setLieuEntreposagePk(lieuEntreposage.compagnie_pk);
            setDateArrivée(dateArrivee? formatDateFromAPI(dateArrivee): '');
            setDateMainLevée(dateMainLevee? formatDateFromAPI(dateMainLevee): '');
            setDateEchange(dateEchange? formatDateFromAPI(dateEchange): '');
            setDateDeclaration(dateDeclaration? formatDateFromAPI(dateDeclaration): '');
            setDateVisiteDouane(dateVisiteDouane? formatDateFromAPI(dateVisiteDouane): '');
            setDateLiquidation(dateLiquidation? formatDateFromAPI(dateLiquidation): '');
            setDateRecevCheque(dateRecevabiliteCheque? formatDateFromAPI(dateRecevabiliteCheque): '');
            setDateAcquittement(dateAcquitement? formatDateFromAPI(dateAcquitement): '');
            setDateRetraitBonEnlever(dateRetraitBonEnlever? formatDateFromAPI(dateRetraitBonEnlever): '');
            setDateLivraison(dateLivraison? formatDateFromAPI(dateLivraison): '');
            setSelectedLivraison({value:lieuLivraison.lieuLivraison_pk, label:lieuLivraison.nomLieu}); // done
            setLieuLivraison(lieuLivraison.nomLieu);
            setLieuLivraisonPk(lieuLivraison.lieuLivraison_pk);
            setSelectedParc({value:parcAVide.compagnie_pk, label:parcAVide.nom}); // done
            setParcAVide(parcAVide.nom);
            setParcAVidePk(parcAVide.compagnie_pk);
            setObservation(observation);
            setNomDeclarant(nomDeclarant);
            setNumDeclaration(numDeclaration);
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, [id]); 

    // Récupérer la déclaration du dossier
    useEffect(() => {
        axios.get(`${apiUrl}/api/dossiers/${id}/declaration/`)
        .then((response) => {
            const declarationResponse = response.data;
            setDeclarationData(declarationResponse);
            const {numRepertoire,regime,modePaiement,anneeGros,numGros,numArticle,sg,
                nbrColis,poidsBrut,poidsNet,
                paysAchatVente,paysProvenance,modeLivraison,modeFinancement,typeOperation,
                bureauEnregistrement} = declarationResponse;
            setNbrColis(nbrColis?nbrColis:'');
            setNumRep(numRepertoire?numRepertoire:'');
            setRegimePk(regime?regime.regimeDouanier_pk:'');
            setRegime1(regime?regime.code:'');
            setRegime2(regime?regime.designation:'');
            setRegime({value:regime?regime.regimeDouanier_pk:null, label:regime?regime.code:''}); //
            setGros1(anneeGros?anneeGros:'');
            setGros2(numGros?numGros:'');
            setIsLoadedDeclaration(true);
            setArticle(numArticle);
            setSG(sg);
            setPoidsBrutDecl(poidsBrut);
            setPoidsNetDecl(poidsNet);
            setModePaiement(modePaiement);
            setLivraisonMode(modeLivraison); //
            setModeLivraison1(modeLivraison.code);
            setModeLivraison2(modeLivraison.designation);
            setModeFinancement(modeFinancement);
            setTypeOp(typeOperation);
            setPaysAV({value:paysAchatVente.pays_pk, label:paysAchatVente.code}); //
            setPaysAVPk(paysAchatVente.pays_pk);
            setPaysAchatVente1(paysAchatVente.code);
            setPaysAchatVente2(paysAchatVente.nom);
            setPaysP({value:paysProvenance.pays_pk, label:paysProvenance.code}); //
            setPaysProvPk(paysProvenance.pays_pk);
            setPaysProvenance1(paysProvenance.code);
            setPaysProvenance2(paysProvenance.nom);
            setBureau({value:bureauEnregistrement.bureauDouane_pk, label:bureauEnregistrement.code}); //
            setBureauPk(bureauEnregistrement.bureauDouane_pk);
            setBureauDouane1(bureauEnregistrement.code);
            setBureauDouane2(bureauEnregistrement.nomBureau);
            setReceveurDouane(bureauEnregistrement.receveurDouane);
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, [id]); 

    // Récupérer la liste d'emballage du dossier
    useEffect(() => {
      axios.get(`${apiUrl}/api/dossiers/${id}/emballages/`)
      .then((response) => {
          const emballagesData = response.data;
          if (typeof emballagesData === 'object' && emballagesData !== null) {
            const extractedEmballages = Object.values(emballagesData).map(item => ({
              id: item.emballageDossier_pk,
              numero: item.numero,
              numEmballage : item.emballage.numEmballage,
              genreEmballage: item.emballage.genreEmballage,
              nbrPieds: item.emballage.nbrPieds,
              typeEmballage: item.emballage.typeEmballage,
              dateRestitution: item.dateRestitution,
              numBonRestitution : item.numBonRestitution,          
            }));
            setEmballages(extractedEmballages);
            setFilteredData(extractedEmballages);
            setIsLoadedEmballage(true);
          }
          else {
          console.error('Response data is not a JSON object:', emballagesData);
          handleError(emballagesData);
          setIsLoadedEmballage(true);
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

    // Listes déroulantes de la partie Informations Générales
    const [listeClients, setListeClients] = useState([]);
    const  [clientPk, setClientPk] = useState([dossierData.client].client_pk);
    const [listeFournisseurs, setListeFournisseurs] = useState([]);
    const  [fournisseurPk, setFournisseurPk] = useState([dossierData.fournisseur].fournisseur_pk);
    const [listeDevises, setListeDevises] = useState([]);
    const [devisePk, setDevisePk] = useState([dossierData.monnaie].devise_pk); 
   const [listeTransports, setListeTransports] = useState([]);
   const [moyenTransportPk, setMoyenTransportPk] = useState([dossierData.moyenTransport].moyenTransport_pk);
   const [listeCompagnies, setListeCompagnies] = useState([]);
   const [compagnieTransportPk,setCompagnieTransportPk] = useState([dossierData.compagnieTransport].compagnie_pk);
   const [listeMarchandises, setListeMarchandises] = useState([]);
   const [natureMarchandisePk,setNatureMarchandisePk] = useState([dossierData.natureMarchandise].natureMarchandise_pk);
   const [listeEntreposages, setListeEntreposages] = useState([]);
   const [lieuEntreposagePk,setLieuEntreposagePk] = useState([dossierData.lieuEntreposage].compagnie_pk);
   const [listeLivraisons, setListeLivraisons] = useState([]);
   const [lieuLivraisonPk,setLieuLivraisonPk] = useState([dossierData.lieuLivraison].lieuLivraison_pk);
   const [parcAVidePk,setParcAVidePk] = useState([dossierData.parcAVide].compagnie_pk);
   const [listeEtatsDossiers, setListeEtatsDossiers] = useState([]);
   const [listeNaturesDossiers, setListeNaturesDossiers] = useState([]);
   const [listeTypesTransport, setListeTypesTransport] = useState([]);

   // Récupération des listes pour les searchable drop down dans Informations Générales
   useEffect(() => {
        
          const clients = axios.get(`${apiUrl}/api/clients/`);
          const fournisseurs = axios.get(`${apiUrl}/api/fournisseurs/`);
          const devises = axios.get(`${apiUrl}/api/devises/`);
          const transports = axios.get(`${apiUrl}/api/moyens-transport/`);
          const compagnies = axios.get(`${apiUrl}/api/compagnies-transport/`);
          const marchandises = axios.get(`${apiUrl}/api/natures-marchandise/`);
          const entreposages = axios.get(`${apiUrl}/api/entrepots/`);
          const livraisons = axios.get(`${apiUrl}/api/lieux-livraison/`);

          
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
        
        const etats = axios.get(`${apiUrl}/api/etats-dossier/`);
        const natures = axios.get(`${apiUrl}/api/natures-dossier/`);
        const typesTransport = axios.get(`${apiUrl}/api/types-transport/`);
        
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

    // Listes déroulantes de la partie Informations de déclaration
      const [listeModesPaiement, setListeModesPaiement] = useState([]);
      const [listeModesFinancement, setListeModesFinancement] = useState([]);
      const [listeTypesOperations, setListeTypesOperations] = useState([]);

      const [listeModesLivraisons, setListeModesLivraison] = useState([]);
      const [listeRegimes, setListeRegimes] = useState([]);
      const [listePays, setListePays] = useState([]);
      const [listeBureaux, setListeBureaux] = useState([]);

      const [regimePk, setRegimePk] = useState([declarationData.regime].regimeDouanier_pk);
      const [paysAVPk, setPaysAVPk] = useState([declarationData.paysAV].pays_pk);
      const [paysProvPk, setPaysProvPk] = useState([declarationData.paysProvenance].pays_pk);
      const [bureauPk, setBureauPk] = useState([declarationData.bureauEnregistrement].bureauDouane_pk);

    // Récupérations des listes pour les searchable drop down dans Informations de déclaration
    useEffect(() => {
      const paiements = axios.get(`${apiUrl}/api/modes-paiement/`);
      const financements = axios.get(`${apiUrl}/api/modes-financement/`);
      const operations = axios.get(`${apiUrl}/api/types-operation/`);

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

    // Récupération des listes statiques dans Informations de déclaration
     useEffect(() => {
      const livraisons = axios.get(`${apiUrl}/api/modes-livraison/`);
      const regimes = axios.get(`${apiUrl}/api/regimes-douaniers/`);
      const pays = axios.get(`${apiUrl}/api/pays/`);
      const bureaux = axios.get(`${apiUrl}/api/bureaux-douane/`);

      Promise.all([livraisons, regimes, pays, bureaux])
      .then((responses) => {
        const livraisonData = responses[0].data;
        const regimesData = responses[1].data;
        const paysData = responses[2].data;
        const bureauData = responses[3].data;

        setListeModesLivraison(livraisonData.results);
        setListeRegimes(regimesData);
        setListePays(paysData);
        setListeBureaux(bureauData);
      })

    }, [])


    // Listes déroulantes de la partie Emballages
    const [listeEmbs, setListeEmbs] = useState([]);
    const [genresEmb, setGenresEmb] = useState([]);
    const [typesEmb, setTypesEmb] = useState([]);
    const [piedsEmb, setPiedsEmb] = useState([]);

    // Récupération des listes drop down dans Emballages
    useEffect(() => {
     
      const embs = axios.get(`${apiUrl}/api/emballages/`)

      .then((response) => {
        const embsData = response.data;
        setListeEmbs(embsData);
      })
      .catch((error) => {
        console.log('Error:', error);
        handleError(error.request.response);

      });
    }, []);

    // Récupération des listes statiques dans Emballages
    useEffect(() => {
      const genresEmballage = axios.get(`${apiUrl}/api/genres-emballage/`);
      const typesEmballage = axios.get(`${apiUrl}/api/types-emballage/`);
      const piedsEmballage = axios.get(`${apiUrl}/api/nbr-pieds/`);

      Promise.all([genresEmballage, typesEmballage, piedsEmballage])
      .then((responses) => {
        const genresEmballageData = responses[0].data;
        const typesEmballageData = responses[1].data;
        const piedsEmballageData = responses[2].data;

        setGenresEmb(genresEmballageData.results);
        setTypesEmb(typesEmballageData.results);
        setPiedsEmb(piedsEmballageData.results);
      })
      .catch((error) => {
        console.log('Error:', error);
        handleError(error.request.response);

      });
    }, []);


    // Champs de la partie Informations Générales
    const [numDossier, setNumDossier] = useState(dossierData.numDossier || '');
    const [nomClient, setNomClient] = useState([dossierData.client].raisonSociale || '');
    const [natureDossier, setNatureDossier] = useState(dossierData.natureDossier || '');
    const [etatDossier, setEtatDossier] = useState(dossierData.etatDossier || '');
    const [dateHeureReception1, setDateHeureReception1] = useState('');
    const [dateHeureReception2, setDateHeureReception2] = useState('');
    const [nomFournisseur, setNomFournisseur] = useState([dossierData.fournisseur].raisonSociale || '');
    const [numFactFournisseur, setNumFactFournisseur] = useState(dossierData.numFactureFournisseur|| '');
    const [dateFactFournisseur, setDateFactFournisseur] = useState('');
    const [montantFactFournisseur, setMontantFactFournisseur] = useState(dossierData.montantFactureFournisseur || '');
    const [monnaie, setMonnaie] = useState([dossierData.monnaie].code || '');
    const [moyenTransport, setMoyenTransport] = useState([dossierData.moyenTransport].nom || '');
    const [modeTransport, setModeTransport] = useState(dossierData.typeTransportExterieur || '');
    const [compagnieTransport, setCompagnieTransport] = useState([dossierData.compagnieTransport].nom || '');
    const [numTitreTransport, setNumTitreTransport] = useState(dossierData.numTitreTransport || '');
    const [natureMarchandise, setNatureMarchandise] = useState([dossierData.natureMarchandise].designation || '');
    const [nbrEmb, setNbrEmb] = useState(dossierData.nbrTC || '');
    const [nbrColis, setNbrColis] = useState(declarationData.nbrColis || ''); 
    const [lieuEntreposage, setLieuEntreposage] = useState([dossierData.lieuEntreposage].nom || '');
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
    const [lieuLivraison, setLieuLivraison] = useState([dossierData.lieuLivraison].nom || '');
    const [parcAVide, setParcAVide] = useState([dossierData.parcAVide].nom || '');
    const [nomDeclarant, setNomDeclarant] = useState(dossierData.nomDeclarant || '');
    const [numDeclaration, setNumDeclaration] = useState(dossierData.numDeclaration || '');
    const [observation, setObservation] = useState(dossierData.observation || '');

    // Champs de la partie Informations de déclaration
    const [numRep, setNumRep] = useState(declarationData.numRepertoire || '');
    const [régime1, setRegime1] = useState([declarationData.regime].code || '');
    const [régime2, setRegime2] = useState([declarationData.regime].designation || '');
    const [modePaiement, setModePaiement] = useState(declarationData.modePaiement || '');
    const [gros1, setGros1] = useState(declarationData.anneeGros || '');
    const [gros2, setGros2] = useState(declarationData.numGros || '');
    const [article, setArticle] = useState(declarationData.numArticle || '');
    const [sg, setSG] = useState(declarationData.sg || '');
    const [poidsBrutDecl, setPoidsBrutDecl] = useState(declarationData.poidsBrut || '');
    const [poidsNetDecl, setPoidsNetDecl] = useState(declarationData.poidsNet || '');
    const [modeLivraison1, setModeLivraison1] = useState([declarationData.modeLivraison].code || '');
    const [modeLivraison2, setModeLivraison2] = useState([declarationData.modeLivraison].designation || '');
    const [modeFinancement, setModeFinancement] = useState(declarationData.modeFinancement || '');
    const [typeOp, setTypeOp] = useState(declarationData.typeOperation || '');
    const [paysAchatVente1, setPaysAchatVente1] = useState([declarationData.paysAchatVente].code || '');
    const [paysAchatVente2, setPaysAchatVente2] = useState([declarationData.paysAchatVente].nom || '');
    const [paysProvenance1, setPaysProvenance1] = useState([declarationData.paysProvenance].code || '');
    const [paysProvenance2, setPaysProvenance2] = useState([declarationData.paysProvenance].nom || '');
    const [bureauDouane1, setBureauDouane1] = useState([declarationData.bureauEnregistrement].code || '');
    const [bureauDouane2, setBureauDouane2] = useState([declarationData.bureauEnregistrement].nomBureau || '');
    const [receveurDouane, setReceveurDouane] = useState([declarationData.bureauEnregistrement].receveurDouane || '');
    const [montantDroitTaxe, setMontantDroitTaxe] = useState('');

    // Champs de la parties emballages
    const [emballages, setEmballages] = useState([]);
    const headersEmballages = ["N°", "N° Emballage", "Genre Emballage", "Pieds", "Type Emballage", "Date Restitution", "N° Bon Restitution", "Actions à faire"]


    // Switching entre les parties
    const handleTab1 = () => {
        setActiveTab("tab1")
    }
    const handleTab2 = () => {
        setActiveTab("tab2")
    }
    const handleTab3 = () => {
        setActiveTab("tab3")
    }

    const [showForm, setShowForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);

    const handleFilterChangeWrapper = (columnKey, filterValue) => {
      handleFilterChange(columnKey, filterValue,emballages, setFilteredData);
    };

    // Partie document
    const handleDocumentClick = () => {
      setShowDocumentForm(true);
    };

    const handleDocumentFormClose = () => {
      setShowDocumentForm(false);
    };


    // Nouvel emballage
    const handleNouveauClick = () => {
        setShowForm(true);
      };

    const handleFormClose = () => {
        setShowForm(false);
      };

    // Suppression d'emballage
      const handleDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setEmballageToDelete(rowId);
        setShowDialog(true);
      };

      const handleDeleteEmballage = () => {
        setShowDialog(false);
        setIsLoadedEmballage(false);
        axios
         .delete(`${apiUrl}/api/dossiers/${id}/emballages/${emballageTodelete}/`)
         .then(() => {
            setShowDialog(false);
            setIsLoadedEmballage(true);
            handleSuccess();
            setEmballageToDelete(null);
         })
         .catch((error) => {
            setShowDialog(false);
            setIsLoadedEmballage(true);
            console.log('Delete request error:', error);
            handleError(error.request.response);
            setEmballageToDelete(null);
         });
      };


    const tableActions = [
      <IconDelete key="delete" onClick={handleDeleteClick} />
    ];
      
      // Nouveau document
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

      const handleDialogClose = () => {
        setEmballageToDelete(null);
        setShowDialog(false);
      };
      
      const handleSuccess = () => {
          setShowSuccess(true);
        };
        
        const handleSuccessClose = () => {
          setShowSuccess(false);
          window.close();
        };

        const handleSuccessDeleteClose = () => {
          setShowSuccess(false);
          reloadPage();
        };

        //Controler l'ajout d'un emballage 
       const handleAjouter = (async (data) => {
        
        setIsLoadedEmballage(false);
          const emb = {
          numEmballage: data.numEmb? data.numEmb: '',
          genreEmballage : data.genreEmb? data.genreEmb: '',
          typeEmballage: data.typeEmb? data.typeEmb :'',
          nbrPieds: data.pieds? data.pieds: ''
        }

        const emballageEdited = await  axios.put(`${apiUrl}/api/emballages/${data.embPk}/`, JSON.stringify(emb), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const emballageResponse = response.data; 
              handleSuccess();
          })
          .catch((error) => {
              handleError(error.request.response);
          });

        const emballageDossier = {
          emballage: data.embPk,
          numero: data.num? data.num : '',
          dateRestitution: data.dateRest? formatDateToAPI(data.dateRest) : null,
          numBonRestitution: data.numBonRest? data.numBonRest : '',
          nbQtDSTR: data.nbQtDSTR? data.nbQtDSTR : '',
          poidsBrutDSTR: data.poidsBrutDSTR? data.poidsBrutDSTR : '',
          poidsNetDSTR: data.poidsNetDSTR? data.poidsNetDSTR : '',
        };
       
        const emballageDossierCreated =  axios.post(`${apiUrl}/api/dossiers/${id}/emballages/`, JSON.stringify(emballageDossier), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const emballageDossierResponse = response.data;   
              setIsLoadedEmballage(true);
              handleSuccess();
          })
          .catch((error) => {
              setIsLoadedEmballage(true);
              handleError(error.request.response);
          });
       });

        // Controle des séléction dans les listes déroulantes
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

        // Controle d'envoie du dossier et déclaration modifiés
        const handleModifierDossier = (async () => {

            const dateHR = formatDateToAPI(dateHeureReception1) + " " + dateHeureReception2;

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
              dateHeureReception: dateHR ? dateHR : null,
              fournisseur: selectedRaisonSocialFournisseur.value, //objet
              numFactureFournisseur: numFactFournisseur,
              dateFactureFournisseur: dateFactFournisseur ? formatDateToAPI(dateFactFournisseur) : null,
              montantFactureFournisseur: montantFactFournisseur,
              monnaie: selectedCodeDevise.value? selectedCodeDevise.value : null, //objet
              moyenTransport: selectedTransport.value, //objet
              typeTransportExterieur: modeTransport,
              compagnieTransport: selectedCompagnie.value, //objet
              numTitreTransport: numTitreTransport,
              natureMarchandise: selectedMarchandise.value, //objet
              nbrTC: nbrEmb,
              lieuEntreposage: selectedEntreposage.value, //objet
              dateAcquitement: dateAcquittement ? formatDateToAPI(dateAcquittement) : null,
              dateArrivee: dateArrivée ? formatDateToAPI(dateArrivée) : null,
              dateMainLevee: dateMainLevée ? formatDateToAPI(dateMainLevée) : null,
              dateEchange: dateEchange ? formatDateToAPI(dateEchange) : null,
              dateDeclaration: dateDeclaration ? formatDateToAPI(dateDeclaration) : null,
              dateVisiteDouane: dateVisiteDouane ? formatDateToAPI(dateVisiteDouane) : null,
              dateLiquidation: dateLiquidation ? formatDateToAPI(dateLiquidation) : null,
              dateRecevabiliteCheque: dateRecevCheque ? formatDateToAPI(dateRecevCheque) : null,
              dateRetraitBonEnlever: dateRetraitBonEnlever ? formatDateToAPI(dateRetraitBonEnlever) : null,
              dateLivraison: dateLivraison ? formatDateToAPI(dateLivraison) : null,
              lieuLivraison: selectedLivraison.value, //objet
              parcAVide: selectedParc.value, //objet
              nomDeclarant: nomDeclarant,
              numDeclaration: numDeclaration,
              observation: observation,
            };
            
            const dossierEdited =  axios.put(`${apiUrl}/api/dossiers/${id}/`, dossier, {
              headers: {
              'Content-Type': 'application/json',
              }
            });
            const declarationEdited =  axios.put(`${apiUrl}/api/dossiers/${id}/declaration/`, declaration, {
                headers: {
                  'Content-Type': 'application/json',
                }
            })

            Promise.all([dossierEdited, declarationEdited])
            .then((responses) => {
                const dossierResponse = responses[0].data;
                setIsLoadedDossier(true);
                const declarationResponse = responses[1].data;
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

        // Formattages des listes d'Emballages sous format ['value', 'label]
        const listeNumEmballage = listeEmbs.map(({emballage_pk, numEmballage}) => ({ ['value'] : emballage_pk, ['label']:numEmballage}))

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
          control : // le champs d'input
          styles => ({...styles, backgroundColor:'white',border:'none',boxShadow:'none', fontFamily:'Montserrat'}),
          option: // les éléments à selectionnés
          (styles, {isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: isFocused? '#e4e1e1' : isSelected? '#a3a7d8' : 'white',
            fontFamily: 'Montserrat',
          }),
          singleValue : // option séléctionnée
          styles => ({...styles, color:'black', fontFamily:'Montserrat', fontSize:'16px'})
        };

  return (
    <>
        <AdvancedBreadcrumb numDossier={numDossier} dossier={dossierData} declaration={declarationData} hideParams={true} dossierPk={id} showError={showError} showSuccess={showSuccess} showForm={showDocumentForm} onDocClick={handleDocumentClick} hideButtons={false}
                            onClick={handleModifierDossier} onErrorClose={handleErrorClose} onSuccessClose={handleSuccessClose} onCloseDoc={handleDocumentFormClose} errorMessages={errorMessages}/>
        <div>
            <div className={styles.navbar}>
                <ul>
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Informations générales</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Informations sur la déclaration</li>
                    <li onClick={handleTab3} className={activeTab === "tab3" ? styles.activeNavbarLi: styles.NavbarLi}>Emballages</li>
                </ul>
            </div>
            <div className={styles.mainContent}>
            {!(isLoadedDossier && isLoadedDeclaration && isLoadedEmballage) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : (
              <>
                {activeTab === "tab3" ?     
                <>
                  <h1 className={stylesLine.pageTitle}>Liste des Emballages</h1>
                 <div className={styles.line}></div>
                  <span className={styles.filter_span}>
                    <TableFilter columns={[
                        { key: 'numero', label: 'N°', inputType : 'text' },
                        { key: 'numEmballage', label: 'N° Emballage' ,  inputType : 'text'},
                        { key: 'genreEmballage', label: 'Genre Emballage', inputType : 'text' },
                        { key: 'nbrPieds', label: 'Pieds' , inputType : 'text'},
                        { key: 'typeEmballage', label: 'Type Emballage' , inputType : 'text'},
                        { key: 'dateRestitution', label: 'Date Restitution' , inputType : 'text'},
                        { key: 'numBonRestitution', label: 'N° Bon Restitution' , inputType : 'text'},
                    ]} onFilterChange={handleFilterChangeWrapper} />
                   </span>
                  <ReusableTable data={filteredData} headers={headersEmballages} itemsPerPage={4} addlink={false} addactions={true} actionIcons={tableActions} />
                    {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
                    {showDialog && <CustomMessage onClose={handleDialogClose} onConfirm={handleDeleteEmballage} message={"Souhaitez-vous vraiment supprimer cet emballage ?"} />}
                    {showSuccess && <SuccessMessage onClose={handleSuccessDeleteClose} />}
                  <span className={styles.addButton}>
                      <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauClick}/> 
                          {showForm && <TabEmballages onClose={handleFormClose} 
                                                              onAjouter={handleAjouter} 
                                                              onFileUpload={handleFileUpload} 
                                                              onFileUploadClick={handleFileUploadClick}
                                                              inputFile={inputFile}
                                                              listeEmbsComplete={listeEmbs}
                                                              listeEmbs={listeNumEmballage}
                                                              genresEmb={genresEmb}
                                                              piedsEmb={piedsEmb}
                                                              typesEmb={typesEmb}/>}  
                  </span>
                  <div className={stylesLine.footerSpace}></div>
               </>
                :
                activeTab === "tab2" ? 
                <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                        <div className={styles.many_fields}>    
                            <InputField display="labelonleft" label="N° répertoire" size="small" type="text" value={numRep} onChange={(e) => setNumRep(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Régime</label>
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
                          <select className={labelStyles.average}  value={modePaiement} onChange={(e) => setModePaiement(e.target.value)}>
                              <option value="">Selectionner mode</option>
                              {listeModesPaiement.map((statut, index) => (
                                  <option key={index} value={statut}>
                                  {statut}
                                  </option>
                              ))}
                          </select> 
                            <label className={labelStyles.labelonleft}>Mode livraison</label>   
                            <select className={labelStyles.small}  value={modeLivraison1} onChange={(e) => handleModeLivraisonSelection(e.target.value)}>
                                <option value="">Selectionner mode</option>
                                {listeModesLivraisons.map((mode) => (
                                    <option key={mode.code} value={mode.code}>
                                    {mode.code}
                                    </option>
                                ))}
                            </select> 
                            <InputField readOnly={true} size="verylarge" type="text" value={modeLivraison2} onChange={(e) => setModeLivraison2(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Mode financement </label>   
                            <select className={labelStyles.verylarge}  value={modeFinancement} onChange={(e) => setModeFinancement(e.target.value)}>
                                <option value="">Selectionner mode</option>
                                {listeModesFinancement.map((statut, index) => (
                                    <option key={index} value={statut}>
                                    {statut}
                                    </option>
                                ))}
                            </select> 
                            <label className={labelStyles.labelonleft}>Type opération</label>   
                            <select className={labelStyles.overaverage}  value={typeOp} onChange={(e) => setTypeOp(e.target.value)}>
                                <option value="">Selectionner type</option>
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
                :     <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                    <div className={styles.many_fields}>    
                        <InputField display="labelonleft" label="N° dossier" size="small" type="text" value={numDossier} onChange={(e) => setNumDossier(e.target.value)} />
                        
                        <label className={labelStyles.labelonleft}>Nom client </label>
                        <Select className={labelStyles.overaverage} styles={colorStyles} options={listeRaisonsSocial} value={selectedRaisonSocial} placeholder="Sélectionner un nom" onChange={(e) => handleClientSelection(e)} isSearchable={true}/>
                        
                        <label className={labelStyles.labelonleft}>Nature dossier </label>   
                        <select className={labelStyles.average}  value={natureDossier} onChange={(e) => setNatureDossier(e.target.value)}>
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
                        <label className={labelStyles.labelonleft}>Date et heure réception
                            <DatePicker className={labelStyles.average} selected={dateHeureReception1} onChange={(e) => setDateHeureReception1(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                            <InputField size="verysmall" type="texte" value={dateHeureReception2} onChange={(e) => setDateHeureReception2(e.target.value)} />
                            </label>
                        <label className={labelStyles.labelonleft}>Nom fournisseur </label>
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
                        <select className={labelStyles.belowaverage}  value={modeTransport} onChange={(e) => setModeTransport(e.target.value)}>
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

export default EditDossier