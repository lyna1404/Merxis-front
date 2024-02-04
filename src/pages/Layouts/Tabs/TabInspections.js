import React, { useState } from "react";
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";
import AjouterInspection from './Forms/AjouterInspection';
import EditInspection from "./Forms/EditInspection";

function TabInspections({onClose, onAjouter, isEdit, toModify}) {
    
    const [activeTab, setActiveTab] = useState("tab1");
  
    return (
      <div className={styles.container}>
          <div className={styles.sidebar}>
              <ul className={styles.ul}>
                <TabNavItem id="tab1" title="مفتشية حدود" activeTab={activeTab} setActiveTab={setActiveTab}/>
             </ul>
          </div>
          <div className={styles.verticalLine}/>
          <div className={styles.outlet}>
              {!isEdit?
              <TabContent id="tab1" activeTab={activeTab} children={<AjouterInspection onClose={onClose} onAjouter={onAjouter}/>}/>
              :
              <TabContent id="tab1" activeTab={activeTab} children={<EditInspection onClose={onClose} onAjouter={onAjouter} toModify={toModify}/>}/>
              }
          </div>
      </div>
    );
}

export default TabInspections