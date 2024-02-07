import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import stylesLoader from '../../../gestionClients.module.css'
import axios from 'axios';


const EditType = ({ onClose,onAjouter, toModify}) => {
    

    const [typeData, setTypeData] = useState('');
    const [type, setType] = useState(typeData.type);

    const [isLoaded, setIsLoaded] = useState(false);

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;


    // Récupération de le type
    useEffect(() => {

      axios.get(`${apiUrl}/api/types-compagnie/${toModify}/`)
      .then((response) => {
        const typeResponse = response.data;
        setTypeData(typeResponse);
        const {type} = typeResponse;
        setType(type);
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
        // Appeler la fonction onAjouter pour modifier le type
        onAjouter({type});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Modifier Type de Compagnie de Transport</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
          <>
            <div className={styles.fields_area}>
            <span className={filterStyles.container}>
                <InputField display="labelontop" label="Type Transport" size="extralarge" type="text" value={type} onChange={(e) => setType(e.target.value)} />
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

export default EditType;