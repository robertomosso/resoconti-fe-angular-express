function formatDateToUsDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');  // +1 perché i mesi partono da 0
  const day = String(date.getDate()).padStart(2, '0');  // PadStart per aggiungere lo 0 davanti ai numeri singoli

  return `${year}-${month}-${day}`;
}

function formatDateToItDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');  // +1 perché i mesi partono da 0
  const day = String(date.getDate()).padStart(2, '0');  // PadStart per aggiungere lo 0 davanti ai numeri singoli

  return `${day}/${month}/${year}`;
}

export { formatDateToUsDate, formatDateToItDate }