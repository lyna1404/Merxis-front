
import { useState } from 'react';

import styles from './Comptabilite.module.css';
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import TableFilter from '../components/tableFilter';


const dossier = {
    numDossier:"01/23",
    rep:"01",
    regDouane:"xxx",
    numFact:"01/23",
    client:"Sarl MERXIS",
    natureMarch:"Alimentation",
    statusDossier:"Livré",
    deboursPrestations: [{deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
              {deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
              {deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
              {deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
              {deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
              {deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
              {deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
    montantDebours:"36000 DZD",
    montantPrestations:"61000 DZD"
    }
 
function DeboursComptabilite() { 

    const data = dossier.deboursPrestations.map((deboursPrestations)=>deboursPrestations);

    const headers = ['Debours/Prestation', 'Mode de paiement', 'Mont Debours', 'Mont Prestation'];

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

    return (
        <>
            <AdvancedBreadcrumb numDossier={dossier.numDossier}/>
            <h1 className={styles.pageTitle}>Liste des Debours</h1>
            
            <span className={styles.filter_span}>
                <TableFilter columns={[
                    { key: 'deboursPres', label: 'Debours/Prestation' },
                    { key: 'modePaiement', label: 'Mode de paiement' },
                    {key : 'montantDebours', label:'Mont Debours'},
                    {key : 'montantPrestations', label:'Mont Prestation'},
                ]} onFilterChange={handleFilterChange} />
                <span className={styles.buttons_span}>
                    <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' />                
                </span>
            </span>

            <ReusableTable data={filteredData} headers={headers} itemsPerPage={3}/>
            <div className={styles.container}>
                <label className={styles.label_style}>Total</label>
                <input className={styles.input}
                    value={setMontantDebours(dossier)}
                    readOnly={true}
                />
                <input className={styles.input}
                    value={setMontantPrestations(dossier)}
                    readOnly={true}
                />
            </div>   

        </>
    );
}

export default DeboursComptabilite