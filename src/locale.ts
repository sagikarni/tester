
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
        unPinSuccessText: string,
        pinErrorText: string,
        noActivityChosen: string,
        activityNotFound: string,
    };
    general: {
        slidesText: string,
        sesstionLength: string,
        social: {
             pin: string,
             unPin: string,
             shareText: string,
             networks: {
                 facebookText: string,
                 googleText: string,
                 twitterText: string,
             },
         },
        oopsTitleText: string,
        tryAgainText: string,
        homeText: string,
        somethingWentWrong: string,
        menuActivities: string,
    };
}

declare var dictionary: any;

export const locale: Ilocale = dictionary;

declare var rtl: boolean;
export const isRTL: boolean = rtl;

declare var language: string;
export const lang: string = language;
