import { dictionary, language, rtl } from './en';

export interface Ilocale {
  home: {
    name: string;
  };
  search: {
    activityFilterLabel: string;
    mediaFilterLabel: string;
    agesFilterLabel: string;
    categoryFilterLabel: string;
    subCategoryFilterLabel: string;
  };
  activities: {
    name: string;
    activityDetails: {
      videoBasedText: string;
      photoBasedText: string;
      landscapeText: string;
      portraitText: string;
    };
    activityTypes: {
      Collection: string;
      whatsInThePicture: string;
      Meaning: string;
      Categorization: string;
    };
    sessionsInfo: {
      sessionLengthText: string;
      shortText: string;
      mediumText: string;
      longText: string;
      startText: string;
    };
    galleryText: string;
    pinSuccessText: string;
    unPinSuccessText: string;
    pinErrorText: string;
    noActivityChosen: string;
    activityNotFound: string;
    notIncluded: {
      text: string;
      session: string;
    };
    activityCollection: {
      warningText: string;
    };
    switchQuestions: string;
    moveShapes: string;
    addShape: string;
    enlargeShape: string;
    revealPhoto: string;
  };
  general: {
    social: {
      pin: string;
      unPin: string;
      shareText: string;
      networks: {
        facebookText: string;
        googleText: string;
        twitterText: string;
      };
    };
    photoText: string;
    videoText: string;
    close: string;
    slidesText: string;
    sessionLengthText: string;
    oopsTitleText: string;
    tryAgainText: string;
    homeText: string;
    somethingWentWrong: string;
    menuActivities: string;
    rotateScreenWarning: string;
    rotateScreenPopup: string;
    smallScreenPopup: string;
    clickExit: string;
    exitActivity: string;
  };
}

export const locale: Ilocale | any = dictionary;

export const isRTL: boolean = rtl;

export const lang: string = language;
