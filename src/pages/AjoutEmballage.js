import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import filterStyles from '../components/tableFilter.module.css'
import labelStyles from '../components/inputField.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';



const AjoutEmballage = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile,listeEmbs,listeEmbsComplete,genresEmb,piedsEmb,typesEmb, isDstr }) => {
    
    const [num, setNum]  = useState();
    const [numEmb, setNumEmb]  = useState("");
    const [embPk, setEmbPk]  = useState("");
    const [emb, setEmb]  = useState({});
    const [genreEmb, setGenreEmb]  = useState("");
    const [pieds, setPieds]  = useState("");
    const [typeEmb, setTypeEmb]  = useState("");
    const [dateRest, setDateRest]  = useState("");
    const [numBonRest, setNumBonRest]  = useState("");
    const [qte, setQte]  = useState("");
    const [poidsBrut, setPoidsBrut]  = useState("");
    const [poidsNet, setPoidsNet]  = useState("");

    const handleEmballageSelection = (searchTerm) => {
        setEmb(searchTerm);
        setNumEmb(searchTerm.label);
        setEmbPk(searchTerm.value);
        const emb = listeEmbsComplete.filter((emb) => emb.numEmballage.includes(searchTerm.label))[0];
        setGenreEmb(emb.genreEmballage);
        setTypeEmb(emb.typeEmballage);
        setPieds(emb.nbrPieds);
      }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        const id = 1;
        onAjouter({ id, num, embPk, numEmb, genreEmb, pieds, typeEmb, dateRest, numBonRest, qte, poidsBrut, poidsNet});
        // Fermer le Pop Up
        onClose();
    };


        // Styling des searchable dropdown de react-select
        const colorStyles = {
            control : // le champs d'input
            styles => ({...styles, backgroundColor:'white',border:'none',boxShadow:'none', fontFamily:'Montserrat'}),
            option: // les éléments à selectionnés
            (styles, {isFocused, isSelected}) => ({
              ...styles,
              backgroundColor: isFocused? '#e4e1e1' : isSelected? '#a3a7d8' : 'white',
              fontFamily: 'Montserrat',
            }),
            singleValue : // option séléctionnée
            styles => ({...styles, color:'black', fontFamily:'Montserrat', fontSize:'16px'})
          };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajouter un emballage</h2>
        <div className={styles.fields_area}>

            <div className={styles.many_fields}>    
                <InputField display="labelontop" label="N°" size="small" type="number" value={num} onChange={(e) => setNum(e.target.value)} />
                  <label className={labelStyles.labelontop}>N° de l'emballage
                    <Select className={labelStyles.overaverage} styles={colorStyles} options={listeEmbs} value={emb} placeholder="Sélectionner un emballage" onChange={(e) => handleEmballageSelection(e)} isSearchable={true}/>
                    </label>
            </div>
            <div className={styles.many_fields}>    
                <span className={filterStyles.container}>
                    <label className={labelStyles.labelontop}>
                        Genre d'emballage
                        <select id="modeSelect" value={genreEmb} onChange={(e) => setGenreEmb(e.target.value)}>
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
                        <select id="modeSelect" value={pieds} onChange={(e) => setPieds(e.target.value)}>
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
                        <select id="modeSelect" value={typeEmb} onChange={(e) => setTypeEmb(e.target.value)}>
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

            <div className={styles.many_fields}>               
                 <span className={filterStyles.container}>
                    <label className={labelStyles.labelontop}>Date de restitution
                    <DatePicker selected={dateRest} onChange={(e) => setDateRest(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                    </label>
                </span>
                <InputField display="labelontop" label="N° bon de restitution" size="large" type="texte" value={numBonRest} onChange={(e) => setNumBonRest(e.target.value)} />
            </div>

            {isDstr === true ? 
            <>
                <div className={styles.many_fields}>               
                    <InputField display="labelontop" label="Nb/Qte" size="small" type="number" value={qte} onChange={(e) => setQte(e.target.value)} />
                    <InputField display="labelontop" label="Poids Brut" size="average" type="texte" value={poidsBrut} onChange={(e) => setPoidsBrut(e.target.value)} />
                    <InputField display="labelontop" label="Poids Net" size="average" type="texte" value={poidsNet} onChange={(e) => setPoidsNet(e.target.value)} />

                </div>
            </>
            : <></>}
        </div>

        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
            <span className={styles.attacherDocSpan}>
              <input
                style={{ display: "none" }}
                accept=".pdf, .jpeg, .jpg, .png"
                ref={inputFile}
                onChange={onFileUpload}
                type="file"
              />
              <button className={buttonStyles.attacherdocument} type="button" onClick={onFileUploadClick}>Attacher Documents</button>
            </span>
        </span>
      </form>
    </div>
  );
};

export default AjoutEmballage;