import React from 'react'
import styles from './popupForm.module.css'
import stylesLine from './listeFacture.module.css';
import stylesLoader from './gestionClients.module.css'
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import InputField from '../components/InputField';
import labelStyles from "../components/inputField.module.css";
import { useState, useRef, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { reloadPage , handleFilterChange} from '../Utils/actionUtils';
import { IconDelete } from '../components/icons';
import TableFilter from '../components/tableFilter';
import TabArticles from './Layouts/Tabs/TabArticles'
import TabDocJoint from './Layouts/Tabs/TabDocJoint';
import ReusableTable from '../components/reusableTable';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import SuccessMessage from '../components/succesMessage';
import {formatDateToAPI} from '../Utils/dateUtils';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { formatDateFromAPI } from '../Utils/dateUtils';
 
// Date et heure reception a utilisé avec datepicker

function AjouterDeclaration() {

  // Settings
  const [numDossier, setNumDossier] = useState('');
  const [activeTab, setActiveTab] = useState("tab1");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();


  // Champs Partie Fixe
  const [numRep, setNumRep] = useState('');
  const [agrement1, setAgrement1] = useState('');
  const [agrement2, setAgrement2] = useState('');
  const [régime1, setRegime1] = useState();
  const [régime2, setRegime2] = useState('');
  const [bureauDouane1, setBureauDouane1] = useState('');
  const [bureauDouane2, setBureauDouane2] = useState('');
  const [modePaiement, setModePaiement] = useState('');
  const [numCredit, setNumCredit] = useState('');
  const [paysAchatVente1, setPaysAchatVente1] = useState('');
  const [paysAchatVente2, setPaysAchatVente2] = useState('');
  const [modeLivraison1, setModeLivraison1] = useState('');
  const [modeLivraison2, setModeLivraison2] = useState('');
  const [modeFinancement, setModeFinancement] = useState('');
  const [typeOp, setTypeOp] = useState('');
  const [natureTransaction, setNatureTransaction] = useState('');
  const [paysProvenance1, setPaysProvenance1] = useState('');
  const [paysProvenance2, setPaysProvenance2] = useState('');
  const [relationAV, setRelationAV] = useState('');
  const [modeTransport, setModeTransport] = useState('');
  const [natureDeclaration, setNatureDeclaration] = useState('');
  const [typeDedouanement, setTypeDedouanement] = useState('');
  const [domiciliation1, setDomiciliation1] = useState('');
  const [domiciliation2, setDomiciliation2] = useState('');
  const [domiciliation3, setDomiciliation3] = useState('');
  const [manifeste, setManifeste] = useState();
  const [gros1, setGros1] = useState();
  const [gros2, setGros2] = useState('');
  const [article, setArticle] = useState('');
  const [sg, setSG] = useState('');
  const [nbrColis, setNbrColis] = useState(); 
  const [poidsBrutDecl, setPoidsBrutDecl] = useState('');
  const [poidsNetDecl, setPoidsNetDecl] = useState('');
  const [bureauPrec1, setBureauPrec1] = useState('');
  const [bureauPrec2, setBureauPrec2] = useState('');
  const [declarationPrec1, setDeclarationPrec1] = useState('');
  const [declarationPrec2, setDeclarationPrec2] = useState('');
  const [régimePrec1, setRegimePrec1] = useState();
  const [régimePrec2, setRegimePrec2] = useState('');
  const [bureauDep1, setBureauDep1] = useState('');
  const [bureauDep2, setBureauDep2] = useState('');
  const [bureauDest1, setBureauDest1] = useState('');
  const [bureauDest2, setBureauDest2] = useState('');
  const [numRégimeEco, setNumRegimeEco] = useState('');
  const [lieuRégimeEco, setLieuRegimeEco] = useState('');
  const [tauxSuspension, setTauxSuspension] = useState('');
  const [durée, setDurée] = useState('');
  const [montantCaution, setMontantCaution] = useState('');
  
  // Champs Partie Variable
  const [filteredData, setFilteredData] = useState([]);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [poidsNetTotal, setPoidsNetTotal] = useState('');
  const [ecartPoids, setEcartPoids] = useState('');
  const [PTFNDecl, setPTFNDecl] = useState('');
  const [PTFNTotal, setPTFNTotal] = useState('');
  const [ecartPTFN, setEcartPTFN] = useState('');

  // Champs partie taxation
  const [PTFNMontant, setPTFNMontant] = useState('');
  const [PTFNMonnaie, setPTFNMonnaie] = useState('');
  const [PTFNCours, setPTFNCours] = useState('');
  const [PTFNValeur, setPTFNValeur] = useState('');
  const [autreFraisMontant, setAutreFraisMontant] = useState('');
  const [autreFraisMonnaie, setAutreFraisMonnaie] = useState('');
  const [autreFraisCours, setAutreFraisCours] = useState('');
  const [autreFraisValeur, setAutreFraisValeur] = useState('');
  const [fretMontant, setFretMontant] = useState('');
  const [fretMonnaie, setFretMonnaie] = useState('');
  const [fretCours, setFretCours] = useState('');
  const [fretValeur, setFretValeur] = useState('');
  const [assuranceMontant, setAssuranceMontant] = useState('');
  const [assuranceMonnaie, setAssuranceMonnaie] = useState('');
  const [assuranceCours, setAssuranceCours] = useState('');
  const [assuranceValeur, setAssuranceValeur] = useState('');
  const [plusValueValeur, setPlusValueValeur] = useState('');
  const [coefCours, setCoefCours] = useState('');
  const [CoefValeur, setCoefValeur] = useState('');
  const [enDouanesValeur, setEnDouanesValeur] = useState('');

  // Champs Partie DSTR
  const [dateEffet, setDateEffet] = useState(null);
  const [bureauDouane1DSTR, setBureauDouane1DSTR] = useState('');
  const [bureauDouane2DSTR, setBureauDouane2DSTR] = useState('');
  const [lieuEntreposage, setLieuEntreposage] = useState('');
  const [paysAchatVente1DSTR, setPaysAchatVente1DSTR] = useState('');
  const [paysAchatVente2DSTR, setPaysAchatVente2DSTR] = useState('');
  const [paysProvenance1DSTR, setPaysProvenance1DSTR] = useState('');
  const [paysProvenance2DSTR, setPaysProvenance2DSTR] = useState('');
  const [gros1DSTR, setGros1DSTR] = useState();
  const [gros2DSTR, setGros2DSTR] = useState('');
  const [articleDSTR, setArticleDSTR] = useState('');
  const [sgDSTR, setSGDSTR] = useState('');
  const [nbrColisDSTR, setNbrColisDSTR] = useState(); 
  const [poidsBrutDeclDSTR, setPoidsBrutDeclDSTR] = useState('');
  const [bureauPrec1DSTR, setBureauPrec1DSTR] = useState('');
  const [bureauPrec2DSTR, setBureauPrec2DSTR] = useState('');
  const [declarationPrec1DSTR, setDeclarationPrec1DSTR] = useState('');
  const [declarationPrec2DSTR, setDeclarationPrec2DSTR] = useState('');
  const [régimePrec1DSTR, setRegimePrec1DSTR] = useState();
  const [régimePrec2DSTR, setRegimePrec2DSTR] = useState('');
  const [bureauDep1DSTR, setBureauDep1DSTR] = useState('');
  const [bureauDep2DSTR, setBureauDep2DSTR] = useState('');
  const [bureauDest1DSTR, setBureauDest1DSTR] = useState('');
  const [bureauDest2DSTR, setBureauDest2DSTR] = useState('');
  
  // Champs Partie Documents Joints
  const [filteredDocsData, setFilteredDocsData] = useState([]);
  const [docToDelete, setDocToDelete] = useState(null);
  
  const articles = [
    {
      id : 1,
      num: 'N°',
      positionTarifaire: 'Position Tarifaire',
      designation: 'Désignation',
      uf: 'UF',
      qFac: 'Q Fac',
      ptfn: 'PTFN',
      poidsNet: 'Poids Net',
      origine: 'Origine',
      qCompte: 'Q Compte',
    },
    {
      id : 2,
      num: 'N°',
      positionTarifaire: 'Position Tarifaire',
      designation: 'Désignation',
      uf: 'UF',
      qFac: 'Q Fac',
      ptfn: 'PTFN',
      poidsNet: 'Poids Net',
      origine: 'Origine',
      qCompte: 'Q Compte',
    },
  ]

  const documents = [
    {
      id : 1,
      code: 'Code',
      designation: 'Désignation',
    },
    {
      id : 1,
      code: 'Code',
      designation: 'Désignation',
    },
  ]

  const headers = ["N°", "Position tarifaire", "Désignation", "UF", "Q Fac", "PTFN", "Poids Net", "Origine", "Q Compte", "Actions à faire"]
  const headersDocs = ["Code", "Désignation", "Actions à faire"]

  // Contrôle
  const [errorMessages, setErrorMessages] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showDocForm, setShowDocForm] = useState(false);
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  const [showDocDialog, setShowDocDialog] = useState(false);
  const [isLoadedDossier, setIsLoadedDossier] = useState(false);
  const [isLoadedDeclaration, setIsLoadedDeclaration] = useState(false);

  const handleFilterChangeWrapper = (columnKey, filterValue) => {
    handleFilterChange(columnKey, filterValue,articles, setFilteredData);
  };

  const handleDocumentFilterChangeWrapper = (columnKey, filterValue) => {
    handleFilterChange(columnKey, filterValue,documents, setFilteredDocsData);
  };
  
  // Récupérer le dossier
  useEffect(() => {
    axios.get(`${apiUrl}/api/dossiers/${id}/`)
    .then((response) => {
      const dossierResponse = response.data;
      const {numDossier} = dossierResponse;
      setNumDossier(numDossier?numDossier:'');
      setIsLoadedDossier(true)
    })
    .catch((error) => {
      console.log('Error:', error);
  
      if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Data:', error.response.data);
        }       
      });
  }, [id]); 
  
 
  // Listes statiques de la Partie Fixe
  const [listeModesPaiement, setListeModesPaiement] = useState([]);
  const [listeModesFinancement, setListeModesFinancement] = useState([]);
  const [listeTypesOperations, setListeTypesOperations] = useState([]);
  const [listeModesLivraisons, setListeModesLivraison] = useState([]);
  const [listeTypesTransport, setListeTypesTransport] = useState([]);

  // Récupération des listes statiques dans la Partie Fixe
  useEffect(() => {
    const paiements = axios.get(`${apiUrl}/api/modes-paiement/`);
    const financements = axios.get(`${apiUrl}/api/modes-financement/`);
    const operations = axios.get(`${apiUrl}/api/types-operation/`);
    const typesTransport = axios.get(`${apiUrl}/api/types-transport/`)

    Promise.all([paiements, financements, operations, typesTransport])
    .then((responses) => {
      const paiementData = responses[0].data;
      const financementsData = responses[1].data;
      const operationData = responses[2].data;
      const typesTransportData = responses[3].data;

      setListeModesPaiement(paiementData.results);
      setListeModesFinancement(financementsData.results);
      setListeTypesOperations(operationData.results);
      setListeTypesTransport(typesTransportData.results);

    })
    .catch((error) => {
      console.log('Error:', error);
      handleError(error.request.response);

    });
  }, []) 


  // Searchable drop-down de la Partie Fixe et Partie DSTR
  const [listeRegimes, setListeRegimes] = useState([]);
  const [listePays, setListePays] = useState([]);
  const [listeBureaux, setListeBureaux] = useState([]);
  const [regimePk, setRegimePk] = useState(null);
  const [regimePkDSTR, setRegimePkDSTR] = useState(null);
  const [regimePrecPk, setRegimePrecPk] = useState(null);
  const [regimePrecPkDSTR, setRegimePrecPkDSTR] = useState(null);
  const [paysAVPk, setPaysAVPk] = useState(null);
  const [paysAVPkDSTR, setPaysAVPkDSTR] = useState(null);
  const [paysProvPk, setPaysProvPk] = useState(null);
  const [paysProvPkDSTR, setPaysProvPkDSTR] = useState(null);
  const [bureauPk, setBureauPk] = useState(null);
  const [bureauPkDSTR, setBureauPkDSTR] = useState(null);
  const [bureauPrecPk, setBureauPrecPk] = useState(null);
  const [bureauPrecPkDSTR, setBureauPrecPkDSTR] = useState(null);
  const [bureauDepPk, setBureauDepPk] = useState(null);
  const [bureauDepPkDSTR, setBureauDepPkDSTR] = useState(null);
  const [bureauDestPk, setBureauDestPk] = useState(null);
  const [bureauDestPkDSTR, setBureauDestPkDSTR] = useState(null);


  // Récupérations des listes pour les searchable drop down dans Partie Fixe
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

      setListeRegimes(regimesData);
      setIsLoadedDeclaration(true);
      setListeModesLivraison(livraisonData.results);
      setListePays(paysData);
      setListeBureaux(bureauData);
    })

  }, [])


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
  const handleTab4 = () => {
      setActiveTab("tab4")
  }
  const handleTab5 = () => {
      setActiveTab("tab5")
  }

  // Scan de fichiers
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

    const handleArticleFormClose = () => {
      setShowArticleForm(false);
    };

    const handleDocFormClose = () => {
      setShowDocForm(false);
    };

    const handleArticleSuccessDeleteClose = () => {
      setShowSuccess(false);
      reloadPage();
    };

    const handleDocSuccessDeleteClose = () => {
      setShowSuccess(false);
      reloadPage();
    };


    const handleArticleDialogClose = () => {
      setArticleToDelete(null);
      setShowArticleDialog(false);
    };

    const handleDocDialogClose = () => {
      setDocToDelete(null);
      setShowDocDialog(false);
    };

    const handleNouveauArticleClick = () => {
      setShowArticleForm(true);
    };

    const handleNouveauDocClick = () => {
      setShowDocForm(true);
    };

    // Controle de suppression

    const handleArticleDeleteClick = (event) => {
      const rowId = event.target.closest('tr').id;
      setArticleToDelete(rowId);
      setShowArticleDialog(true);
    };

    const handleDocDeleteClick = (event) => {
      const rowId = event.target.closest('tr').id;
      setDocToDelete(rowId);
      setShowDocDialog(true);
    };

    // Gérer la séléction dans un searchable drop down    
    const handleRegimeSelection = (searchTerm) => {
            setRegime(searchTerm);
            setRegime1(searchTerm.label);
            setRegimePk(searchTerm.value);
            const regime2 = listeRegimes.filter((regime) => regime.code.includes(searchTerm.value))[0];
            setRegime2(regime2?regime2.designation:'');
    }

    const handleRegimePrecSelection = (searchTerm) => {
      setRegimePrec(searchTerm);
      setRegimePrec1(searchTerm.label);
      setRegimePrecPk(searchTerm.value);
      const regime2 = listeRegimes.filter((regime) => regime.code.includes(searchTerm.value))[0];
      setRegimePrec2(regime2?regime2.designation:'');
    }

    const handleRegimePrecDSTRSelection = (searchTerm) => {
      setRegimePrecDSTR(searchTerm);
      setRegimePrec1DSTR(searchTerm.label);
      setRegimePrecPkDSTR(searchTerm.value);
      const regime2 = listeRegimes.filter((regime) => regime.code.includes(searchTerm.value))[0];
      setRegimePrec2DSTR(regime2?regime2.designation:'');
    }

    const handlePaysAVSelection = (searchTerm) => {
            setPaysAV(searchTerm);
            setPaysAchatVente1(searchTerm.label);
            setPaysAVPk(searchTerm.value);
            const pays2 = listePays.filter((pays) => pays.code.toString().includes(searchTerm.label.toString()))[0];
            setPaysAchatVente2(pays2.nom);
    }

    const handlePaysAVDSTRSelection = (searchTerm) => {
      setPaysAVDSTR(searchTerm);
      setPaysAchatVente1DSTR(searchTerm.label);
      setPaysAVPkDSTR(searchTerm.value);
      const pays2 = listePays.filter((pays) => pays.code.toString().includes(searchTerm.label.toString()))[0];
      setPaysAchatVente2DSTR(pays2.nom);
    }

    const handlePaysPSelection = (searchTerm) => {
            setPaysP(searchTerm);
            setPaysProvenance1(searchTerm.label);
            setPaysProvPk(searchTerm.value);
            const pays2 = listePays.filter((pays) => pays.code.toString().includes(searchTerm.label.toString()))[0];
            setPaysProvenance2(pays2.nom);
    }

    const handlePaysPDSTRSelection = (searchTerm) => {
      setPaysPDSTR(searchTerm);
      setPaysProvenance1DSTR(searchTerm.label);
      setPaysProvPkDSTR(searchTerm.value);
      const pays2 = listePays.filter((pays) => pays.code.toString().includes(searchTerm.label.toString()))[0];
      setPaysProvenance2DSTR(pays2.nom);
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
    }

    const handleBureauDSTRSelection = (searchTerm) => {
      setBureauDSTR(searchTerm);
      setBureauDouane1DSTR(searchTerm.label);
      setBureauPkDSTR(searchTerm.value);
      const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
      setBureauDouane2DSTR(bureau.nomBureau);
    }

    const handleBureauPrecSelection = (searchTerm) => {
      setBureauPrec(searchTerm);
      setBureauPrec1(searchTerm.label);
      setBureauPrecPk(searchTerm.value);
      const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
      setBureauPrec2(bureau.nomBureau);
    } 

    const handleBureauPrecDSTRSelection = (searchTerm) => {
      setBureauPrecDSTR(searchTerm);
      setBureauPrec1DSTR(searchTerm.label);
      setBureauPrecPkDSTR(searchTerm.value);
      const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
      setBureauPrec2DSTR(bureau.nomBureau);
    }
          
    const handleBureauDepSelection = (searchTerm) => {
        setBureauDep(searchTerm);
        setBureauDep1(searchTerm.label);
        setBureauDepPk(searchTerm.value);
        const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
        setBureauDep2(bureau.nomBureau);
    }

    const handleBureauDepDSTRSelection = (searchTerm) => {
      setBureauDep1DSTR(searchTerm);
      setBureauDep1DSTR(searchTerm.label);
      setBureauDepPkDSTR(searchTerm.value);
      const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
      setBureauDep2DSTR(bureau.nomBureau);
    }

    const handleBureauDestSelection = (searchTerm) => {
          setBureauDest(searchTerm);
          setBureauDest1(searchTerm.label);
          setBureauDestPk(searchTerm.value);
          const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
          setBureauDest2(bureau.nomBureau);
    }

    const handleBureauDestDSTRSelection = (searchTerm) => {
      setBureauDestDSTR(searchTerm);
      setBureauDest1DSTR(searchTerm.label);
      setBureauDestPkDSTR(searchTerm.value);
      const bureau = listeBureaux.filter((bureau) => bureau.bureauDouane_pk.toString().includes(searchTerm.value.toString()))[0];
      setBureauDest2DSTR(bureau.nomBureau);
    }
    // Controle d'envoie du dossier et déclaration 
    const handleAjouterDeclaration = (async () => {

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
            
            const declarationCreated =  axios.post(`${apiUrl}/api/dossiers/${id}/declaration/`, declaration, {
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
          );
      
    const handleAjouterArticle = () => {
      console.log('added');
    }

    const handleAjouterDoc= () => {
      console.log('added');
    }

    // Formattages des listes d'Information de déclaration sous format ['value', 'label]
    const listeRegimesDouanier = listeRegimes.map(({regimeDouanier_pk, code}) => ({ ['value'] : regimeDouanier_pk, ['label']:code}))
    const listeCodePays = listePays.map(({pays_pk, code}) => ({ ['value'] : pays_pk, ['label']:code}));
    const listeBureauxDouane = listeBureaux.map(({bureauDouane_pk, code})=> ({ ['value'] : bureauDouane_pk, ['label']:code}));

    // Les options séléctionnées dans les listes d'Information de déclaration 
    const [regime, setRegime] = useState({value:regimePk, label:régime1});
    const [regimePrec, setRegimePrec] = useState({value:regimePrecPk, label:régimePrec1});
    const [regimePrecDSTR, setRegimePrecDSTR] = useState({value:regimePrecPkDSTR, label:régimePrec1DSTR});
    const [paysAV, setPaysAV] = useState({value:paysAVPk, label:paysAchatVente1});
    const [paysAVDSTR, setPaysAVDSTR] = useState({value:paysAVPkDSTR, label:paysAchatVente1DSTR});
    const [paysP, setPaysP] = useState({value:paysProvPk, label:paysProvenance1});
    const [paysPDSTR, setPaysPDSTR] = useState({value:paysProvPkDSTR, label:paysProvenance1DSTR});
    const [bureau, setBureau] = useState({value:bureauPk, label:bureauDouane1});
    const [bureauDSTR, setBureauDSTR] = useState({value:bureauPkDSTR, label:bureauDouane1DSTR});
    const [bureauPrec, setBureauPrec] = useState({value:bureauPrecPk, label:bureauPrec1});
    const [bureauPrecDSTR, setBureauPrecDSTR] = useState({value:bureauPrecPkDSTR, label:bureauPrec1DSTR});
    const [bureauDep, setBureauDep] = useState({value:bureauDepPk, label:bureauDep1});
    const [bureauDepDSTR, setBureauDepDSTR] = useState({value:bureauDepPkDSTR, label:bureauDep1DSTR});
    const [bureauDest, setBureauDest] = useState({value:bureauDestPk, label:bureauDest1});
    const [bureauDestDSTR, setBureauDestDSTR] = useState({value:bureauDestPkDSTR, label:bureauDest1DSTR});

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

    // Actions sur tableau
    const articleTableActions = [
      <IconDelete key="delete" onClick={handleArticleDeleteClick} />
    ];

    const docTableActions = [
      <IconDelete key="delete" onClick={handleDocDeleteClick} />
    ];
  return (
    <>
        <AdvancedBreadcrumb numDossier={numDossier} hideDocs={true} showError={showError} showSuccess={showSuccess}
                            onClick={handleAjouterDeclaration} onErrorClose={handleErrorClose} onSuccessClose={handleSuccessClose} errorMessages={errorMessages}/>
        <div>
            <div className={styles.navbar}>
                <ul>
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Partie Fixe</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Taxation</li>
                    <li onClick={handleTab3} className={activeTab === "tab3" ? styles.activeNavbarLi: styles.NavbarLi}>Partie Variable</li>
                    <li onClick={handleTab4} className={activeTab === "tab4" ? styles.activeNavbarLi: styles.NavbarLi}>DSTR</li>
                    <li onClick={handleTab5} className={activeTab === "tab5" ? styles.activeNavbarLi: styles.NavbarLi}>Documents Joints</li>
                </ul>
            </div>
            <div className={styles.mainContent}>
            {!(isLoadedDeclaration && isLoadedDossier) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : (
              <>
            {activeTab === "tab1" ? 
                <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                        <div className={styles.many_fields}>    
                            <InputField display="labelonleft" label="N° Rép *" size="small" type="text" value={numRep} onChange={(e) => setNumRep(e.target.value)} />
                            <InputField display="labelonleft" label="Agrément" size="verysmall" type="text" value={agrement1} onChange={(e) => setAgrement1(e.target.value)} />
                            <InputField display="labelonleft" label="/" size="belowbelowaverage" type="text" value={agrement2} onChange={(e) => setAgrement2(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Régime *</label>
                            <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeRegimesDouanier} value={regime} placeholder="Sélectionner un régime" onChange={(e) => handleRegimeSelection(e)} isSearchable={true}/>
                            <InputField readOnly={true} size="averagelarge" type="text" value={régime2} onChange={(e) => setRegime2(e.target.value)} />
                            <div className={styles.many_fields}>    
                              <label className={labelStyles.labelonleft}>Bureau douane</label>
                              <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureau} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauSelection(e)} isSearchable={true}/>
                              <InputField readOnly={true} size="overaverage" type="text" value={bureauDouane2} onChange={(e) => setBureauDouane2(e.target.value)} />
                              <label className={labelStyles.labelonleft}>Mode paiement</label>   
                              <select className={labelStyles.average} value={modePaiement} onChange={(e) => setModePaiement(e.target.value)}>
                                <option value="">Selectionner</option>
                                  {listeModesPaiement.map((statut, index) => (
                                      <option key={index} value={statut}>
                                      {statut}
                                      </option>
                                  ))}
                              </select> 
                              <InputField display="labelonleft" label="Num crédit"  readOnly={true} size="small" type="text" value={numCredit} onChange={(e) => setNumCredit(e.target.value)} />
                              <label className={labelStyles.labelonleft}>Pays achat/vente</label>
                              <Select className={labelStyles.small} styles={colorStyles} options={listeCodePays} value={paysAV} placeholder="Sélectionner un pays" onChange={(e) => handlePaysAVSelection(e)} isSearchable={true}/>
                              <InputField  readOnly={true} size="large" type="text" value={paysAchatVente2} onChange={(e) => setPaysAchatVente2(e.target.value)} />
                          
                            </div>
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    

                            <label className={labelStyles.labelonleft}>Mode livraison</label>   
                            <select className={labelStyles.small}  value={modeLivraison1} onChange={(e) => handleModeLivraisonSelection(e.target.value)}>
                                <option value="">Selectionner</option>
                                {listeModesLivraisons.map((mode) => (
                                    <option key={mode.code} value={mode.code}>
                                    {mode.code}
                                    </option>
                                ))}
                            </select> 
                            <InputField readOnly={true} size="overaverage" type="text" value={modeLivraison2} onChange={(e) => setModeLivraison2(e.target.value)} />
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
                            <InputField display="labelonleft" label="Nature transaction" size="verylarge" type="text" value={natureTransaction} onChange={(e) => setNatureTransaction(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                            <label className={labelStyles.labelonleft}>Pays provenance</label>
                            <Select className={labelStyles.small} styles={colorStyles} options={listeCodePays} value={paysP} placeholder="Sélectionner un pays" onChange={(e) => handlePaysPSelection(e)} isSearchable={true}/>
                            <InputField readOnly={true} size="large" type="text" value={paysProvenance2} onChange={(e) => setPaysProvenance2(e.target.value)} />
                            <InputField display="labelonleft" label="Relation Acheteur/Vendeur" size="large" type="text" value={relationAV} onChange={(e) => setRelationAV(e.target.value)} />
                            <label className={labelStyles.labelonleft}>Type transport intérieur</label> 
                            <select className={labelStyles.average}  value={modeTransport} onChange={(e) => setModeTransport(e.target.value)}>
                            <option value="">Selectionner</option>
                            {listeTypesTransport.map((statut, index) => (
                                <option key={index} value={statut}>
                                {statut}
                                </option>
                            ))}
                        </select>   
                        <InputField display="labelonleft" label="Nature décaration" size="veryaverage" type="text" value={natureDeclaration} onChange={(e) => setNatureDeclaration(e.target.value)} />
                        <InputField display="labelonleft" label="Type dédouanement" size="overaverage" type="text" value={typeDedouanement} onChange={(e) => setTypeDedouanement(e.target.value)} />
                        <InputField display="labelonleft" label="Domiciliation bancaire" size="average" type="text" value={domiciliation1} onChange={(e) => setDomiciliation1(e.target.value)} />
                        <InputField size="average" type="text" value={domiciliation2} onChange={(e) => setDomiciliation2(e.target.value)} />
                        <InputField size="large" type="text" value={domiciliation3} onChange={(e) => setDomiciliation3(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>   
                          <InputField display="labelonleft" label="Type manifeste" size="small" type="text" value={manifeste} onChange={(e) => setManifeste(e.target.value)} />
                            <InputField display="labelonleft" label="Gros" size="verysmall" type="text" value={gros1} onChange={(e) => setGros1(e.target.value)} />
                            <InputField size="small" type="text" value={gros2} onChange={(e) => setGros2(e.target.value)} />
                            <InputField display="labelonleft" label="Article" size="small" type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
                            <InputField display="labelonleft" label="S/G" size="small" type="text" value={sg} onChange={(e) => setSG(e.target.value)} />
                            <InputField display="labelonleft" label="Nbr colis" size="small" type="text" value={nbrColis} onChange={(e) => setNbrColis(e.target.value)} />
                            <InputField display="labelonleft" label="Poids brut" size="belowaverage" type="text" value={poidsBrutDecl} onChange={(e) => setPoidsBrutDecl(e.target.value)} />
                            <InputField display="labelonleft" label="Poids net" size="belowaverage" type="text" value={poidsNetDecl} onChange={(e) => setPoidsNetDecl(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={stylesLoader.infoTitle}>Déclaration précédente</div>
                        <div className={styles.many_fields}> 
                          <label className={labelStyles.labelonleft}>Bureau</label>
                          <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauPrec} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauPrecSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="overaverage" type="text" value={bureauPrec2} onChange={(e) => setBureauPrec2(e.target.value)} />
                          <InputField display="labelonleft" label="Décaration" size="overaverage" type="text" value={declarationPrec1} onChange={(e) => setDeclarationPrec1(e.target.value)} />
                          <InputField size="overaverage" type="text" value={declarationPrec2} onChange={(e) => setDeclarationPrec2(e.target.value)} />
                          <label className={labelStyles.labelonleft}>Régime</label>
                          <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeRegimesDouanier} value={regimePrec} placeholder="Sélectionner un régime" onChange={(e) => handleRegimePrecSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="averagelarge" type="text" value={régimePrec2} onChange={(e) => setRegimePrec2(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={stylesLoader.infoTitle}>Cas de Transit</div>
                        <div className={styles.many_fields}> 
                          <label className={labelStyles.labelonleft}>Bureau départ</label>
                          <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauDep} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauDepSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="overaverage" type="text" value={bureauDep2} onChange={(e) => setBureauDep2(e.target.value)} />
                          <label className={labelStyles.labelonleft}>Bureau destination</label>
                          <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauDest} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauDestSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="overaverage" type="text" value={bureauDest2} onChange={(e) => setBureauDest2(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={stylesLoader.infoTitle}>Régime économique</div>
                        <div className={styles.many_fields}> 
                          <InputField display="labelonleft" label="Numéro" size="belowaverage" type="text" value={numRégimeEco} onChange={(e) => setNumRegimeEco(e.target.value)} />
                          <InputField display="labelonleft" label="Lieu" size="overaverage" type="text" value={lieuRégimeEco} onChange={(e) => setLieuRegimeEco(e.target.value)} />
                          <InputField display="labelonleft" label="Taux suspension" size="belowaverage" type="text" value={tauxSuspension} onChange={(e) => setTauxSuspension(e.target.value)} />
                          <InputField display="labelonleft" label="Durée" size="belowaverage" type="text" value={durée} onChange={(e) => setDurée(e.target.value)} />
                          <InputField display="labelonleft" label="Montant caution" size="average" type="text" value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={stylesLine.footerSpace}></div>
                    </div>  
                    
            </>
            :
            activeTab === "tab2" ?
            <>
            <div className={styles.grid_area}>
              <div className={styles.many_fields}> 
                <label className={labelStyles.labelonleftGrid}>PTFN</label>
                <InputField display="labelontop" label="Montant" size="average" type="text" value={PTFNMontant} onChange={(e) => setPTFNMontant(e.target.value)} />
                <InputField display="labelontop" label="Monnaie" size="average" type="text" value={PTFNMonnaie} onChange={(e) => setPTFNMonnaie(e.target.value)} />
                <InputField display="labelontop" label="Cours" size="overaverage" type="text" value={PTFNCours} onChange={(e) => setPTFNCours(e.target.value)} />
                <InputField display="labelontop" label="Valeurs en dinar (DZD)" size="overaverage" type="text" value={PTFNValeur} onChange={(e) => setPTFNValeur(e.target.value)} />
              </div>
              <div className={styles.many_fields}> 
              <label className={labelStyles.labelonleft}>Autres frais</label>
                <InputField size="average" type="text" value={autreFraisMontant} onChange={(e) => setAutreFraisMontant(e.target.value)} />
                <InputField size="average" type="text" value={autreFraisMonnaie} onChange={(e) => setAutreFraisMonnaie(e.target.value)} />
                <InputField size="overaverage" type="text" value={autreFraisCours} onChange={(e) => setAutreFraisCours(e.target.value)} />
                <InputField size="overaverage" type="text" value={autreFraisValeur} onChange={(e) => setAutreFraisValeur(e.target.value)} />
              </div>
              <div className={styles.many_fields}> 
              <label className={labelStyles.labelonleft}>Fret</label>
                <InputField size="average" type="text" value={fretMontant} onChange={(e) => setFretMontant(e.target.value)} />
                <InputField size="average" type="text" value={fretMonnaie} onChange={(e) => setFretMonnaie(e.target.value)} />
                <InputField size="overaverage" type="text" value={fretCours} onChange={(e) => setFretCours(e.target.value)} />
                <InputField size="overaverage" type="text" value={fretValeur} onChange={(e) => setFretValeur(e.target.value)} />
              </div>
              <div className={styles.many_fields}> 
              <label className={labelStyles.labelonleft}>Assurance</label>
                <InputField size="average" type="text" value={assuranceMontant} onChange={(e) => setAssuranceMontant(e.target.value)} />
                <InputField size="average" type="text" value={assuranceMonnaie} onChange={(e) => setAssuranceMonnaie(e.target.value)} />
                <InputField size="overaverage" type="text" value={assuranceCours} onChange={(e) => setAssuranceCours(e.target.value)} />
                <InputField size="overaverage" type="text" value={assuranceValeur} onChange={(e) => setAssuranceValeur(e.target.value)} />
              </div>
              <div className={styles.many_fields}> 
              <label className={labelStyles.labelonleft}>Plus value</label>
                <InputField size="average" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="average" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="overaverage" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="overaverage" type="text" value={plusValueValeur} onChange={(e) => setPlusValueValeur(e.target.value)} />
              </div>
              <div className={styles.many_fields}> 
              <label className={labelStyles.labelonleft}>Coef ajust ou (Remise%)</label>
                <InputField size="average" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="overaverage" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="small" type="text" value={coefCours} onChange={(e) => setCoefCours(e.target.value)} />
                <InputField size="overaverage" type="text" value={CoefValeur} onChange={(e) => setCoefValeur(e.target.value)} />
              </div>
              <div className={styles.many_fields}> 
              <label className={labelStyles.labelonleft}>Valeur en douanes</label>
                <InputField size="overaverage" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="belowaverage" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="average" type="text" disabled={true} value={montantCaution} onChange={(e) => setMontantCaution(e.target.value)} />
                <InputField size="overaverage" type="text" value={enDouanesValeur} onChange={(e) => setEnDouanesValeur(e.target.value)} />
              </div>

              </div>
              <div className={stylesLine.footerSpace}></div> 

            </> 
            :
            activeTab === "tab3" ? 
            <>
              <h1 className={stylesLine.pageTitle}>Liste d'articles</h1>
              <div className={styles.line}></div>
              <span className={stylesLoader.filter_span}>
              <TableFilter columns={[
                              {key: 'num', label: 'N°',  inputType : 'text'},
                              {key: 'positionTarifaire', label: 'Position tarifaire',  inputType : 'text'},
                              {key: 'designation', label: 'Designation',  inputType : 'text'},
                              {key: 'uf', label: 'UF',  inputType : 'text'},
                              {key: 'qFac', label: 'Q Fac',  inputType : 'text'},
                              {key: 'ptfn', label: 'PTFN',  inputType : 'text'},
                              {key: 'poidsNet', label: 'Poids Net',  inputType : 'text'},
                              {key: 'origine', label: 'Origine',  inputType : 'text'},
                              {key: 'qCompte', label: 'Q Compte',  inputType : 'text'},
              ]} onFilterChange={handleFilterChangeWrapper} />
              <span className={stylesLoader.buttons_span}>
                <button className={`${buttonStyles.secondary}`}  onClick={() => reloadPage()} children='Calculer'/>  
                <button className={`${buttonStyles.secondary}`}  onClick={() => reloadPage()} children='Liste des abreviations'/>  
              </span>
              </span>
              <ReusableTable data={articles} headers={headers} itemsPerPage={5} addlink={false} addactions={true} actionIcons={articleTableActions} />
                <span className={styles.total_fields}>
                  <InputField readOnly={true} display="labelontop" label="PTFN déclaré" size="belowaverage" type="text" value={PTFNDecl} onChange={(e) => setPTFNDecl(e.target.value)} />
                  <InputField display="labelontop" label="PTFN total" size="belowaverage" type="text" value={PTFNTotal} onChange={(e) => setPTFNTotal(e.target.value)} />
                  <InputField readOnly={true} display="labelontop" label="Ecart" size="belowaverage" type="text" value={ecartPTFN} onChange={(e) => setEcartPTFN(e.target.value)} />
                </span>
                <span className={styles.total_fields}>
                  <InputField readOnly={true} display="labelontop" label="Poids net déclaré" size="belowaverage" type="text" value={poidsNetDecl} onChange={(e) => setPoidsNetDecl(e.target.value)} />
                  <InputField display="labelontop" label="Poids net total" size="belowaverage" type="text" value={poidsNetTotal} onChange={(e) => setPoidsNetTotal(e.target.value)} />
                  <InputField readOnly={true} display="labelontop" label="Ecart" size="belowaverage" type="text" value={ecartPoids} onChange={(e) => setEcartPoids(e.target.value)} />
                </span>
              {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
              {showArticleDialog && <CustomMessage onClose={handleArticleDialogClose} onConfirm={handleArticleDeleteClick} message={"Souhaitez-vous vraiment supprimer cet article?"} />}
              {showSuccess && <SuccessMessage onClose={handleArticleSuccessDeleteClose} />}

              <span className={styles.addButton}>
              <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauArticleClick}/> 
              {showArticleForm && <TabArticles onClose={handleArticleFormClose} 
                                                              onAjouter={handleAjouterArticle}/>
              }
              </span>
              <div className={stylesLine.footerSpace}></div> 
            </>
              : 
              activeTab === "tab4"  ?  
              <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                    <div className={styles.many_fields}>    
                      <label className={labelStyles.labelonleft}>Bureau douane</label>
                      <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauDSTR} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauDSTRSelection(e)} isSearchable={true}/>
                      <InputField readOnly={true} size="overaverage" type="text" value={bureauDouane2DSTR} onChange={(e) => setBureauDouane2DSTR(e.target.value)} />
                      <label className={styles.date_field}>
                            <label className={labelStyles.labelonleft}>Date effet
                            <DatePicker className={labelStyles.overaverage} selected={dateEffet} onChange={(e) => setDateEffet(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                            </label>
                      </label>
                      <InputField display="labelonleft" label="Lieu entreposage" size="extralarge" type="text" value={poidsNetTotal} onChange={(e) => setPoidsNetTotal(e.target.value)} />
                      <label className={labelStyles.labelonleft}>Pays achat/vente</label>
                      <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeCodePays} value={paysAVDSTR} placeholder="Sélectionner un pays" onChange={(e) => handlePaysAVDSTRSelection(e)} isSearchable={true}/>
                      <InputField  readOnly={true} size="large" type="text" value={paysAchatVente2DSTR} onChange={(e) => setPaysAchatVente2DSTR(e.target.value)} />
                      <label className={labelStyles.labelonleft}>Pays provenance</label>
                      <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeCodePays} value={paysPDSTR} placeholder="Sélectionner un pays" onChange={(e) => handlePaysPDSTRSelection(e)} isSearchable={true}/>
                      <InputField readOnly={true} size="large" type="text" value={paysProvenance2DSTR} onChange={(e) => setPaysProvenance2DSTR(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>   
                            <InputField display="labelonleft" label="Année Gros" size="small" type="text" value={gros1DSTR} onChange={(e) => setGros1DSTR(e.target.value)} />
                            <InputField display="labelonleft" label="N° gros" size="small" type="text" value={gros2DSTR} onChange={(e) => setGros2DSTR(e.target.value)} />
                            <InputField display="labelonleft" label="N° article" size="small" type="text" value={articleDSTR} onChange={(e) => setArticleDSTR(e.target.value)} />
                            <InputField display="labelonleft" label="n° S/G" size="small" type="text" value={sgDSTR} onChange={(e) => setSGDSTR(e.target.value)} />
                            <InputField display="labelonleft" label="Nbr colis" size="small" type="text" value={nbrColisDSTR} onChange={(e) => setNbrColisDSTR(e.target.value)} />
                            <InputField display="labelonleft" label="Poids brut déclaré" size="belowaverage" type="text" value={poidsBrutDeclDSTR} onChange={(e) => setPoidsBrutDeclDSTR(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={stylesLoader.infoTitle}>Cas de Transit</div>
                        <div className={styles.many_fields}> 
                          <label className={labelStyles.labelonleft}>Bureau départ</label>
                          <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauDepDSTR} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauDepDSTRSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="overaverage" type="text" value={bureauDep2DSTR} onChange={(e) => setBureauDep2DSTR(e.target.value)} />
                          <label className={labelStyles.labelonleft}>Bureau destination</label>
                          <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauDestDSTR} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauDestDSTRSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="overaverage" type="text" value={bureauDest2DSTR} onChange={(e) => setBureauDest2DSTR(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={stylesLoader.infoTitle}>Déclaration précédente</div>
                        <div className={styles.many_fields}> 
                          <label className={labelStyles.labelonleft}>Bureau</label>
                          <Select className={labelStyles.belowaverage} styles={colorStyles} options={listeBureauxDouane} value={bureauPrecDSTR} placeholder="Sélectionner un bureau" onChange={(e) => handleBureauPrecDSTRSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="overaverage" type="text" value={bureauPrec2DSTR} onChange={(e) => setBureauPrec2DSTR(e.target.value)} />
                          <InputField display="labelonleft" label="Décaration" size="overaverage" type="text" value={declarationPrec1DSTR} onChange={(e) => setDeclarationPrec1DSTR(e.target.value)} />
                          <InputField size="overaverage" type="text" value={declarationPrec2DSTR} onChange={(e) => setDeclarationPrec2DSTR(e.target.value)} />
                          <label className={labelStyles.labelonleft}>Régime</label>
                          <Select className={labelStyles.belowbelowaverage} styles={colorStyles} options={listeRegimesDouanier} value={regimePrecDSTR} placeholder="Sélectionner un régime" onChange={(e) => handleRegimePrecDSTRSelection(e)} isSearchable={true}/>
                          <InputField readOnly={true} size="averagelarge" type="text" value={régimePrec2DSTR} onChange={(e) => setRegimePrec2DSTR(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                    <div className={stylesLine.footerSpace}></div>
                </div>
            </> 
            : 
            <>
              <h1 className={stylesLine.pageTitle}>Liste de documents joints</h1>
              <div className={styles.line}></div>
              <span className={stylesLoader.filter_span}>
              <TableFilter columns={[
                              {key: 'code', label: 'Code',  inputType : 'text'},
                              {key: 'designation', label: 'Designation',  inputType : 'text'},
              ]} onFilterChange={handleDocumentFilterChangeWrapper} />
              </span>
              <ReusableTable data={documents} headers={headersDocs} itemsPerPage={5} addlink={false} addactions={true} actionIcons={docTableActions} />
              {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
              {showDocDialog && <CustomMessage onClose={handleDocDialogClose} onConfirm={handleDocDeleteClick} message={"Souhaitez-vous vraiment supprimer ce document?"} />}
              {showSuccess && <SuccessMessage onClose={handleDocSuccessDeleteClose} />}

              <span className={styles.addButton}>
              <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauDocClick}/> 
              {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
              {showDocForm && <TabDocJoint onClose={handleDocFormClose} 
                                                              onAjouter={handleAjouterDoc}/>
              }
              </span>
              <div className={stylesLine.footerSpace}></div> 
            </>
                }
              </>)}
            </div>
        </div>

    </>
  )
}

export default AjouterDeclaration