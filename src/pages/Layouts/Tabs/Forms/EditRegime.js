import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


const EditRegime = ({ onClose,onAjouter,toModify}) => {

    
  const [regimeData, setRegimeData] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;


    // Récupérer le régime
    useEffect(() => {

      axios.get(`${apiUrl}/api/regimes-douaniers/${toModify}/`)
      .then((response) => {
        const regimeResponse = response.data;
        setRegimeData(regimeResponse);
        const {code, designation} = regimeResponse;
        setCode(code);
        setDesignation(designation); 
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



  const [code, setCode] = useState(regimeData.code || '');
  const [designation, setDesignation] = useState(regimeData.designation || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau regime
        onAjouter({code,designation});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Modifier Régime</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        ( <>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Code" size="average" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <InputField display="labelontop" label="Designation" size="extralarge" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </span>
        </div>
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>

        </span>
        </> )}
      </form>
    </div>
  );
};

export default EditRegime;