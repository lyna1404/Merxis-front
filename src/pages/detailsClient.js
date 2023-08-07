import React , {useState,useEffect} from 'react';
import Breadcrumb from '../components/breadcrumb';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import filterStyles from '../components/tableFilter.module.css';
import ReusableTable from '../components/reusableTable';
import AjoutVersement from './AjoutVersement';
import { useParams, useNavigate, Navigate } from 'react-router-dom';


const DetailsClient = () => {
    let navigate = useNavigate();
    //entete du tableau des versements
    const headers = ['Montant (DA)', 'Date'];

    //Exemple d'une historique de versements
    const clientData = [
        {montant: 100000, date: '2023-04-26'},
        {montant: 200000, date: '2023-05-26'},
        {montant: 300000, date: '2023-02-26'},
        {montant: 400000, date: '2023-05-25'},
        {montant: 500000, date: '2023-01-26'},
        {montant: 6500000, date: '2023-08-26'},
        {montant: 2040000, date: '2023-04-26'},
        {montant: 50046000, date: '2023-07-26'},
        {montant: 6000040, date: '2023-07-24'},
    ];

    //Liste des clients
    const listeRS = [
        {  id: 'Djezzy', somme: 30000},
        {  id: 'Ooredoo', somme: 40000},
        {  id: 'Maystro delivery', somme: 50000},
        {  id: 'adcf', somme: 10000},
            
    ]
    
    //Recuperer la raison sociale choisie
    const { slug } = useParams();

    //Trouver la raison sociale à partir de la liste des client existant
    const rsInitiale = listeRS.find((client) => client.id === slug);

    //Mette à jour le client selectionné à partir de la liste déroulante
    const [selectedClient, setSelectedClient] = useState(rsInitiale);
    //Mette à jour la somme due du client selectionné
    const [paymentAmount, setPaymentAmount] = useState(selectedClient.somme);

    //Mettre à jour l'historique des versements du client
    const [updatedClientData, setUpdatedClientData] = useState(clientData);

    //Controler le changement du client selectionné
    const handleClientChange = (event) => {
        const selectedClientId = event.target.value;
        navigate(`/gestionClients/${selectedClientId}`)
        window.location.reload();
        
    };

    //Controler le fomrulaire d'ajout de versement
    const [showForm, setShowForm] = useState(false);

    const handleNouveauClick = () => {
      setShowForm(true);
    };

    const handleReloadClick = () => {
        window.location.reload(false)
    };
  
    const handleFormClose = () => {
      setShowForm(false);
    };
    
    //Controler l'ajout d'un versement 
    const handleAjouter = (data) => {
        setUpdatedClientData((prevClientData) => [data,...prevClientData]);
      };
    return (
        <>
            <Breadcrumb hideParams={true} />
            <h1 className={styles.pageTitle}>Suivi des Paiements et Versements d’un client</h1>
            <span className={styles.filter_span}>
            <span className={filterStyles.container}>
                <label className={filterStyles.label_style}>Raison Sociale:</label>
                <div className={filterStyles.selectWrapper}>
                <select value={selectedClient.id} onChange={handleClientChange}>
                    {listeRS.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.id}
                    </option>
                    ))}
                </select>
                </div>
                <label className={filterStyles.label_style}>Somme due (DA):</label>
                <input
                    type="number"
                    value={paymentAmount}
                    readOnly = {true}
                />
            </span>
            
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} children='Actualiser' onClick={handleReloadClick} />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' onClick={handleNouveauClick} />
                {showForm && <AjoutVersement onClose={handleFormClose} onAjouter={handleAjouter} />}
            </span>
            </span>
            
            
            <ReusableTable data={updatedClientData} headers={headers} itemsPerPage={8} addlink={false} />
        </>
       
    );
};

export default DetailsClient;
