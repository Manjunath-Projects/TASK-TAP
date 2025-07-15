export const getNetworkInfo = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return null;

  return {
    type: connection.effectiveType, // '4g', '3g', etc.
    downlink: connection.downlink,
    saveData: connection.saveData,
  };
};
