import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import labelStyles from "../../../../components/inputField.module.css";
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'

function AjouterArticle({onClose, onAjouter}) {

    const [num, setNum] = useState('');

    const handleSubmit = () => {
        console.log('submit');
    }
  
    return (
    <div className={styles.tab}>
        <form onSubmit={handleSubmit}>
            <h2>Ajout Article</h2>
            <div className={styles.fields_area}>
                <span className={filterStyles.container}>
                    <InputField display="labelontop" label="N° de l'article" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    <InputField display="labelontop" label="Position tarifaire" size="belowbelowaverage" placeholder='----------' type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="." size="verysmall" type="text" value={num} readOnly={true}/>
                    <InputField display="labelontop" label="Origine" size="verysmall" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="." size="overaverage" type="text" value={num} readOnly={true} />
                    <InputField display="labelontop" label="Libellé" size="extralarge" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    <InputField display="labelontop" label="Désignation" size="extralarge" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Prix unitaire" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Unité" size="verysmall" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Quantité" size="small" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Poids net" size="belowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Quantité complémentaire" size="average" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Quotité d'imposition" size="belowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="Unité" size="verysmall" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    <InputField display="labelontop" label="PTFN de l'article" size="overaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                </span>
                <div className={styles.horizontalLine}></div>
                <h3>Taxes AD Valorem</h3>
                <span className={filterStyles.containerGrid}>
                    <div className={styles.many_fields}>
                        <InputField display="labelontop" label="Taxes" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Quotité" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Assiette" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Montant" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                    <div className={styles.many_fields}>
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                    <div className={styles.many_fields}>
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                    <div className={styles.many_fields}>
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                </span>
                <h3>Taxes Spécifiques</h3>
                <span className={filterStyles.containerGrid}>
                    <div className={styles.many_fields}>
                        <InputField display="labelontop" label="Taxes" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Quotité" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Assiette" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Montant" size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                    <div className={styles.many_fields}>
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                    <div className={styles.many_fields}>
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                    <div className={styles.many_fields}>
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField size="belowbelowaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                </span>
                <span className={filterStyles.container}>
                    <div className={styles.article_sum}>
                        <InputField display="labelontop" label="Valeur en Douane Article" size="overaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                        <InputField display="labelontop" label="Total Droits et Taxes Article" size="overaverage" type="text" value={num} onChange={(e) => setNum(e.target.value)}  />
                    </div>
                </span>
                <div className={styles.horizontalLine}></div>

            </div>

                <span className={styles.buttonSpan}>
                    <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
                    <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                </span>
                <div className={styles.footer}></div>

        </form>
    </div>
  )
}

export default AjouterArticle