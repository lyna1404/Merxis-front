import { useState,useEffect } from 'react';
import React from 'react';
import Breadcrumb from '../components/breadcrumb';
import ReusableTable from '../components/reusableTable';
import styles from './Comptabilite.module.css';
import styles2 from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import TableFilter from '../components/tableFilter';
import ListChoices from '../components/ListChoices';
import axios from 'axios';
import ErrorMessage from '../components/errorMessage';
import CustomMessage from '../components/customMessage';
import SuccessMessage from '../components/succesMessage';
import { openPageBasedOnId , reloadPage , openPage , handleFilterChange} from '../Utils/actionUtils';
import {IconView,IconEdit,IconDelete,IconCash} from '../components/icons';




function Facturation() {

    const [headers,setHeaders] = useState(['N° Facture', 'N° Dossier', 'Date', 'Client', 'Net à payer', 'Etat Paiement', 'Date Paiement', 'actions']);
    const radios = [{name:'Facture Définitive'},{name:'Facture Proforma'}];
    const [selectedRadio ,setSelectedRadio] = useState(radios[0].name);
    const [data, setFilteredData] = useState([]);
    const [originalDataDef, setOriginalDataDef] = useState([]);
    const [originalDataPro, setOriginalDataPro] = useState([]);
    const [filteredDataDef, setFilteredDataDef] = useState([]);
    const [filteredDataPro, setFilteredDataPro] = useState([]);

    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const tableActions = [
        <IconView key="view" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/facturation/detailsFacture/')} />,
        <IconEdit key="edit" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, "/facturation/EditFacture/")} />,
      ];
      const tableActions2 = [
        <IconView key="view" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, '/facturation/detailsFactureProforma/')} />,
        <IconEdit key="edit" onClick={(event) => openPageBasedOnId(event.target.closest('tr').id, "/facturation/EditFactureProforma/")} />,
      ];
    const handleFilterChangeWrapper = (columnKey, filterValue) => {
        if(selectedRadio=="Facture Définitive"){
            setFilteredData(originalDataDef)
            handleFilterChange(columnKey, filterValue, originalDataDef, setFilteredData);
        }
        else{
            setFilteredData(originalDataPro)
            handleFilterChange(columnKey, filterValue, originalDataPro, setFilteredData);
        }
    };

    const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
    };
    
    const handleErrorClose = () => {
        setShowError(false);
    };

    const handleSuccess = () => {
        setShowSuccess(true);
    };
    
    const handleSuccessClose = () => {
        setShowSuccess(false);
        reloadPage();
    };

    useEffect(() => {
        // Create axios requests for both data fetching
        const facturesdef = axios.get(`/api/factures-definitives/`); 
        const facturesprofs = axios.get(`/api/factures-proforma/`);

        // Use Promise.all to wait for both requests to complete
        Promise.all([facturesdef, facturesprofs])
          .then((responses) => {
            const factdefres = responses[0].data;
            const factprores = responses[1].data;
            console.log(factdefres);
            console.log(factprores);
            if (typeof factdefres === 'object' && factdefres !== null && typeof factprores === 'object' && factprores !== null) {
                const extractedFactDef = Object.values(factdefres).map(item => ({
                  id: item.facture_pk,
                  numFacture : item.numFacture,
                  numDossier: item.dossier.numDossier,
                  date: item.date,
                  client: item.dossier.client.raisonSociale,
                  netPayer: item.net_payer,
                  etatPaiement : item.etatPaiement,
                  datePaiment: item.datePaiment
                }));
                const extractedFactPro = Object.values(factprores).map(item => ({
                    id: item.facture_pk,
                    numFacture : item.numFacture,
                    date: item.date,
                    client: item.client.raisonSociale,
                    totalTTC: item.total_TTC,
                  }));
                setOriginalDataDef(extractedFactDef)
                setOriginalDataPro(extractedFactPro)
                setFilteredData(extractedFactDef)
                setFilteredDataDef(extractedFactDef);
                setFilteredDataPro(extractedFactPro);
                console.log(filteredDataDef)
                setIsLoaded(true);
              } else {
                console.error('Response data is not a JSON object:', factdefres);
                handleError(factdefres);
                setIsLoaded(true);
              }
          })
          .catch((error) => {
            console.log("there is an error somewhere")
            setIsLoaded(true);
            console.log(error.request.response);
            handleError(error.request.response);  
          });
      }, []);
    const handleRadioClick = (event) => {
        const val = event.target.value
        setSelectedRadio(val)
        event.target.value === 'Facture Définitive' ? 
                            <>
                                {setFilteredData(originalDataDef)}
                                {setFilteredDataDef(originalDataDef)}
                                {setHeaders(['N° Facture', 'N° Dossier', 'Date', 'Client', 'Net à payer', 'Etat Paiement', 'Date Paiement', 'Actions'])}
                            </>
                            : 
                            <>
                                {setFilteredData(originalDataPro)}                            
                                {setFilteredDataPro(originalDataPro)}
                                {setHeaders(['N° Facture Proforma', 'Date', 'Client', 'Total TTC', 'Actions'])}
                            </>                    

    }


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
                            { key: 'numFacture', label: 'N° Facture' , inputType : 'text' },
                            { key: 'numDossier', label: 'N° Dossier', inputType : 'text' },
                            { key: 'client', label: 'Client' , inputType : 'text'},
                            { key: 'netPayer', label: 'Net à Payer' , inputType : 'text'},
                            { key: 'etatPaiement', label: 'Etat de Paiement' , inputType : 'text'},
                            ]}
                    onFilterChange={handleFilterChangeWrapper} />           
                </>
                :
                <>
                    <TableFilter columns={[
                                            { key: 'numFacture', label: 'N° Facture Proforma' , inputType : 'text' },
                                            { key: 'client', label: 'Client' , inputType : 'text'},
                                            { key: 'totalTTC', label: 'Total TTC' , inputType : 'text'},
                                            ]}
                    onFilterChange={handleFilterChangeWrapper} />
                </>
                }
                <span className={styles.buttons_span}>
                    <button className={`${buttonStyles.secondary}`}  onClick={() => handleReloadClick()} children='Actualiser' />  
                    <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={() => openNewFacture()}/>  
                    <button className={`${buttonStyles.primaryButtonB}`} children="Bordereaux d'envoi"  onClick={() => openBordereaux()}/>  
                </span>
            </span>
            {!isLoaded ? ( // Conditional rendering based on the loading state
            <div className={styles2.loader_container}><span className={styles2.loader}></span></div> // Replace with your loader component or CSS
            ) : (
                <ReusableTable data={data} headers={headers} itemsPerPage={8} addlink={false} addactions={true} 
                actionIcons={selectedRadio === "Facture Définitive" ? tableActions : tableActions2}
                />
            )}
                {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
                {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}

        </>
    );

}

export default Facturation;
