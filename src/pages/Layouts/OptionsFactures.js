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
import TabDebours from './Tabs/TabDebours'
import TabPrestations from './Tabs/TabPrestations';

function OptionsFactures() {

    const [isLoadedDebours, setIsLoadedDebours] = useState(false);
    const [filteredDeboursData, setFilteredDeboursData] = useState([]);
    const [errorDeboursMessages, setErrorDeboursMessages] = useState({});
    const [showDeboursDialog, setShowDeboursDialog] = useState(false);
    const [showDeboursError, setShowDeboursError] = useState(false);
    const [showDeboursSuccess, setShowDeboursSuccess] = useState(false);

    const [isLoadedPrestations, setIsLoadedPrestations] = useState(false);
    const [filteredPrestationsData, setFilteredPrestationsData] = useState([]);
    const [errorPrestationsMessages, setErrorPrestationsMessages] = useState({});
    const [showPrestationsDialog, setShowPrestationsDialog] = useState(false);
    const [showPrestationsError, setShowPrestationsError] = useState(false);
    const [showPrestationsSuccess, setShowPrestationsSuccess] = useState(false);

    const [activeTab, setActiveTab] = useState("tab1");

    

    // Champs de la partie facturation

   const [Debours, setDebours] = useState([]);
   const [deboursToDelete, setdeboursToDelete] = useState([]);
   const [deboursToModify, setdeboursToModify] = useState([]);

   const [Prestations, setPrestations] = useState([]);
   const [prestationsToDelete, setprestationsToDelete] = useState([]);
   const [prestationsToModify, setprestationsToModify] = useState([]);


   const headersDebours = ["Designation", "Actions à faire"]
   const headersPrestations = ["Designation", "Actions à faire"]


    // Récupérer la liste des Debours 
    useEffect(() => {
        axios.get('/api/types-debours/')
        .then((response) => {
            const deboursData = response.data;
            if (typeof deboursData === 'object' && deboursData !== null) {
              const extracteddebours = Object.values(deboursData).map(item => ({
                id: item.typeDebours_pk,
                designation: item.designation,
              }));
              setDebours(extracteddebours);
              setFilteredDeboursData(extracteddebours);
              setIsLoadedDebours(true);
            }
            else {
            console.error('Response data is not a JSON object:', deboursData);
            handleErrorDebours(deboursData);
            setIsLoadedDebours(true);
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
  
    // Récupérer la liste des prestations 
    useEffect(() => {
        axios.get('/api/types-prestation/')
        .then((response) => {
            const prestationsData = response.data;
            if (typeof prestationsData === 'object' && prestationsData !== null) {
              const extractedprestations = Object.values(prestationsData).map(item => ({
                id: item.typePrestation_pk,
                designation: item.designation,
              }));
              setPrestations(extractedprestations);
              setFilteredPrestationsData(extractedprestations);
              setIsLoadedPrestations(true);
            }
            else {
            console.error('Response data is not a JSON object:', prestationsData);
            handleErrorPrestations(prestationsData);
            setIsLoadedPrestations(true);
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
  
    const [showDeboursForm, setShowDeboursForm] = useState(false);
    const [showEditDeboursForm, setShowEditDeboursForm] = useState(false);

    const [showPrestationsForm, setShowPrestationsForm] = useState(false);
    const [showEditPrestationsForm, setShowEditPrestationsForm] = useState(false);

    const handledeboursFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,Debours, setFilteredDeboursData);
      };

      const handleprestationsFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,Prestations, setFilteredPrestationsData);
      };
    

      // Nouveau debours
      const handleNouveaudeboursClick = () => {
        setShowDeboursForm(true);
      };

    const handledeboursFormClose = () => {
        setShowDeboursForm(false);
      };

      // Nouveau prestations
      const handleNouveauprestationsClick = () => {
        setShowPrestationsForm(true);
      };

    const handleprestationsFormClose = () => {
        setShowPrestationsForm(false);
      };

      // Modifier debours
      const handleEditDeboursClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setdeboursToModify(rowId);
        setShowEditDeboursForm(true);
      };

    const handleDeboursEditFormClose = () => {
        setShowEditDeboursForm(false);
      };

      // Modifier prestations
      const handleEditPrestationsClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setprestationsToModify(rowId);
        setShowEditPrestationsForm(true);
      };

    const handlePrestationsEditFormClose = () => {
        setShowEditPrestationsForm(false);
      };
        
      // Controle d'erreurs
      const handleErrorDebours = (errors) => {
        setShowDeboursError(true);
        setErrorDeboursMessages(errors);
      };

      const handleErrorPrestations = (errors) => {
        setShowPrestationsError(true);
        setErrorPrestationsMessages(errors);
      };

      const handleDeboursErrorClose = () => {
        setShowDeboursError(false);
      };

      const handlePrestationsErrorClose = () => {
        setShowPrestationsError(false);
      };

      const handleDeboursDialogClose = () => {
        setdeboursToDelete(null);
        setShowDeboursDialog(false);
      };

      const handlePrestationsDialogClose = () => {
        setprestationsToDelete(null);
        setShowPrestationsDialog(false);
      };

      const handleDeboursSuccess = () => {
          setShowDeboursSuccess(true);
        };

        const handlePrestationsSuccess = () => {
            setShowPrestationsSuccess(true);
          };

        const handleDeboursSuccessClose = () => {
            setShowDeboursSuccess(false);
            window.close();
          };

        const handlePrestationsSuccessClose = () => {
            setShowPrestationsSuccess(false);
            window.close();
          };

        const handleDeboursSuccessDeleteClose = () => {
            setShowDeboursSuccess(false);
            reloadPage();
          };

        const handlePrestationsSuccessDeleteClose = () => {
            setShowPrestationsSuccess(false);
            reloadPage();
          };


        //Controler l'ajout d'un debours 
       const handleAjouterdebours = (data) => {
        
        setIsLoadedDebours(false);

        const debours = {
          designation: data.designation,
        };
       
        const deboursCreated =  axios.post(`/api/types-debours/`, JSON.stringify(debours), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const deboursResponse = response.data;   
              setIsLoadedDebours(true);
              handleDeboursSuccess();
          })
          .catch((error) => {
              setIsLoadedDebours(true)
              console.log(error.request.response);  
              handleErrorDebours(error.request.response);
          });
       };

       //Controler l'ajout d'un prestations
        const handleAjouterprestations = (data) => {
        
        setIsLoadedPrestations(false);

        const prestations = {
          designation: data.designation,
        };
       
        const prestationsCreated =  axios.post(`/api/types-prestation/`, JSON.stringify(prestations), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const prestationsResponse = response.data;   
              setIsLoadedPrestations(true);
              handlePrestationsSuccess();
          })
          .catch((error) => {
              setIsLoadedPrestations(true)
              console.log(error.request.response);  
              handleErrorPrestations(error.request.response);
          });
       };


        //Controler la modification d'un debours 
       const handleModifierdebours = (data) => {
        
        setIsLoadedDebours(false);

        const debours = {
            designation: data.designation,
          };
         
        const deboursModified =  axios.put(`/api/types-debours/${deboursToModify}/`, JSON.stringify(debours), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const deboursResponse = response.data;   
              setIsLoadedDebours(true);
              setdeboursToModify(null);
              handleDeboursSuccess();
          })
          .catch((error) => {
            setIsLoadedDebours(true)
              console.log(error.request.response);  
              setdeboursToModify(null);
              handleErrorDebours(error.request.response);
          });
       };

        //Controler la modification d'un debours 
        const handleModifierprestations = (data) => {
        
            setIsLoadedPrestations(false);
    
            const prestations = {
                designation: data.designation,
              };
                 
            const prestationsModified =  axios.put(`/api/types-prestation/${prestationsToModify}/`, JSON.stringify(prestations), {
              headers: {
                'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                  const prestationsResponse = response.data;   
                  setIsLoadedPrestations(true);
                  setprestationsToModify(null);
                  handlePrestationsSuccess();
              })
              .catch((error) => {
                setIsLoadedPrestations(true)
                  console.log(error.request.response);  
                  setprestationsToModify(null);
                  handleErrorPrestations(error.request.response);
              });
           };

      // Suppression d'un debours
      const handledeboursDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setdeboursToDelete(rowId);
        setShowDeboursDialog(true);
      };

      const handleDeletedebours = () => {
        setShowDeboursDialog(false);
        setIsLoadedDebours(false);
        axios
         .delete(`/api/types-debours/${deboursToDelete}/`)
         .then(() => {
            setShowDeboursDialog(false);
            setIsLoadedDebours(true);
            handleDeboursSuccess();
            setdeboursToDelete(null);
         })
         .catch((error) => {
            setShowDeboursDialog(false);
            setIsLoadedDebours(true);
            console.log('Delete request error:', error);
            handleErrorDebours(error.request.response);
            setdeboursToDelete(null);
         });
      };

      // Suppression d'un prestations
      const handleprestationsDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setprestationsToDelete(rowId);
        setShowPrestationsDialog(true);
      };

      const handleDeleteprestations = () => {
        setShowPrestationsDialog(false);
        setIsLoadedPrestations(false);
        axios
         .delete(`/api/types-prestation/${prestationsToDelete}/`)
         .then(() => {
            setShowPrestationsDialog(false);
            setIsLoadedPrestations(true);
            handlePrestationsSuccess();
            setprestationsToDelete(null);
         })
         .catch((error) => {
            setShowPrestationsDialog(false);
            setIsLoadedPrestations(true);
            console.log('Delete request error:', error);
            handleErrorPrestations(error.request.response);
            setprestationsToDelete(null);
         });
      };


      const tableActionsDebours = [
        <IconDelete key="delete" onClick={handledeboursDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditDeboursClick} />,
      ];

      const tableActionsPrestations = [
        <IconDelete key="delete" onClick={handleprestationsDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditPrestationsClick} />,
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
                    <li onClick={handleTab1} className={activeTab === "tab1" ? styles.activeNavbarLi: styles.NavbarLi}>Liste Debours</li>
                    <li onClick={handleTab2} className={activeTab === "tab2" ? styles.activeNavbarLi: styles.NavbarLi}>Liste Préstations</li>
                </ul>
        </div>
        {!(isLoadedDebours && isLoadedPrestations) ? ( // Conditional rendering based on the loading state
        <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
        ) : 
        (
        <>
            {activeTab==="tab1"?
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Debours</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'designation', label: 'Designation' ,  inputType : 'text'},
            ]} onFilterChange={handledeboursFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredDeboursData} headers={headersDebours} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsDebours} />
            {showDeboursError && <ErrorMessage onClose={handleDeboursErrorClose} errors={errorDeboursMessages} />}
            {showDeboursDialog && <CustomMessage onClose={handleDeboursDialogClose} onConfirm={handleDeletedebours} message={"Souhaitez-vous vraiment supprimer ce debours ?"} />}
            {showDeboursSuccess && <SuccessMessage onClose={handleDeboursSuccessDeleteClose} />}
            {showEditDeboursForm && <TabDebours onClose={handleDeboursEditFormClose} 
                                    onAjouter={handleModifierdebours} 
                                    isEdit={true}
                                    toModify={deboursToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveaudeboursClick}/> 
            {showDeboursForm && <TabDebours onClose={handledeboursFormClose} 
                                    onAjouter={handleAjouterdebours} 
                                    isEdit={false}
                                    />}  
            {showDeboursError && <ErrorMessage onClose={handleDeboursErrorClose} errors={errorDeboursMessages} />}

            </span>
            <div className={stylesLine.footerSpace}></div> 
            </>
            :
            <>
             <h1 className={stylesLine.pageTitle}>Liste des Prestations</h1>
             <div className={styles.line}></div>
            <span className={styles.filter_span}>
            <TableFilter columns={[
                            { key: 'designation', label: 'Designation', inputType : 'text'},
            ]} onFilterChange={handleprestationsFilterChangeWrapper} />
            </span>
            <ReusableTable data={filteredPrestationsData} headers={headersPrestations} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsPrestations} />
            {showPrestationsError && <ErrorMessage onClose={handlePrestationsErrorClose} errors={errorPrestationsMessages} />}
            {showPrestationsDialog && <CustomMessage onClose={handlePrestationsDialogClose} onConfirm={handleDeleteprestations} message={"Souhaitez-vous vraiment supprimer cette préstation ?"} />}
            {showPrestationsSuccess && <SuccessMessage onClose={handlePrestationsSuccessDeleteClose} />}
            {showEditPrestationsForm && <TabPrestations onClose={handlePrestationsEditFormClose} 
                                    onAjouter={handleModifierprestations} 
                                    isEdit={true}
                                    toModify={prestationsToModify}
                                    />}  

            <span className={styles.addButton}>
            <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauprestationsClick}/> 
            {showPrestationsForm && <TabPrestations onClose={handleprestationsFormClose} 
                                    onAjouter={handleAjouterprestations} 
                                    isEdit={false}
                                    />}  
            {showPrestationsError && <ErrorMessage onClose={handlePrestationsErrorClose} errors={errorPrestationsMessages} />}

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

export default OptionsFactures