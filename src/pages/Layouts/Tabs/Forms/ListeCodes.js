import React , {useState, useEffect} from 'react';
import styles from '../../../popupForm.module.css'
import buttonStyles from '../../../../components/button.module.css'
import stylesLoader from '../../../gestionClients.module.css'
import axios from 'axios';
import DocumentsTable from '../../../../components/documentsTable'


function ListeCodes({onClose}) {

  const headers = ['Code du document', 'Nom du document'];

  const data = [
    {
    id: 1,
    codeDocument: "code",
    nomDocument: "nom",
 },
 {
    id: 2,
    codeDocument: "code",
    nomDocument: "nom",
 },
 {
    id: 3,
    codeDocument: "code",
    nomDocument: "nom",
 },
 {
    id: 4,
    codeDocument: "code",
    nomDocument: "nom",
 },
 {
    id: 5,
    codeDocument: "code",
    nomDocument: "nom",
 },
 {
    id: 6,
    codeDocument: "code",
    nomDocument: "nom",
 }
 ,
 {
    id: 7,
    codeDocument: "code",
    nomDocument: "nom",
 }
 ,
 {
    id: 8,
    codeDocument: "code",
    nomDocument: "nom",
 },
 {
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 1,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 2,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 3,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 4,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 5,
  codeDocument: "code",
  nomDocument: "nom",
},
{
  id: 6,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 7,
  codeDocument: "code",
  nomDocument: "nom",
}
,
{
  id: 8,
  codeDocument: "code",
  nomDocument: "nom",
}
]

  return (
    <div className={styles.tab}>
        <h3>Liste des codes de documents</h3>
        <DocumentsTable data={data} headers={headers} itemsPerPage={162} addlink={false} />
        <span className={styles.buttonSpan}>
            <button className={buttonStyles.primaryButtonB} type="button" onClick={onClose}>Fermer</button>
        </span>
        <div className={styles.footer}/>
    </div>
  )
}

export default ListeCodes