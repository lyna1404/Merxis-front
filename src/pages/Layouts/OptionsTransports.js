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
import TabEmballages from './Tabs/TabEmballages';

function OptionsTransports() {
  const apiUrl = process.env.REACT_APP_API_URL;

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

    const [isLoadedEmballages, setIsLoadedEmballages] = useState(false);
    const [filteredEmballagesData, setFilteredEmballagesData] = useState([]);
    const [errorEmballagesMessages, setErrorEmballagesMessages] = useState({});
    const [showEmballagesDialog, setShowEmballagesDialog] = useState(false);
    const [showEmballagesError, setShowEmballagesError] = useState(false);
    const [showEmballagesSuccess, setShowEmballagesSuccess] = useState(false);

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

   const [emballages, setEmballages] = useState([]);
   const [emballageToDelete, setEmballageToDelete] = useState([]);
   const [emballageToModify, setEmballageToModify] = useState([]);



   const headersMoyen = ["Nom", "Actions à faire", "",]
   const headerscompagnies = ["Nom", "Adresse", "Tel", "E-mail", "Type", "Actions à faire"]
   const headersTypes = ["Type", "Actions à faire", ""]
   const headersEmballages = ["Numero", "Genre", "Type", "Nbr pieds", "Actions à faire", ""]


    // Récupérer la liste des moyens 
    useEffect(() => {
      axios.get(`${apiUrl}/api/moyens-transport/`)
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
        axios.get(`${apiUrl}/api/compagnies-transport/`)
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
        axios.get(`${apiUrl}/api/types-compagnie/`)
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

    // Récupérer la liste des emballages 
    useEffect(() => {
        axios.get(`${apiUrl}/api/emballages/`)
        .then((response) => {
            const emballageData = response.data;
            if (typeof emballageData === 'object' && emballageData !== null) {
              const extractedEmballage = Object.values(emballageData).map(item => ({
                id: item.emballage_pk,
                numEmballage: item.numEmballage,
                genreEmballage: item.genreEmballage,
                typeEmballage: item.typeEmballage,
                nbrPieds: item.nbrPieds
              }));
              setEmballages(extractedEmballage);
              setFilteredEmballagesData(extractedEmballage);
              setIsLoadedEmballages(true);
            }
            else {
            console.error('Response data is not a JSON object:', emballageData);
            handleErrorEmballages(emballageData);
            setIsLoadedEmballages(true);
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
  

    // Récupérer les paramètres des emballages
    const [genresEmb, setGenresEmb] = useState([]);
    const [typesEmb, setTypesEmb] = useState([]);
    const [piedsEmb, setPiedsEmb] = useState([]);

    useEffect(() => {
      const genresEmballage = axios.get(`${apiUrl}/api/genres-emballage/`);
      const typesEmballage = axios.get(`${apiUrl}/api/types-emballage/`);
      const piedsEmballage = axios.get(`${apiUrl}/api/nbr-pieds/`);

      Promise.all([genresEmballage, typesEmballage, piedsEmballage])
      .then((responses) => {
        const genresEmballageData = responses[0].data;
        const typesEmballageData = responses[1].data;
        const piedsEmballageData = responses[2].data;

        setGenresEmb(genresEmballageData.results);
        setTypesEmb(typesEmballageData.results);
        setPiedsEmb(piedsEmballageData.results);
      })
      .catch((error) => {
        console.log('Error:', error);
        handleErrorEmballages(error.request.response);

      });
    }, []);

    const [showMoyenForm, setShowMoyenForm] = useState(false);
    const [showEditMoyenForm, setShowEditMoyenForm] = useState(false);

    const [showCompagniesForm, setShowCompagniesForm] = useState(false);
    const [showEditCompagniesForm, setShowEditCompagniesForm] = useState(false);

    const [showTypesForm, setShowTypesForm] = useState(false);
    const [showEditTypesForm, setShowEditTypesForm] = useState(false);

    const [showEmballagesForm, setShowEmballagesForm] = useState(false);
    const [showEditEmballagesForm, setShowEditEmballagesForm] = useState(false);

    const handleMoyenFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,moyens, setFilteredMoyenData);
      };

    const handleCompagnieFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,compagnies, setFilteredCompagniesData);
      };

      const handleTypeFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,types, setFilteredTypesData);
      };
    
      const handleEmballageFilterChangeWrapper = (columnKey, filterValue) => {
        handleFilterChange(columnKey, filterValue,emballages, setFilteredEmballagesData);
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

      // Nouvel emballage
      const handleNouveauEmballageClick = () => {
        setShowEmballagesForm(true);
      };

    const handleEmballageFormClose = () => {
        setShowEmballagesForm(false);
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

      // Modifier type
      const handleEditTypesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setTypeToModify(rowId);
        setShowEditTypesForm(true);
      };

    const handleTypesEditFormClose = () => {
        setShowEditTypesForm(false);
      };

      // Modifier emballage
      const handleEditEmballagesClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setEmballageToModify(rowId);
        setShowEditEmballagesForm(true);
      };

    const handleEmballagesEditFormClose = () => {
        setShowEditEmballagesForm(false);
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

      const handleErrorEmballages = (errors) => {
        setShowEmballagesError(true);
        setErrorEmballagesMessages(errors);
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

      const handleEmballagesErrorClose = () => {
        setShowEmballagesError(false);
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

      const handleEmballagesDialogClose = () => {
        setEmballageToDelete(null);
        setShowEmballagesDialog(false);
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

        const handleEmballagesSuccess = () => {
            setShowEmballagesSuccess(true);
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

        const handleEmballagesSuccessClose = () => {
            setShowEmballagesSuccess(false);
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

        const handleEmballagesSuccessDeleteClose = () => {
            setShowEmballagesSuccess(false);
            reloadPage();
          };

         //Controler l'ajout d'un moyen 
       const handleAjouterMoyen = (data) => {
        
        setIsLoadedMoyen(false);

        const moyen = {
          nom: data.nom,
        };
       
        const moyenCreated =  axios.post(`${apiUrl}/api/moyens-transport/`, JSON.stringify(moyen), {
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
       
        const compagnieCreated =  axios.post(`${apiUrl}/api/compagnies-transport/`, JSON.stringify(comp), {
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
       
        const regimeCreated =  axios.post(`${apiUrl}/api/types-compagnie/`, JSON.stringify(type), {
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

       //Controler l'ajout d'un emballage
       const handleAjouterEmballage = (data) => {
        
        setIsLoadedEmballages(false);

        const emballage = {
          numEmballage: data.numEmballage,
          genreEmballage: data.genreEmballage,
          typeEmballage: data.typeEmballage,
          nbrPieds: data.nbrPieds,
        };
       
        const emballageCreated =  axios.post(`${apiUrl}/api/emballages/`, JSON.stringify(emballage), {
          headers: {
            'Content-Type': 'application/json',
          }
          })
          .then((response) => {
              const emballageResponse = response.data;   
              setIsLoadedEmballages(true);
              handleEmballagesSuccess();
          })
          .catch((error) => {
            setIsLoadedEmballages(true)
              console.log(error.request.response);  
              handleErrorEmballages(error.request.response);
          });
       };

        //Controler la modification d'un moyen 
       const handleModifierMoyen = (data) => {
        
        setIsLoadedMoyen(false);

        const moyen = {
          nom: data.nom,
        };
       
        const moyenCreated =  axios.put(`${apiUrl}/api/moyens-transport/${moyenToModify}/`, JSON.stringify(moyen), {
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
         
        const compagnieModified =  axios.put(`${apiUrl}/api/compagnies-transport/${compagnieToModify}/`, JSON.stringify(comp), {
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

        //Controler la modification d'un type 
        const handleModifierType = (data) => {
        
            setIsLoadedTypes(false);
    
            const type = {
                type: data.type,
              };
                 
            const typeModified =  axios.put(`${apiUrl}/api/types-compagnie/${typeToModify}/`, JSON.stringify(type), {
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

         //Controler la modification d'un emballage 
         const handleModifierEmballage = (data) => {
        
          setIsLoadedEmballages(false);
  
          const emballage = {
            numEmballage: data.numEmballage,
            genreEmballage: data.genreEmballage,
            typeEmballage: data.typeEmballage,
            nbrPieds: data.nbrPieds,
          };
               
          const emballageModified =  axios.put(`${apiUrl}/api/emballages/${emballageToModify}/`, JSON.stringify(emballage), {
            headers: {
              'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const emballageResponse = response.data;   
                setIsLoadedEmballages(true);
                setEmballageToModify(null);
                handleEmballagesSuccess();
            })
            .catch((error) => {
              setIsLoadedEmballages(true)
                console.log(error.request.response);  
                setEmballageToModify(null);
                handleErrorEmballages(error.request.response);
            });
         };

      // Suppression d'un moyen
       const handleMoyenDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setMoyenToDelete(rowId);
        setShowMoyenDialog(true);
      };

      const handleDeleteMoyen = () => {
        setShowMoyenDialog(false);
        setIsLoadedMoyen(false);
        axios
         .delete(`${apiUrl}/api/moyens-transport/${moyenToDelete}/`)
         .then(() => {
            setShowMoyenDialog(false);
            setIsLoadedMoyen(true);
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
        const rowId = event.target.closest('tr').id;
        setCompagnieToDelete(rowId);
        setShowCompagniesDialog(true);
      };

      const handleDeleteCompagnie = () => {
        setShowCompagniesDialog(false);
        setIsLoadedCompagnies(false);
        axios
         .delete(`${apiUrl}/api/compagnies-transport/${compagnieToDelete}/`)
         .then(() => {
            setShowCompagniesDialog(false);
            setIsLoadedCompagnies(true);
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
        const rowId = event.target.closest('tr').id;
        setTypeToDelete(rowId);
        setShowTypesDialog(true);
      };

      const handleDeleteType = () => {
        setShowTypesDialog(false);
        setIsLoadedTypes(false);
        axios
         .delete(`${apiUrl}/api/types-compagnie/${typeToDelete}/`)
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

      // Suppression d'un emballage
      const handleEmballageDeleteClick = (event) => {
        const rowId = event.target.closest('tr').id;
        setEmballageToDelete(rowId);
        setShowEmballagesDialog(true);
      };

      const handleDeleteEmballage = () => {
        setShowEmballagesDialog(false);
        setIsLoadedEmballages(false);
        axios
         .delete(`${apiUrl}/api/emballages/${emballageToDelete}/`)
         .then(() => {
            setShowEmballagesDialog(false);
            setIsLoadedEmballages(true);
            handleEmballagesSuccess();
            setEmballageToDelete(null);
         })
         .catch((error) => {
            setShowEmballagesDialog(false);
            setIsLoadedEmballages(true);
            console.log('Delete request error:', error);
            handleErrorEmballages(error.request.response);
            setEmballageToDelete(null);
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

      const tableActionsEmballages = [
        <IconDelete key="delete" onClick={handleEmballageDeleteClick} />,
        <IconEdit key="edit" onClick={handleEditEmballagesClick} />,
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

    const handleTab4 = () => {
      setActiveTab("tab4")
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
                    <li onClick={handleTab4} className={activeTab === "tab4" ? styles.activeNavbarLi: styles.NavbarLi}>Emballages</li>

                </ul>
        </div>
        {!(isLoadedCompagnies && isLoadedTypes && isLoadedMoyen && isLoadedEmballages) ? ( // Conditional rendering based on the loading state
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
            : activeTab === "tab3"?
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
           :
           <>
            <h1 className={stylesLine.pageTitle}>Liste des Emballages</h1>
            <div className={styles.line}></div>
           <span className={styles.filter_span}>
           <TableFilter columns={[
                            { key: 'numEmballage', label: 'N° Emballage' ,  inputType : 'text'},
                            { key: 'genreEmballage', label: 'Genre Emballage', inputType : 'text' },
                            { key: 'nbrPieds', label: 'Pieds' , inputType : 'text'},
                            { key: 'typeEmballage', label: 'Type Emballage' , inputType : 'text'},
             ]} onFilterChange={handleEmballageFilterChangeWrapper} />
           </span>
           <ReusableTable data={filteredEmballagesData} headers={headersEmballages} itemsPerPage={5} addlink={false} addactions={true} actionIcons={tableActionsEmballages} />
           {showEmballagesError && <ErrorMessage onClose={handleEmballagesErrorClose} errors={errorEmballagesMessages} />}
           {showEmballagesDialog && <CustomMessage onClose={handleEmballagesDialogClose} onConfirm={handleDeleteEmballage} message={"Souhaitez-vous vraiment supprimer cet emballage?"} />}
           {showEmballagesSuccess && <SuccessMessage onClose={handleEmballagesSuccessDeleteClose} />}
           {showEditEmballagesForm && <TabEmballages onClose={handleEmballagesEditFormClose} 
                                   onAjouter={handleModifierEmballage} 
                                   isEdit={true}
                                    genresEmb={genresEmb} 
                                    typesEmb={typesEmb} 
                                    piedsEmb={piedsEmb}
                                   toModify={emballageToModify}
                                   />}  

           <span className={styles.addButton}>
           <button className={`${buttonStyles.primaryButtonY}`} children='Nouveau'  onClick={handleNouveauEmballageClick}/> 
           {showEmballagesForm && <TabEmballages onClose={handleEmballageFormClose} 
                                   onAjouter={handleAjouterEmballage} 
                                   genresEmb={genresEmb} 
                                    typesEmb={typesEmb} 
                                    piedsEmb={piedsEmb}
                                   isEdit={false}
                                   />}  
           {showEmballagesError && <ErrorMessage onClose={handleEmballagesErrorClose} errors={errorEmballagesMessages} />}

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