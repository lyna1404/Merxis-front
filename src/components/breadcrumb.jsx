import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./breadcrumb.module.css";
import IconeDroite from "./IconeDroite.jsx";
import buttonStyles from './button.module.css';

const displayNameMap = {
    home: "Home",
    gestionClients: "Gestion des clients",
    detailsClient: "Détails du client",
    comptabilite: "Comptabilité",
    deboursComptabilite: "Liste des debours",
    NouveauClient: "Nouveau Client",
    ViewClient: "Détails Client",
    EditClient : "Modification Client",
    facturation: "Facturation"

  };

const Breadcrumb = ({ hideParams = false}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const displayName = displayNameMap[name] || name;
    return { name, routeTo, displayName };
  });

  // Remove the last breadcrumb item if hideParams is true
  if (hideParams && breadcrumbItems.length > 0) {
    breadcrumbItems.pop();
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
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
      </ol>
    </nav>
  );
};

export default Breadcrumb;
