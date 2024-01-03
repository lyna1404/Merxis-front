
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './listeFacture.module.css';
import buttonStyles from '../components/button.module.css';
import AdvancedBreadcrumb from '../components/advancedBreadcrumb'
import ReusableTable from '../components/reusableTable';
import TableFilter from '../components/tableFilter';
import AjoutDebours from './AjoutDebours';
import InputField from '../components/InputField';

function ViewFactures() {
   
    const factures = [
        {
            id:"01",
            numDossier:"01/23",
            numFact:"01/23",
            typeFact: "Définitive",
            date:"xx/xx/xx",
            client:"Sarl MERXIS",
            numDeclaration:"0001",
            nomFournisseur:"Fournisseur 1",
            numFactFournisseur:"01/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"10",
            natureMarch:"Alimentation",
            deboursPrestations: [
            {id:"1", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"1", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"1", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"1", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"1", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"1", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"1", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD",
            tauxTVA : "19.00", 
            montantTVA : "1000", 
            totalTTC : "6200", 
            totalPresDebours: "xxxx",
            droitTimbre1: "0.00", 
            droitTimbre2: "0.00", 
            totalPayement: "125452.0",
            avance : "100",
            netPayement: "125552.0",
            
        },
        {
            id : "02",
            numDossier:"02/23",
            numFact:"02/23",
            date:"xx/xx/xx",
            client:"SARL Merxis",
            numDeclaration:"0002",
            nomFournisseur:"Fournisseur 2",
            numFactFournisseur:"02/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"7",
            natureMarch:"Electronique",
            deboursPrestations: [
            {id:"2", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"2", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"2", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"2", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"2", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"2", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"2", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "03",
            numDossier:"03/23",
            numFact:"03/23",
            date:"xx/xx/xx",
            client:"SARL Transit Amel",
            numDeclaration:"0003",
            nomFournisseur:"Fournisseur 3",
            numFactFournisseur:"03/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"45",
            natureMarch:"Electromenager",
            deboursPrestations: [
            {id:"3", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"3", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"3", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"3", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"3", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"3", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"3", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "04",
            numDossier:"04/23",
            numFact:"04/23",
            date:"xx/xx/xx",
            client:"SARL Golden Tulip Hotel Series",
            numDeclaration:"0004",
            nomFournisseur:"Fournisseur 4",
            numFactFournisseur:"04/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"17",
            natureMarch:"Cosmétiques",
            deboursPrestations: [
            {id:"4", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"4", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"4", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"4", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"4", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"4", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"4", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "05",
            numDossier:"05/23",
            numFact:"05/23",
            date:"xx/xx/xx",
            client:"SARL Golden Tulip Hotel Series",
            numDeclaration:"0005",
            nomFournisseur:"Fournisseur 5",
            numFactFournisseur:"05/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"18",
            natureMarch:"Alimentation",
            deboursPrestations: [
            {id:"5", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"5", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"5", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"5", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"5", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"5", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"5", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "06",
            numDossier:"06/23",
            numFact:"06/23",
            date:"xx/xx/xx",
            client:"ESI",
            numDeclaration:"0006",
            nomFournisseur:"Fournisseur 6",
            numFactFournisseur:"06/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"25",
            natureMarch:"Meubles",
            deboursPrestations: [
            {id:"6", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"6", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"6", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"6", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"6", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"6", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"6", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "07",
            numDossier:"07/23",
            numFact:"07/23",
            date:"xx/xx/xx",
            client:"SARL Green",
            numDeclaration:"0007",
            nomFournisseur:"Fournisseur 7",
            numFactFournisseur:"07/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"5",
            natureMarch:"Gazon",
            deboursPrestations: [
            {id:"7", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"7", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"7", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"7", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"7", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"7", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"7", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "08",
            numDossier:"08/23",
            numFact:"08/23",
            date:"xx/xx/xx",
            client:"SARL Transit Amel",
            numDeclaration:"0008",
            nomFournisseur:"Fournisseur 8",
            numFactFournisseur:"08/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"12",
            natureMarch:"Alimentation",
            deboursPrestations: [
            {id:"8", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"8", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"8", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"8", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"8", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"8", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"8", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "09",
            numDossier:"09/23",
            numFact:"09/23",
            date:"xx/xx/xx",
            client:"SARL Transit Amel",
            numDeclaration:"0009",
            nomFournisseur:"Fournisseur 9",
            numFactFournisseur:"09/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"13",
            natureMarch:"Produit Chimique",
            deboursPrestations: [
            {id:"9", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
            {id:"9", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"9", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"9", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"9", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"9", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"9", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        },
        {
            id : "10",
            numDossier:"10/23",
            numFact:"09/23",
            date:"xx/xx/xx",
            client:"SARL Merxis",
            numDeclaration:"0010",
            nomFournisseur:"Fournisseur 10",
            numFactFournisseur:"10/23",
            montantFactFournisseur:"xxxxx",
            monnaieFactFournisseur:"Euro",
            numTitreTransport:"xxxxxx",
            nbrColis:"3",
            natureMarch:"Produit de nettoyage",
            deboursPrestations: [
            {id:"10", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"5000 DZD"}, 
            {id:"10", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
            {id:"10", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
            {id:"10", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
            {id:"10", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
            {id:"10", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
            {id:"10", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
            montantDebours:"36000 DZD",
            montantPrestations:"61000 DZD"
        }
    ];

    const facturesProforma = [
        {
            id : "01",
            numFact:"01/23",
            date:"xx/xx/xx",
            client:"SARL Transit Amel",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12,
            deboursPrestations: [
                {id:"1", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
                {id:"1", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
                {id:"1", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
                {id:"1", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
                {id:"1", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
                {id:"1", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
                {id:"1", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
                montantDebours:"36000 DZD",
                montantPrestations:"61000 DZD",
                tauxTVA : "19.00", 
                montantTVA : "1000", 
                totalTTC : "6200", 
        },
        {
            id : "02",
            numFact:"02/23",
            date:"xx/xx/xx",
            client:"SARL Transit Amel",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:2,
            poids:10,
            nbrColis:13,
            deboursPrestations: [
                {id:"1", deboursPres:"Magasinage", modePaiement:"Liquide", montantDebours:"1000 DZD", montantPrestations:"/"}, 
                {id:"1", deboursPres:"Fret", modePaiement:"Liquide", montantDebours:"10000 DZD", montantPrestations:"/"}, 
                {id:"1", deboursPres:"Dedouanement", modePaiement:"Cache", montantDebours:"25000 DZD", montantPrestations:"/"},
                {id:"1", deboursPres:"Honoraire", modePaiement:"Cache", montantDebours:"/", montantPrestations:"34000 DZD"},
                {id:"1", deboursPres:"Transit", modePaiement:"Virement", montantDebours:"/", montantPrestations:"12000 DZD"},
                {id:"1", deboursPres:"Magasinage", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"15000 DZD"},
                {id:"1", deboursPres:"Transit", modePaiement:"Chèque", montantDebours:"/", montantPrestations:"23000 DZD"}],
                montantDebours:"36000 DZD",
                montantPrestations:"61000 DZD",
                tauxTVA : "19.00", 
                montantTVA : "1000", 
                totalTTC : "6200", 
        },
        {
            id : "03",
            numFact:"03/23",
            date:"xx/xx/xx",
            client:"SARL Transit Amel",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:1,
            poids:5,
            nbrColis:8
        },
        {
            id : "04",
            numFact:"04/23",
            date:"xx/xx/xx",
            client:"SARL Golden Tulip Hotel Series",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12
        },
        {
            id : "05",
            numFact:"05/23",
            date:"xx/xx/xx",
            client:"SARL Green",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12
        },
        {
            id : "06",
            numFact:"06/23",
            date:"xx/xx/xx",
            client:"SARL Golden Tulip Hotel Series",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12
        },
        {
            id : "07",
            numFact:"07/23",
            date:"xx/xx/xx",
            client:"ESI",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12
        },
        {
            id : "08",
            numFact:"08/23",
            date:"xx/xx/xx",
            client:"ESI",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12
        },
        {
            id : "09",
            numFact:"09/23",
            date:"xx/xx/xx",
            client:"ESI",
            totalTTC:"xxxxxx",
            typeFacture:"Proforma",
            natureMarch:"xxxxxx",
            nbrTC:10,
            poids:120,
            nbrColis:12
        },
    ]

    //Recuperer le numero dossier choisie
    const { slug } = useParams();
    
    //Trouver le numero du dossier à partir de la liste des dossies existants
    const selectedFacture = factures.find((facture) => facture.id === slug);

    //Exemple d'un historique de debours
    const data = selectedFacture.deboursPrestations.map((deboursPrestations)=>deboursPrestations);
    
    //entete du tableau des debours
    const headers = ['Debours/Prestation', 'Mode de paiement', 'Mont Debours', 'Mont Prestation'];

    //Mettre à jour l'historique des debours du client
    const [filteredData, setFilteredData] = useState(data);

    const handleFilterChange = (columnKey, filterValue) => {
        const filteredData = data.filter((item) =>
          item[columnKey].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredData(filteredData);
      };

    const setMontantDebours = (dossier) => {
        let montantDeb = 0;
        dossier.deboursPrestations.map((debours)=>{debours.montantDebours!='/'? 
                                                            montantDeb+=Number(String(debours.montantDebours).split(' ')[0])
                                                            : montantDeb+=0});
        return montantDeb + ' DZD';
    };

    const setMontantPrestations = (dossier) => {
        let montantPres = 0;
        dossier.deboursPrestations.map((prestation)=>{prestation.montantPrestations!='/'? 
                                                        montantPres+=Number(String(prestation.montantPrestations).split(' ')[0])  
                                                                : montantPres+=0});
        return montantPres + ' DZD';
    }

    //Controler le fomrulaire d'ajout de debours
    const [showForm, setShowForm] = useState(false);

    const handleNouveauClick = () => {
      setShowForm(true);
    };
  
    const handleFormClose = () => {
      setShowForm(false);
    };

    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
    
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
        }
      };

    const handleFileUploadClick = () => {
        inputFile.current.click();
      };
    
    //Controler l'ajout d'un debours 
    const handleAjouter = (data) => {
        setFilteredData((prevFilteredData) => [data,...prevFilteredData]);
      };


    return (
        <>
            <AdvancedBreadcrumb numDossier={selectedFacture.numDossier} hideParams={false}/>
            <div className={styles.main_grid}>
            <span className={styles.info_grid}>
                    <div className={styles.label_wrapper}>
                        <label className={styles.info_field}>
                            <InputField 
                                    display="labelonleft" 
                                    label="N° Facture" 
                                    size="small" 
                                    type="text" 
                                    value={selectedFacture.numFact} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField 
                                    display="labelonleft" 
                                    label="Type Facture" 
                                    size="small" 
                                    type="text" 
                                    value={selectedFacture.typeFact} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                          <InputField 
                                    display="labelonleft" 
                                    label="Date" 
                                    size="small" 
                                    type="text" 
                                    value={selectedFacture.date} 
                                    onChange=""
                                    readOnly={true}
                            />
                            </label>
                        <label className={styles.info_field}>
                            <InputField 
                                    display="labelonleft" 
                                    label="Nom Client" 
                                    size="average" 
                                    type="text" 
                                    value={selectedFacture.client} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="N° Declaration" 
                                    size="small" 
                                    type="text" 
                                    value={selectedFacture.numDeclaration} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="Nom Fournisseur" 
                                    size="overaverage" 
                                    type="text" 
                                    value={selectedFacture.nomFournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="N° Fact. Fournisseur" 
                                    size="small" 
                                    type="text" 
                                    value={selectedFacture.numFactFournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="Montant" 
                                    size="small" 
                                    type="text" 
                                    value={selectedFacture.montantFactFournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="Monnaie" 
                                    size="verysmall" 
                                    type="text" 
                                    value={selectedFacture.monnaieFactFournisseur} 
                                    onChange=""
                                    readOnly={true}
                            />
                        </label>
                        <label className={styles.info_field}>
                            <InputField className={styles.info_field} display="labelonleft" 
                                    label="N° Titre Transport" 
                                    size="belowaverage" 
                                    type="text" 
                                    value={selectedFacture.numTitreTransport} 
                                    onChange=""
                                    readOnly={true}                            />
                        </label>
                    <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                    label="Nbr Colis" 
                                    size="verysmall" 
                                    type="text" 
                                    value={selectedFacture.nbrColis} 
                                    onChange=""
                                    readOnly={true}                            />
                        </label>
                    <label className={styles.info_field}><InputField className={styles.info_field} display="labelonleft" 
                                    label="Nature Marchandise" 
                                    size="overaverage" 
                                    type="text" 
                                    value={selectedFacture.natureMarch} 
                                    onChange=""
                                    readOnly={true}                            />
                        </label>
                        <div className={styles.horizontalLine}></div>
                    </div>
                </span>

               <span className={styles.table_grid}>
                    <ReusableTable data={filteredData} headers={headers} itemsPerPage={5} addlink={false}/> 
                    <span className={styles.container}>
                        <label className={styles.label_style}>Total</label>
                        <input className={styles.input}
                            value={setMontantDebours(selectedFacture)}
                            readOnly={true}
                        />
                        <input className={styles.input}
                            value={setMontantPrestations(selectedFacture)}
                            readOnly={true}
                        />
                    </span>  
                    <div className={styles.verticalLine}></div>
                </span>
                
                <span className={styles.label_grid}>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Taux TVA" 
                                size="small" 
                                type="text" 
                                value={selectedFacture.tauxTVA}
                                onChange="" 
                                readOnly="false"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Montant TVA" 
                                size="belowaverage" 
                                type="text" 
                                value={selectedFacture.montantTVA}
                                onChange="" 
                                readOnly="false"
                         />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total prestation TTC" 
                                size="overaverage" 
                                type="text" 
                                value={selectedFacture.totalTTC}
                                onChange="" 
                                readOnly="true"
                         />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total prestation et debours" 
                                size="overaverage" 
                                type="text" 
                                value={selectedFacture.totalPresDebours}
                                onChange="" 
                                readOnly="true"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Droits de Timbre" 
                                size="small" 
                                type="text" 
                                value={selectedFacture.droitTimbre1}
                                onChange="" 
                                readOnly="true"
                        />
                        <InputField 
                                display="labelontop" 
                                label="."
                                size="small" 
                                type="text" 
                                value={selectedFacture.droitTimbre2}
                                onChange="" 
                                readOnly="true"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Total à payer" 
                                size="overaverage" 
                                type="text" 
                                value={selectedFacture.totalPayement}
                                onChange="" 
                                readOnly="true"
                        />
                    </label>
                    <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Avance" 
                                size="overaverage" 
                                type="text" 
                                value={selectedFacture.avance}
                                onChange="" 
                                readOnly="true"
                         />
                    </label>
                   <label className={styles.info_field}>
                        <InputField 
                                display="labelontop" 
                                label="Net à payer" 
                                size="overaverage" 
                                type="text" 
                                value={selectedFacture.netPayement}
                                onChange="" 
                                readOnly="true"
                        />
                    </label>
                    <div className={styles.footerSpace}></div>
            </span>
            </div>

        </>
    );
}

export default ViewFactures