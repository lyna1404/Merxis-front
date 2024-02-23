import React, { useState } from "react";
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";
import AjouterDocJoint from "./Forms/AjouterDocJoint";
import ListeCodes from "./Forms/ListeCodes";

function TabDocJoint({onClose, onAjouter}) {
  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Document" activeTab={activeTab} setActiveTab={setActiveTab}/>
              <TabNavItem id="tab2" title="Liste codes" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            <TabContent id="tab1" activeTab={activeTab} children={<AjouterDocJoint onClose={onClose} onAjouter={onAjouter}/>}/>
            <TabContent id="tab2" activeTab={activeTab} children={<ListeCodes onClose={onClose} />}/>
        </div>
    </div>
  );
}

export default TabDocJoint