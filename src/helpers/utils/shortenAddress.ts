export const shortenAddress = (address: string) => {
  if (!address) {
    return '';
  }

  const abbreviatedAddress = address.slice(0, 4) + ' ... ' + address.slice(-4);

  return abbreviatedAddress;
};
