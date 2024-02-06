import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


function EditMainLeveeBureau({id, dossier, declaration, onAjouter, onClose}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState('');
    const [dateArrivee, setDateArrivee] = useState('');
    const [lieu, setLieu] = useState('');
    const [bureauDouanePk, setBureauDouanePk] = useState(declaration.bureauEnregistrement?declaration.bureauEnregistrement.bureauDouane_pk:null);
    const [bureauDouane, setBureauDouane] = useState("");
    const [receveurDouane, setReceveurDouane] = useState("");
    const [natureMarchandisePk, setNatureMarchandisePk] = useState(dossier.natureMarchandise?dossier.natureMarchandise.natureMarchandise_pk:'');
    const [natureMarchandise, setNatureMarchandise] = useState('');
    const [numGros, setNumGros]= useState('') ;
    const [numArticle, setNumArticle] = useState('');
    const [sg, setSg] = useState('');
    const [poidsBrut, setPoidsBrut] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({bureauDouanePk, natureMarchandisePk, dateArrivee, date, lieu, numGros, numArticle, sg, poidsBrut});
        // Fermer le Pop Up
        //onClose();
    };


    useEffect(() => {
        axios.get(`/api/dossiers/${dossier.dossier_pk}/demande-main-levee-bureau/`)

        .then((response) => {
            const docData = response.data;
            setDateArrivee(docData.dateArrivee);
            setBureauDouane(docData.bureauDouane);
            setReceveurDouane(docData.receveurDouane);
            setNatureMarchandise(docData.natureMarchandise);
            setNumGros(docData.numGros);
            setNumArticle(docData.numArticle);
            setSg(docData.sg);
            setPoidsBrut(docData.poidsBrut);
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
            <h2>Formulaire Demande Main Levee - Bureau</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="Bureau douane" size="large" type="text" value={bureauDouane} readOnly={true} />
                        <InputField display="labelontop" label="Receveur douane" size="large" type="text" value={receveurDouane} readOnly={true} />
                        <InputField display="labelontop" label="Nature marchandise" size="verylarge" type="text" value={natureMarchandise} readOnly={true} />
                        <InputField display="labelontop" label="Gros" size="small" type="text" value={numGros} readOnly={true} />
                        <InputField display="labelontop" label="Article" size="small" type="text" value={numArticle} readOnly={true} />
                        <InputField display="labelontop" label="S/G" size="small" type="text" value={sg} readOnly={true} />
                        <InputField display="labelontop" label="Poids brut" size="belowaverage" type="text" value={poidsBrut} readOnly={true} />
                        <InputField display="labelontop" label="Date arrivee" size="average" type="text" value={dateArrivee} readOnly={true} />
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

export default EditMainLeveeBureau