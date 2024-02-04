import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


function EditEngagement1030({id, dossier, declaration, onAjouter, onClose}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const [bureauDouanePk, setBureauDouanePk] = useState(declaration.bureauEnregistrement?declaration.bureauEnregistrement.bureauDouane_pk:null);
    const [bureauDouane, setBureauDouane] = useState('');
    const [representant, setRepresentant] = useState('');
    const [raisonSociale, setRaisonSociale] = useState('');
    const [adresse, setAdresse] = useState('');
    const [numNIF, setNumNIF] = useState('');
    const [numRC, setNumRC] = useState('');
    const [numRC2, setNumRC2] = useState('');
    const [numRC3, setNumRC3] = useState('');
    const [numMarchandise, setNumMarchandise] = useState('');
    const [paysOriginePk, setPaysOriginePk] = useState(declaration.paysAchatVente? declaration.paysAchatVente.pays_pk : null);
    const [paysOrigine, setPaysOrigine] = useState('');
    const [numCertificatOrigine, setNumCertificatOrigine] = useState('');
    const [dateCertificatOrigine, setDateCertificatOrigine] = useState('');
    const [numFactureFournisseur, setNumFactureFournisseur] = useState('');
    const [dateFactureFournisseur, setDateFactureFournisseur] = useState('');
    const [numBL, setNumBL] = useState('');
    const [numDeclaration, setNumDeclaration] = useState('');
    const [dateDeclaration, setDateDeclaration] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({bureauDouanePk, representant, raisonSociale, adresse, numNIF, numRC, numRC2, numRC3, numMarchandise, paysOriginePk, 
            numCertificatOrigine, dateCertificatOrigine, numFactureFournisseur, dateFactureFournisseur, numBL, numDeclaration, dateDeclaration, date, lieu});
        // Fermer le Pop Up
        //onClose();
    };


    useEffect(() => {
        axios.get(`/api/dossiers/${dossier.dossier_pk}/engagement-1030/`)

        .then((response) => {
            const docData = response.data;
            setAdresse(docData.adresse);
            setBureauDouane(docData.bureauDouane);
            setDateCertificatOrigine(docData.dateCertificatOrigine);
            setDateDeclaration(docData.dateDeclaration);
            setDateFactureFournisseur(docData.dateFactureFournisseur);
            setNumBL(docData.numBL);
            setNumCertificatOrigine(docData.numCertificatOrigine);
            setNumDeclaration(docData.numDeclaration);
            setNumFactureFournisseur(docData.numFactureFournisseur);
            setNumMarchandise(docData.numMarchandise);
            setNumNIF(docData.numNIF);
            setNumRC(docData.numRC);
            setNumRC2(docData.numRC2);
            setNumRC3(docData.numRC3);
            setPaysOrigine(docData.paysOrigine);
            setRepresentant(docData.representant);
            setRaisonSociale(docData.raisonSociale);
            setLieu(docData.lieu);
            setDate(docData.date);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              setIsLoaded(true);
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, [dossier.dossier_pk]);


  return (
    <div className={styles.tab2}>
        <form onSubmit={handleSubmit}>
            <h2>Formulaire Engagement 1030</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="Représentant du client" size="average" type="text" value={representant} readOnly={true} />
                        <InputField display="labelontop" label="Raison sociale" size="verylarge" type="text" value={raisonSociale} readOnly={true} />
                        <InputField display="labelontop" label="Adresse client" size="overaverage" type="text" value={adresse} readOnly={true} />
                        <InputField display="labelontop" label="N° NIF" size="small" type="text" value={numNIF} readOnly={true} />
                        <InputField display="labelontop" label="N° RC" size="small" type="text" value={numRC} readOnly={true} />
                        <InputField display="labelontop" label="." size="verysmall" type="text" value={numRC2} readOnly={true} />
                        <InputField display="labelontop" label="." size="verysmall" type="text" value={numRC3} readOnly={true} />
                        <InputField display="labelontop" label="N° PT marchandise" size="large" type="text" value={numMarchandise} readOnly={true} />
                        <InputField display="labelontop" label="Pays d'origine" size="overaverage" type="text" value={paysOrigine} readOnly={true} />
                        <InputField display="labelontop" label="N° Certificat d'origine" size="verylarge" type="text" value={numCertificatOrigine} readOnly={true} />
                        <InputField display="labelontop" label="Date Certificat d'origine" size="belowaverage" type="text" value={dateCertificatOrigine} readOnly={true} />
                        <InputField display="labelontop" label="N° Facture fournisseur" size="overaverage" type="text" value={numFactureFournisseur} readOnly={true} />
                        <InputField display="labelontop" label="Date facture fournisseur" size="average" type="text" value={dateFactureFournisseur} readOnly={true} />
                        <InputField display="labelontop" label="N° BL" size="average" type="text" value={numBL} readOnly={true} />
                        <InputField display="labelontop" label="N° Declaration" size="average" type="text" value={numDeclaration} readOnly={true} />
                        <InputField display="labelontop" label="Date declaration" size="belowaverage" type="text" value={dateDeclaration} readOnly={true} />
                        <InputField display="labelontop" label="Bureau douane" size="large" type="text" value={bureauDouane} readOnly={true} />
                        <InputField display="labelontop" label="Fait à" size="belowaverage" type="text" value={lieu} onChange={(e) => setLieu(e.target.value)}/>
                        <InputField display="labelontop" label="Le" size="belowaverage" type="text" value={date} onChange={(e) => setDate(e.target.value)}/>


                    </span>
                </div>
                    <span className={styles.buttonSpan}>
                        <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
                        <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                    </span>
                    <div className={styles.footer}/>
                </>
            )}
        </form>
    </div>
  )
}

export default EditEngagement1030