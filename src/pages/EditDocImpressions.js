import React , {useState, useEffect} from 'react';
import styles from './popupForm.module.css'
import buttonStyles from '../components/button.module.css'
import InputField from '../components/InputField'
import filterStyles from '../components/tableFilter.module.css'
import stylesLoader from './gestionClients.module.css'
import EditBulletinScanner from './Layouts/Tabs/Forms/EditBulletinScanner';
import EditD41 from './Layouts/Tabs/Forms/EditD41';
import EditMainLeveeAHB from './Layouts/Tabs/Forms/EditMainLeveeAHB'
import axios from 'axios';
import EditMainLeveeBureau from './Layouts/Tabs/Forms/EditMainLeveeBureau';
import EditEngagement1030 from './Layouts/Tabs/Forms/EditEngagement1030';
import EditFraude from './Layouts/Tabs/Forms/EditFraude';
import EditNoteDetails from './Layouts/Tabs/Forms/EditNoteDetails';
import EditONML from './Layouts/Tabs/Forms/EditONML';
import SuccessMessage from '../components/succesMessage';
import { reloadPage} from '../Utils/actionUtils';
import ErrorMessage from '../components/errorMessage';



function EditDocImpressions({id, dossier, declaration, onAjouter, onClose}) {


    const [designation, setDesignation] = useState('');
    const [isLoaded, setIsLoaded] = useState(true);
    const [errorMessages, setErrorMessages] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

          // Controle d'erreurs
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

    const handleAjouterBulletinScanner = (data) => {
        const bs = {
            IPCOC: data.IPCOC,
            inspecteur: data.inspecteur,
            service: data.service,
            natureMarchandise: data.natureMarchandisePk,
            numDeclaration: data.numDeclaration,
            dateDeclaration: data.dateDeclaration,
            emballages: data.emballages
          }

          const bsEdited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/bulletin-scanner/`, JSON.stringify(bs), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const bsResponse = response.data; 
                handleSuccess();
            })
            .catch((error) => {
                handleError(error.request.response);
            });
          
        }

    const handleAjouterD41 = (data) => {
        const d41 = {
            bureauDouane: data.bureauDouanePk,
            lieuEntreposage: data.lieuEntreposagePk,
            numRepertoire: data.numRep,
            natureMarchandise: data.natureMarchandisePk,
            anneeGros: data.anneeGros,
            numGros: data.numGros,
            numArticle: data.numArticle,
            sg: data.sg,
            numTitreTransport: data.numTitreTransport,
            nbrColis: data.nbrColis,
            poidsBrut: data.poidsBrut,
            lieu: data.lieu,
            date: data.date,
          }

          const d41Edited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/d41/`, JSON.stringify(d41), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const d41Response = response.data; 
                handleSuccess();
            })
            .catch((error) => {
                handleError(error.request.response);
            });
          
        }

      const handleAjouterDMLAHB = (data) => {
          const dmlAHB = {
              numLTA: data.numLTA,
              sousLTA: data.numSousLTA,
              numGros: data.numGros,
              numArticle: data.numArticle,
              sg: data.sg,
              dateArrivee: data.dateArrivee,
              numBadge: data.numBadge,
            }
  
            const dmlAHBEdited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/demande-main-levee-ahb/`, JSON.stringify(dmlAHB), {
              headers: {
                'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                  const dmlAHBResponse = response.data; 
                  handleSuccess();
              })
              .catch((error) => {
                  handleError(error.request.response);
              });
            
        }

    const handleAjouterDMLBureau = (data) => {
        const dmlBureau = {
            bureauDouane: data.bureauDouanePk,
            receveurDouane: data.receveurDouane,
            natureMarchandise: data.natureMarchandisePk,
            numGros: data.numGros,
            numArticle: data.numArticle,
            sg: data.sg,
            poidsBrut: data.poidsBrut,
            dateArrivee: data.dateArrivee,
            lieu: data.lieu,
            date: data.date,
          }

          const dmlBureauEdited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/demande-main-levee-bureau/`, JSON.stringify(dmlBureau), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const dmlBureauResponse = response.data; 
                handleSuccess();
            })
            .catch((error) => {
                handleError(error.request.response);
            });
          
        }

    const handleAjouterEngagement1030 = (data) => {
        const e1030Bureau = {
            representant: data.representant,
            raisonSociale: data.raisonSociale,
            adresse: data.adresse,
            numNIF: data.numNIF,
            numRC: data.numRC,
            numRC2: data.numRC2,
            numRC3: data.numRC3,
            numMarchandise: data.numMarchandise,
            paysOrigine: data.paysOriginePk,
            numCertificatOrigine: data.numCertificatOrigine,
            dateCertificatOrigine: data.dateCertificatOrigine,
            numFactureFournisseur: data.numFactureFournisseur,
            dateFactureFournisseur: data.dateFactureFournisseur,
            numBL: data.numBL,
            numDeclaration: data.numDeclaration,
            dateDeclaration: data.dateDeclaration,
            bureauDouane: data.bureauDouanePk,
            lieu: data.lieu,
            date: data.date
          }

          const e1030BureauEdited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/engagement-1030/`, JSON.stringify(e1030Bureau), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const dmlBureauResponse = response.data; 
                handleSuccess();
            })
            .catch((error) => {
                handleError(error.request.response);
            });
          
        }

    const handleAjouterFraude = (data) => {
            
      const fraude = {
          "مديرية_التجارة": data.wilayaPk,
          "مفتشية_الحدود": data.douanePk,
          "المستورد": data.raisonSociale,
          "رقم_السجل": data.numRC,
          "تاريخ_السجل": data.dateRC,
          "العنوان": data.adresse,
          "تعيين_المنتوج": data.natureMarchandise,
          "معروض_1": data.nbrEmb,
          "معروض_2": data.genreEmb,
          "متكون_من": data.nbrColis,
          "الكمية": data.poids,
          "الوحدة": data.unite,
          "رقم_التعريفة": data.sousPosition,
          "رقم_فاتورة_الشراء": data.numFactureFournisseur,
          "تاريخ_فاتورة_الشراء": data.dateFactureFournisseur,
          "القيمة": data.montant,
          "العملة": data.monnaie,
          "سعر_الصرف": data.tauxChange,
          "القيمة_بالدينار": data.montantDZD,
          "الصانع": data.fournisseur,
          "مكان": data.paysOrigine,
          "رقم_الحصة": data.numPart,
          "شهادة_المنشأ": data.typeCertificatOrigine,
          "رقم_شهادة_المنشأ": data.numCertificatOrigine,
          "تاريخ_شهادة_المنشأ": data.dateCertificatOrigine,
          "نوع_المراقبة": data.typeControle.replace(/ /g,""),
          "نوع_شهادة_المراقبة": data.nomCertificatControle.replace(/ /g,""),
          "شهادة_المراقبة": data.typeCertificatControle,
          "رقم_شهادة_المراقبة": data.numCertificatControle,
          "تاريخ_شهادة_المراقبة": data.dateCertificatControle,
          "مرجع_النقل": data.typeTransport,
          "وثائق_النقل": data.documentsTransport,
          "رقم_وثائق_النقل": data.numDocumentTransport,
          "مكان_الانطلاق": data.paysDemarrage,
          "تاريخ_الانطلاق": data.dateDemarrage,
          "مكان_العبور": data.paysEscale,
          "مكان_الوصول": data.paysArriveePk,
          "تاريخ_الوصول": data.dateArrivee
          }

          const fraudeEdited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/fraude/`, JSON.stringify(fraude), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const fraudeResponse = response.data; 
                handleSuccess();
            })
            .catch((error) => {
              console.log(error.request.response)
                handleError(error.request.response);
            });
          
        }

    const handleAjouterONML = (data) => {
        const onml = {
            representant: data.representant,
            numCarteNationale: data.numCarteNationale,
            dateCarteNationale: data.dateCarteNationale,
            lieuCarteNationale: data.lieuCarteNationale,
            numFactureFournisseur: data.numFactureFournisseur,
            dateFactureFournisseur: data.dateFactureFournisseur,
            typeInstrument: data.typeInstrument,
            caracteristiqueMetrologique: data.caracteristiqueMetrologique,
            nombre: data.nombre,
            marque: data.marque,
            paysOrigine: data.paysOriginePk,
            utilisation_commercialisation: data.utilisation_commercialisation==="Utilisation"? 0 : 1,
            secteurUtilisation: data.secteurUtilisation,
            adresseUtilisation: data.adresseUtilisation,
            verbe: data.verbe
          }

          const onmlEdited =  axios.put(`/api/dossiers/${dossier.dossier_pk}/onml/`, JSON.stringify(onml), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const dmlBureauResponse = response.data; 
                handleSuccess();
            })
            .catch((error) => {
                handleError(error.request.response);
            });
          
        }
        
  return (
    <div className={styles.container}>
    <div className={styles.tab}>
        {id == 1?
            <>
              <EditBulletinScanner id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterBulletinScanner} onClose={onClose}/>
              {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
              {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)}  />}
            </>
        : id==2?
            <>
                <EditD41 id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterD41} onClose={onClose}/>
                {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
                {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)}  />}
            </>
        : id==3?
            <>
              <EditMainLeveeAHB id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterDMLAHB} onClose={onClose}/>
              {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
              {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)}  />}
            </>
        : id == 4?
            <>
              <EditMainLeveeBureau id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterDMLBureau} onClose={onClose}/>
              {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
              {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)}  />}
            </>
        : id == 5?
            <>
              <EditEngagement1030 id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterEngagement1030} onClose={onClose}/>
              {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
              {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)}  />}
            </>
        : id == 6?
            <>
              <EditFraude id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterFraude} onClose={onClose}/>
              {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
              {showError && <ErrorMessage onClose={handleErrorClose} errors={errorMessages}  />}
            </>
        : id == 7?
            <EditNoteDetails id={id} onAjouter={onAjouter} onClose={onClose}/>
        : 
          <>
            <EditONML id={id} dossier={dossier} declaration={declaration} onAjouter={handleAjouterONML} onClose={onClose}/>
            {showSuccess && <SuccessMessage onClose={handleSuccessClose}/>}
            {showError && <ErrorMessage onClose={handleErrorClose} errors={JSON.parse(errorMessages)}  />}
          </>
    }
    </div>
    </div>
  )
}

export default EditDocImpressions