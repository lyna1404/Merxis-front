import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


const EditFournisseur = ({ onClose,onAjouter,toModify}) => {
    
  const [fournissData, setFournissData] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;


    // Récupérer le fournisseur
    useEffect(() => {

      axios.get(`${apiUrl}/api/fournisseurs/${toModify}/`)
      .then((response) => {
        const fournissResponse = response.data;
        setFournissData(fournissResponse);
        const {raisonSociale, adresse, raisonSocialeArabe} = fournissResponse;
        setRaisonSociale(raisonSociale);
        setAdresse(adresse); 
        setRaisonSocialeArabe(raisonSocialeArabe); 
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



  const [raisonSociale, setRaisonSociale] = useState(fournissData.raisonSociale || '');
  const [adresse, setAdresse] = useState(fournissData.adresse || '');
  const [raisonSocialeArabe, setRaisonSocialeArabe] = useState(fournissData.raisonSocialeArabe || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau fournisseur
        onAjouter({raisonSociale,adresse,raisonSocialeArabe});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Modifier Fournisseur</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        ( <>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Raison Sociale" size="extralarge" type="text" value={raisonSociale} onChange={(e) => setRaisonSociale(e.target.value)} />
            <InputField display="labelontop" label="Adresse" size="large" type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            <InputField display="labelontop" label="Raison Sociale en Arabe" size="extralarge" type="text" value={raisonSocialeArabe} onChange={(e) => setRaisonSocialeArabe(e.target.value)} />
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

export default EditFournisseur;