export const formatNumberWithCommas = (value: number | string): string => {
  if (value === undefined) {
    return 'Undefined';
  }

  if (typeof value === 'number') {
    value = value.toString();
  }

  if (typeof value === 'string') {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '...';
  }
};
