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
import TabInspections from './Tabs/TabInspections'
import TabArrivees from './Tabs/TabArrivees';

function OptionsFraudes() {

    const [isLoadedInspections, setIsLoadedInspections] = useState(false);
    const [filteredInspectionsData, setFilteredInspectionsData] = useState([]);
    const [errorInspectionsMessages, setErrorInspectionsMessages] = useState({});
    const [showInspectionsDialog, setShowInspectionsDialog] = useState(false);
    const [showInspectionsError, setShowInspectionsError] = useState(false);
    const [showInspectionsSuccess, setShowInspectionsSuccess] = useState(false);

    const [isLoadedArrivees, setIsLoadedArrivees] = useState(false);
    const [filteredArriveesData, setFilteredArriveesData] = useState([]);
    const [errorArriveesMessages, setErrorArriveesMessages] = useState({});
    const [showArriveesDialog, setShowArriveesDialog] = useState(false);
    const [showArriveesError, setShowArriveesError] = useState(false);
    const [showArriveesSuccess, setShowArriveesSuccess] = useState(false);

    const [activeTab, setActiveTab] = useState("tab1");

    

    // Champs de la partie facturation

   const [Inspections, setInspections] = useState([]);
   const [InspectionsToDelete, setInspectionsToDelete] = useState([]);
   const [InspectionsToModify, setInspectionsToModify] = useState([]);

   const [Arrivees, setArrivees] = useState([]);
   const [ArriveesToDelete, setArriveesToDelete] = useState([]);
   const [ArriveesToModify, setArriveesToModify] = useState([]);


   const headersInspections = ["Nom", "Actions à faire"]
   const headersArrivees = ["Nom", "Actions à faire"]


    // Récupérer la liste des Inspections 
    useEffect(() => {
        axios.get('/api/مفتشيات-الحدود/')
        .then((response) => {
            const InspectionsData = response.data;
            if (typeof InspectionsData === 'object' && InspectionsData !== null) {
              const extractedInspections = Object.values(InspectionsData).map(item => ({
                id: item.inspectionFrontiere_pk,
                nom: item.nom,
              }));
              setInspections(extractedInspections);
              setFilteredInspectionsData(extractedInspections);
              setIsLoadedInspections(true);
            }
            else {
            console.error('Response data is not a JSON object:', InspectionsData);
            handleErrorInspections(InspectionsData);
            setIsLoadedInspections(true);
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
  
    // Récupérer la liste des Arrivees 
    useEffect(() => {
        axios.get('/api/أماكن-الوصول/')
        .then((response) => {
            const ArriveesData = response.data;
            if (typeof ArriveesData === 'object' && ArriveesData !== null) {
              const extractedArrivees = Object.values(ArriveesData).map(item => ({
                id: item.lieuArrivee_pk,
                nom: item.nom,
              }));
              setArrivees(extractedArrivees);
              setFilteredArriveesData(extractedArrivees);
              setIsLoadedArrivees(true);
            }
            else {
            console.error('Response data is not a JSON object:', ArriveesData);
            handleErrorArrivees(ArriveesData);
            setIsLoadedArrivees(true);
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
  
    const [showInspectionsForm, setShowInspectionsForm] = useState(false);
    const [showEditInspectionsForm, setShowEditInspectionsForm] = useState(false);

    const [showArriveesForm, setShowArriveesForm] = useState(false);
    const [showEditArriveesForm, setShowEditArriveesForm] = useState(false);

    const handleInspectionsFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,Inspections, setFilteredInspectionsData);
      };

      const handleArriveesFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,Arrivees, setFilteredArriveesData);
      };
    

      // Nouveau Inspections
      const handleNouveauInspectionsClick = () => {
        setShowInspectionsForm(true);
      };

    const handleInspectionsFormClose = () => {
        setShowInspectionsForm(false);
      };

      // Nouveau Arrivees
      const handleNouveauArriveesClick = () => {
        setShowArriveesForm(true);
      };

    const handleArriveesFormClose = () => {
        setShowArriveesForm(false);
      };

      // Modifier Inspections
      const handleEditInspectionsClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setInspectionsToModify(rowId);
        setShowEditInspectionsForm(true);
      };

    const handleInspectionsEditFormClose = () => {
        setShowEditInspectionsForm(false);
      };

      // Modifier Arrivees
      const handleEditArriveesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setArriveesToModify(rowId);
        setShowEditArriveesForm(true);
      };

    const handleArriveesEditFormClose = () => {
        setShowEditArriveesForm(false);
      };
        
      // Controle d'erreurs
      const handleErrorInspections = (errors) => {
        setShowInspectionsError(true);
        setErrorInspectionsMessages(errors);
      };

      const handleErrorArrivees = (errors) => {
        setShowArriveesError(true);
        setErrorArriveesMessages(errors);
      };

      const handleInspectionsErrorClose = () => {
        setShowInspectionsError(false);
      };

      const handleArriveesErrorClose = () => {
        setShowArriveesError(false);
      };

      const handleInspectionsDialogClose = () => {
        setInspectionsToDelete(null);
        setShowInspectionsDialog(false);
      };

      const handleArriveesDialogClose = () => {
        setArriveesToDelete(null);
        setShowArriveesDialog(false);
      };

      const handleInspectionsSuccess = () => {
          setShowInspectionsSuccess(true);
        };

        const handleArriveesSuccess = () => {
            setShowArriveesSuccess(true);
          };

        const handleInspectionsSuccessClose = () => {
            setShowInspectionsSuccess(false);
            window.close();
          };

        const handleArriveesSuccessClose = () => {
            setShowArriveesSuccess(false);
            window.close();
          };

        const handleInspectionsSuccessDeleteClose = () => {
            setShowInspectionsSuccess(false);
            reloadPage();
          };

        const handleArriveesSuccessDeleteClose = () => {
            setShowArriveesSuccess(false);
            reloadPage();
          };


        //Controler l'ajout d'un Inspections 
       const handleAjouterInspections = (data) => {
        
        setIsLoadedInspections(false);

        const Inspections = {
          nom: data.nom,
        };
       
        const InspectionsCreated =  axios.post(`/api/مفتشيات-الحدود/`, JSON.stringify(Inspections), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const InspectionsResponse = response.data;   
              setIsLoadedInspections(true);
              handleInspectionsSuccess();
          })
          .catch((error) => {
              setIsLoadedInspections(true)
              console.log(error.request.response);  
              handleErrorInspections(error.request.response);
          });
       };

       //Controler l'ajout d'un Arrivees
        const handleAjouterArrivees = (data) => {
        
        setIsLoadedArrivees(false);

        const Arrivees = {
          nom: data.nom,
        };
       
        const ArriveesCreated =  axios.post(`/api/أماكن-الوصول/`, JSON.stringify(Arrivees), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const ArriveesResponse = response.data;   
              setIsLoadedArrivees(true);
              handleArriveesSuccess();
          })
          .catch((error) => {
              setIsLoadedArrivees(true)
              console.log(error.request.response);  
              handleErrorArrivees(error.request.response);
          });
       };


        //Controler la modification d'un Inspections 
       const handleModifierInspections = (data) => {
        
        setIsLoadedInspections(false);

        const Inspections = {
            nom: data.nom,
          };
         
        const InspectionsModified =  axios.put(`/api/مفتشيات-الحدود/${InspectionsToModify}/`, JSON.stringify(Inspections), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const InspectionsResponse = response.data;   
              setIsLoadedInspections(true);
              setInspectionsToModify(null);
              handleInspectionsSuccess();
          })
          .catch((error) => {
            setIsLoadedInspections(true)
              console.log(error.request.response);  
              setInspectionsToModify(null);
              handleErrorInspections(error.request.response);
          });
       };

        //Controler la modification d'un Inspections 
        const handleModifierArrivees = (data) => {
        
            setIsLoadedArrivees(false);
    
            const Arrivees = {
                nom: data.nom,
              };
                 
            const ArriveesModified =  axios.put(`/api/أماكن-الوصول/${ArriveesToModify}/`, JSON.stringify(Arrivees), {
              headers: {
                'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                  const ArriveesResponse = response.data;   
                  setIsLoadedArrivees(true);
                  setArriveesToModify(null);
                  handleArriveesSuccess();
              })
              .catch((error) => {
                setIsLoadedArrivees(true)
                  console.log(error.request.response);  
                  setArriveesToModify(null);
                  handleErrorArrivees(error.request.response);
              });
           };

      // Suppression d'un Inspections
      const handleInspectionsDeleteClick = (event) => {
        console.log("delete toggled");
        const rowId = event.target.closest('tr').id;
        setInspectionsToDelete(rowId);
        setShowInspectionsDialog(true);
      };

      const handleDeleteInspections = () => {
        setShowInspectionsDialog(false);
        setIsLoadedInspections(false);
        axios
         .delete(`/api/مفتشيات-الحدود/${InspectionsToDelete}/`)
         .then(() => {
            setShowInspectionsDialog(false);
            setIsLoadedInspections(true);
            console.log("successfully deleted");
            handleInspectionsSuccess();
            setInspectionsToDelete(null);
         })
         .catch((error) => {
            setShowInspectionsDialog(false);
            setIsLoadedInspections(true);
            console.log('Delete request error:', error);
            handleErrorInspections(error.request.response);
            setInspectionsToDelete(null);
         });
      };

      // Suppression d'un Arrivees
      const handleArriveesDeleteClick = (event) => {
        console.log("delete toggled");
        const rowId = event.target.closest('tr').id;
        setArriveesToDelete(rowId);
        setShowArriveesDialog(true);
      };

      const handleDeleteArrivees = () => {
        setShowArriveesDialog(false);
        setIsLoadedArrivees(false);
        axios
         .delete(`/api/أماكن-الوصول/${ArriveesToDelete}/`)
         .then(() => {
            setShowArriveesDialog(false);
            setIsLoadedArrivees(true);
            console.log("successfully deleted");
            handleArriveesSuccess();
            setArriveesToDelete(null);
         })
         .catch((error) => {
            setShowArriveesDialog(false);
            setIsLoadedArrivees(true);
            console.log('Delete request error:', error);
            handleErrorArrivees(error.request.response);
            setArriveesToDelete(null);
         });
      };


      const tableActionsInspections = [
        <IconDelete key="delete" onClick={handleInspectionsDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditInspectionsClick} />,
      ];

      const tableActionsArrivees = [
        <IconDelete key="delete" onClick={handleArriveesDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditArriveesClick} />,
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
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>مفتشيات الحدود</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>أماكن الوصول</li>
                </ul>
        </div>
        {!(isLoadedInspections && isLoadedArrivees) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
            {activeTab==="tab1"?
            <>
             <h1 className={stylesLine.pageTitle}>مفتشيات الحدود</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'designation', label: 'Designation' ,  inputType : 'text'},
            ]} onFilterChange={handleInspectionsFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredInspectionsData} headers={headersInspections} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsInspections} />
            {showInspectionsError && <ErrorMessage onClose={handleInspectionsErrorClose} errors={errorInspectionsMessages} />}
            {showInspectionsDialog && <CustomMessage onClose={handleInspectionsDialogClose} onConfirm={handleDeleteInspections} message={"Souhaitez-vous vraiment supprimer cette inspection ?"} />}
            {showInspectionsSuccess && <SuccessMessage onClose={handleInspectionsSuccessDeleteClose} />}
            {showEditInspectionsForm && <TabInspections onClose={handleInspectionsEditFormClose} 
                                    onAjouter={handleModifierInspections} 
                                    isEdit={true}
                                    toModify={InspectionsToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauInspectionsClick}/> 
            {showInspectionsForm && <TabInspections onClose={handleInspectionsFormClose} 
                                    onAjouter={handleAjouterInspections} 
                                    isEdit={false}
                                    />}  
            {showInspectionsError && <ErrorMessage onClose={handleInspectionsErrorClose} errors={errorInspectionsMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            :
            <>
             <h1 className={stylesLine.pageTitle}>أماكن الوصول</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'designation', label: 'Designation', inputType : 'text'},
            ]} onFilterChange={handleArriveesFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredArriveesData} headers={headersArrivees} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsArrivees} />
            {showArriveesError && <ErrorMessage onClose={handleArriveesErrorClose} errors={errorArriveesMessages} />}
            {showArriveesDialog && <CustomMessage onClose={handleArriveesDialogClose} onConfirm={handleDeleteArrivees} message={"Souhaitez-vous vraiment supprimer ce lieu d'arrivée ?"} />}
            {showArriveesSuccess && <SuccessMessage onClose={handleArriveesSuccessDeleteClose} />}
            {showEditArriveesForm && <TabArrivees onClose={handleArriveesEditFormClose} 
                                    onAjouter={handleModifierArrivees} 
                                    isEdit={true}
                                    toModify={ArriveesToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauArriveesClick}/> 
            {showArriveesForm && <TabArrivees onClose={handleArriveesFormClose} 
                                    onAjouter={handleAjouterArrivees} 
                                    isEdit={false}
                                    />}  
            {showArriveesError && <ErrorMessage onClose={handleArriveesErrorClose} errors={errorArriveesMessages} />}

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

export default OptionsFraudes