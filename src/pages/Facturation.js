import { useState } from 'react';
import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './Comptabilite.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';
import ListChoices from '../components/ListChoices';


const facturesDéfinitives = [
    {
        id : "01",
        numFact:"01/23",
        numDossier:"01/23",
        date:"xx/xx/xx",
        client:"Sarl MERXIS",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    },
    {
        id : "02",
        numFact:"02/23",
        numDossier:"02/23",
        date:"xx/xx/xx",
        client:"SARL Merxis",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    },
    {
        id : "03",
        numFact:"03/23",
        numDossier:"03/23",
        date:"xx/xx/xx",
        client:"SARL Transit Amel",
        netAPayer:"xxxxxx",
        etatPayement:"Non Payé",
        datePayement:"",
        typeFacture:"Définitive"
    },
    {
        id : "04",
        numFact:"04/23",
        numDossier:"04/23",
        date:"xx/xx/xx",
        client:"SARL Golden Tulip Hotel Series",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    },
    {   
        id : "05",
        numFact:"05/23",
        numDossier:"05/23",
        date:"xx/xx/xx",
        client:"SARL Golden Tulip Hotel Series",
        netAPayer:"xxxxxx",
        etatPayement:"Non Payé",
        datePayement:"",
        typeFacture:"Définitive"
    },
    {  
        id : "06",
        numFact:"06/23",
        numDossier:"06/23",
        date:"xx/xx/xx",
        client:"ESI",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    },
    {
        id : "07",
        numFact:"07/23",
        numDossier:"07/23",
        date:"xx/xx/xx",
        client:"SARL Green",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    },
    {
        id : "08",
        numFact:"08/23",
        numDossier:"08/23",
        date:"xx/xx/xx",
        client:"SARL Green",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    },
    {
        id : "09",
        numFact:"09/23",
        numDossier:"09/23",
        date:"xx/xx/xx",
        client:"SARL Green",
        netAPayer:"xxxxxx",
        etatPayement:"Payé",
        datePayement:"xx/xx/xx",
        typeFacture:"Définitive"
    }
];

const facturesProforma = [
    {
        id : "01",
        numFact:"01/23",
        date:"xx/xx/xx",
        client:"SARL Transit Amel",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "02",
        numFact:"02/23",
        date:"xx/xx/xx",
        client:"SARL Transit Amel",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "03",
        numFact:"03/23",
        date:"xx/xx/xx",
        client:"SARL Transit Amel",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "04",
        numFact:"04/23",
        date:"xx/xx/xx",
        client:"SARL Golden Tulip Hotel Series",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "05",
        numFact:"05/23",
        date:"xx/xx/xx",
        client:"SARL Green",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "06",
        numFact:"06/23",
        date:"xx/xx/xx",
        client:"SARL Golden Tulip Hotel Series",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "07",
        numFact:"07/23",
        date:"xx/xx/xx",
        client:"ESI",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "08",
        numFact:"08/23",
        date:"xx/xx/xx",
        client:"ESI",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
    {
        id : "09",
        numFact:"09/23",
        date:"xx/xx/xx",
        client:"ESI",
        totalTTC:"xxxxxx",
        typeFacture:"Proforma"
    },
]


function Facturation() {

    const [headers,setHeaders] = useState(['N° Facture', 'N° Dossier', 'Date', 'Client', 'Net à payer', 'Etat Paiement', 'Date Paiement', 'Type de facture']);
    const radios = [{name:'Facture Définitive'},{name:'Facture Proforma'}];
    const [selectedRadio ,setSelectedRadio] = useState(radios[0].name);
    const [data, setData] = useState(facturesDéfinitives);
    const [filteredData, setFilteredData] = useState(data);

    const handleRadioClick = (event) => {
        setSelectedRadio(event.target.value)
        console.log(event.target.value)
        event.target.value === 'Facture Définitive' ? 
                            <>
                                {setData(facturesDéfinitives)}
                                {setFilteredData(facturesDéfinitives)}
                                {setHeaders(['N° Facture', 'N° Dossier', 'Date', 'Client', 'Net à payer', 'Etat Paiement', 'Date Paiement', 'Type de facture'])}
                            </>
                            : 
                            <>
                                {setData(facturesProforma)}                            
                                {setFilteredData(facturesProforma)}
                                {setHeaders(['N° Facture Proforma', 'Date', 'Client', 'Total TTC', 'Type de facture'])}
                            </>                    

    }

    const handleFilterChange = (columnKey, filterValue) => {

        selectedRadio === 'Facture Définitive' ? 
        <>
            {setFilteredData(facturesDéfinitives)}
        </>
        : 
        <>
            {setFilteredData(facturesProforma)}
        </>   
        const filteredData = data.filter((item) =>
          item[columnKey].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredData(filteredData);
      };

    const handleReloadClick = () => {
        window.location.reload(false)
    };

    const openNewFacture = () => {
        window.open("/facturation/NouvelleFacture", '_blank')
    };

    const openBordereaux = () => {
        window.open("/facturation/Bordereaux", '_blank')
    };

    
    return(
        <>
            <Breadcrumb/>
            <h1 className={styles.pageTitle}>Liste des Factures</h1>
            <span className={styles.filter_span}>
                <ListChoices 
                        name='facturesLists' 
                        radios={radios}
                        selectedRadio={selectedRadio} handleRadioClick={handleRadioClick}
                />
            </span>
            <span className={styles.filter_span}>
                { selectedRadio === "Facture Définitive"? 
                <>
                    <TableFilter columns={[
                            { key: 'numFact', label: 'N° Facture' , inputType : 'text' },
                            { key: 'numDossier', label: 'N° Dossier', inputType : 'text' },
                            { key: 'date', label: 'Date', inputType : 'text' },
                            { key: 'client', label: 'Client' , inputType : 'text'},
                            { key: 'netAPayer', label: 'Net à Payer' , inputType : 'text'},
                            { key: 'etatPayement', label: 'Etat de Paiement' , inputType : 'text'},
                            { key: 'datePayement', label: 'Date de Paiement' , inputType : 'text'},
                            ]}
                    onFilterChange={handleFilterChange} />             
                </>
                :
                <>
                    <TableFilter columns={[
                                            { key: 'numFact', label: 'N° Facture Proforma' , inputType : 'text' },
                                            { key: 'date', label: 'Date', inputType : 'text' },
                                            { key: 'client', label: 'Client' , inputType : 'text'},
                                            { key: 'totalTTC', label: 'Total TTC' , inputType : 'text'},
                                            ]}
                    onFilterChange={handleFilterChange} />
                </>
                }
                <span className={styles.buttons_span}>
                    <button className={`${buttonStyles.secondary}`}  onClick={() => handleReloadClick()} children='Actualiser' />  
                    <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openNewFacture()}/>  
                    <button className={`${buttonStyles.primaryButtonB}`} children="Bordereaux d'envoi"  onClick={() => openBordereaux()}/>  
                </span>
            </span>
                <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={true}/>
 
        </>
    );

}

export default Facturation;
