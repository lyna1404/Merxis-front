import React, { useState, useEffect } from "react";
import styles from '../../popupForm.module.css'
import TabNavItem from "../../../components/tabNavItem";
import TabContent from "../../../components/tabContent";
import AjoutEmballage from './Forms/AjoutEmballage';
import EditEmballage from './Forms/EditEmballage';


const TabEmballages = ({onClose, onAjouter, onFileUpload, onFileUploadClick,inputFile, isEdit, toModify, listeEmbs, listeEmbsComplete, genresEmb, typesEmb, piedsEmb}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});


  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Emballage" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
        {!isEdit?
                <TabContent id="tab1" activeTab={activeTab} children={<AjoutEmballage onClose={onClose} 
                                                                                      onAjouter={onAjouter} 
                                                                                      onFileUpload={onFileUpload} 
                                                                                      onFileUploadClick={onFileUploadClick}
                                                                                      inputFile={inputFile}
                                                                                      genresEmb={genresEmb}
                                                                                      piedsEmb={piedsEmb}
                                                                                      typesEmb={typesEmb}/>}/>

        :
                <TabContent id="tab1" activeTab={activeTab} children={<EditEmballage onClose={onClose} 
                                                                                      onAjouter={onAjouter} 
                                                                                      onFileUpload={onFileUpload} 
                                                                                      onFileUploadClick={onFileUploadClick}
                                                                                      inputFile={inputFile}
                                                                                      genresEmb={genresEmb}
                                                                                      piedsEmb={piedsEmb}
                                                                                      typesEmb={typesEmb}
                                                                                      toModify={toModify}/>}/>
                                                                                      
        }
        </div>
    </div>
  );
};
export default TabEmballages;