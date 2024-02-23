import React from 'react'
import styles from './popupForm.module.css'
import stylesLine from './listeFacture.module.css';
import stylesLoader from './gestionClients.module.css'
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import InputField from '../components/InputField';
import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {formatDateFromAPI} from '../Utils/dateUtils';
import {handleFilterChange} from '../Utils/actionUtils';
import TableFilter from '../components/tableFilter';



function ViewDossier() {

    const { id } = useParams();
    const [dossierData, setDossierData] = useState({});
    const [declarationData, setDeclarationData] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

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
            setNumDossier(numDossier);
            setNomClient(client.raisonSociale);
            setIsLoadedDossier(true);
            setEtatDossier(etatDossier);
            setNatureDossier(natureDossier);
            const dateHR2 = dateHeureReception.split(" ");
            setDateHR(dateHR2);
            setDateHeureReception1(dateHR2[0]);
            setDateHeureReception2(dateHR2[1]);
            setNomFournisseur(fournisseur.raisonSociale);
            setNumFactFournisseur(numFactureFournisseur);
            setDateFactFournisseur(dateFactureFournisseur? formatDateFromAPI(dateFactureFournisseur): '');
            setMontantFactFournisseur(montantFactureFournisseur);
            setMonnaie(monnaie.code);
            setMoyenTransport(moyenTransport.nom);
            setCompagnieTransport(compagnieTransport.nom);
            setNumTitreTransport(numTitreTransport);
            setNbrEmb(nbrTC);
            setNatureMarchandise(natureMarchandise.designation);
            setModeTransport(typeTransportExterieur);
            setLieuEntreposage(lieuEntreposage.nom);
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
            setLieuLivraison(lieuLivraison.nomLieu);
            setParcAVide(parcAVide.nom);
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
                nbrColis,poidsBrut,poidsNet,modeLivraison,modeFinancement,typeOperation,
                paysAchatVente,paysProvenance,
                bureauEnregistrement} = declarationResponse;
            setNbrColis(nbrColis);
            setNumRep(numRepertoire);
            setRegime1(regime.code);
            setRegime2(regime.designation);
            setIsLoadedDeclaration(true);
            setModePaiement(modePaiement);
            setGros1(anneeGros);
            setGros2(numGros);
            setArticle(numArticle);
            setSG(sg);
            setPoidsBrutDecl(poidsBrut);
            setPoidsNetDecl(poidsNet);
            setModeLivraison1(modeLivraison.code);
            setModeLivraison2(modeLivraison.designation);
            setModeFinancement(modeFinancement);
            setTypeOp(typeOperation);
            setPaysAchatVente1(paysAchatVente.code);
            setPaysAchatVente2(paysAchatVente.nom);
            setPaysProvenance1(paysProvenance.code);
            setPaysProvenance2(paysProvenance.nom);
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


    // Champs de la partie Informations de déclaration
    const [numRep, setNumRep] = useState(declarationData.numRepertoire || '');
    const [régime1, setRegime1] = useState([declarationData.regime].code || '');
    const [régime2, setRegime2] = useState([declarationData.regime].designation || '');
    const [modePaiement, setModePaiement] = useState(declarationData.modePaiement || '');
    const [gros1, setGros1] = useState(declarationData.anneeGros);
    const [gros2, setGros2] = useState(declarationData.numGros || '');
    const [article, setArticle] = useState(declarationData.numArticle || '');
    const [sg, setSG] = useState(declarationData.sg || '');
    const [poidsBrutDecl, setPoidsBrutDecl] = useState(declarationData.poidsBrut || '');
    const [poidsNetDecl, setPoidsNetDecl] = useState(declarationData.poidsNet || '');
    const [modeLivraison1, setModeLivraison1] = useState([declarationData.modeLivraison].code || '');
    const [modeLivraison2, setModeLivraison2] = useState([declarationData.modeLivraison].designation || '');
    const [modeFinancement, setModeFinancement] = useState(declarationData.modeFinancement);
    const [typeOp, setTypeOp] = useState(declarationData.typeOperation);
    const [paysAchatVente1, setPaysAchatVente1] = useState([declarationData.paysAchatVente].code || '');
    const [paysAchatVente2, setPaysAchatVente2] = useState([declarationData.paysAchatVente].nom || '');
    const [paysProvenance1, setPaysProvenance1] = useState([declarationData.paysProvenance].code || '');
    const [paysProvenance2, setPaysProvenance2] = useState([declarationData.paysProvenance].nom || '');
    const [bureauDouane1, setBureauDouane1] = useState([declarationData.bureauEnregistrement].code || '');
    const [bureauDouane2, setBureauDouane2] = useState([declarationData.bureauEnregistrement].nomBureau || '');
    const [receveurDouane, setReceveurDouane] = useState([declarationData.bureauEnregistrement].receveurDouane || '');
    const [montantDroitTaxe, setMontantDroitTaxe] = useState('');


    // Champs de la partie Informations Générales
    const [numDossier, setNumDossier] = useState(dossierData.numDossier || '');
    const [nomClient, setNomClient] = useState([dossierData.client].raisonSociale || '');
    const [natureDossier, setNatureDossier] = useState(dossierData.natureDossier || '');
    const [etatDossier, setEtatDossier] = useState(dossierData.etatDossier || '');
    const [dateHeureReception1, setDateHeureReception1] = useState(dateHR[0] || '');
    const [dateHeureReception2, setDateHeureReception2] = useState(dateHR[1] || '');
    const [nomFournisseur, setNomFournisseur] = useState([dossierData.fournisseur].raisonSociale || '');
    const [numFactFournisseur, setNumFactFournisseur] = useState(dossierData.numFactureFournisseur|| '');
    const [dateFactFournisseur, setDateFactFournisseur] = useState(dossierData.dateFactureFournisseur || '');
    const [montantFactFournisseur, setMontantFactFournisseur] = useState(dossierData.montantFactureFournisseur || '');
    const [monnaie, setMonnaie] = useState([dossierData.monnaie].code || '');
    const [moyenTransport, setMoyenTransport] = useState([dossierData.moyenTransport].nom || '');
    const [modeTransport, setModeTransport] = useState(dossierData.typeTransportExterieur || '');
    const [compagnieTransport, setCompagnieTransport] = useState([dossierData.compagnieTransport].nom || '');
    const [numTitreTransport, setNumTitreTransport] = useState(dossierData.numTitreTransport || '');
    const [natureMarchandise, setNatureMarchandise] = useState([dossierData.natureMarchandise].designation || '');
    const [nbrEmb, setNbrEmb] = useState(dossierData.nbrTC || '');
    const [nbrColis, setNbrColis] = useState(declarationData.nbrColis); 
    const [lieuEntreposage, setLieuEntreposage] = useState([dossierData.lieuEntreposage].nom || '');
    const [dateArrivée, setDateArrivée] = useState(dossierData.dateArrivee || '');
    const [dateMainLevée, setDateMainLevée] = useState(dossierData.dateMainLevee || '');
    const [dateEchange, setDateEchange] = useState(dossierData.dateEchange || '');
    const [dateDeclaration, setDateDeclaration] = useState(dossierData.dateDeclaration || '');
    const [dateVisiteDouane, setDateVisiteDouane] = useState(dossierData.dateVisiteDouane || '');
    const [dateLiquidation, setDateLiquidation] = useState(dossierData.dateLiquidation || '');
    const [dateRecevCheque, setDateRecevCheque] = useState(dossierData.dateRecevabiliteCheque || '');
    const [dateAcquittement, setDateAcquittement] = useState(dossierData.dateAcquitement || '');
    const [dateRetraitBonEnlever, setDateRetraitBonEnlever] = useState(dossierData.dateRetraitBonEnlever || '');
    const [dateLivraison, setDateLivraison] = useState(dossierData.dateLivraison || '');
    const [lieuLivraison, setLieuLivraison] = useState([dossierData.lieuLivraison].nom || '');
    const [parcAVide, setParcAVide] = useState([dossierData.parcAVide].nom || '');
    const [nomDeclarant, setNomDeclarant] = useState(dossierData.nomDeclarant || '');
    const [numDeclaration, setNumDeclaration] = useState(dossierData.numDeclaration || '');
    const [observation, setObservation] = useState(dossierData.observation || '');

    // Champs de la partie d'emballages
    const [emballages, setEmballages] = useState([]);
    const headersEmballages = ["N°", "N° Emballage", "Genre Emballage", "Pieds", "Type Emballage", "Date Restitution", "N° Bon Restitution", "Actions à faire"]


    // Gérer le switching entre les tabs
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

    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };
      
      const handleErrorClose = () => {
        setShowError(false);
      };

    const handleFilterChangeWrapper = (columnKey, filterValue) => {
      handleFilterChange(columnKey, filterValue,emballages, setFilteredData);
    };

    const handleFormClose = () => {
        setShowForm(false);
      };

    // Partie document
    const handleDocumentClick = () => {
      setShowDocumentForm(true);
    };

    const handleDocumentFormClose = () => {
      setShowDocumentForm(false);
    };

  return (
    <>
        <AdvancedBreadcrumb numDossier={numDossier} dossierPk={id} isViewDoc={true} showForm={showDocumentForm} onDocClick={handleDocumentClick} onCloseDoc={handleDocumentFormClose} hideParams={true} hideButtons={true}/>
        <div>
            <div className={styles.navbar}>
                <ul>
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Informations générales</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Informations sur la déclaration</li>
                    <li onClick={handleTab3} className={activeTab === "tab3" ? styles.activeNavbarLi: styles.NavbarLi}>Emballages</li>
                </ul>
            </div>
            <div className={styles.mainContent}>
            {!(isLoadedDeclaration && isLoadedDossier && isLoadedEmballage) ? ( // Conditional rendering based on the loading state
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
                  <ReusableTable data={filteredData} headers={headersEmballages} itemsPerPage={4} addlink={false}/>
                  <div className={stylesLine.footerSpace}></div>
               </>
                :
                activeTab === "tab2" ? 
                <>
                <div className={styles.fields_area}>
                    <div className={stylesLine.horizontalLine}></div>
                        <div className={styles.many_fields}>    
                            <InputField readOnly={true} display="labelonleft" label="N° répertoire" size="small" type="text" value={numRep} onChange={(e) => setNumRep(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Régime" size="verysmall" type="text" value={régime1} onChange={(e) => setRegime1(e.target.value)} />
                            <InputField readOnly={true} size="extralarge" type="text" value={régime2} onChange={(e) => setRegime2(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>   
                            <InputField readOnly={true} display="labelonleft" label="Gros" size="verysmall" type="text" value={gros1} onChange={(e) => setGros1(e.target.value)} />
                            <InputField readOnly={true} size="small" type="text" value={gros2} onChange={(e) => setGros2(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Article" size="small" type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="S/G" size="verysmall" type="text" value={sg} onChange={(e) => setSG(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Poids brut déclaré" size="small" type="text" value={poidsBrutDecl} onChange={(e) => setPoidsBrutDecl(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Poids net déclaré" size="small" type="text" value={poidsNetDecl} onChange={(e) => setPoidsNetDecl(e.target.value)} />
                       
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                          <InputField readOnly={true} display="labelonleft" label="Mode paiement" size="belowaverage" type="texte" value={modePaiement} onChange={(e) => setModePaiement(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Mode livraison" size="verysmall" type="text" value={modeLivraison1} onChange={(e) => setModeLivraison1(e.target.value)} />
                            <InputField readOnly={true} size="extralarge" type="text" value={modeLivraison2} onChange={(e) => setModeLivraison2(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Mode financement" size="extralarge" type="text" value={modeFinancement} onChange={(e) => setModeFinancement(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Type opération" size="overaverage" type="text" value={typeOp} onChange={(e) => setTypeOp(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                            <InputField readOnly={true} display="labelonleft" label="Pays achat/vente" size="verysmall" type="text" value={paysAchatVente1} onChange={(e) => setPaysAchatVente1(e.target.value)} />
                            <InputField readOnly={true} size="large" type="text" value={paysAchatVente2} onChange={(e) => setPaysAchatVente2(e.target.value)} />
                            <InputField readOnly={true} display="labelonleft" label="Pays provenance" size="verysmall" type="text" value={paysProvenance1} onChange={(e) => setPaysProvenance1(e.target.value)} />
                            <InputField readOnly={true} size="large" type="text" value={paysProvenance2} onChange={(e) => setPaysProvenance2(e.target.value)} />
                        </div>
                        <div className={stylesLine.horizontalLine2}></div>
                        <div className={styles.many_fields}>    
                            <InputField readOnly={true} display="labelonleft" label="Bureau douane" size="verysmall" type="text" value={bureauDouane1} onChange={(e) => setBureauDouane1(e.target.value)} />
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
                        <InputField readOnly={true} display="labelonleft" label="N° dossier" size="small" type="text" value={numDossier} onChange={(e) => setNumDossier(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Nom client" size="overaverage" type="text" value={nomClient} onChange={(e) => setNomClient(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Nature dossier" size="belowaverage" type="text" value={natureDossier} onChange={(e) => setNatureDossier(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Etat dossier" size="belowaverage" type="text" value={etatDossier} onChange={(e) => setEtatDossier(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date et heure réception" size="small" type="texte" value={dateHeureReception1} onChange={(e) => setDateHeureReception1(e.target.value)} />
                        <InputField readOnly={true} size="verysmall" type="texte" value={dateHeureReception2} onChange={(e) => setDateHeureReception2(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Nom fournisseur" size="extralarge" type="texte" value={nomFournisseur} onChange={(e) => setNomFournisseur(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="N° fact. fournisseur" size="average" type="texte" value={numFactFournisseur} onChange={(e) => setNumFactFournisseur(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date fact. fournisseur" size="small" type="texte" value={dateFactFournisseur} onChange={(e) => setDateFactFournisseur(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Montant fact. fournisseur" size="small" type="texte" value={montantFactFournisseur} onChange={(e) => setMontantFactFournisseur(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Monnaie" size="verysmall" type="texte" value={monnaie} onChange={(e) => setMonnaie(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <InputField readOnly={true} display="labelonleft" label="Moyen transport" size="extralarge" type="text" value={moyenTransport} onChange={(e) => setMoyenTransport(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Mode transport" size="small" type="text" value={modeTransport} onChange={(e) => setModeTransport(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Compagnie transport" size="extralarge" type="text" value={compagnieTransport} onChange={(e) => setCompagnieTransport(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="N° ttr transport" size="belowaverage" type="texte" value={numTitreTransport} onChange={(e) => setNumTitreTransport(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <InputField readOnly={true} display="labelonleft" label="Nature marchandise" size="extralarge" type="text" value={natureMarchandise} onChange={(e) => setNatureMarchandise(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Nbr emballage" size="small" type="text" value={nbrEmb} onChange={(e) => setNbrEmb(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Nbr colis" size="small" type="text" value={nbrColis} onChange={(e) => setNbrColis(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Lieu entreposage" size="extralarge" type="texte" value={lieuEntreposage} onChange={(e) => setLieuEntreposage(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <InputField readOnly={true} display="labelonleft" label="Date arrivée" size="small" type="text" value={dateArrivée} onChange={(e) => setDateArrivée(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date main levée" size="small" type="text" value={dateMainLevée} onChange={(e) => setDateMainLevée(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date échange" size="small" type="text" value={dateEchange} onChange={(e) => setDateEchange(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date déclaration" size="small" type="texte" value={dateDeclaration} onChange={(e) => setDateDeclaration(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date visite douane" size="small" type="text" value={dateVisiteDouane} onChange={(e) => setDateVisiteDouane(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date liquidation" size="small" type="text" value={dateLiquidation} onChange={(e) => setDateLiquidation(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date recevabilité chèque" size="small" type="text" value={dateRecevCheque} onChange={(e) => setDateRecevCheque(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date acquittement" size="small" type="text" value={dateAcquittement} onChange={(e) => setDateAcquittement(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <InputField readOnly={true} display="labelonleft" label="Date retrait bon à enlever" size="small" type="text" value={dateRetraitBonEnlever} onChange={(e) => setDateRetraitBonEnlever(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Date livraison" size="small" type="texte" value={dateLivraison} onChange={(e) => setDateLivraison(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Lieu livraison" size="overaverage" type="text" value={lieuLivraison} onChange={(e) => setLieuLivraison(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Parc à vide" size="extralarge" type="text" value={parcAVide} onChange={(e) => setParcAVide(e.target.value)} />
                    </div>
                    <div className={stylesLine.horizontalLine2}></div>
                    <div className={styles.many_fields}> 
                        <InputField readOnly={true} display="labelonleft" label="Nom déclarant" size="overaverage" type="text" value={nomDeclarant} onChange={(e) => setNomDeclarant(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="N° déclaration" size="belowaverage" type="text" value={numDeclaration} onChange={(e) => setNumDeclaration(e.target.value)} />
                        <InputField readOnly={true} display="labelonleft" label="Observation" size="large" type="text" value={observation} onChange={(e) => setObservation(e.target.value)} />
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

export default ViewDossier