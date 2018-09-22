
export enum StorageTypes {
  TOKEN = 'teratoken',
  USER = 'terauser',
}

export default {
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key) as string);
  },

  save(key: string, item: any) {
    window.localStorage.setItem(key, JSON.stringify(item));
  },

  destroy(key: string) {
    window.localStorage.removeItem(key);
  },
};
