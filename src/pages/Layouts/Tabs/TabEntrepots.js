import React, { useState } from "react";
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";
import AjouterEntrepot from "./Forms/AjouterEntrepot";
import EditEntrepot from './Forms/EditEntrepot'

const TabEntrepots = ({onClose, onAjouter, isEdit, toModify}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Entrepot" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            {!isEdit?
            <TabContent id="tab1" activeTab={activeTab} children={<AjouterEntrepot onClose={onClose} onAjouter={onAjouter}/>}/>
            :
            <TabContent id="tab1" activeTab={activeTab} children={<EditEntrepot onClose={onClose} onAjouter={onAjouter} toModify={toModify}/>}/>
            }
        </div>
    </div>
  );
};
export default TabEntrepots;