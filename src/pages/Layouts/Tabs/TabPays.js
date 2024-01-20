import React, { useState } from "react";
import AjouterPays from './Forms/AjouterPays'
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";

const TabPays = ({onClose, onAjouter}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Pays" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            <TabContent id="tab1" activeTab={activeTab} children={<AjouterPays onClose={onClose} onAjouter={onAjouter}/>}/>
        </div>
    </div>
  );
};
export default TabPays;