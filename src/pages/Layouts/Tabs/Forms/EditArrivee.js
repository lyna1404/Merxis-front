import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import stylesLoader from '../../../gestionClients.module.css'
import axios from 'axios';

const EditArrivee = ({ onClose,onAjouter, toModify}) => {
    
    const [nom, setNom] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau moyen
        onAjouter({nom});
        // Fermer le Pop Up
        onClose();
    };


    // Controle d'erreurs
    const handleError = (errors) => {
      setShowError(true);
      setErrorMessages(errors);
    };

    // Récupération du lieu d'arrivée
    useEffect(() => {
    
      const lieuxArrivées = axios.get(`/api/أماكن-الوصول/${toModify}`)
      
      .then((response) => {

      const lieuxArrivéesData = response.data;
      setNom(lieuxArrivéesData.nom);
      setIsLoaded(true);
      })
      .catch((error) => {
      setIsLoaded(false);
      console.log('Error:', error);
      handleError(error.request.response);
  
      });
  }, []);

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>إضافة مكان وصول</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
          <div className={styles.fields_area}>
          <span className={filterStyles.container}>
              <InputField display="labelonright" dir='rtl' label="الإسم بالعربية" size="extralarge" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
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

export default EditArrivee;