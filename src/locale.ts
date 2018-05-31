
export interface Ilocale {
    home: {
        name: string,
    };
    activities: {
        name: string,
        activityDetails: {
         videoBasedText: string,
         imageBasedText: string,
         landscapeText: string,
         portraitText: string,
        },
        sessionsInfo: {
            sessionLengthText: string,
            shortText: string,
            mediumText: string,
            longText: string,
            startText: string,
        },
        galleryText: string,
        pinSuccessText: string,
        pinErrorText: string,
    };
    general: {
        slidesText: string,
        sesstionLength: string,
        social: {
             pin: string,
             shareText: string,
             networks: {
                 facebookText: string,
                 googleText: string,
                 twitterText: string,
             },
         },
    };
}

declare var dictionary: any;

export const locale: Ilocale = dictionary;

declare var rtl: boolean;
export const isRTL: boolean = rtl;

declare var language: string;
export const lang: string = language;
