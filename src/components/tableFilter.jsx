import React, { useState } from 'react';
import styles from './tableFilter.module.css';

const TableFilter = ({ columns, onFilterChange }) => {
  const [selectedColumn, setSelectedColumn] = useState(columns[0].key);
  const [filterValue, setFilterValue] = useState('');

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log("change")
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(selectedColumn, value);
  };

  return (
    <span className={styles.container}>
      <label className={styles.label_style}>Filtrer par :</label>
      <div className={styles.selectWrapper}>
        <select value={selectedColumn} onChange={handleColumnChange}>
          {columns.map((column) => (
            <option key={column.key} value={column.key}>
              {column.label}
            </option>
          ))}
        </select>
      </div>
      {columns.map((column) => (
        column.key === selectedColumn && (
          column.inputType === 'select' ? (
            <select
              key={column.key}
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="">Sélectionnez une option</option>
              {column.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              key={column.key}
              type={column.inputType}
              value={filterValue}
              onChange={handleFilterChange}
              placeholder={`Saisissez une valeur pour ${column.label.toLowerCase()}`}
            />
          )
        )
      ))}
    </span>
  );
};

export default TableFilter;
