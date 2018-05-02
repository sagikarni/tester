import Vue from 'vue';


export interface  Ilocale {
    home: {
        name: string,
    };
    activities: {
        name: string,
    };
}

declare var dictionary: any;

export const locale: Ilocale = dictionary;

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function LocalePlugin(Vue1: typeof Vue, options?: any): void {
    Vue1.prototype.$locale = locale;
}
