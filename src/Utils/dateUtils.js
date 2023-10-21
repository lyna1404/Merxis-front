export function formatDateFromAPI(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are zero-based
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null; // Return null for invalid date strings
  }

export function formatDateToAPI(dateString) {
  // Check if the input is null or empty
  if (!dateString) {
    return '';
  }

  // Create a Date object from the date string
  const date = new Date(dateString);

  // Get day, month, and year from the Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed, so add 1 to get the correct month
  const year = date.getFullYear();

  // Ensure day and month are two digits (e.g., '01' instead of '1')
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  // Format the date as 'dd/mm/yyyy'
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}
