import React , {useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import labelStyles from '../../../../components/inputField.module.css'



const AjoutEmballage = ({ onClose,onAjouter,genresEmb,piedsEmb,typesEmb}) => {
    
    const [numEmballage, setNumEmb]  = useState("");
    const [genreEmballage, setGenreEmb]  = useState("");
    const [nbrPieds, setPieds]  = useState("");
    const [typeEmballage, setTypeEmb]  = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({numEmballage, genreEmballage, nbrPieds, typeEmballage});
        // Fermer le Pop Up
        onClose();
    };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajouter un emballage</h2>
        <div className={styles.fields_area}>

            <div className={styles.many_fields}>    
                <InputField display="labelontop" label="N° Emballage" size="extralarge" type="text" value={numEmballage} onChange={(e) => setNumEmb(e.target.value)} />
                <span className={filterStyles.container}>
                    <label className={labelStyles.labelontop}>
                        Genre d'emballage
                        <select id="modeSelect" value={genreEmballage} onChange={(e) => setGenreEmb(e.target.value)}>
                            <option value="">Choisissez une option</option>
                            {genresEmb.map((statut, index) => (
                            <option key={index} value={statut}>
                                {statut}
                            </option>
                            ))}
                        </select>
                    </label>
                </span>                    
                <span className={filterStyles.container}>
                    <label className={labelStyles.labelontop}>
                        Pieds
                        <select id="modeSelect" value={nbrPieds} onChange={(e) => setPieds(e.target.value)}>
                            <option value="">Choisissez une option</option>
                            {piedsEmb.map((statut, index)  => (
                            <option key={index} value={statut}>
                                {statut}
                            </option>
                            ))}
                        </select>
                    </label>
                </span>  
                <span className={filterStyles.container}>
                    <label className={labelStyles.labelontop}>
                        Type d'emballage
                        <select id="modeSelect" value={typeEmballage} onChange={(e) => setTypeEmb(e.target.value)}>
                            <option value="">Choisissez une option</option>
                            {typesEmb.map((statut, index) => (
                            <option key={index} value={statut}>
                                {statut}
                            </option>
                            ))}
                        </select>
                    </label>
                </span>                 
            </div>
        </div>

        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
        </span>
      </form>
    </div>
  );
};

export default AjoutEmballage;