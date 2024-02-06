import React , {useEffect, useState} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import InputField from '../../../../components/InputField'
import filterStyles from '../../../../components/tableFilter.module.css'
import axios from 'axios';
import stylesLoader from '../../../gestionClients.module.css'
import labelStyles from "../../../../components/inputField.module.css";



function EditFraude({id, dossier, declaration, onAjouter, onClose}) {

    // Ajouter formulaire emballage
    
    const [douanePk, setDouanePk] = useState('');
    const [douane, setDouane] = useState('');
    const [wilayaPk, setWilayaPk] = useState('');
    const [directionCommerciale, setDirectionCommerciale] = useState('');
    const [raisonSociale, setRaisonSociale] = useState('');
    const [numRC, setNumRC] = useState(''); 
    const [dateRC, setDateRC] = useState('');
    const [adresse, setAdresse] = useState('');
    const [natureMarchandise, setNatureMarchandise] = useState(dossier.natureMarchandise? dossier.natureMarchandise.designationArabe:'');
    const [nbrEmb, setNbrEmb] = useState('');
    const [genreEmb, setGenreEmb] = useState(''); // type TC en arabes 
    const [nbrColis, setNbrColis] = useState(declaration.nbrColis? declaration.nbrColis:0);
    const [poids, setPoids] = useState('');
    const [unite, setUnite] = useState(''); // Kg ou Tonne
    const [sousPosition, setSousPosition] = useState('');
    const [numFactureFournisseur, setNumFactureFournisseur] = useState(''); // à récupérer
    const [dateFactureFournisseur, setDateFactureFournisseur] = useState('');
    const [montant, setMontant] = useState(dossier.montantFactureFournisseur? dossier.montantFactureFournisseur:'');
    const [monnaie, setMonnaie] = useState(dossier.monnaie? dossier.monnaie.code==='EUR'?"أورو":dossier.monnaie.code==='USD'?"دولار أمريكي":"":"");
    const [tauxChange, setTauxChange] = useState('');
    const [montantDZD, setMontantDZD] = useState('');
    const [fournisseur, setFournisseur] = useState('');
    const [paysOrigine, setPaysOrigine] = useState('');
    const [numPart, setNumPart] = useState('');
    const [typeCertificatOrigine, setTypeCertificatOrigine] = useState(''); // 0 raqm - 1 tarikh
    const [numCertificatOrigine, setNumCertificatOrigine] = useState('');
    const [dateCertificatOrigine, setDateCertificatOrigine] = useState(''); // choisir date ou num selon le type
    const [typeControle, setTypeControle] = useState('');
    const [nomCertificatControle, setNomCertificatControle] = useState('');
    const [typeCertificatControle, setTypeCertificatControle] = useState(''); // raqm - tarikh
    const [numCertificatControle, setNumCertificatControle] = useState('');
    const [dateCertificatControle, setDateCertificatControle] = useState('');
    const [typeTransport, setTypeTransport] = useState('');
    const [documentsTransport, setDocumentsTransport] = useState('');
    const [numDocumentTransport, setNumDocumentTransport] = useState('');
    const [paysDemarrage, setPaysDemarrage] = useState('');
    const [dateDemarrage, setDateDemarrage] = useState('');
    const [paysEscale, setPaysEscale] = useState('');
    const [paysArriveePk, setPaysArriveePk] = useState('');
    const [paysArrivee, setPaysArrivee] = useState('');
    const [dateArrivee, setDateArrivee] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedLists, setIsLoadedLists] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessages, setErrorMessages] = useState(false);

    const [listeDouanes, setListeDouanes] = useState([]);
    const [listeLieux, setListeLieux] = useState([]);
    const [listeWilayas, setListeWilayas] = useState([]);

    const [selectedDouane, setSelectedDouane] = useState({value:douanePk, label:douane});
    const [selectedLieu, setSelectedLieu] = useState('');
    const [selectedWilaya, setSelectedWilaya] = useState('');

    const handleDouaneSelection = (searchTerm) => {
        setSelectedDouane(searchTerm);
        setDouane(searchTerm.label);
        setDouanePk(searchTerm.value);
      };

    const handleLieuSelection = (searchTerm) => {
        setSelectedLieu(searchTerm);
        setPaysArrivee(searchTerm.label);
        setPaysArriveePk(searchTerm.value);
        
      };

    const handleWilayaSelection = (searchTerm) => {
        setSelectedWilaya(searchTerm);
        setDirectionCommerciale(searchTerm.label);
        setWilayaPk(searchTerm.value);
      };

    const handleDouaneInit = (searchTerm) => {
        const douanes = listeDouanes.filter((douanes) => douanes.nom.toString().includes(searchTerm.toString()))[0];
        setSelectedDouane({value:douanes.inspectionFrontiere_pk, label:searchTerm})
    }

    const handleLieuInit = (searchTerm) => {
        const lieux = listeLieux.filter((lieux) => lieux.nom.toString().includes(searchTerm.toString()))[0];
        setSelectedLieu({value:lieux.paysArrivee_pk, label:searchTerm})
    }

    const handleWilayaInit = (searchTerm) => {
        const wilayas = listeWilayas.filter((wilayas) => wilayas.nomArabe.toString().includes(searchTerm.toString()))[0];
        setSelectedWilaya({value:wilayas.wilaya_pk, label:searchTerm})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler la fonction onAjouter pour ajouter le nouveau type
        onAjouter({douanePk, wilayaPk, raisonSociale, numRC, dateRC, adresse, natureMarchandise, nbrEmb, genreEmb,
          nbrColis, poids, unite, sousPosition, numFactureFournisseur, dateFactureFournisseur, montant, monnaie, tauxChange, montantDZD,
          fournisseur, paysOrigine, numPart, typeCertificatOrigine, numCertificatOrigine, dateCertificatOrigine, typeControle,
          nomCertificatControle, typeCertificatControle, numCertificatControle, dateCertificatControle, typeTransport,
          documentsTransport, numDocumentTransport, paysDemarrage, dateDemarrage, paysEscale, paysArriveePk, dateArrivee});
        // Fermer le Pop Up
       // onClose();
    };

      // Controle d'erreurs
      const handleError = (errors) => {
        setShowError(true);
        setErrorMessages(errors);
      };


    useEffect(() => {
        const bs =  axios.get(`/api/dossiers/${dossier.dossier_pk}/fraude/`)

        .then((response) => {

          const docData = response.data;
            setDirectionCommerciale(docData.مديرية_التجارة);
            setDouane(docData.مفتشية_الحدود);
            setRaisonSociale(docData.المستورد);
            setNumRC(docData.رقم_السجل);
            setDateRC(docData.تاريخ_السجل);
            setAdresse(docData.العنوان);
            setNatureMarchandise(docData.تعيين_المنتوج);
            setNbrEmb(docData.معروض_1);
            setGenreEmb(docData.معروض_2);
            setPoids(docData.الكمية);
            setUnite(docData.الوحدة);
            setSousPosition(docData.رقم_التعريفة);
            setNumFactureFournisseur(docData.رقم_فاتورة_الشراء);
            setDateFactureFournisseur(docData.تاريخ_فاتورة_الشراء);
            setTauxChange(docData.سعر_الصرف);
            setMontantDZD(montant * tauxChange);
            setFournisseur(docData.الصانع);
            setPaysOrigine(docData.مكان);
            setNumPart(docData.رقم_الحصة);
            setTypeCertificatOrigine(docData.شهادة_المنشأ);
            setNumCertificatOrigine(docData.رقم_شهادة_المنشأ);
            setDateCertificatOrigine(docData.تاريخ_شهادة_المنشأ);
            setTypeControle(docData.نوع_المراقبة);
            setNomCertificatControle(docData.نوع_شهادة_المراقبة);
            setTypeCertificatControle(docData.شهادة_المراقبة);
            setNumCertificatControle(docData.رقم_شهادة_المراقبة);
            setDateCertificatControle(docData.تاريخ_شهادة_المراقبة);
            setTypeTransport(docData.مرجع_النقل);
            setDocumentsTransport(docData.وثائق_النقل);
            setNumDocumentTransport(docData.رقم_وثائق_النقل);
            setPaysDemarrage(docData.مكان_الانطلاق);
            setDateDemarrage(docData.تاريخ_الانطلاق);
            setPaysEscale(docData.مكان_العبور);
            setPaysArrivee(docData.مكان_الوصول);
            setDateArrivee(docData.تاريخ_الوصول);
            setIsLoaded(true);

        })
        .catch((error) => {
            console.log('Error:', error);
    
            if (error.response) {
              setIsLoaded(true);
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, [dossier.dossier_pk]);


    useEffect(() => {

      const douanes =  axios.get(`/api/مفتشيات-الحدود/`);
      const lieux =  axios.get(`/api/أماكن-الوصول/`);
      const wilayas =  axios.get(`/api/wilayas/`)

        Promise.all([douanes, lieux, wilayas])
        .then((responses) => {

          const douanesResponse = responses[0].data;
          const lieuxResponse = responses[1].data;
          const wilayasReponse = responses[2].data;

          setListeDouanes(douanesResponse);
          setListeLieux(lieuxResponse);
          setListeWilayas(wilayasReponse);
          setIsLoadedLists(true);
        })
        .catch((error) => {
            console.log('Error:', error);
            setIsLoadedLists(true);
            if (error.response) {
              setIsLoaded(true);
              console.log('Status Code:', error.response.status);
              console.log('Response Data:', error.response.data);
            }       
          });
    }, );


    const listeGenresEmb = [{index:1, value:"حاوية"},{index:2, value:"حاويات"},{index:3, value:"طرد"},{index:4, value:"طرود"}];
    const listeUnites = [{index:1, value:"كلغ"},{index:2, value:"طن"}];
    const listeTypesCertificatOrigine = [{index:1, value:"رقم"},{index:2, value:"بتاريخ"}];
    const listeTypesControle = [{index:1, value:"مراقبة المطابقة"},{index:2, value:"مراقبة الجودة"},{index:3, value:"مراقبة الصحة البيطرية"}];
    const listeNomsCertificatControle = [{index:1, value:"شهادة المطابقة"},{index:2, value:"شهادة مراقبة المطابقة"},{index:3, value:"شهادة الجودة"},{index:4, value:"شهادة الصحة البيطرية"}];
    const listeTypesCertificatControle = [{index:1, value:"رقم"},{index:2, value:"بتاريخ"}];
    const listeTypesTransport = [{index:1, value:"بحري"}, {index:2, value:"جوي"}, {index:3, value:"أرضي"}]
    const listeDocumentsTransport = [{index:1, value:"سند شحن رقم" }, {index:2, value:"وثيقة النقل الجوي رقم"}, {index:3, value:"وثيقة النقل رقم"}]


  return (
    <div className={styles.tabAr}>
        <form onSubmit={handleSubmit}>
            <h2>Formulaire Fraude</h2>
            {!(isLoaded) ? ( // Conditional rendering based on the loading state
            <div className={stylesLoader.loader_container}><span className={stylesLoader.loader}></span></div> // Replace with your loader component or CSS
            ) : 
            (
                <>
                <div className={styles.fields_area}>
                    <span className={filterStyles.container}>
                        <label className={labelStyles.labelonright}>مفتشية الحدود
                            <select value={douane} dir='rtl' className={labelStyles.large}  onChange={(e) => setDouane(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeDouanes.map((douane) => (
                                    <option key={douane.inspectionFrontiere_pk} value={douane.nom}>
                                        {douane.nom}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={labelStyles.labelonright}>مديرية التجارة لولاية
                            <select value={directionCommerciale} dir='rtl' className={labelStyles.belowaverage}  onChange={(e) => setDirectionCommerciale(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeWilayas.map((wilaya) => (
                                    <option key={wilaya.wilaya_pk} value={wilaya.nomArabe}>
                                        {wilaya.nomArabe}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelonright" label="تاريخه" dir='rtl' size="small" type="text" value={dateRC} readOnly={true}/>
                        <InputField display="labelonright" label=" رقم السجل" dir='rtl' size="belowaverage" type="text" value={numRC} readOnly={true} />
                        <InputField display="labelonright" label="المستورد" dir='rtl' size="average" type="text" value={raisonSociale} readOnly={true}/>
                        <InputField display="labelonright" label="عنوان المتعامل" dir='rtl' size="extralarge" type="text" value={adresse} readOnly={true} />
                        <InputField display="labelonright" label="عدد الطرود" dir='rtl' size="verysmall" type="text" value={nbrColis} readOnly={true} />
                        <label className={labelStyles.labelontop}>
                            <select value={genreEmb} dir='rtl' className={labelStyles.small}  onChange={(e) => setGenreEmb(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeGenresEmb.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelonright" label="عرض في" dir='rtl' size="verysmall" type="number" value={nbrEmb} onChange={(e) => setNbrEmb(e.target.value)} />
                        <InputField display="labelonright" label="المنتوج" dir='rtl' size="average" type="text" value={natureMarchandise} readOnly={true}/>
                        <InputField display="labelonright" label="رقم التعريفة (10  أرقام)" dir='rtl' size="belowaverage" type="text" value={sousPosition} onChange={(e) => setSousPosition(e.target.value)} />
                        <label className={labelStyles.labelonright}>الوحدة
                            <select value={unite} dir='rtl' className={labelStyles.small}  onChange={(e) => setUnite(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeUnites.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelonright" label="الكمية" dir='rtl' size="belowaverage" type="text" value={poids} onChange={(e) => setPoids(e.target.value)} />
                        <InputField display="labelonright" label="تاريخ الفاتورة" dir='rtl' size="belowaverage" type="text" value={dateFactureFournisseur} readOnly={true} />
                        <InputField display="labelonright" label="رقم فاتورة الشراء" dir='rtl' size="large" type="text" value={numFactureFournisseur} readOnly={true} />
                        <InputField display="labelonright" label="بالدينار (دج)" dir='ltr' size="small" type="text" value={montantDZD} onChange={(e) => setMontantDZD(e.target.value)} />
                        <InputField display="labelonright" label="الصرف" dir='ltr' size="verysmall" type="text" value={tauxChange} readOnly={true}/>
                        <InputField display="labelonright" label="العملة" dir='rtl' size="verysmall" type="text" value={monnaie} onChange={(e) => setMonnaie(e.target.value)} />
                        <InputField display="labelonright" label="قيمة الفاتورة" dir='ltr' size="small" type="text" value={montant} readOnly={true}/>
                        <InputField display="labelonright" label="مكان التصنيع أو البلد الأصلي" dir='rtl' size="average" type="text" value={paysOrigine} onChange={(e) => setPaysOrigine(e.target.value)} />
                        <InputField display="labelonright" label="الصانع" dir='rtl' size="overaverage" type="text" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)} />
                        <InputField display="labelonright" label="رقم الحصة (علامات تعريف المنتوج)"  dir='rtl' size="verylarge" type="text" value={numPart} onChange={(e) => setNumPart(e.target.value)} />
                        <InputField display="labelonright" label=""  dir='rtl' size="large" type="text" value={typeCertificatOrigine==="رقم"?numCertificatOrigine:dateCertificatOrigine} onChange={(e) => typeCertificatOrigine==="رقم"? setNumCertificatOrigine(e.target.value) : setDateCertificatOrigine(e.target.value)} />
                        <label className={labelStyles.labelonright}>رقم / تاريخ شهادة المنشأ المنتوج
                            <select value={typeCertificatOrigine} dir='rtl' className={labelStyles.average}  onChange={(e) => setTypeCertificatOrigine(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeTypesCertificatOrigine.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelonright" label=""  dir='rtl' size="belowaverage" type="text" value={typeCertificatControle==="رقم"?numCertificatControle:dateCertificatControle} onChange={(e) => typeCertificatControle==="رقم"? setNumCertificatControle(e.target.value) : setDateCertificatControle(e.target.value)} />
                        <label className={labelStyles.labelonright}>
                            <select value={typeCertificatControle} dir='rtl' className={labelStyles.small}  onChange={(e) => setTypeCertificatControle(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeTypesCertificatControle.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={labelStyles.labelonright}>
                            <select value={nomCertificatControle} dir='rtl' className={labelStyles.average}  onChange={(e) => setNomCertificatControle(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeNomsCertificatControle.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={labelStyles.labelonright}>المراقبات
                            <select value={typeControle} dir='rtl' className={labelStyles.average}  onChange={(e) => setTypeControle(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeTypesControle.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelonright" label=""  dir='rtl' size="overaverage" type="text" value={numDocumentTransport} onChange={(e) => setNumDocumentTransport(e.target.value)} />
                        <label className={labelStyles.labelonright}>وثائق النقل
                            <select value={documentsTransport} dir='rtl' className={labelStyles.average}  onChange={(e) => setDocumentsTransport(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeDocumentsTransport.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={labelStyles.labelonright}>مرجع النقل
                            <select value={typeTransport} dir='rtl' className={labelStyles.small}  onChange={(e) => setTypeTransport(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeTypesTransport.map((etat) => (
                                    <option key={etat.index} value={etat.value}>
                                        {etat.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <InputField display="labelonright" label="العبور ب"  dir='rtl' size="average" type="text" value={paysEscale} onChange={(e) => setPaysEscale(e.target.value)} />
                        <InputField display="labelonright" label="بتاريخ"  dir='rtl' size="small" type="text" value={dateDemarrage} onChange={(e) => setDateDemarrage(e.target.value)} />
                        <InputField display="labelonright" label="الإنطلاق"  dir='rtl' size="average" type="text" value={paysDemarrage} onChange={(e) => setPaysDemarrage(e.target.value)} />
                        <InputField display="labelonright" label="بتاريخ"  dir='rtl' size="small" type="text" value={dateArrivee} onChange={(e) => setDateArrivee(e.target.value)} />
                        <label className={labelStyles.labelonright}>الوصول إلى
                            <select value={paysArrivee} dir='rtl' className={labelStyles.overaverage}  onChange={(e) => setPaysArrivee(e.target.value)}>
                                <option value="">اختيارات</option>
                                {listeLieux.map((lieu) => (
                                    <option key={lieu.lieuArrivee_pk} value={lieu.nom}>
                                        {lieu.nom}
                                    </option>
                                ))}
                            </select>
                      </label>
                   
                    </span>
                </div>
                    <span className={styles.buttonSpan}>
                        <button className={buttonStyles.primaryButtonY} type="submit" >Ajouter</button>
                        <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
                    </span>
                <div className={styles.footer}/>
                </>
            )}
        </form>
    </div>
  )
}

export default EditFraude