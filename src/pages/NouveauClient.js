import React, {useState} from 'react';
import Breadcrumb from '../components/breadcrumb';
import styles from './gestionClients.module.css';
import InputField from '../components/InputField';
import buttonStyles from "../components/button.module.css"

const NouveauClient = () => {
    const [rs, setRS] = useState('');
    const [statutJuridique, setSJ] = useState('');
    const [adresse, setAdresse] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [rc1, setRC1] = useState('');
    const [rc2, setRC2] = useState('');
    const [rc3, setRC3] = useState('');
    const [dateRc, setDateRC] = useState('');
    const [NumNIF, setNif] = useState('');
    const [NumNis, setNis] = useState('');
    const [articleimp, setArticleImp] = useState('');
    const [NumSucc, setNumSucc] = useState('');
    const [representant, setRepresentant] = useState('');
    const [NumCarteNationale, setNumCarteNationale] = useState('');
    const [dateCarteNationale, setDateCarteNationale] = useState('');
    const [lieuCarteNationale, setLieuCarteNationale] = useState('');
    const [tel1, setTel1] = useState('');
    const [tel2, setTel2] = useState('');
    const [tel3, setTel3] = useState('');
    const [fax, setFax] = useState('');
    const [email, setEmail] = useState('');
    const [siteWeb, setSiteWeb] = useState('');
    const [rsArabe, setRSArabe] = useState('');
    const [rcArabe, setrcArabe] = useState('');
    const [adresseArabe, setAdresseArabe] = useState('');



    







    return (
        <>
            <Breadcrumb  />
                <p className={styles.pageTitle}>Ajout d'un nouveau client</p>
            <div className={styles.outerCadre}>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Raison sociale" size="verylarge" type="text" value={rs} onChange={(e) => setRS(e.target.value)} />
                        <InputField display="labelonleft" label="Statut juridique" size="verylarge" type="text" value={statutJuridique} onChange={(e) => setSJ(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Adresse" size="extralarge" type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        <InputField display="labelonleft" label="Code postal" size="average" type="number" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="N° RC" size="overaverage" type="number" value={rc1} onChange={(e) => setRC1(e.target.value)} />
                        <InputField  size="verysmall" type="number" value={rc2} onChange={(e) => setRC2(e.target.value)} />
                        <InputField  size="verysmall" type="number" value={rc3} onChange={(e) => setRC3(e.target.value)} />
                        <InputField display="labelonleft" label="Date RC" size="overaverage" type="date" value={dateRc} onChange={(e) => setDateRC(e.target.value)} />
                        <InputField display="labelonleft" label="N° NIF" size="large" type="number" value={NumNIF} onChange={(e) => setNif(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="N° NIS" size="overaverage" type="number" value={NumNis} onChange={(e) => setNis(e.target.value)} />
                        <InputField display="labelonleft" label="N° Article d'imposition" size="overaverage" type="number" value={articleimp} onChange={(e) => setArticleImp(e.target.value)} />
                        <InputField display="labelonleft" label="N° Succursale" size="overaverage" type="number" value={NumSucc} onChange={(e) => setNumSucc(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Représentant" size="extralarge" type="text" value={representant} onChange={(e) => setRepresentant(e.target.value)} />
                        <InputField  display="labelonleft" label="N° de la carte nationale" size="average" type="number" value={NumCarteNationale} onChange={(e) => setNumCarteNationale(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Date de la carte nationale" size="overaverage" type="date" value={dateCarteNationale} onChange={(e) => setDateCarteNationale(e.target.value)} />
                        <InputField display="labelonleft" label="Lieu de la carte nationale" size="overaverage" type="text" value={lieuCarteNationale} onChange={(e) => setLieuCarteNationale(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Tél 1" size="overaverage" type="text" value={tel1} onChange={(e) => setTel1(e.target.value)} />
                        <InputField display="labelonleft" label="Tél 2" size="overaverage" type="text" value={tel2} onChange={(e) => setTel2(e.target.value)} />
                        <InputField display="labelonleft" label="Tél 3" size="overaverage" type="text" value={tel3} onChange={(e) => setTel3(e.target.value)} />
                        <InputField  display="labelonleft" label="Fax" size="overaverage" type="text" value={fax} onChange={(e) => setFax(e.target.value)} />
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Email" size="extralarge" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputField display="labelonleft" label="Site Web" size="extralarge" type="text" value={siteWeb} onChange={(e) => setSiteWeb(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
                <div className={styles.cadreInputs}>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Raison Sociale en arabe" size="extralarge" type="text" value={rsArabe} onChange={(e) => setRSArabe(e.target.value)} />
                        <InputField display="labelonleft" label="N° RC en arabe" size="average" type="text" value={rcArabe} onChange={(e) => setrcArabe(e.target.value)} />
                       
                    </span>
                    <span className={styles.lineOfInputs}>
                        <InputField display="labelonleft" label="Adresse en arabe" size="extralarge" type="text" value={adresseArabe} onChange={(e) => setAdresseArabe(e.target.value)} />
                    </span>
                    <div className={styles.horizontalLine}></div>
                </div>
            </div>
            <span className={styles.buttonSpan_downpage}>
                    <button className={buttonStyles.primaryButtonY} type="submit" >Enregistrer</button>
            </span>
            
            
            
            
            
            
            
            
        </>
       
    );
};

export default NouveauClient;
