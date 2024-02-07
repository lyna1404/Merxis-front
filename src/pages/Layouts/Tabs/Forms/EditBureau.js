import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


const EditBureau = ({ onClose,onAjouter,toModify}) => {

    
  const [bureauData, setBureauData] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;


    // Récupérer le bureau
    useEffect(() => {

      axios.get(`${apiUrl}/api/bureaux-douane/${toModify}/`)
      .then((response) => {
        const bureauResponse = response.data;
        setBureauData(bureauResponse);
        const {code, nomBureau, receveurDouane} = bureauResponse;
        setCode(code);
        setNom(nomBureau); 
        setReceveurDouane(receveurDouane); 
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



  const [code, setCode] = useState(bureauData.code || '');
  const [nom, setNom] = useState(bureauData.nomBureau || '');
  const [receveurDouane, setReceveurDouane] = useState(bureauData.receveurDouane || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau bureau
        onAjouter({code,nom,receveurDouane});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Modifier Bureau</h2>
        {!(isLoaded) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        ( <>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
            <InputField display="labelontop" label="Code" size="average" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            <InputField display="labelontop" label="Nom" size="extralarge" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            <InputField display="labelontop" label="Receveur en Douane" size="extralarge" type="text" value={receveurDouane} onChange={(e) => setReceveurDouane(e.target.value)} />
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

export default EditBureau;