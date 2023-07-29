// HomePage.js
import React , {useState} from 'react';
import Breadcrumb from '../components/breadcrumb';
import { useParams } from 'react-router-dom';
import styles from './gestionClients.module.css';
import buttonStyles from '../components/button.module.css';
import filterStyles from '../components/tableFilter.module.css';
import TableFilter from '../components/tableFilter';
import ReusableTable from '../components/reusableTable';

const headers = ['Montant', 'Date'];
const clientData = [
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
    {montant: 20.0000, date: '2023-07-26'},
  ];

const listeRS = [
                {id : 1, raisonSociale : 'djezzy', sommeDue : 30.000},
                {id : 2, raisonSociale : 'ooredoo', sommeDue : 40.000},
            ]
const DetailsClient = () => {
    
    const [selectedClient, setSelectedClient] = useState(listeRS[0]);
    const [paymentAmount, setPaymentAmount] = useState(selectedClient.sommeDue);

    const handleClientChange = (event) => {
        const selectedClientId = parseInt(event.target.value);
        const selectedClient = listeRS.find((client) => client.id === selectedClientId);
        setSelectedClient(selectedClient);
        setPaymentAmount(selectedClient.sommeDue);
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
                        {client.raisonSociale}
                    </option>
                    ))}
                </select>
                </div>
                <label className={filterStyles.label_style}>Somme Due:</label>
                <input
                    type="number"
                    value={paymentAmount}
                />
            </span>
            
            <span className={styles.buttons_span}>
                <button className={`${buttonStyles.secondary}`} children='Actualiser' />    
                <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau' />
            </span>
            </span>
            
            
            <ReusableTable data={clientData} headers={headers} itemsPerPage={8} />
            
        </>
       
    );
};

export default DetailsClient;
