export interface  ilocale {
    home : {},
    activities : {
        name : string,
    },
}

declare var dictionary : any;

export const locale : ilocale = dictionary;