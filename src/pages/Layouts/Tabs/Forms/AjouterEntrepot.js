import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import labelStyles from "../../../../components/inputField.module.css";
import axios from 'axios';


const AjouterEntrepot = ({ onClose,onAjouter}) => {
    
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [typePk, setTypePk] = useState('');
    const [type, setType] = useState('');
    const [listeTypesEntrepots, setListeTypesEntrepots] = useState([]);

    console.log(listeTypesEntrepots)

    const [errorMessages, setErrorMessages] = useState();
    const [showError, setShowError] = useState(false);

    // Récupération de la liste de types d'entrepots
    useEffect(() => {
    
        const typesEntrepots = axios.get('/api/types-entrepot/')
        
        .then((response) => {

        const typesEntrepotsData = response.data;
        setListeTypesEntrepots(typesEntrepotsData);
        })
        .catch((error) => {
        console.log('Error:', error);
        handleError(error.request.response);
    
        });
    }, []);

    const handleTypeSelect = (searchTerm) => {
        setType(searchTerm);
        const pk = listeTypesEntrepots.filter((type) => type.type.toString().includes(searchTerm.toString()))[0];
        setTypePk(pk.typeEntrepot_pk);
    }   
  

    // Controle d'erreurs
    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau Entrepot
        onAjouter({nom,adresse,tel, email, typePk});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Entrepot/Parc</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Nom" size="extralarge" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            <InputField display="labelontop" label="Adresse" size="extralarge" type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            <label className={labelStyles.labelontop}>Type Entrepot
                <select className={labelStyles.average}  value={type} onChange={(e) => handleTypeSelect(e.target.value)}>
                    <option value="">Selectionner</option>
                    {listeTypesEntrepots.map(type => (
                        <option key={type.typeEntrepot_pk} value={type.type}>
                            {type.type}
                        </option>
                    ))}        
                </select>     
            </label>  
            <InputField display="labelontop" label="Tel" size="average" type="text" value={tel} onChange={(e) => setTel(e.target.value)} />
            <InputField display="labelontop" label="E-mail" size="overaverage" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />                      
        </span>
        </div>
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>

        </span>
      </form>
    </div>
  );
};

export default AjouterEntrepot;