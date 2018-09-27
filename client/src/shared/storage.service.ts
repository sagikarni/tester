export enum StorageTypes {
  TOKEN = 'teratoken',
  USER = 'terauser',
}

export default {
  get(key: string) {
    const item = window.localStorage.getItem(key) as string;
    if (!item) { return null; }
    return JSON.parse(item);
  },

  save(key: string, item: any) {
    window.localStorage.setItem(key, JSON.stringify(item));
  },

  destroy(key: string) {
    window.localStorage.removeItem(key);
  },
};
