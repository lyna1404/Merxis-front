import React, { useState } from 'react';
import styles from './tableFilter.module.css';

const TableFilter = ({ columns, onFilterChange }) => {
  const [selectedColumn, setSelectedColumn] = useState(columns[0].key);
  const [filterValue, setFilterValue] = useState('');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(selectedColumn, value);
  };

  return (
    <span className={styles.container}>
      <label className={styles.label_style}>Filtrer par:</label>
      <div className={styles.selectWrapper}>
        <select value={selectedColumn} onChange={handleColumnChange}>
          {columns.map((column) => (
            <option key={column.key} value={column.key}>
              {column.label}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Enter filter value"
      />
    </span>
  );
};

export default TableFilter;
