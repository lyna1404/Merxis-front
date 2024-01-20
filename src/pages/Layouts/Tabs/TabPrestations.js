import React, { useState } from "react";
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";
import AjouterPrestations from "./Forms/AjouterPrestations";
import EditPrestations from './Forms/EditPrestations';

const TabPrestations = ({onClose, onAjouter, isEdit, toModify}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Prestations" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            {!isEdit?
            <TabContent id="tab1" activeTab={activeTab} children={<AjouterPrestations onClose={onClose} onAjouter={onAjouter}/>}/>
            :
            <TabContent id="tab1" activeTab={activeTab} children={<EditPrestations onClose={onClose} onAjouter={onAjouter} toModify={toModify}/>}/>
            }
        </div>
    </div>
  );
};
export default TabPrestations;