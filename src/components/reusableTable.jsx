import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './reusableTable.module.css';
import buttonStyles from './button.module.css';
import { Link } from 'react-router-dom';


const ReusableTable = ({ data,headers, itemsPerPage,linkToPage}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);



  // Helper function to generate table data cells
  const generateTableData = () => {
    if (paginatedData.length === 0) return null;

    return paginatedData.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, index) => (
          <td key={index}><Link to={linkToPage}>{value}</Link></td>
        ))}
      </tr>
    ));
  };

  return (
    <div className={styles.tableView}>
      <table className={styles.table_style}>
        <thead>
          <tr>
          {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateTableData()}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={'Précedent'}
        nextLabel={'Suivant'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        previousClassName={buttonStyles.secondary}
        nextClassName={buttonStyles.secondary}
        pageClassName={styles.paginationPage}
      />
    </div>
  );
};

export default ReusableTable;
