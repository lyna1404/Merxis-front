import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import labelStyles from "../../../../components/inputField.module.css";
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'
import selectStyles from '../../../listeBordereau.module.css';



function EditONML({id, dossier, declaration, onAjouter, onClose}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [representant, setRepresentant] = useState(dossier.client? dossier.client.representant : '');
    const [numCarteNationale, setNumCarteNationale] = useState(dossier.client? dossier.client.numCarteNationale : '');
    const [dateCarteNationale, setDateCarteNationale] = useState(dossier.client? dossier.client.dateCarteNationale : '');
    const [lieuCarteNationale, setLieuCarteNationale] = useState(dossier.client? dossier.client.lieuCarteNationale : '');
    const [numFactureFournisseur, setNumFactureFournisseur] = useState(dossier.numFactureFournisseur? dossier.numFactureFournisseur:'');
    const [dateFactureFournisseur, setDateFactureFournisseur] = useState(dossier.dateFactureFournisseur? dossier.dateFactureFournisseur:'');
    const [typeInstrument, setTypeInstrument] = useState('');
    const [caracteristiqueMetrologique, setCaracteristiqueMetrologique] = useState('');
    const [nombre, setNombre] = useState('');
    const [marque, setMarque] = useState('');
    const [paysOriginePk, setPaysOriginePk] = useState(declaration.paysAchatVente? declaration.paysAchatVente.pays_pk : null);
    const [paysOrigine, setPaysOrigine] = useState(declaration.paysAchatVente? declaration.paysAchatVente.nom : '');
    const [utilisation_commercialisation, setUtilisation_commercialisation]= useState("Utilisation");
    const [secteurUtilisation, setSecteurUtilisation] = useState('');
    const [adresseUtilisation, setAdresseUtilisation] = useState('');
    const [verbe, setVerbe] = useState('Présenter');

    const listeRaisons = [{index:1, value:"Utilisation"},{index:2, value:"Commercialisation"}];

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({representant, numCarteNationale, dateCarteNationale, lieuCarteNationale, typeInstrument, caracteristiqueMetrologique, nombre, marque, paysOriginePk, 
            utilisation_commercialisation, secteurUtilisation, numFactureFournisseur, dateFactureFournisseur, secteurUtilisation, adresseUtilisation, verbe});
        // Fermer le Pop Up
        //onClose();
    };


    useEffect(() => {
        axios.get(`/api/dossiers/${dossier.dossier_pk}/onml/`)

        .then((response) => {
            const docData = response.data;
            setNumFactureFournisseur(docData.numFactureFournisseur);
            setDateFactureFournisseur(docData.dateFactureFournisseur);
            setTypeInstrument(docData.typeInstrument);
            setCaracteristiqueMetrologique(docData.caracteristiqueMetrologique);
            setNombre(docData.nombre);
            setMarque(docData.marque);
            setUtilisation_commercialisation(docData.utilisation_commercialisation==0?"Utilisation":"Commercialisation");
            setSecteurUtilisation(docData.secteurUtilisation);
            setAdresseUtilisation(docData.adresseUtilisation);
            setVerbe(docData.verbe?docData.verbe:"Présenter");
            setIsLoaded(true);
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              setIsLoaded(true);
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, [dossier.dossier_pk]);


  return (
    <div className={styles.tab2}>
        <form onSubmit={handleSubmit}>
            <h2>Formulaire ONML</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="Représentant du client" size="overaverage" type="text" value={representant} readOnly={true} />
                        <InputField display="labelontop" label="N° Carte nationale" size="average" type="text" value={numCarteNationale} readOnly={true} />
                        <InputField display="labelontop" label="Date carte nationale" size="belowaverage" type="text" value={dateCarteNationale} readOnly={true} />
                        <InputField display="labelontop" label="Lieu carte nationale" size="average" type="text" value={lieuCarteNationale} readOnly={true} />
                        <InputField display="labelontop" label="N° Facture fournisseur" size="overaverage" type="text" value={numFactureFournisseur} readOnly={true} />
                        <InputField display="labelontop" label="Date facture fournisseur" size="belowaverage" type="text" value={dateFactureFournisseur} readOnly={true} />
                        <InputField display="labelontop" label="Type instrument" size="large" type="text" value={typeInstrument} onChange={(e) => setTypeInstrument(e.target.value)}/>
                        <InputField display="labelontop" label="Caractéristiques métrologiques" size="large" type="text" value={caracteristiqueMetrologique} onChange={(e) => setCaracteristiqueMetrologique(e.target.value)} />
                        <InputField display="labelontop" label="Nombre" size="small" type="number" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        <InputField display="labelontop" label="Marque" size="overaverage" type="text" value={marque} onChange={(e) => setMarque(e.target.value)}/>
                        <InputField display="labelontop" label="Pays d'origine" size="overaverage" type="text" value={paysOrigine} readOnly={true} />
                        <label className={labelStyles.labelontop}>Raison d'importation
                            <select value={utilisation_commercialisation} className={labelStyles.average}  onChange={(e) => setUtilisation_commercialisation(e.target.value)}>
                                <option value="">Sélectionner</option>
                                {listeRaisons.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelontop" label="Secteur d'utilisation" size="average" type="text" value={secteurUtilisation} onChange={(e) => setSecteurUtilisation(e.target.value)} />
                        <InputField display="labelontop" label="Adresse d'utilisation" size="large" type="text" value={adresseUtilisation} onChange={(e) => setAdresseUtilisation(e.target.value)} />
                        <InputField display="labelontop" label="Je m'engage à (Verbe)" size="overaverage" type="text" value={verbe} onChange={(e) => setVerbe(e.target.value)} />

                    </span>
                </div>
                    <span className={styles.buttonSpan}>
                        <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
                        <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                    </span>
                    <div className={styles.footer}/>
                </>
            )}
        </form>
    </div>
  )
}

export default EditONML