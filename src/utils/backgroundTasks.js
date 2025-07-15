export const registerIdleCallback = (callback) => {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 200);
  }
};
