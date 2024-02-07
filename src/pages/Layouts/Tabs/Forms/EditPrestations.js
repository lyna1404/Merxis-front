import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import stylesLoader from '../../../gestionClients.module.css'

import axios from 'axios';


const EditPrestations = ({ onClose,onAjouter, toModify}) => {
    
    const [designation, setDesignation] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;


    // Récupération du Prestations
    useEffect(() => {

        axios.get(`${apiUrl}/api/types-prestation/${toModify}/`)
        .then((response) => {
          const PrestationsResponse = response.data;
          const {designation} = PrestationsResponse;
          setDesignation(designation)
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
        // Appeler la fonction onAjouter pour ajouter la nouvelle prestation
        onAjouter({designation});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Modification de Prestations</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Designation de la prestation" size="extralarge" Prestations="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
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

export default EditPrestations;