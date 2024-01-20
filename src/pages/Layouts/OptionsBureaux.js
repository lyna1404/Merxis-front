import React from 'react'
import styles from '../popupForm.module.css'
import stylesLine from '../listeFacture.module.css';
import buttonStyles from '../../components/button.module.css';
import stylesO from '../options.module.css'
import stylesLoader from '../gestionClients.module.css'
import Breadcrumb from '../../components/breadcrumb'
import TableFilter from '../../components/tableFilter';
import ReusableTable from '../../components/reusableTable';
import ErrorMessage from '../../components/errorMessage';
import CustomMessage from '../../components/customMessage';
import SuccessMessage from '../../components/succesMessage';
import axios from 'axios';
import { reloadPage , handleFilterChange, openPageBasedOnId} from '../../Utils/actionUtils';
import { useState, useEffect, useRef } from 'react';
import { IconDelete, IconEdit } from '../../components/icons';
import TabBureaux from './Tabs/TabBureaux'
import TabRegimes from './Tabs/TabRegimes';

function OptionsBureaux() {


    const [isLoadedBureaux, setIsLoadedBureaux] = useState(false);
    const [filteredBureauxData, setFilteredBureauxData] = useState([]);
    const [errorBureauxMessages, setErrorBureauxMessages] = useState({});
    const [showBureauxDialog, setShowBureauxDialog] = useState(false);
    const [showBureauxError, setShowBureauxError] = useState(false);
    const [showBureauxSuccess, setShowBureauxSuccess] = useState(false);

    const [isLoadedRegimes, setIsLoadedRegimes] = useState(false);
    const [filteredRegimesData, setFilteredRegimesData] = useState([]);
    const [errorRegimesMessages, setErrorRegimesMessages] = useState({});
    const [showRegimesDialog, setShowRegimesDialog] = useState(false);
    const [showRegimesError, setShowRegimesError] = useState(false);
    const [showRegimesSuccess, setShowRegimesSuccess] = useState(false);

    const [activeTab, setActiveTab] = useState("tab1");

    

    // Champs de la partie bureaux
   const [bureaux, setBureaux] = useState([]);
   const [bureauToDelete, setBureauToDelete] = useState([]);
   const [bureauToModify, setBureauToModify] = useState([]);

   const [regimes, setRegimes] = useState([]);
   const [regimeToDelete, setRegimeToDelete] = useState([]);
   const [regimeToModify, setRegimeToModify] = useState([]);



   const headersBureaux = ["Code", "Nom", "Receveur en Doaune", "Actions à faire"]
   const headersRegimes = ["Code", "Designation", "Actions à faire", ""]


    // Récupérer la liste des bureaux 
    useEffect(() => {
        axios.get('/api/bureaux-douane/')
        .then((response) => {
            const bureauData = response.data;
            if (typeof bureauData === 'object' && bureauData !== null) {
              const extractedBureau = Object.values(bureauData).map(item => ({
                id: item.bureauDouane_pk,
                code: item.code,
                nomBureau: item.nomBureau,
                receveurDouane: item.receveurDouane,
              }));
              setBureaux(extractedBureau);
              setFilteredBureauxData(extractedBureau);
              setIsLoadedBureaux(true);
            }
            else {
            console.error('Response data is not a JSON object:', bureauData);
            handleErrorBureaux(bureauData);
            setIsLoadedBureaux(true);
          }
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, []); 
  
    // Récupérer la liste des régimes 
    useEffect(() => {
        axios.get('/api/regimes-douaniers/')
        .then((response) => {
            const regimeData = response.data;
            if (typeof regimeData === 'object' && regimeData !== null) {
              const extractedRegime = Object.values(regimeData).map(item => ({
                id: item.regimeDouanier_pk,
                code: item.code,
                designation: item.designation,
              }));
              setRegimes(extractedRegime);
              setFilteredRegimesData(extractedRegime);
              setIsLoadedRegimes(true);
            }
            else {
            console.error('Response data is not a JSON object:', regimeData);
            handleErrorRegimes(regimeData);
            setIsLoadedRegimes(true);
          }
        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, []); 
  

    const [showBureauxForm, setShowBureauxForm] = useState(false);
    const [showEditBureauxForm, setShowEditBureauxForm] = useState(false);

    const [showRegimesForm, setShowRegimesForm] = useState(false);
    const [showEditRegimesForm, setShowEditRegimesForm] = useState(false);


    const handleBureauFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,bureaux, setFilteredBureauxData);
      };

      const handleRegimeFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,regimes, setFilteredRegimesData);
      };
    

      // Nouveau bureau
      const handleNouveauBureauClick = () => {
        setShowBureauxForm(true);
      };

    const handleBureauFormClose = () => {
        setShowBureauxForm(false);
      };

      // Nouveau regime
      const handleNouveauRegimeClick = () => {
        setShowRegimesForm(true);
      };

    const handleRegimeFormClose = () => {
        setShowRegimesForm(false);
      };


      // Modifier bureau
      const handleEditBureauxClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setBureauToModify(rowId);
        setShowEditBureauxForm(true);
      };

    const handleBureauxEditFormClose = () => {
        setShowEditBureauxForm(false);
      };

      // Modifier regime
      const handleEditRegimesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setRegimeToModify(rowId);
        setShowEditRegimesForm(true);
      };

    const handleRegimesEditFormClose = () => {
        setShowEditRegimesForm(false);
      };
        
      // Controle d'erreurs

      const handleErrorBureaux = (errors) => {
        setShowBureauxError(true);
        setErrorBureauxMessages(errors);
      };

      const handleErrorRegimes = (errors) => {
        setShowRegimesError(true);
        setErrorRegimesMessages(errors);
      };
      

      const handleBureauxErrorClose = () => {
        setShowBureauxError(false);
      };

      const handleRegimesErrorClose = () => {
        setShowRegimesError(false);
      };

      const handleBureauxDialogClose = () => {
        setBureauToDelete(null);
        setShowBureauxDialog(false);
      };

      const handleRegimesDialogClose = () => {
        setRegimeToDelete(null);
        setShowRegimesDialog(false);
      };


      const handleBureauxSuccess = () => {
          setShowBureauxSuccess(true);
        };

        const handleRegimesSuccess = () => {
            setShowRegimesSuccess(true);
          };
        

        const handleBureauxSuccessClose = () => {
            setShowBureauxSuccess(false);
            window.close();
          };

        const handleRegimesSuccessClose = () => {
            setShowRegimesSuccess(false);
            window.close();
          };

        const handleBureauxSuccessDeleteClose = () => {
            setShowBureauxSuccess(false);
            reloadPage();
          };

        const handleRegimesSuccessDeleteClose = () => {
            setShowRegimesSuccess(false);
            reloadPage();
          };

        //Controler l'ajout d'un bureau 
       const handleAjouterBureau = (data) => {
        
        setIsLoadedBureaux(false);

        const bureau = {
          code: data.code,
          nomBureau: data.nom,
          receveurDouane: data.receveurDouane,
        };
       
        const bureauCreated =  axios.post(`/api/bureaux-douane/`, JSON.stringify(bureau), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const bureauResponse = response.data;   
              setIsLoadedBureaux(true);
              handleBureauxSuccess();
          })
          .catch((error) => {
              setIsLoadedBureaux(true)
              console.log(error.request.response);  
              handleErrorBureaux(error.request.response);
          });
       };

       //Controler l'ajout d'un regime
        const handleAjouterRegime = (data) => {
        
        setIsLoadedRegimes(false);

        const regime = {
          code: data.code,
          designation: data.designation,
        };
       
        const regimeCreated =  axios.post(`/api/regimes-douaniers/`, JSON.stringify(regime), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const regimeResponse = response.data;   
              setIsLoadedRegimes(true);
              handleRegimesSuccess();
          })
          .catch((error) => {
              setIsLoadedRegimes(true)
              console.log(error.request.response);  
              handleErrorRegimes(error.request.response);
          });
       };


        //Controler la modification d'un bureau 
       const handleModifierBureau = (data) => {
        
        setIsLoadedBureaux(false);

        const bureau = {
            code: data.code,
            nomBureau: data.nom,
            receveurDouane: data.receveurDouane,
          };
         
        const bureauModified =  axios.put(`/api/bureaux-douane/${bureauToModify}/`, JSON.stringify(bureau), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const bureauResponse = response.data;   
              setIsLoadedBureaux(true);
              setBureauToModify(null);
              handleBureauxSuccess();
          })
          .catch((error) => {
            setIsLoadedBureaux(true)
              console.log(error.request.response);  
              setBureauToModify(null);
              handleErrorBureaux(error.request.response);
          });
       };

        //Controler la modification d'un régime 
        const handleModifierRegime = (data) => {
        
            setIsLoadedRegimes(false);
    
            const regime = {
                code: data.code,
                designation: data.designation,
              };
                 
            const regimeModified =  axios.put(`/api/regimes-douaniers/${regimeToModify}/`, JSON.stringify(regime), {
              headers: {
                'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                  const regimeResponse = response.data;   
                  setIsLoadedRegimes(true);
                  setRegimeToModify(null);
                  handleRegimesSuccess();
              })
              .catch((error) => {
                setIsLoadedRegimes(true)
                  console.log(error.request.response);  
                  setRegimeToModify(null);
                  handleErrorRegimes(error.request.response);
              });
           };

    
      // Suppression d'un bureau
      const handleBureauDeleteClick = (event) => {
        console.log("delete toggled");
        const rowId = event.target.closest('tr').id;
        console.log("rowID", rowId)
        setBureauToDelete(rowId);
        setShowBureauxDialog(true);
      };

      const handleDeleteBureau = () => {
        setShowBureauxDialog(false);
        setIsLoadedBureaux(false);
        axios
         .delete(`/api/bureaux-douane/${bureauToDelete}/`)
         .then(() => {
            setShowBureauxDialog(false);
            setIsLoadedBureaux(true);
            console.log("successfully deleted");
            handleBureauxSuccess();
            setBureauToDelete(null);
         })
         .catch((error) => {
            setShowBureauxDialog(false);
            setIsLoadedBureaux(true);
            console.log('Delete request error:', error);
            handleErrorBureaux(error.request.response);
            setBureauToDelete(null);
         });
      };

      // Suppression d'un regime
      const handleRegimeDeleteClick = (event) => {
        console.log("delete toggled");
        const rowId = event.target.closest('tr').id;
        console.log("rowID", rowId)
        setRegimeToDelete(rowId);
        setShowRegimesDialog(true);
      };

      const handleDeleteRegime = () => {
        setShowRegimesDialog(false);
        setIsLoadedRegimes(false);
        axios
         .delete(`/api/regimes-douaniers/${regimeToDelete}/`)
         .then(() => {
            setShowRegimesDialog(false);
            setIsLoadedRegimes(true);
            console.log("successfully deleted");
            handleRegimesSuccess();
            setRegimeToDelete(null);
         })
         .catch((error) => {
            setShowRegimesDialog(false);
            setIsLoadedRegimes(true);
            console.log('Delete request error:', error);
            handleErrorRegimes(error.request.response);
            setRegimeToDelete(null);
         });
      };

      const tableActionsBureaux = [
        <IconDelete key="delete" onClick={handleBureauDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditBureauxClick} />,
      ];

      const tableActionsRegimes = [
        <IconDelete key="delete" onClick={handleRegimeDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditRegimesClick} />,
      ];

    // Switching entre les parties
    const handleTab1 = () => {
        setActiveTab("tab1")
    }
    const handleTab2 = () => {
        setActiveTab("tab2")
    }

  return (
    <>
     <Breadcrumb/>
      <div className={stylesO.contentWrapper}>
      <div className={styles.navbar}>
                <ul>
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Bureaux Douanes</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Régimes Douanier</li>
                </ul>
        </div>
        {!(isLoadedBureaux && isLoadedRegimes) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
            {activeTab==="tab1"?
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Bureaux</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'code', label: 'Code' ,  inputType : 'text'},
                            { key: 'nomBureau', label: 'Nom' ,  inputType : 'text'},
                            { key: 'receveurDouane', label: 'Receveur en Douane', inputType : 'text' },
            ]} onFilterChange={handleBureauFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredBureauxData} headers={headersBureaux} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsBureaux} />
            {showBureauxError && <ErrorMessage onClose={handleBureauxErrorClose} errors={errorBureauxMessages} />}
            {showBureauxDialog && <CustomMessage onClose={handleBureauxDialogClose} onConfirm={handleDeleteBureau} message={"Souhaitez-vous vraiment supprimer ce bureau douane ?"} />}
            {showBureauxSuccess && <SuccessMessage onClose={handleBureauxSuccessDeleteClose} />}
            {showEditBureauxForm && <TabBureaux onClose={handleBureauxEditFormClose} 
                                    onAjouter={handleModifierBureau} 
                                    isEdit={true}
                                    toModify={bureauToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauBureauClick}/> 
            {showBureauxForm && <TabBureaux onClose={handleBureauFormClose} 
                                    onAjouter={handleAjouterBureau} 
                                    isEdit={false}
                                    />}  
            {showBureauxError && <ErrorMessage onClose={handleBureauxErrorClose} errors={errorBureauxMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            :
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Régimes</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'code', label: 'Code' ,  inputType : 'text'},
                            { key: 'designation', label: 'Designation' ,  inputType : 'text'},
            ]} onFilterChange={handleRegimeFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredRegimesData} headers={headersRegimes} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsRegimes} />
            {showRegimesError && <ErrorMessage onClose={handleRegimesErrorClose} errors={errorRegimesMessages} />}
            {showRegimesDialog && <CustomMessage onClose={handleRegimesDialogClose} onConfirm={handleDeleteRegime} message={"Souhaitez-vous vraiment supprimer ce régime douanier ?"} />}
            {showRegimesSuccess && <SuccessMessage onClose={handleRegimesSuccessDeleteClose} />}
            {showEditRegimesForm && <TabRegimes onClose={handleRegimesEditFormClose} 
                                    onAjouter={handleModifierRegime} 
                                    isEdit={true}
                                    toModify={regimeToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauRegimeClick}/> 
            {showRegimesForm && <TabRegimes onClose={handleRegimeFormClose} 
                                    onAjouter={handleAjouterRegime} 
                                    isEdit={false}
                                    />}  
            {showRegimesError && <ErrorMessage onClose={handleRegimesErrorClose} errors={errorRegimesMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            }
        </>
        )}

     </div>

    </>

  )
}

export default OptionsBureaux