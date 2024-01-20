import React, { useState } from "react";
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";
import AjouterLieu from "./Forms/AjouterLieu";
import EditLieu from './Forms/EditLieu';

const TabLieux = ({onClose, onAjouter, isEdit, toModify}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Lieu" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
            {!isEdit?
            <TabContent id="tab1" activeTab={activeTab} children={<AjouterLieu onClose={onClose} onAjouter={onAjouter}/>}/>
            :
            <TabContent id="tab1" activeTab={activeTab} children={<EditLieu onClose={onClose} onAjouter={onAjouter} toModify={toModify}/>}/>
            }
        </div>
    </div>
  );
};
export default TabLieux;