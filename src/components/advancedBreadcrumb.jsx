import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./advancedBreadcrumb.module.css"; // Import the CSS module
import IconeDroite from "./IconeDroite.jsx"; 
import buttonStyles from './button.module.css';
import ErrorMessage from '../components/errorMessage';
import SuccessMessage from '../components/succesMessage';
import TabDocDossier from '../pages/TabDocDossier';


const displayNameMap = {
    home: "Home",
    gestionClients: "Gestion des clients",
    detailsClient: "Détails du client",
    comptabilite: "Comptabilité",
    deboursComptabilite: "Liste des debours",
    facturation : "Facturation",
    archivage: "Archivage",
    EditDossier: "Modification",
    ViewDossier: "Affichage Dossier",
    NouveauDossier: "Nouveau Dossier",
    // Add more mappings for other pages if needed
  };

const AdvancedBreadcrumb = ({ numDossier, dossier, declaration, hideParams = false, hideButtons=false, hideDocs=false, isViewDoc=false, showError, showForm, showSuccess, onDocClick, onSuccessClose, onErrorClose, onClick, onAjouterDoc, onCloseDoc, dossierPk, errorMessages }) => {

  const location = useLocation();
  console.log(location);
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate breadcrumb items based on pathnames
  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const displayName = displayNameMap[name] || name;
    return { name, routeTo, displayName };
  });

  if (hideParams && breadcrumbItems.length > 0) {
    breadcrumbItems.pop();
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}> {/* Use the CSS module class name */}
        <li className={styles["breadcrumb-item"]}>
          <Link to="/">Home</Link>
          <IconeDroite />
        </li>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return isLast ? (
            <li
              key={item.name}
              className={`${styles["breadcrumb-item"]} ${styles.active}`}
              aria-current="page"
            >
              {item.displayName}
            </li>
          ) : (
            <li key={item.name} className={styles["breadcrumb-item"]}>
              <Link to={item.routeTo}>{item.displayName}</Link>
              <IconeDroite />
            </li>
          );
        })}   
        <div className={styles.container}>
          <label className={styles.label_style}>N° Dossier:</label>
          <input className={styles.input}
            value={numDossier}
            readOnly={true}
          />
          {!hideButtons? 
            <>
              <button className={buttonStyles.primaryButtonY} type="submit" onClick={onClick} >Enregistrer</button>
              {showError && <ErrorMessage onClose={onErrorClose} errors={errorMessages} />}
              {console.log("errors breadcrumb",errorMessages)}
              {showSuccess && <SuccessMessage onClose={onSuccessClose} />}
              {!hideDocs?
                <>
                  <button className={`${buttonStyles.third}`} children='Documents' onClick={onDocClick} />  
                  {showForm && <TabDocDossier onClose={onCloseDoc} 
                                    isView={isViewDoc}
                                    onAjouter={onAjouterDoc} 
                                    dossierPk={dossierPk}
                                    dossier={dossier}
                                    declaration={declaration}
                                    />}                  
                </>
                :
                <>
                </>
              }
            </>
            : !hideDocs?
            <>
             <button className={`${buttonStyles.third}`} children='Documents' onClick={onDocClick} /> 
             {showForm && <TabDocDossier onClose={onCloseDoc} 
                                    isView={isViewDoc}
                                    onAjouter={onAjouterDoc} 
                                    dossierPk={dossierPk}
                                    dossier={dossier}
                                    />}       
            </>
            :
            <>
            </>
          } 
      </div>   
      </ol>
    </nav>
  );
};

export default AdvancedBreadcrumb;
