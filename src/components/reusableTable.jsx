import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './reusableTable.module.css';
import buttonStyles from './button.module.css';
import { Link } from 'react-router-dom';

const ReusableTable = ({ data, headers, itemsPerPage, addlink,addactions,actionIcons }) => {
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
      <tr key={index} id={item.id}>
        {Object.entries(item).map(([key, value], columnIndex) => (
          // Render other columns with a link if addlink is true
          // Render other columns without a link if addlink is false
          (addlink && columnIndex !== 0) ? (
            <td key={columnIndex}>
              <Link to={`./${item.id}`}>{value}</Link>
            </td>
          ) : (
            columnIndex !== 0 && <td key={columnIndex}>{value}</td>
          )
          
        ))}

       
      <td className={styles.actionbuttons}>
        {addactions && actionIcons.length > 0 &&
          actionIcons.map((icon, iconIndex) => (
            <span key={iconIndex}>{icon}</span>
          ))
        }
      </td>
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
        <tbody>{generateTableData()}</tbody>
      </table>

      <ReactPaginate
        previousLabel={'Précedent'}
        nextLabel={'Suivant'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        previousClassName={buttonStyles.secondary}
        nextClassName={buttonStyles.secondary}
        pageClassName={styles.paginationPage}
        breakClassName={styles.paginationPage}
      />
    </div>
  );
};

export default ReusableTable;
