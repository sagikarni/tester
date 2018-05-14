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

declare var rtl: boolean;
export const isRTL: boolean = rtl;

declare var language: string;
export const lang: string = language;
