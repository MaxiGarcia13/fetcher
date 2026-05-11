const PREFIX = 'fetcher.';

function getKey(key: string) {
  return `${PREFIX}${key}`;
}

export const storage = {
  getKey,
  read: (key: string) => {
    return localStorage.getItem(getKey(key));
  },
  write: (key: string, value: string) => {
    localStorage.setItem(getKey(key), value);
  },
  readJson: (key: string) => {
    return JSON.parse(localStorage.getItem(getKey(key)));
  },
  writeJson: (key: string, value: unknown) => {
    localStorage.setItem(getKey(key), JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(getKey(key));
  },
  clear: () => {
    localStorage.clear();
  },
};
