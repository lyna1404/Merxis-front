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
import { reloadPage , handleFilterChange} from '../../Utils/actionUtils';
import { useState, useEffect} from 'react';
import { IconDelete, IconEdit } from '../../components/icons';
import TabCompagnies from './Tabs/TabCompagnies'
import TabTypes from './Tabs/TabTypes'
import TabMoyensTransport from './Tabs/TabMoyensTransport'

function OptionsTransports() {

    const [filteredMoyenData, setFilteredMoyenData] = useState([]);
    const [errorMoyenMessages, setMoyenErrorMessages] = useState({});
    const [showMoyenDialog, setShowMoyenDialog] = useState(false);
    const [showMoyenError, setShowMoyenError] = useState(false);
    const [showMoyenSuccess, setShowMoyenSuccess] = useState(false);
    const [isLoadedMoyen, setIsLoadedMoyen] = useState(false);

    const [isLoadedCompagnies, setIsLoadedCompagnies] = useState(false);
    const [filteredCompagniesData, setFilteredCompagniesData] = useState([]);
    const [errorCompagniesMessages, setErrorCompagniesMessages] = useState({});
    const [showCompagniesDialog, setShowCompagniesDialog] = useState(false);
    const [showCompagniesError, setShowCompagniesError] = useState(false);
    const [showCompagniesSuccess, setShowCompagniesSuccess] = useState(false);

    const [isLoadedTypes, setIsLoadedTypes] = useState(false);
    const [filteredTypesData, setFilteredTypesData] = useState([]);
    const [errorTypesMessages, setErrorTypesMessages] = useState({});
    const [showTypesDialog, setShowTypesDialog] = useState(false);
    const [showTypesError, setShowTypesError] = useState(false);
    const [showTypesSuccess, setShowTypesSuccess] = useState(false);

    const [activeTab, setActiveTab] = useState("tab1");

    

    // Champs de la partie transport
   const [moyens, setMoyens] = useState([]);
   const [moyenToDelete, setMoyenToDelete] = useState([]);
   const [moyenToModify, setMoyenToModify] = useState([]);


   const [compagnies, setCompagnies] = useState([]);
   const [compagnieToDelete, setCompagnieToDelete] = useState([]);
   const [compagnieToModify, setCompagnieToModify] = useState([]);

   const [types, setTypes] = useState([]);
   const [typeToDelete, setTypeToDelete] = useState([]);
   const [typeToModify, setTypeToModify] = useState([]);




   const headersMoyen = ["Nom", "Actions à faire", "",]
   const headerscompagnies = ["Nom", "Adresse", "Tel", "E-mail", "Type", "Actions à faire"]
   const headersTypes = ["Type", "Actions à faire", ""]

    // Récupérer la liste des moyens 
    useEffect(() => {
      axios.get('/api/moyens-transport/')
      .then((response) => {
          const moyenData = response.data;
          if (typeof moyenData === 'object' && moyenData !== null) {
            const extractedMoyen = Object.values(moyenData).map(item => ({
              id: item.moyenTransport_pk,
              nom: item.nom,
            }));
            setMoyens(extractedMoyen);
            setFilteredMoyenData(extractedMoyen);
            setIsLoadedMoyen(true);
          }
          else {
          console.error('Response data is not a JSON object:', moyenData);
          handleMoyenError(moyenData);
          setIsLoadedMoyen(true);
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

    // Récupérer la liste des compagnies 
    useEffect(() => {
        axios.get('/api/compagnies-transport/')
        .then((response) => {
            const compagnieData = response.data;
            if (typeof compagnieData === 'object' && compagnieData !== null) {
              const extractedCompagnie = Object.values(compagnieData).map(item => ({
                id: item.compagnie_pk,
                nom: item.nom,
                adresse: item.adresse,
                tel: item.tel,
                email: item.email,
                type: item.typeCompagnie.type,
              }));
              setCompagnies(extractedCompagnie);
              setFilteredCompagniesData(extractedCompagnie);
              setIsLoadedCompagnies(true);
            }
            else {
            console.error('Response data is not a JSON object:', compagnieData);
            handleErrorCompagnies(compagnieData);
            setIsLoadedCompagnies(true);
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
  
    // Récupérer la liste des types 
    useEffect(() => {
        axios.get('/api/types-compagnie/')
        .then((response) => {
            const typeData = response.data;
            if (typeof typeData === 'object' && typeData !== null) {
              const extractedType = Object.values(typeData).map(item => ({
                id: item.typeCompagnie_pk,
                type: item.type,
              }));
              setTypes(extractedType);
              setFilteredTypesData(extractedType);
              setIsLoadedTypes(true);
            }
            else {
            console.error('Response data is not a JSON object:', typeData);
            handleErrorTypes(typeData);
            setIsLoadedTypes(true);
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
  

    const [showMoyenForm, setShowMoyenForm] = useState(false);
    const [showEditMoyenForm, setShowEditMoyenForm] = useState(false);

    const [showCompagniesForm, setShowCompagniesForm] = useState(false);
    const [showEditCompagniesForm, setShowEditCompagniesForm] = useState(false);

    const [showTypesForm, setShowTypesForm] = useState(false);
    const [showEditTypesForm, setShowEditTypesForm] = useState(false);

    const handleMoyenFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,moyens, setFilteredMoyenData);
      };

    const handleCompagnieFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,compagnies, setFilteredCompagniesData);
      };

      const handleTypeFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,types, setFilteredTypesData);
      };
    
      // Nouveau moyen
    const handleNouveauMoyenClick = () => {
        setShowMoyenForm(true);
      };

    const handleMoyenFormClose = () => {
        setShowMoyenForm(false);
      };

      // Nouvelle compagnie
      const handleNouveauCompagnieClick = () => {
        setShowCompagniesForm(true);
      };

    const handleCompagnieFormClose = () => {
        setShowCompagniesForm(false);
      };

      // Nouveau type
      const handleNouveauTypeClick = () => {
        setShowTypesForm(true);
      };

    const handleTypeFormClose = () => {
        setShowTypesForm(false);
      };

      // Modifier moyen
      const handleMoyenEditClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setMoyenToModify(rowId);
        setShowEditMoyenForm(true);
      };

    const handleMoyenEditFormClose = () => {
        setShowEditMoyenForm(false);
      };

      // Modifier compagnie
      const handleEditCompagniesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setCompagnieToModify(rowId);
        setShowEditCompagniesForm(true);
      };

    const handleCompagniesEditFormClose = () => {
        setShowEditCompagniesForm(false);
      };

      // Modifier regime
      const handleEditTypesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setTypeToModify(rowId);
        setShowEditTypesForm(true);
      };

    const handleTypesEditFormClose = () => {
        setShowEditTypesForm(false);
      };
        
      // Controle d'erreurs
      const handleMoyenError = (errors) => {
        setShowMoyenError(true);
        setMoyenErrorMessages(errors);
      };

      const handleErrorCompagnies = (errors) => {
        setShowCompagniesError(true);
        setErrorCompagniesMessages(errors);
      };

      const handleErrorTypes = (errors) => {
        setShowTypesError(true);
        setErrorTypesMessages(errors);
      };
      
      const handleMoyenErrorClose = () => {
        setShowMoyenError(false);
      };

      const handleCompagniesErrorClose = () => {
        setShowCompagniesError(false);
      };

      const handleTypesErrorClose = () => {
        setShowTypesError(false);
      };

      const handleMoyenDialogClose = () => {
        setMoyenToDelete(null);
        setShowMoyenDialog(false);
      };

      const handleCompagniesDialogClose = () => {
        setCompagnieToDelete(null);
        setShowCompagniesDialog(false);
      };

      const handleTypesDialogClose = () => {
        setTypeToDelete(null);
        setShowTypesDialog(false);
      };

      const handleMoyenSuccess = () => {
          setShowMoyenSuccess(true);
        };

      const handleCompagniesSuccess = () => {
          setShowCompagniesSuccess(true);
        };

        const handleTypesSuccess = () => {
            setShowTypesSuccess(true);
          };
        
        const handleMoyenSuccessClose = () => {
          setShowMoyenSuccess(false);
          window.close();
        };

        const handleCompagniesSuccessClose = () => {
            setShowCompagniesSuccess(false);
            window.close();
          };

        const handleTypesSuccessClose = () => {
            setShowTypesSuccess(false);
            window.close();
          };

        const handleMoyenSuccessDeleteClose = () => {
          setShowMoyenSuccess(false);
          reloadPage();
        };

        const handleCompagniesSuccessDeleteClose = () => {
            setShowCompagniesSuccess(false);
            reloadPage();
          };

        const handleTypesSuccessDeleteClose = () => {
            setShowTypesSuccess(false);
            reloadPage();
          };

         //Controler l'ajout d'un moyen 
       const handleAjouterMoyen = (data) => {
        
        setIsLoadedMoyen(false);

        const moyen = {
          nom: data.nom,
        };
       
        const moyenCreated =  axios.post(`/api/moyens-transport/`, JSON.stringify(moyen), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const moyenResponse = response.data;   
              setIsLoadedMoyen(true);
              handleMoyenSuccess();
          })
          .catch((error) => {
              setIsLoadedMoyen(true)
              console.log(error.request.response);  
              handleMoyenError(error.request.response);
          });
       };

        //Controler l'ajout d'une compagnie 
       const handleAjouterCompagnie = (data) => {
        
        setIsLoadedCompagnies(false);

        const comp = {
          typeCompagnie_pk: data.typePk,
          nom: data.nom,
          adresse: data.adresse,
          tel: data.tel,
          email: data.email,
        };
       
        const compagnieCreated =  axios.post(`/api/compagnies-transport/`, JSON.stringify(comp), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const compagnieResponse = response.data;   
              setIsLoadedCompagnies(true);
              handleCompagniesSuccess();
          })
          .catch((error) => {
              setIsLoadedCompagnies(true)
              console.log(error.request.response);  
              handleErrorCompagnies(error.request.response);
          });
       };

       //Controler l'ajout d'un type
        const handleAjouterType = (data) => {
        
        setIsLoadedTypes(false);

        const type = {
          type: data.type,
        };
       
        const regimeCreated =  axios.post(`/api/types-compagnie/`, JSON.stringify(type), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const typeResponse = response.data;   
              setIsLoadedTypes(true);
              handleTypesSuccess();
          })
          .catch((error) => {
              setIsLoadedTypes(true)
              console.log(error.request.response);  
              handleErrorTypes(error.request.response);
          });
       };


        //Controler la modification d'un moyen 
       const handleModifierMoyen = (data) => {
        
        setIsLoadedMoyen(false);

        const moyen = {
          nom: data.nom,
        };
       
        const moyenCreated =  axios.put(`/api/moyens-transport/${moyenToModify}/`, JSON.stringify(moyen), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const moyenResponse = response.data;   
              setIsLoadedMoyen(true);
              setMoyenToModify(null);
              handleMoyenSuccess();
          })
          .catch((error) => {
              setIsLoadedMoyen(true)
              console.log(error.request.response);  
              setMoyenToModify(null);
              handleMoyenError(error.request.response);
          });
       };

        //Controler la modification d'une compagnie 
       const handleModifierCompagnie = (data) => {
        
        setIsLoadedCompagnies(false);

        const comp = {
            typeCompagnie: data.typePk,
            nom: data.nom,
            adresse: data.adresse,
            tel: data.tel,
            email: data.email,
          };
         
        const compagnieModified =  axios.put(`/api/compagnies-transport/${compagnieToModify}/`, JSON.stringify(comp), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const compagnieResponse = response.data;   
              setIsLoadedCompagnies(true);
              setCompagnieToModify(null);
              handleCompagniesSuccess();
          })
          .catch((error) => {
            setIsLoadedCompagnies(true)
              console.log(error.request.response);  
              setCompagnieToModify(null);
              handleErrorCompagnies(error.request.response);
          });
       };

        //Controler la modification d'un régime 
        const handleModifierType = (data) => {
        
            setIsLoadedTypes(false);
    
            const type = {
                type: data.type,
              };
                 
            const typeModified =  axios.put(`/api/types-compagnie/${typeToModify}/`, JSON.stringify(type), {
              headers: {
                'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                  const typeResponse = response.data;   
                  setIsLoadedTypes(true);
                  setTypeToModify(null);
                  handleTypesSuccess();
              })
              .catch((error) => {
                setIsLoadedTypes(true)
                  console.log(error.request.response);  
                  setTypeToModify(null);
                  handleErrorTypes(error.request.response);
              });
           };

    
       const handleMoyenDeleteClick = (event) => {
        console.log("delete");
        const rowId = event.target.closest('tr').id;
        setMoyenToDelete(rowId);
        setShowMoyenDialog(true);
      };

      const handleDeleteMoyen = () => {
        setShowMoyenDialog(false);
        setIsLoadedMoyen(false);
        axios
         .delete(`/api/moyens-transport/${moyenToDelete}/`)
         .then(() => {
            setShowMoyenDialog(false);
            setIsLoadedMoyen(true);
            console.log("successfully deleted");
            handleMoyenSuccess();
            setMoyenToDelete(null);
         })
         .catch((error) => {
            setShowMoyenDialog(false);
            setIsLoadedMoyen(true);
            console.log('Delete request error:', error);
            handleMoyenError(error.request.response);
            setMoyenToDelete(null);
         });
      };

      // Suppression d'une compagnie
      const handleCompagnieDeleteClick = (event) => {
        console.log("delete toggled");
        const rowId = event.target.closest('tr').id;
        setCompagnieToDelete(rowId);
        setShowCompagniesDialog(true);
      };

      const handleDeleteCompagnie = () => {
        setShowCompagniesDialog(false);
        setIsLoadedCompagnies(false);
        axios
         .delete(`/api/compagnies-transport/${compagnieToDelete}/`)
         .then(() => {
            setShowCompagniesDialog(false);
            setIsLoadedCompagnies(true);
            console.log("successfully deleted");
            handleCompagniesSuccess();
            setCompagnieToDelete(null);
         })
         .catch((error) => {
            setShowCompagniesDialog(false);
            setIsLoadedCompagnies(true);
            console.log('Delete request error:', error);
            handleErrorCompagnies(error.request.response);
            setCompagnieToDelete(null);
         });
      };

      // Suppression d'un type
      const handleTypeDeleteClick = (event) => {
        console.log("delete toggled");
        const rowId = event.target.closest('tr').id;
        setTypeToDelete(rowId);
        setShowTypesDialog(true);
      };

      const handleDeleteType = () => {
        setShowTypesDialog(false);
        setIsLoadedTypes(false);
        axios
         .delete(`/api/types-compagnie/${typeToDelete}/`)
         .then(() => {
            setShowTypesDialog(false);
            setIsLoadedTypes(true);
            console.log("successfully deleted");
            handleTypesSuccess();
            setTypeToDelete(null);
         })
         .catch((error) => {
            setShowTypesDialog(false);
            setIsLoadedTypes(true);
            console.log('Delete request error:', error);
            handleErrorTypes(error.request.response);
            setTypeToDelete(null);
         });
      };


       const tableActionsMoyen = [
        <IconDelete key="delete" onClick={handleMoyenDeleteClick} />,
        <IconEdit key="edit" onClick={handleMoyenEditClick} />,
      ];

      const tableActionsCompagnies = [
        <IconDelete key="delete" onClick={handleCompagnieDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditCompagniesClick} />,
      ];

      const tableActionsTypes = [
        <IconDelete key="delete" onClick={handleTypeDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditTypesClick} />,
      ];

    // Switching entre les parties
    const handleTab1 = () => {
        setActiveTab("tab1")
    }
    const handleTab2 = () => {
        setActiveTab("tab2")
    }

    const handleTab3 = () => {
        setActiveTab("tab3")
    }

  return (
    <>
     <Breadcrumb/>
      <div className={stylesO.contentWrapper}>
      <div className={styles.navbar}>
                <ul>
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Compagnies Transport</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Types Compagnie</li>
                    <li onClick={handleTab3} className={activeTab === "tab3" ? styles.activeNavbarLi: styles.NavbarLi}>Moyens Transport</li>

                </ul>
        </div>
        {!(isLoadedCompagnies && isLoadedTypes && isLoadedMoyen) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
            {activeTab==="tab1"?
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Compagnies</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'nom', label: 'Nom' ,  inputType : 'text'},
                            { key: 'adresse', label: 'Adresse' ,  inputType : 'text'},
                            { key: 'tel', label: 'Tel', inputType : 'text' },
                            { key: 'email', label: 'E-mail', inputType : 'text' },
                            { key: 'type', label: 'Type', inputType : 'text' },
            ]} onFilterChange={handleCompagnieFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredCompagniesData} headers={headerscompagnies} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsCompagnies} />
            {showCompagniesError && <ErrorMessage onClose={handleCompagniesErrorClose} errors={errorCompagniesMessages} />}
            {showCompagniesDialog && <CustomMessage onClose={handleCompagniesDialogClose} onConfirm={handleDeleteCompagnie} message={"Souhaitez-vous vraiment supprimer cette compagnie de transport ?"} />}
            {showCompagniesSuccess && <SuccessMessage onClose={handleCompagniesSuccessDeleteClose} />}
            {showEditCompagniesForm && <TabCompagnies onClose={handleCompagniesEditFormClose} 
                                    onAjouter={handleModifierCompagnie} 
                                    isEdit={true}
                                    toModify={compagnieToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauCompagnieClick}/> 
            {showCompagniesForm && <TabCompagnies onClose={handleCompagnieFormClose} 
                                    onAjouter={handleAjouterCompagnie} 
                                    isEdit={false}
                                    />}  
            {showCompagniesError && <ErrorMessage onClose={handleCompagniesErrorClose} errors={errorCompagniesMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            : activeTab === "tab2"?
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Types de Compagnies</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            {key: 'type', label: 'Type',  inputType : 'text'},
            ]} onFilterChange={handleTypeFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredTypesData} headers={headersTypes} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsTypes} />
            {showTypesError && <ErrorMessage onClose={handleTypesErrorClose} errors={errorTypesMessages} />}
            {showTypesDialog && <CustomMessage onClose={handleTypesDialogClose} onConfirm={handleDeleteType} message={"Souhaitez-vous vraiment supprimer ce type de compagnie ?"} />}
            {showTypesSuccess && <SuccessMessage onClose={handleTypesSuccessDeleteClose} />}
            {showEditTypesForm && <TabTypes onClose={handleTypesEditFormClose} 
                                    onAjouter={handleModifierType} 
                                    isEdit={true}
                                    toModify={typeToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauTypeClick}/> 
            {showTypesForm && <TabTypes onClose={handleTypeFormClose} 
                                    onAjouter={handleAjouterType} 
                                    isEdit={false}
                                    />}  
            {showTypesError && <ErrorMessage onClose={handleTypesErrorClose} errors={errorTypesMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            : 
            <>
            <h1 className={stylesLine.pageTitle}>Liste des Moyens de Transport</h1>
            <div className={styles.line}></div>
           <span className={styles.filter_span}>
           <TableFilter columns={[
                           { key: 'nom', label: 'Nom' ,  inputType : 'text'},
           ]} onFilterChange={handleMoyenFilterChangeWrapper} />
           </span>
           <ReusableTable data={filteredMoyenData} headers={headersMoyen} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsMoyen} />
           {showMoyenError && <ErrorMessage onClose={handleMoyenErrorClose} errors={errorMoyenMessages} />}
           {showMoyenDialog && <CustomMessage onClose={handleMoyenDialogClose} onConfirm={handleDeleteMoyen} message={"Souhaitez-vous vraiment supprimer ce moyen de transport ?"} />}
           {showMoyenSuccess && <SuccessMessage onClose={handleMoyenSuccessDeleteClose} />}
           {showEditMoyenForm && <TabMoyensTransport onClose={handleMoyenEditFormClose} 
                                   onAjouter={handleModifierMoyen} 
                                   isEdit={true}
                                   toModify={moyenToModify}
                                   />}  

           <span className={styles.addButton}>
           <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauMoyenClick}/> 
           {showMoyenForm && <TabMoyensTransport onClose={handleMoyenFormClose} 
                                   onAjouter={handleAjouterMoyen} 
                                   isEdit={false}
                                   />}  
           {showMoyenError && <ErrorMessage onClose={handleMoyenErrorClose} errors={errorMoyenMessages} />}

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

export default OptionsTransports