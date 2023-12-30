
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';

import styles from './Comptabilite.module.css';
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import TableFilter from '../components/tableFilter';
import TabDebours from './TabDebours';


const listeDossiers = [
    {
        id:"01",
        numDossier:"01/23",
        rep:"01",
        regDouane:"xxx",
        numFact:"01/23",
        client:"Sarl MERXIS",
        natureMarch:"Alimentation",
        statutDossier:"Livré",
        deboursPrestations: [
            {id:"1", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"1", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"1", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"1", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"1", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"1", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"1", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "02",
        numDossier:"02/23",
        rep:"01",
        regDouane:"xxx",
        numFact:"02/23",
        client:"SARL Merxis",
        natureMarch:"Electronique",
        statutDossier:"Archivé",
        deboursPrestations: [
            {id:"2", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"2", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"2", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"2", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"2", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"2", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"2", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "03",
        numDossier:"03/23",
        rep:"02",
        regDouane:"xxx",
        numFact:"03/23",
        client:"SARL Transit Amel",
        natureMarch:"Electromenager",
        statutDossier:"En livraison",
        deboursPrestations: [
            {id:"3", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"3", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"3", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"3", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"3", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"3", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"3", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "04",
        numDossier:"04/23",
        rep:"03",
        regDouane:"xxx",
        numFact:"04/23",
        client:"SARL Golden Tulip Hotel Series",
        natureMarch:"Cosmétiques",
        statutDossier:"En dédouanement",
        deboursPrestations: [
            {id:"4", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"4", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"4", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"4", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"4", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"4", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"4", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"

    },
    {   
        id : "05",
        numDossier:"05/23",
        rep:"03",
        regDouane:"xxx",
        numFact:"05/23",
        client:"SARL Golden Tulip Hotel Series",
        natureMarch:"Alimentation",
        statutDossier:"Livré",
        deboursPrestations: [
            {id:"5", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"5", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"5", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"5", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"5", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"5", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"5", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {   
        id : "06",
        numDossier:"06/23",
        rep:"04",
        regDouane:"xxx",
        numFact:"06/23",
        client:"ESI",
        natureMarch:"Meubles",
        statutDossier:"Livré",
        deboursPrestations: [
            {id:"6", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"6", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"6", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"6", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"6", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"6", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"6", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "07",
        numDossier:"07/23",
        rep:"04",
        regDouane:"xxx",
        numFact:"07/23",
        client:"SARL Green",
        natureMarch:"Gazon",
        statutDossier:"Livré",
        deboursPrestations: [
            {id:"7", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"7", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"7", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"7", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"7", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"7", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"7", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "08",
        numDossier:"08/23",
        rep:"05",
        regDouane:"xxx",
        numFact:"08/23",
        client:"SARL Transit Amel",
        natureMarch:"Alimentation",
        statutDossier:"En dédouanement",
        deboursPrestations: [
            {id:"8", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"8", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"8", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"8", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"8", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"8", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"8", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "09",
        numDossier:"09/23",
        rep:"05",
        regDouane:"xxx",
        numFact:"09/23",
        client:"SARL Transit Amel",
        natureMarch:"Produit Chimique",
        statutDossier:"En livraison",
        deboursPrestations: [
            {id:"9", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"9", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"9", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"9", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"9", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"9", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"9", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    },
    {
        id : "10",
        numDossier:"10/23",
        rep:"06",
        regDouane:"xxx",
        numFact:"09/23",
        client:"SARL Merxis",
        natureMarch:"Produit de nettoyage",
        statutDossier:"En livraison",
        deboursPrestations: [
            {id:"10", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"5000 DZD"}, 
            {id:"10", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"10", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"10", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"10", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"10", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"10", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
    }
];
 
function DeboursComptabilite() { 
    let navigate = useNavigate();
    
    //Recuperer le numero dossier choisie
    const { slug } = useParams();
    
    //Trouver le numero du dossier à partir de la liste des dossies existants
    const selectedDossier = listeDossiers.find((dossier) => dossier.id === slug);

    //Exemple d'une historique de debours
    const data = selectedDossier.deboursPrestations.map((deboursPrestations)=>deboursPrestations);
    
    //entete du tableau des debours
    const headers = ['Debours/Prestation', 'Mode de paiement', 'Mont Debours', 'Mont Prestation'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState(data);

    const handleFilterChange = (columnKey, filterValue) => {
        const filteredData = data.filter((item) =>
          item[columnKey].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredData(filteredData);
      };

    const setMontantDebours = (dossier) => {
        let montantDeb = 0;
        dossier.deboursPrestations.map((debours)=>{debours.montantDebours!='/'? 
                                                            montantDeb+=Number(String(debours.montantDebours).split(' ')[0])
                                                            : montantDeb+=0});
        return montantDeb + ' DZD';
    };

    const setMontantPrestations = (dossier) => {
        let montantPres = 0;
        dossier.deboursPrestations.map((prestation)=>{prestation.montantPrestations!='/'? 
                                                        montantPres+=Number(String(prestation.montantPrestations).split(' ')[0])  
                                                                : montantPres+=0});
        return montantPres + ' DZD';
    }

    //Controler le fomrulaire d'ajout de debours
    const [showForm, setShowForm] = useState(false);

    const handleNouveauClick = () => {
      setShowForm(true);
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
            <AdvancedBreadcrumb numDossier={selectedDossier.numDossier} hideParams={true}/>
            <h1 className={styles.pageTitle}>Liste des Debours</h1>
            
            <span className={styles.filter_span}>
                <TableFilter columns={[
                    { key: 'deboursPres', label: 'Debours/Prestation' },
                    { key: 'modePaiement', label: 'Mode de paiement' },
                    {key : 'montantDebours', label:'Mont Debours'},
                    {key : 'montantPrestations', label:'Mont Prestation'},
                ]} onFilterChange={handleFilterChange} />
                <span className={styles.buttons_span}>
                    <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' onClick={handleNouveauClick} />
                    {showForm && <TabDebours onClose={handleFormClose} 
                                               onAjouter={handleAjouter} 
                                               onFileUpload={handleFileUpload} 
                                               onFileUploadClick={handleFileUploadClick}
                                               inputFile={inputFile}/>} 
              
                </span>
            </span>

            <ReusableTable data={filteredData} headers={headers} itemsPerPage={3} addlink={false}/>
            <div className={styles.container}>
                <label className={styles.label_style}>Total</label>
                <input className={styles.input}
                    value={setMontantDebours(selectedDossier)}
                    readOnly={true}
                />
                <input className={styles.input}
                    value={setMontantPrestations(selectedDossier)}
                    readOnly={true}
                />
            </div>   

        </>
    );
}

export default DeboursComptabilite