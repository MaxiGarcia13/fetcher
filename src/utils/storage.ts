export const storage = {
  read: (key: string) => {
    return localStorage.getItem(key);
  },
  write: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  readJson: (key: string) => {
    return JSON.parse(localStorage.getItem(key));
  },
  writeJson: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
