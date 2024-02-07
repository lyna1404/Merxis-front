import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import stylesLoader from '../../../gestionClients.module.css'


function EditNoteDetails({id, onAjouter, onClose}) {

    const [designation, setDesignation] = useState('');
    const [isLoaded, setIsLoaded] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter();
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
        <form onSubmit={onAjouter}>
            <h2>Formulaire Note Details</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="Designation du debours" size="extralarge" debours="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
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

export default EditNoteDetails