import React , {useState,useEffect} from 'react';
import Breadcrumb from '../components/breadcrumb';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import filterStyles from '../components/tableFilter.module.css';
import ReusableTable from '../components/reusableTable';
import AutocompleteInput from '../components/autoCompleteInput';
import AjoutVersement from './AjoutVersement';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import { openPageBasedOnId , reloadPage , openPage , handleFilterChange} from '../Utils/actionUtils';

const DetailsClient = () => {
    const { id } = useParams();
    console.log(id);

    const [errorMessages, setErrorMessages] = useState({});
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    //entete du tableau des versements
    const headers = ['Num Versement', 'Date','Montant (DA)'];   
    useEffect(() => {
        // Create axios requests for both data fetching
        const client = axios.get(`/api/clients/${id}/`); // Replace with your other endpoint
        const versements = axios.get(`/api/clients/${id}/versements/`);

        // Use Promise.all to wait for both requests to complete
        Promise.all([client, versements])
          .then((responses) => {
            const clientResponse = responses[0].data;
            const versementsResponse = responses[1].data;
            console.log(clientResponse);
            console.log(versementsResponse);
            setSelectedClient(clientResponse);
            setPaymentAmount(clientResponse.sommeDue)
            setVersements(versementsResponse);
            setIsLoaded(true);
          })
          .catch((error) => {
            setIsLoaded(true);
            console.log(error.request.response);
            handleError(error.request.response);     
          });
      }, [id]); // Add 'id' as a dependency
    
    //Trouver la raison sociale à partir de la liste des client existant

    //Mette à jour le client selectionné à partir de la liste déroulante
    const [selectedClient, setSelectedClient] = useState([]);


    //Mette à jour la somme due du client selectionné
    const [paymentAmount, setPaymentAmount] = useState();
    const [versements, setVersements] = useState([]);

    //Controler le fomrulaire d'ajout de versement
    const [showForm, setShowForm] = useState(false);

    const handleNouveauClick = () => {
      setShowForm(true);
    };
  
    const handleFormClose = () => {
      setShowForm(false);
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
      reloadPage();    };
        
    
    //Controler l'ajout d'un versement 
    const handleAjouter = (data) => {
        console.log("this is the sent data");
        console.log(data);
        setIsLoaded(false);
        axios
            .post(`/api/clients/${id}/versements/`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setIsLoaded(true);
                const clientResponse = response.data;
                console.log(clientResponse);
                handleSuccess();
            })
            .catch((error) => {
                setIsLoaded(true);
                handleError(error.request.response);
            });

      };
    return (
        <>
            <Breadcrumb hideParams={true} />
            <h1 className={styles.pageTitle}>Suivi des Paiements et Versements d’un client</h1>
            {!isLoaded ? ( // Conditional rendering based on the loading state
            <div className={styles.loader_container}><span className={styles.loader}></span></div> // Replace with your loader component or CSS
            ) : (
            <span className={styles.filter_span}>
            <span className={filterStyles.container}>
                <InputField display="labelonleft" label="Raison sociale" size="verylarge" type="text" value={selectedClient.raisonSociale} readOnly = {true} />
                <InputField display="labelonleft" label="Somme Due (DA)" size="average" type="number" value={paymentAmount} readOnly = {true} />
            </span>
            
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} children='Actualiser' onClick={reloadPage} />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' onClick={handleNouveauClick} />
                {showForm && <AjoutVersement onClose={handleFormClose} onAjouter={handleAjouter} />}
            </span>
            </span>)}
            
            
            <ReusableTable data={versements} headers={headers} itemsPerPage={8} addlink={false} addactions={false} />

            {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)} />}
            {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
        </>
       
    );
};

export default DetailsClient;
