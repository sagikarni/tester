import Vue from 'vue';


export interface  Ilocale {
    home: {
        name: string,
    };
    general: {
        common: string,
    };
    cognitive: {
        name: string,
    };
    collections: {
        name: string,
    };
    communication: {
        name: string,
    };
    search: {
        name: string,
    };
    admin: {
        name: string,
    };
}

declare var dictionary: any;

export const locale: Ilocale = dictionary;

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function LocalePlugin(Vue1: typeof Vue, options?: any): void {
    Vue1.prototype.$locale = locale;
}
