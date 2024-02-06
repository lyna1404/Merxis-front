import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'


function EditBulletinScanner({id, dossier, declaration, onAjouter, onClose}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedEmb, setIsLoadedEmb] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');
    const [IPCOC, setIPCOC] = useState('');
    const [inspecteur, setInspecteur] = useState('');
    const [service, setService] = useState('');
    const [emballages, setEmballages] = useState();
    const [numDeclaration, setNumDeclaration] = useState('');
    const [dateDeclaration,setDateDeclaration] = useState('');
    const [natureMarchandisePk, setNatureMarchandisePk] = useState(dossier.natureMarchandise?dossier.natureMarchandise.natureMarchandise_pk:'');
    const [natureMarchandise, setNatureMarchandise] = useState('');
    
   
    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau debours
        onAjouter({emballages, natureMarchandisePk, IPCOC, inspecteur, service, numDeclaration, dateDeclaration});
        // Fermer le Pop Up
        //onClose();
    };

    // Controle d'erreurs
      const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };


    useEffect(() => {
        const emb =  axios.get(`/api/dossiers/${dossier.dossier_pk}/emballages/`);
        const bs =  axios.get(`/api/dossiers/${dossier.dossier_pk}/bulletin-scanner/`);

        Promise.all([emb,bs])
        .then((responses) => {
            const emballagesData = responses[0].data;
            if (typeof emballagesData === 'object' && emballagesData !== null) {
              const extractedEmballages = Object.keys(emballagesData).map((key) => (
              emballagesData[key].emballageDossier_pk
              ));
              setEmballages(extractedEmballages);
              setIsLoadedEmb(true);
            }
            else {
            console.error('Response data is not a JSON object:', emballagesData);
            handleError(emballagesData);
            setIsLoadedEmb(true);
          }
          const docData = responses[1].data;
            setNatureMarchandise(docData.natureMarchandise);
            setNumDeclaration(docData.numDeclaration);
            setDateDeclaration(docData.dateDeclaration);
            setIPCOC(docData.IPCOC);
            setInspecteur(docData.inspecteur);
            setService(docData.service);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              setIsLoaded(true);
              setIsLoadedEmb(true);
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, [dossier.dossier_pk]);



  return (
    <div className={styles.tab2}>
        <form onSubmit={handleSubmit}>
            <h2>Formulaire Bulletin Scanner</h2>
            {!(isLoaded && isLoadedEmb) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <InputField display="labelontop" label="IPCOC" size="average" type="text" value={IPCOC} onChange={(e) => setIPCOC(e.target.value)} />
                        <InputField display="labelontop" label="Inspecteur" size="overaverage" type="text" value={inspecteur} onChange={(e) => setInspecteur(e.target.value)}/>
                        <InputField display="labelontop" label="Service" size="overaverage" type="text" value={service} onChange={(e) => setService(e.target.value)} />
                        <InputField display="labelontop" label="Nature marchandise" size="large" type="text" value={natureMarchandise} readOnly={true} />
                        <InputField display="labelontop" label="N° Declaration" size="belowaverage" type="text" value={numDeclaration} readOnly={true} />
                        <InputField display="labelontop" label="Date declaration" size="belowaverage" type="text" value={dateDeclaration} readOnly={true}/>


                    </span>
                </div>
                    <span className={styles.buttonSpan}>
                        <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
                        <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                    </span>
                </>
            )}
        </form>
    </div>
  )
}

export default EditBulletinScanner