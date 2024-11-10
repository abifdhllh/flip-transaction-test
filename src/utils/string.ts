function thousandSeparator(text?: number | string) {
  if (text) {
    return typeof text === 'number'
      ? text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : text?.replace(/\./g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '';
}

function formatCurrency(value?: number | string, currency?: string) {
  if (value) {
    return `${currency || 'Rp'}${thousandSeparator(value)}`;
  }
  return '';
}

function formatDate(value = '') {
  if (value) {
    const date = new Date(value?.replace(' ', 'T'));

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);

    return formattedDate;
  }

  return '';
}

export { formatCurrency, formatDate };
