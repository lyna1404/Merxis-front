import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


function EditMainLeveeAHB({id, dossier, declaration, onAjouter, onClose}) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [isLoaded, setIsLoaded] = useState(false);
    const [numLTA, setNumLTA]= useState('');
    const [numSousLTA, setNumSousLTA] = useState('');
    const [dateArrivee, setDateArrivee] = useState('');
    const [numGros, setNumGros]= useState('') ;
    const [numArticle, setNumArticle] = useState('');
    const [sg, setSg] = useState('');
    const [numBadge, setNumBadge] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({numLTA, numSousLTA, dateArrivee, numGros, numArticle, sg, numBadge});
        // Fermer le Pop Up
        //onClose();
    };


    useEffect(() => {
        axios.get(`${apiUrl}/api/dossiers/${dossier.dossier_pk}/demande-main-levee-ahb/`)

        .then((response) => {
            const docData = response.data;
            setDateArrivee(docData.dateArrivee);
            setNumLTA(docData.numLTA);
            setNumSousLTA(docData.sousLTA);
            setNumGros(docData.numGros);
            setNumArticle(docData.numArticle);
            setSg(docData.sg);
            setNumBadge(docData.numBadge);
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
            <h2>Formulaire Demande Main Levee - AHB</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="N° LTA" size="overaverage" type="text" value={numLTA} readOnly={true} />
                        <InputField display="labelontop" label="N° Sous LTA" size="overaverage" type="text" value={numSousLTA} onChange={(e) => setNumSousLTA(e.target.value)} />
                        <InputField display="labelontop" label="Gros" size="small" type="text" value={numGros} readOnly={true} />
                        <InputField display="labelontop" label="Article" size="small" type="text" value={numArticle} readOnly={true} />
                        <InputField display="labelontop" label="S/G" size="small" type="text" value={sg} readOnly={true} />
                        <InputField display="labelontop" label="Date arrivee" size="average" type="text" value={dateArrivee} readOnly={true} />
                        <InputField display="labelontop" label="N° Badge" size="belowaverage" type="text" value={numBadge} onChange={(e) => setNumBadge(e.target.value)}/>


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

export default EditMainLeveeAHB