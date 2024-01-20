import React from 'react'
import Breadcrumb from '../components/breadcrumb'
import styles from './options.module.css'
import stylesP from './popupForm.module.css'

import { useState } from 'react';

function Options() {

  const [activeTab, setActiveTab] = useState("tab1");


  const handleTab1 = () => {
    setActiveTab("tab1")
}


function openFactures() {
  window.open("/options/factures",'_blank');
}

function openDevises() {
  window.open("/options/devises",'_blank');
}

function openPays() {
  window.open("/options/pays",'_blank');
}

function openMarchandises() {
  window.open("/options/marchandises", '_blank');
}

function openFournisseurs() {
  window.open("/options/fournisseurs", '_blank');
}

function openDouanes() {
  window.open("/options/douanes", '_blank');
}

function openTransports(){
  window.open("/options/transports", '_blank');
}

function openEntrepots(){
  window.open("/options/entrepots", '_blank');
}

function openDocuments(){
  window.open("options/documents", '_blank');
}

  return (
    <>
    <Breadcrumb/>
    <div>
        <div className={styles.navbar}>
            <ul>
                <li onClick={handleTab1} className={activeTab === "tab1" ? "active" : ""}>Options de formulaires</li>
            </ul>
        </div>
        <div className={stylesP.mainContent}>
        {activeTab=== "tab1"?
        <>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des devises</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de devises contiennent les formulaires de gestions des codes et désignations des monnaies</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openDevises()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des documents</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de documents contiennent les formulaires de gestions des listes de documents</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openDocuments()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des douanes</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de douanes contiennent les formulaires de gestion des régimes douaniers et des bureaux de douanes</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openDouanes()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des entrepôts</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres d'enrepôts contiennent les formulaires de gestion des lieux d'entreposage et parcs a vide, et des lieux de livraison</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openEntrepots()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des factures</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de factures contiennent les formulaires de gestion des débours et des préstations</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openFactures()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des fournisseurs</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de fournisseurs contiennent les formulaires de gestion des fournisseurs</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openFournisseurs()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des marchandises</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de marchandises contiennent les formulaires de gestion des natures de marchandises</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openMarchandises()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des pays</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de pays contiennent les formulaires de gestion des pays d'achat/vente et des pays de provenance</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openPays()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>
          <div className={styles.container}>
            <p className={styles.pageTitle}>Gestion des transports</p>
            <div className={styles.textLine}>
              <p className={styles.normalText}>Les paramètres de transports contiennent les formulaires de gestion des compagnies, des types de compagnies, et des moyens de transport</p>
              <div className={styles.cadreInputs}>
                <button className={`${styles.primaryButtonB}`} children="Gérer" onClick={() => openTransports()}/>  
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}/>




        </div>

        
        </> 
        :
        activeTab === "tab2"? 
        <>
        
        </>
        :
        <>
        
        </>
        }
        </div>
      </div>
    </>
  )
}

export default Options