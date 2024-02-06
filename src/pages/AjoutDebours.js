import React , {useState} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import filterStyles from '../components/tableFilter.module.css'
import labelStyles from '../components/inputField.module.css'
import Select from 'react-select';

const AjoutDebours = ({ onClose,onAjouter,onFileUpload,onFileUploadClick,inputFile,modes, types }) => {
    
    const [typeDebours, setTypeDebours] = useState('');
    const [debours, setDebours] = useState('');
    const [deboursPk, setDeboursPk] = useState(null);
    const [selectedDebours, setSelectedDebours] = useState({value: deboursPk, label: typeDebours});
    const [montant, setMontant] = useState();
    const [modePaiement, setModePaiement] = useState('');
    const [piecePaiement, setPiecePaiement] = useState('');
    const [beneficiaire, setBeneficiaire] = useState('');
    
    const listeDebours = types.map(({id, value, label}) => ({ ['value'] : value, ['label']:label}))

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({ typeDebours, modePaiement, montant, piecePaiement});
        // Fermer le Pop Up
        onClose();
    };

    const handleDeboursSelection = (searchTerm) => {
      setSelectedDebours(searchTerm);
      setDebours(searchTerm.label);
      setDeboursPk(searchTerm.value); 
      const deb = types.filter((debours) => debours.label.toString().includes(searchTerm.label.toString()))[0];
      setTypeDebours(deb.id);

  };

        // Styling des searchable dropdown de react-select
        const colorStyles = {
          
          control : styles => ({...styles, backgroundColor:'white',border:'none','box-shadow':'none', fontFamily:'Montserrat'}),
          option: (styles, {isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: isFocused? '#e4e1e1' : isSelected? '#a3a7d8' : 'white',
            fontFamily: 'Montserrat',
          }),
          singleValue : styles => ({...styles, color:'black', fontFamily:'Montserrat', fontSize:'16px'})
        };

  return (
    <div className={styles.tab}>
      <form onSubmit={handleSubmit}>
        <h2>Ajout Debours</h2>
        <div className={styles.fields_area}>
        <span className={filterStyles.container}>
          <label className={labelStyles.labelontop}>
            Debours
              <Select className={labelStyles.verylarge} styles={colorStyles} options={listeDebours} value={selectedDebours} placeholder="Sélectionner un débours" onChange={(e) => handleDeboursSelection(e)} isSearchable={true}/>
          </label>
          </span>
          <InputField display="labelontop" label="Montant" size="extralarge" type="number" value={montant} onChange={(e) => setMontant(e.target.value)} />
          <div className={styles.many_fields}>      
          <span className={filterStyles.container}>
          <label className={labelStyles.labelontop}>
            Mode de paiment
            <select id="modeSelect" value={modePaiement} onChange={(e) => setModePaiement(e.target.value)}>
                <option value="">Choisissez une option</option>
                { modes.map(mode => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                </option>
                ))}
              </select>
          </label>
          </span>
              
              <InputField display="labelontop" label="N° Piece de paiement" size="large" type="number" value={piecePaiement} onChange={(e) => setPiecePaiement(e.target.value)} />
          </div>
          <InputField display="labelontop" label="Beneficiaire" size="extralarge" type="text" value={beneficiaire} onChange={(e) => setBeneficiaire(e.target.value)} />

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

export default AjoutDebours;