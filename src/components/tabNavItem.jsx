import React from "react";
import styles from '../pages/popupForm.module.css'
import IconeLi from "../components/IconeLi";

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? styles.activeSidebarLi : styles.sidebarLi}>
        {activeTab === id ? <div className={styles.selectIcon}><IconeLi/></div>
                                          :
                                           <></>}
        { title }
   </li>
 );
};
export default TabNavItem;