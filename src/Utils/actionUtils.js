export function openPageBasedOnId(rowId,basePath){
    window.open(`${basePath}${rowId}`, '_blank');
  };

export function reloadPage(){
    window.location.reload(false);
};

export function openPage(basePath){
    window.open(`${basePath}`, '_blank');
  };

export function handleFilterChange(columnKey, filterValue, data, setFilteredData) {
  let filteredData;

  if (filterValue.trim() === "") {
      // If filterValue is empty, return the entire data
      filteredData = data;
  } else {
      // If filterValue is not empty, apply the filter
      filteredData = data.filter((item) => {
          const columnValue = item[columnKey] !== undefined && item[columnKey] !== null ? item[columnKey].toString() : null;
          return columnValue && columnValue.toLowerCase().includes(filterValue.toLowerCase());
      });
  }

  setFilteredData(filteredData);
}


export function isValidJSON(str) {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      }