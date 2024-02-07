import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import stylesLoader from '../../../gestionClients.module.css'
import axios from 'axios';


const EditMoyen = ({ onClose,onAjouter, toModify}) => {
  const apiUrl = process.env.REACT_APP_API_URL;


    const [moyenData, setMoyenData] = useState('');
    const [nom, setNom] = useState(moyenData.type);

    const [isLoaded, setIsLoaded] = useState(false);

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);


    // Récupération du moyen
    useEffect(() => {

      axios.get(`${apiUrl}/api/moyens-transport/${toModify}/`)
      .then((response) => {
        const moyenResponse = response.data;
        setMoyenData(moyenResponse);
        const {nom} = moyenResponse;
        setNom(nom);
        setIsLoaded(true);

      })
      .catch((error) => {
          console.log('Error:', error);
          setIsLoaded(false);
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Data:', error.response.data);
          }       
        });
  }, [toModify]); 


    // Controle d'erreurs
    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour modifier le moyen
        onAjouter({nom});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Modifier Moyen de Transport</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
          <>
            <div className={styles.fields_area}>
            <span className={filterStyles.container}>
                <InputField display="labelontop" label="Moyen Transport" size="extralarge" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
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
  );
};

export default EditMoyen;