import React, { useState } from "react";
import AjoutEmballage from "./AjoutEmballage";
import styles from './popupForm.module.css'
import TabNavItem from "../components/tabNavItem";
import TabContent from "../components/tabContent";

const TabEmballages = ({onClose, onAjouter, onFileUpload, onFileUploadClick,inputFile, listeEmbs, listeEmbsComplete, genresEmb, typesEmb, piedsEmb}) => {


  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
              <TabNavItem id="tab1" title="Emballage" activeTab={activeTab} setActiveTab={setActiveTab}/>
              <TabNavItem id="tab2" title="(Cas DSTR)" activeTab={activeTab} setActiveTab={setActiveTab}/>
           </ul>
        </div>
        <div className={styles.verticalLine}/>
        <div className={styles.outlet}>
                <TabContent id="tab1" activeTab={activeTab} children={<AjoutEmballage onClose={onClose} 
                                                                                      onAjouter={onAjouter} 
                                                                                      onFileUpload={onFileUpload} 
                                                                                      onFileUploadClick={onFileUploadClick}
                                                                                      inputFile={inputFile}
                                                                                      listeEmbs={listeEmbs}
                                                                                      listeEmbsComplete={listeEmbsComplete}
                                                                                      genresEmb={genresEmb}
                                                                                      piedsEmb={piedsEmb}
                                                                                      typesEmb={typesEmb}
                                                                                      isDstr={false}/>}/>
                <TabContent id="tab2" activeTab={activeTab} children={<AjoutEmballage onClose={onClose} 
                                                                                    onAjouter={onAjouter} 
                                                                                    onFileUpload={onFileUpload} 
                                                                                    onFileUploadClick={onFileUploadClick}
                                                                                    inputFile={inputFile}
                                                                                    listeEmbs={listeEmbs}
                                                                                    listeEmbsComplete={listeEmbsComplete}
                                                                                    genresEmb={genresEmb}
                                                                                    piedsEmb={piedsEmb}
                                                                                    typesEmb={typesEmb}
                                                                                    isDstr={true}/>}/>
        </div>
    </div>
  );
};
export default TabEmballages;