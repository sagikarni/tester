
export interface Ilocale {
    home: {
        name: string,
    };
    search: {
        activityFilterLabel: string,
        mediaFilterLabel: string,
        agesFilterLabel: string,
        categoryFilterLabel: string,
        subCategoryFilterLabel: string,
    };
    activities: {
        activityTypes: {
            Collection: string;
            whatsInThePicture: string;
            Meaning: string;
            Categorization: string;
         },
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
        notIncluded: {
            text: string,
            session: string,
        },
        activityCollection: {
            warningText: string,
        },
        switchQuestions: string,
        moveShapes: string,
        addShape: string,
        enlargeShape: string,
        revealPhoto: string,
    };
    general: {
        photoText: string,
        videoText: string,
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
        close: string,
        oopsTitleText: string,
        tryAgainText: string,
        homeText: string,
        somethingWentWrong: string,
        menuActivities: string,
        rotateScreenWarning: string;
        rotateScreenPopup: string;
        smallScreenPopup: string;
        clickExit: string;
        exitActivity: string;
    };
}

declare var dictionary: any;

export const locale: Ilocale = dictionary;

declare var rtl: boolean;
export const isRTL: boolean = rtl;

declare var language: string;
export const lang: string = language;
