
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import TableFilter from '../components/tableFilter';
import { reloadPage , handleFilterChange} from '../Utils/actionUtils';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import filterStyles from '../components/tableFilter.module.css';
import InputField from '../components/InputField';
import TabDebours from './TabDebours';



 
function DeboursComptabilite() { 
    useEffect(() => {
        // Create axios requests for both data fetching
        const debours = axios.get(`/api/dossiers/${id}/debours/`); 
        const modes = axios.get(`/api/modes-paiement-debours/`);
        const dossier = axios.get(`/api/dossiers/${id}/`); 
        const tyoesDebours = axios.get(`/api/types-debours/`);
        // Use Promise.all to wait for both requests to complete
        Promise.all([debours, modes,dossier,tyoesDebours])
          .then((responses) => {
            const deboursData = responses[0].data;
            const modesData = responses[1].data;
            const dossierData = responses[2].data;
            const typesData = responses[3].data;

            if (typeof deboursData === 'object' && deboursData !== null) {
              const extractedDebours = Object.values(deboursData).map(item => ({
                id: item.debours_pk,
                debours: item.typeDebours ? item.typeDebours.designation : null,
                mode: item.modePaiment,
                mont: item.montant
              }));
              setDebours(extractedDebours);
              setFilteredData(extractedDebours);
              setDossier(dossierData);
              const totalMontant = extractedDebours.reduce(
                (sum, debour) => sum + (parseFloat(debour.mont) || 0),
                0
              );
              const totalMontantString = totalMontant.toFixed(2);
              setTotal(totalMontantString);
              const extractedModes = modesData.results.map(status => ({
                value: status,
                label: status
              }));
              setModes(extractedModes);
              const extractedTypes = typesData.map(type => ({
                id: type.typeDebours_pk,
                value: type.typeDebours_pk,
                label: type.designation
              }));
              setTypes(extractedTypes);
              setIsLoaded(true);
            } else {
              console.error('Response data is not a JSON object:', deboursData);
              handleError(deboursData);
              setIsLoaded(true);
            }
          })
          .catch((error) => {
            setIsLoaded(true);
            console.log('Error:', error); 
            if (error.request && error.request.response){
              handleError(error.request.response);
            }
            else{
              handleError(error);
            }
          });
      }, []);     
    //Recuperer le numero dossier choisie
    const { id } = useParams();

    //Trouver le numero du dossier à partir de la liste des dossies existants
    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [debours, setDebours] = useState([]);
    const [dossier,setDossier] = useState([]);
    const [modes, setModes] = useState([]);
    const [types, setTypes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);    
    const [montTotal, setTotal] = useState(0);

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
    const handleFilterChangeWrapper = (columnKey, filterValue) => {
      handleFilterChange(columnKey, filterValue,debours, setFilteredData);
    };
    //Exemple d'une historique de debours
    
    //entete du tableau des debours
    const headers = ['Debours/Prestation', 'Mode de paiement', 'Mont Debours'];

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

      setIsLoaded(false);
      axios
          .post(`/api/dossiers/${id}/debours/`, JSON.stringify(data), {
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then((response) => {
              setIsLoaded(true);
              const clientResponse = response.data;
              handleSuccess();
          })
          .catch((error) => {
              setIsLoaded(true);
              handleError(error.request.response);
          });

    };

    return (
        <>
            <AdvancedBreadcrumb numDossier={dossier.numDossier} hideParams={true}/>
            <h1 className={styles.pageTitle}>Liste des Debours</h1>
            
            <span className={styles.filter_span}>
                <TableFilter columns={[
                    { key: 'debours', label: 'Debours/Prestation', inputType : 'text' },
                    { key: 'mode', label: 'Mode de paiement' , inputType : 'select' , options: modes},
                    {key : 'mont', label:'Mont Debours' , inputType : 'number'}
                ]} onFilterChange={handleFilterChangeWrapper} />
                <span className={styles.buttons_span}>
                    <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' onClick={handleNouveauClick} />
                    {showForm && <TabDebours onClose={handleFormClose} 
                                               onAjouter={handleAjouter} 
                                               onFileUpload={handleFileUpload} 
                                               onFileUploadClick={handleFileUploadClick}
                                               inputFile={inputFile}
                                               modes = {modes}
                                               types = {types} />} 
              
                </span>
            </span>
            {!isLoaded ? ( // Conditional rendering based on the loading state
            <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <>
            <ReusableTable data={filteredData} headers={headers} itemsPerPage={8} addlink={false}/>
            <span className={styles.container}>
              <span className={filterStyles.container}>
                  <InputField display="labelonleft" label="Total (DA)" size="average" type="number" value={montTotal} readOnly = {true} />
              </span>
            </span>
            </> 

            )}
            {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
            </>
    );
}

export default DeboursComptabilite