import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


function EditD41({id, dossier, declaration, onAjouter, onClose}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const [bureauDouanePk, setBureauDouanePk] = useState(declaration.bureauEnregistrement?declaration.bureauEnregistrement.bureauDouane_pk:null);
    const [bureauDouane, setBureauDouane] = useState(declaration.bureauEnregistrement?declaration.bureauEnregistrement.nomBureau:"");
    const [lieuEntreposagePk, setLieuEntreposagePk] = useState(dossier.lieuEntreposage? dossier.lieuEntreposage.compagnie_pk : null);
    const [lieuEntreposage, setLieuEntreposage] = useState(dossier.lieuEntreposage? dossier.lieuEntreposage.nom : '');
    const [numRep,setNumRep] = useState(declaration.numRepertoire?declaration.numRepertoire:'');
    const [natureMarchandisePk, setNatureMarchandisePk] = useState(dossier.natureMarchandise?dossier.natureMarchandise.natureMarchandise_pk:'');
    const [natureMarchandise, setNatureMarchandise] = useState(dossier.natureMarchandise?dossier.natureMarchandise.designation:'');
    const [anneeGros, setAnneeGros] = useState(declaration.anneeGros?declaration.anneeGros:'');
    const [numGros, setNumGros]= useState(declaration.numGros?declaration.numGros:'') ;
    const [numArticle, setNumArticle] = useState(declaration.numArticle?declaration.numArticle:'');
    const [sg, setSg] = useState(declaration.sg?declaration.sg:'');
    const [numTitreTransport, setNumTitreTransport]= useState(dossier.numTitreTransport?dossier.numTitreTransport:'');
    const [nbrColis, setNbrColis] = useState(declaration.nbrColis?declaration.nbrColis:'');
    const [poidsBrut, setPoidsBrut] = useState(declaration.poidsBrut?declaration.poidsBrut:'');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({bureauDouanePk, natureMarchandisePk, lieuEntreposagePk, numRep, date, lieu, anneeGros, numGros, numArticle, sg, numTitreTransport, nbrColis, poidsBrut});
        // Fermer le Pop Up
        //onClose();
    };


    useEffect(() => {
        axios.get(`/api/dossiers/${dossier.dossier_pk}/d41/`)

        .then((response) => {
            const docData = response.data;
            console.log("d41 reçu", docData);
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
            <h2>Formulaire D41</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="Bureau douane" size="overaverage" type="text" value={bureauDouane} readOnly={true} />
                        <InputField display="labelontop" label="Lieu entreposage" size="overaverage" type="text" value={lieuEntreposage} readOnly={true} />
                        <InputField display="labelontop" label="N° Rep" size="small" type="text" value={numRep} readOnly={true} />
                        <InputField display="labelontop" label="Nature marchandise" size="large" type="text" value={natureMarchandise} readOnly={true} />
                        <InputField display="labelontop" label="Annee gros" size="verysmall" type="text" value={anneeGros} readOnly={true} />
                        <InputField display="labelontop" label="Num gros" size="verysmall" type="text" value={numGros} readOnly={true} />
                        <InputField display="labelontop" label="Num article" size="verysmall" type="text" value={numArticle} readOnly={true} />
                        <InputField display="labelontop" label="S/G" size="verysmall" type="text" value={sg} readOnly={true} />
                        <InputField display="labelontop" label="Num titre transport" size="large" type="text" value={numTitreTransport} readOnly={true} />
                        <InputField display="labelontop" label="Nbr colis" size="verysmall" type="text" value={nbrColis} readOnly={true} />
                        <InputField display="labelontop" label="Poids brut" size="belowaverage" type="text" value={poidsBrut} readOnly={true} />
                        <InputField display="labelontop" label="Fait à" size="belowaverage" type="text" value={lieu} onChange={(e) => setLieu(e.target.value)}/>
                        <InputField display="labelontop" label="Le" size="belowaverage" type="text" value={date} onChange={(e) => setDate(e.target.value)}/>


                    </span>
                </div>
                    <span className={styles.buttonSpan}>
                        <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
                        <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                    </span>
                </>
            )}
        </form>
    </div>
  )
}

export default EditD41