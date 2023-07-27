import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./breadcrumb.module.css"; // Import the CSS module
import IconeDroite from "./IconeDroite.jsx"; 

const displayNameMap = {
    home: "Home",
    gestionClients: "Gestion des clients",
    detailsClient: "Détails du client",
    comptabilite: "Comptabilité",
    deboursComptabilite: "Liste des debours"
    // Add more mappings for other pages if needed
  };

const Breadcrumb = () => {
  const location = useLocation();
  console.log(location);
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}> {/* Use the CSS module class name */}
        <li className={styles["breadcrumb-item"]}> {/* Use the CSS module class name */}
          <Link to="/">Home</Link>
          <IconeDroite />
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = displayNameMap[name] || name; // Get the display name from the map or use the original name
          return isLast ? (
            <li
              key={name}
              className={`${styles["breadcrumb-item"]} ${styles.active}`}
              aria-current="page"
            >
              {displayName}
            </li>
          ) : (
            <li key={name} className={styles["breadcrumb-item"]}> 
              <Link to={routeTo}>{displayName}<IconeDroite /></Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
