import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import labelStyles from "../../../../components/inputField.module.css";
import stylesLoader from '../../../gestionClients.module.css'

import axios from 'axios';


const EditLieu = ({ onClose,onAjouter, toModify}) => {
    
    const [nom, setNom] = useState('');
    const [wilayaPk, setWilayaPk] = useState('');
    const [wilaya, setWilaya] = useState('');
    const [listeWilayas, setListeWilayas] = useState([]);

    const [lieuData, setLieuData] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);

    // Récupération de la liste de wilayas 
    useEffect(() => {
    
        const wilayas = axios.get('/api/wilayas/')
        
        .then((response) => {

        const wilayasData = response.data;
        setListeWilayas(wilayasData);
        })
        .catch((error) => {
        console.log('Error:', error);
        handleError(error.request.response);
    
        });
    }, []);

    // Récupération du lieu
    useEffect(() => {

        axios.get(`/api/lieux-livraison/${toModify}/`)
        .then((response) => {
          const lieuResponse = response.data;
          setLieuData(lieuResponse);
          const {nomLieu, wilaya} = lieuResponse;
          setNom(nomLieu);
          setWilayaPk(wilaya.wilaya_pk);
          setWilaya(wilaya.nom);
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

    const handleWilayaSelect = (searchTerm) => {
        setWilaya(searchTerm);
        const pk = listeWilayas.filter((wilaya) => wilaya.nom.toString().includes(searchTerm.toString()))[0];
        setWilayaPk(pk.wilaya_pk);
    }   
  

    // Controle d'erreurs
    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau bureau
        onAjouter({nom,wilayaPk});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Lieu de Livraison</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Nom" size="extralarge" wilaya="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            <label className={labelStyles.labelontop}>Wilaya
                <select className={labelStyles.average}  value={wilaya} onChange={(e) => handleWilayaSelect(e.target.value)}>
                    <option value="">Selectionner</option>
                    {listeWilayas.map(wilaya => (
                        <option key={wilaya.wilaya_pk} value={wilaya.nom}>
                            {wilaya.nom}
                        </option>
                    ))}        
                </select>     
            </label>  
        </span>
        </div>
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} wilaya="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} wilaya="button" onClick={onClose}>Fermer</button>
        </span>
        </>
        )}
      </form>
    </div>
  );
};

export default EditLieu;