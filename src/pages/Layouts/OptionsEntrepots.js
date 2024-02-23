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
import { useState, useEffect } from 'react';
import { IconDelete, IconEdit } from '../../components/icons';
import TabEntrepots from './Tabs/TabEntrepots'
import TabLieux from './Tabs/TabLieux';
import TabTypesEntrepot from './Tabs/TabTypesEntrepot';

function OptionsEntrepots() {
  const apiUrl = process.env.REACT_APP_API_URL;

    const [isLoadedEntrepots, setIsLoadedEntrepots] = useState(false);
    const [filteredEntrepotsData, setFilteredEntrepotsData] = useState([]);
    const [errorEntrepotsMessages, setErrorEntrepotsMessages] = useState({});
    const [showEntrepotsDialog, setShowEntrepotsDialog] = useState(false);
    const [showEntrepotsError, setShowEntrepotsError] = useState(false);
    const [showEntrepotsSuccess, setShowEntrepotsSuccess] = useState(false);

    const [isLoadedTypes, setIsLoadedTypes] = useState(false);
    const [filteredTypesData, setFilteredTypesData] = useState([]);
    const [errorTypesMessages, setErrorTypesMessages] = useState({});
    const [showTypesDialog, setShowTypesDialog] = useState(false);
    const [showTypesError, setShowTypesError] = useState(false);
    const [showTypesSuccess, setShowTypesSuccess] = useState(false);

    const [isLoadedLieux, setIsLoadedLieux] = useState(false);
    const [filteredLieuxData, setFilteredLieuxData] = useState([]);
    const [errorLieuxMessages, setErrorLieuxMessages] = useState({});
    const [showLieuxDialog, setShowLieuxDialog] = useState(false);
    const [showLieuxError, setShowLieuxError] = useState(false);
    const [showLieuxSuccess, setShowLieuxSuccess] = useState(false);

    const [activeTab, setActiveTab] = useState("tab1");

    

    // Champs de la partie entrepots

   const [Entrepots, setEntrepots] = useState([]);
   const [entrepotToDelete, setentrepotToDelete] = useState([]);
   const [entrepotToModify, setentrepotToModify] = useState([]);

   const [types, setTypes] = useState([]);
   const [typeToDelete, setTypeToDelete] = useState([]);
   const [typeToModify, setTypeToModify] = useState([]);

   const [Lieux, setLieux] = useState([]);
   const [lieuToDelete, setlieuToDelete] = useState([]);
   const [lieuToModify, setlieuToModify] = useState([]);


   const headersEntrepots = ["Nom", "Adresse", "Tel", "E-mail", "Type", "Actions à faire"]
   const headersTypes = ["Type Entrepot/Parc", "Actions à faire",]
   const headersLieux = ["Nom", "Wilaya", "Actions à faire",]

    // Récupérer la liste des lieux de livraison 
    useEffect(() => {
      axios.get(`${apiUrl}/api/lieux-livraison/`)
      .then((response) => {
          const lieuData = response.data;
          if (typeof lieuData === 'object' && lieuData !== null) {
            const extractedLieu = Object.values(lieuData).map(item => ({
              id: item.lieuLivraison_pk,
              nomLieu: item.nomLieu,
              nomWilaya: item.wilaya?item.wilaya.nom:'',
            }));
            setLieux(extractedLieu);
            setFilteredLieuxData(extractedLieu);
            setIsLoadedLieux(true);
          }
          else {
          console.error('Response data is not a JSON object:', lieuData);
          handleErrorLieux(lieuData);
          setIsLoadedLieux(true);
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

    // Récupérer la liste des Entrepots 
    useEffect(() => {
        axios.get(`${apiUrl}/api/entrepots/`)
        .then((response) => {
            const entrepotData = response.data;
            if (typeof entrepotData === 'object' && entrepotData !== null) {
              const extractedentrepot = Object.values(entrepotData).map(item => ({
                id: item.compagnie_pk,
                nom: item.nom,
                adresse: item.adresse,
                tel: item.tel,
                email: item.email,
                type: item.typeEntrepot.type
              }));
              setEntrepots(extractedentrepot);
              setFilteredEntrepotsData(extractedentrepot);
              setIsLoadedEntrepots(true);
            }
            else {
            console.error('Response data is not a JSON object:', entrepotData);
            handleErrorEntrepots(entrepotData);
            setIsLoadedEntrepots(true);
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
  
    // Récupération de la liste de types d'entrepots
    useEffect(() => {
    
        const typesEntrepots = axios.get(`${apiUrl}/api/types-entrepot/`)
        
        .then((response) => {
          const typeData = response.data;
          if (typeof typeData === 'object' && typeData !== null) {
            const extractedType = Object.values(typeData).map(item => ({
              id: item.typeEntrepot_pk,
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
  
    const [showEntrepotsForm, setShowEntrepotsForm] = useState(false);
    const [showEditEntrepotsForm, setShowEditEntrepotsForm] = useState(false);

    const [showTypesForm, setShowTypesForm] = useState(false);
    const [showEditTypesForm, setShowEditTypesForm] = useState(false);

    const [showLieuxForm, setShowLieuxForm] = useState(false);
    const [showEditLieuxForm, setShowEditLieuxForm] = useState(false);

    const handleentrepotFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,Entrepots, setFilteredEntrepotsData);
      };

    const handleTypeFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,types, setFilteredTypesData);
    };

    const handlelieuFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,Lieux, setFilteredLieuxData);
    };
    
      // Nouveau entrepot
      const handleNouveauEntrepotClick = () => {
        setShowEntrepotsForm(true);
      };

    const handleEntrepotFormClose = () => {
        setShowEntrepotsForm(false);
      };

    // Nouveau type
    const handleNouveauTypeClick = () => {
        setShowTypesForm(true);
    };

    const handleTypeFormClose = () => {
        setShowTypesForm(false);
      };

      // Nouveau lieu
      const handleNouveaulieuClick = () => {
        setShowLieuxForm(true);
      };

    const handlelieuFormClose = () => {
        setShowLieuxForm(false);
      };


      // Modifier entrepot
      const handleEditEntrepotsClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setentrepotToModify(rowId);
        setShowEditEntrepotsForm(true);
      };

    const handleEntrepotsEditFormClose = () => {
        setShowEditEntrepotsForm(false);
      };

      // Modifier type
      const handleEditTypesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setTypeToModify(rowId);
        setShowEditTypesForm(true);
      };

    const handleTypesEditFormClose = () => {
        setShowEditTypesForm(false);
      };

      // Modifier lieu
      const handleEditLieuxClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setlieuToModify(rowId);
        setShowEditLieuxForm(true);
      };

    const handleLieuxEditFormClose = () => {
        setShowEditLieuxForm(false);
      };
        

      // Controle d'erreurs
      const handleErrorEntrepots = (errors) => {
        setShowEntrepotsError(true);
        setErrorEntrepotsMessages(errors);
      };

      const handleErrorTypes = (errors) => {
        setShowTypesError(true);
        setErrorTypesMessages(errors);
      };

      const handleErrorLieux = (errors) => {
        setShowLieuxError(true);
        setErrorLieuxMessages(errors);
      };
      

      const handleEntrepotsErrorClose = () => {
        setShowEntrepotsError(false);
      };

      const handleTypesErrorClose = () => {
        setShowTypesError(false);
      };

      const handleLieuxErrorClose = () => {
        setShowLieuxError(false);
      };


      const handleTypesDialogClose = () => {
        setTypeToDelete(null);
        setShowTypesDialog(false);
      };

      const handleEntrepotsDialogClose = () => {
        setentrepotToDelete(null);
        setShowEntrepotsDialog(false);
      };

      const handleLieuxDialogClose = () => {
        setlieuToDelete(null);
        setShowLieuxDialog(false);
      };


      const handleEntrepotsSuccess = () => {
          setShowEntrepotsSuccess(true);
        };

      const handleTypesSuccess = () => {
          setShowTypesSuccess(true);
      };

      const handleLieuxSuccess = () => {
            setShowLieuxSuccess(true);
        };
        

      const handleEntrepotsSuccessClose = () => {
            setShowEntrepotsSuccess(false);
            window.close();
      };

      const handleTypesSuccessClose = () => {
            setShowTypesSuccess(false);
            window.close();
      };

      const handleLieuxSuccessClose = () => {
            setShowLieuxSuccess(false);
            window.close();
      };


      const handleEntrepotsSuccessDeleteClose = () => {
            setShowEntrepotsSuccess(false);
            reloadPage();
      };

      const handleTypesSuccessDeleteClose = () => {
            setShowTypesSuccess(false);
            reloadPage();
      };

      const handleLieuxSuccessDeleteClose = () => {
            setShowLieuxSuccess(false);
            reloadPage();
      };


      //Controler l'ajout d'un entrepot 
      const handleAjouterentrepot = (data) => {
        
        setIsLoadedEntrepots(false);

        const entrepot = {
          nom: data.nom,
          adresse: data.adresse,
          tel: data.tel,
          email: data.email,
          typeEntrepot: data.typePk
        };
       
        const entrepotCreated =  axios.post(`${apiUrl}/api/entrepots/`, JSON.stringify(entrepot), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const entrepotResponse = response.data;   
              setIsLoadedEntrepots(true);
              handleEntrepotsSuccess();
          })
          .catch((error) => {
              setIsLoadedEntrepots(true)
              console.log(error.request.response);  
              handleErrorEntrepots(error.request.response);
          });
      };

       //Controler l'ajout d'un type
       const handleAjouterType = (data) => {
        
        setIsLoadedTypes(false);

        const type = {
          type: data.type,
        };
       
        const lieuCreated =  axios.post(`${apiUrl}/api/types-entrepot/`, JSON.stringify(type), {
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

       //Controler l'ajout d'un lieu
        const handleAjouterlieu = (data) => {
        
        setIsLoadedLieux(false);

        const lieu = {
          nomLieu: data.nom,
          wilaya: data.wilayaPk,
        };
       
        console.log(lieu)
        const lieuCreated =  axios.post(`${apiUrl}/api/lieux-livraison/`, JSON.stringify(lieu), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const lieuResponse = response.data;   
              setIsLoadedLieux(true);
              handleLieuxSuccess();
          })
          .catch((error) => {
              setIsLoadedLieux(true)
              console.log(error.request.response);  
              handleErrorLieux(error.request.response);
          });
       };


        //Controler la modification d'un entrepot 
       const handleModifierentrepot = (data) => {
        
        setIsLoadedEntrepots(false);

        const entrepot = {
          nom: data.nom,
          adresse: data.adresse,
          tel: data.tel,
          email: data.email,
          typeEntrepot: data.typePk
          };
         
        const entrepotModified =  axios.put(`${apiUrl}/api/entrepots/${entrepotToModify}/`, JSON.stringify(entrepot), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const entrepotResponse = response.data;   
              setIsLoadedEntrepots(true);
              setentrepotToModify(null);
              handleEntrepotsSuccess();
          })
          .catch((error) => {
            setIsLoadedEntrepots(true)
              console.log(error.request.response);  
              setentrepotToModify(null);
              handleErrorEntrepots(error.request.response);
          });
       };

        //Controler la modification d'un lieu
        const handleModifierlieu = (data) => {
        
            setIsLoadedLieux(false);
    
            const lieu = {
                nomLieu: data.nom,
                wilaya: data.wilayaPk,
              };
                 
            const lieuModified =  axios.put(`${apiUrl}/api/lieux-livraison/${lieuToModify}/`, JSON.stringify(lieu), {
              headers: {
                'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                  const lieuResponse = response.data;   
                  setIsLoadedLieux(true);
                  setlieuToModify(null);
                  handleLieuxSuccess();
              })
              .catch((error) => {
                setIsLoadedLieux(true)
                  console.log(error.request.response);  
                  setlieuToModify(null);
                  handleErrorLieux(error.request.response);
              });
           };

        //Controler la modification d'un type 
        const handleModifierType = (data) => {
        
          setIsLoadedTypes(false);
  
          const type = {
              type: data.type,
            };
             
          const typeModified =  axios.put(`${apiUrl}/api/types-entrepot/${typeToModify}/`, JSON.stringify(type), {
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


      // Suppression d'un entrepot
      const handleEntrepotDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setentrepotToDelete(rowId);
        setShowEntrepotsDialog(true);
      };

      const handleDeleteentrepot = () => {
        setShowEntrepotsDialog(false);
        setIsLoadedEntrepots(false);
        axios
         .delete(`${apiUrl}/api/entrepots/${entrepotToDelete}/`)
         .then(() => {
            setShowEntrepotsDialog(false);
            setIsLoadedEntrepots(true);
            handleEntrepotsSuccess();
            setentrepotToDelete(null);
         })
         .catch((error) => {
            setShowEntrepotsDialog(false);
            setIsLoadedEntrepots(true);
            console.log('Delete request error:', error);
            handleErrorEntrepots(error.request.response);
            setentrepotToDelete(null);
         });
      };

      // Suppression d'un type
      const handleTypeDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setTypeToDelete(rowId);
        setShowTypesDialog(true);
      };

      const handleDeleteType = () => {
        setShowTypesDialog(false);
        setIsLoadedTypes(false);
        axios
         .delete(`${apiUrl}/api/types-entrepot/${typeToDelete}/`)
         .then(() => {
            setShowTypesDialog(false);
            setIsLoadedTypes(true);
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

      // Suppression d'un lieu
      const handlelieuDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setlieuToDelete(rowId);
        setShowLieuxDialog(true);
      };

      const handleDeletelieu = () => {
        setShowLieuxDialog(false);
        setIsLoadedLieux(false);
        axios
         .delete(`${apiUrl}/api/lieux-livraison/${lieuToDelete}/`)
         .then(() => {
            setShowLieuxDialog(false);
            setIsLoadedLieux(true);
            handleLieuxSuccess();
            setlieuToDelete(null);
         })
         .catch((error) => {
            setShowLieuxDialog(false);
            setIsLoadedLieux(true);
            console.log('Delete request error:', error);
            handleErrorLieux(error.request.response);
            setlieuToDelete(null);
         });
      };


      const tableActionsEntrepots = [
        <IconDelete key="delete" onClick={handleEntrepotDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditEntrepotsClick} />,
      ];

      const tableActionsTypes = [
        <IconDelete key="delete" onClick={handleTypeDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditTypesClick} />,
      ];

      const tableActionsLieux = [
        <IconDelete key="delete" onClick={handlelieuDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditLieuxClick} />,
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
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Entrepots/Parcs</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Types Entrepots</li>
                    <li onClick={handleTab3} className={activeTab === "tab3" ? styles.activeNavbarLi: styles.NavbarLi}>Lieux Livraison</li>
                </ul>
        </div>
        {!(isLoadedEntrepots && isLoadedTypes) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
            {activeTab==="tab1"?
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Entrepots/Parcs</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'nom', label: 'Nom' ,  inputType : 'text'},
                            { key: 'adresse', label: 'Adresse' ,  inputType : 'text'},
                            { key: 'tel', label: 'Tel', inputType : 'text' },
                            { key: 'email', label: 'E-mail', inputType : 'text' },
                            { key: 'type', label: 'Type', inputType : 'text' },
            ]} onFilterChange={handleentrepotFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredEntrepotsData} headers={headersEntrepots} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsEntrepots} />
            {showEntrepotsError && <ErrorMessage onClose={handleEntrepotsErrorClose} errors={errorEntrepotsMessages} />}
            {showEntrepotsDialog && <CustomMessage onClose={handleEntrepotsDialogClose} onConfirm={handleDeleteentrepot} message={"Souhaitez-vous vraiment supprimer cet entrepot ?"} />}
            {showEntrepotsSuccess && <SuccessMessage onClose={handleEntrepotsSuccessDeleteClose} />}
            {showEditEntrepotsForm && <TabEntrepots onClose={handleEntrepotsEditFormClose} 
                                    onAjouter={handleModifierentrepot} 
                                    isEdit={true}
                                    toModify={entrepotToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauEntrepotClick}/> 
            {showEntrepotsForm && <TabEntrepots onClose={handleEntrepotFormClose} 
                                    onAjouter={handleAjouterentrepot} 
                                    isEdit={false}
                                    />}  
            {showEntrepotsError && <ErrorMessage onClose={handleEntrepotsErrorClose} errors={errorEntrepotsMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            :
            activeTab==="tab2"?
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Types des Entrepots/Parcs</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            {key: 'type', label: 'Type',  inputType : 'text'},
            ]} onFilterChange={handleTypeFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredTypesData} headers={headersTypes} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsTypes} />
            {showTypesError && <ErrorMessage onClose={handleTypesErrorClose} errors={errorTypesMessages} />}
            {showTypesDialog && <CustomMessage onClose={handleTypesDialogClose} onConfirm={handleDeleteType} message={"Souhaitez-vous vraiment supprimer ce type d'entrepot/parc ?"} />}
            {showTypesSuccess && <SuccessMessage onClose={handleTypesSuccessDeleteClose} />}
            {showEditTypesForm && <TabTypesEntrepot onClose={handleTypesEditFormClose} 
                                    onAjouter={handleModifierType} 
                                    isEdit={true}
                                    toModify={typeToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauTypeClick}/> 
            {showTypesForm && <TabTypesEntrepot onClose={handleTypeFormClose} 
                                    onAjouter={handleAjouterType} 
                                    isEdit={false}
                                    />}  
            {showTypesError && <ErrorMessage onClose={handleTypesErrorClose} errors={errorTypesMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            :
            <>
             <h1 className={stylesLine.pageTitle}>Lieux de Livraison</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'nomLieu', label: 'Nom' ,  inputType : 'text'},
                            { key: 'nomWilaya', label: 'Wilaya' ,  inputType : 'text'},
            ]} onFilterChange={handlelieuFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredLieuxData} headers={headersLieux} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsLieux} />
            {showLieuxError && <ErrorMessage onClose={handleLieuxErrorClose} errors={errorLieuxMessages} />}
            {showLieuxDialog && <CustomMessage onClose={handleLieuxDialogClose} onConfirm={handleDeletelieu} message={"Souhaitez-vous vraiment supprimer ce lieu de livraison ?"} />}
            {showLieuxSuccess && <SuccessMessage onClose={handleLieuxSuccessDeleteClose} />}
            {showEditLieuxForm && <TabLieux onClose={handleLieuxEditFormClose} 
                                    onAjouter={handleModifierlieu} 
                                    isEdit={true}
                                    toModify={lieuToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveaulieuClick}/> 
            {showLieuxForm && <TabLieux onClose={handlelieuFormClose} 
                                    onAjouter={handleAjouterlieu} 
                                    isEdit={false}
                                    />}  
            {showLieuxError && <ErrorMessage onClose={handleLieuxErrorClose} errors={errorLieuxMessages} />}

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

export default OptionsEntrepots