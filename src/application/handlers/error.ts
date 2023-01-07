export const success = (callback: () => Promise<any>) =>
  callback()
    .then((result) => result)
    .catch((err) => err);
