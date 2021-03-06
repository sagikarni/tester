import * as SecureLS from 'secure-ls';

const secureLS = SecureLS as any;

const ls = new secureLS({ encodingType: 'aes' });

export enum StorageTypes {
  AUTH = 'ta',
}

export const StorageService = {
  get(key: string) {
    const item = ls.get(key) as string;
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  },

  save(key: string, item: any) {
    ls.set(key, JSON.stringify(item));
  },

  destroy(key: string) {
    ls.remove(key);
  },
};
