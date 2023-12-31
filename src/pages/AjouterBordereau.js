import { useState, useRef } from 'react';
import React from 'react';
import styles from './listeBordereau.module.css';
import buttonStyles from '../components/button.module.css';
import Breadcrumb from '../components/breadcrumb'
import ReusableTable from '../components/reusableTable';
import InputField from '../components/InputField';
import labelStyles from "../components/inputField.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TabDocBordereau from './TabDocBordereau';

function AjouterBordereau() {

    const documents = [
        {id:"1", nomDocument:"D45", numDocument:"4452", typeDocument:"Copie", nbrDocuments:"4", observation:"R.A.S"},
        {id:"2", nomDocument:"D10", numDocument:"1823", typeDocument:"Original", nbrDocuments:"1", observation:"R.A.S"},
        {id:"3", nomDocument:"D40", numDocument:"1336", typeDocument:"Original", nbrDocuments:"1", observation:"R.A.S"},
        {id:"4", nomDocument:"D30", numDocument:"7894", typeDocument:"Dupilicata", nbrDocuments:"1", observation:"R.A.S"},
        {id:"5", nomDocument:"D2", numDocument:"1259", typeDocument:"Copie", nbrDocuments:"2", observation:"R.A.S"},
    ]

    const [numBE, setNumBE] = useState('');
    const [numDossier, setNumDossier] = useState('');
    const [date, setDate] = useState('');
    const listeEtatRecup = [ {index:"1", etat:"Non Reçu"},{index:"2", etat:"Reçu"}];
    const [etatRecup, setEtatRecup] = useState(listeEtatRecup[0].etat);  
    const [client, setClient] = useState('');
    
    //entete du tableau des debours
    const headers = ['Document', 'N° Document', 'Type Document', 'Nbr Document', 'Observation'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState(documents);

    //Controler le fomrulaire d'ajout de debours
    const [showForm, setShowForm] = useState(false);

    const handleEtatRecupChange = (event) => {
        setEtatRecup(event.target.value)        
    };

    const handleNouveauClick = () => {
      setShowForm(true);
    };

    const handleEnregistrerClick = () => {
        console.log('Bordereau saved')
      };
  
    const handleFormClose = () => {
      setShowForm(false);
    };

    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
    
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
        }
      };

    const handleFileUploadClick = () => {
        inputFile.current.click();
      };
    
    //Controler l'ajout d'un debours 
    const handleAjouter = (data) => {
        setFilteredData((prevFilteredData) => [data,...prevFilteredData]);      
    };


    return (
        <>
            <Breadcrumb numDossier={numDossier}/>
            <div className={styles.main_grid}>
                <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                           <label className={styles.info_field}>
                                <InputField 
                                    display="labelonleft" 
                                    label="N° Bordereau" 
                                    size="small" 
                                    type="text" 
                                    value={numBE} 
                                    onChange={(e) => setNumBE(e.target.value)}
                                />
                            </label>   
                            <label className={styles.info_field}>
                                    <label className={labelStyles.labelonleft}>Date</label>
                                    <DatePicker selected={date} onChange={(e) => setDate(e)} dateFormat="dd/MM/yyyy" placeholderText="Selectionner une date" />
                            </label>
                            <label className={styles.info_field}>
                                <InputField 
                                    display="labelonleft" 
                                    label="N° Dossier" 
                                    size="small" 
                                    type="text" 
                                    value={numDossier} 
                                    onChange={(e) => setNumDossier(e.target.value)}
                                />
                            </label>  
                            <label className={styles.info_field}>
                                <label className={labelStyles.labelonleft}>Etat Récupération</label>
                                <select value={etatRecup} onChange={handleEtatRecupChange}>
                                    <option value="">Sélectionner une option</option>
                                    {listeEtatRecup.map((etat) => (
                                        <option key={etat.index} value={etat.etat}>
                                            {etat.etat}
                                        </option>
                                    ))}
                                </select>
                            </label> 
                            <label className={styles.info_field}>
                                <InputField 
                                    display="labelonleft" 
                                    label="Client" 
                                    size="average" 
                                    type="text" 
                                    value={client} 
                                    onChange={(e) => setClient(e.target.value)}
                                />
                            </label>  
                        <div className={styles.horizontalLine}></div>
                    </div>
                </span>

               <span className={styles.table_grid}>
                    <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false}/> 
                    <span className={styles.buttons_grid}>
                        <button className={`${buttonStyles.primaryButtonB}`} children='Ajouter Doc' onClick={handleNouveauClick} />
                        <button className={`${buttonStyles.primaryButtonY}`} children='Enregistrer' onClick={handleEnregistrerClick} />
                        {showForm && <TabDocBordereau onClose={handleFormClose} 
                                                            onAjouter={handleAjouter} 
                                                            onFileUpload={handleFileUpload} 
                                                            onFileUploadClick={handleFileUploadClick}
                                                            inputFile={inputFile}/>} 
                    </span>
                </span>
            </div>

        </>
    );
}

export default AjouterBordereau