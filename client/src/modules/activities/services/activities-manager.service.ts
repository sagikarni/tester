import { ActivityType, MediaType } from '@/modules/activities/store/types';
import { locale } from '@/locale';

export class ActivitiesManagerService {
  public static ExecuteActivity({ activity }: any) {
    // switch case based on the 'activityType' (access the store's: state.Activity)

    const activityType =
      activity && activity.details && activity.details.activityType;

    const res = {
      url: '',
    };

    switch (activityType) {
      case ActivityType.PremiumCollction:
        res.url = '/premium-collection/';
        break;
      case ActivityType.Meaning:
        res.url = '/premium-collection/';
        break;
      case ActivityType.WhatInThePicture:
        res.url = '/premium-collection/';
        break;
      case ActivityType.Zoom:
        res.url = '/premium-collection/';
        break;
      case ActivityType.WHQuestions:
        res.url = '/premium-collection/';
        break;
      case ActivityType.Categorization:
        res.url = '/categorization-activity/';
        break;
      case ActivityType.Puzzle:
        res.url = '/puzzle-activity/';
        break;
      case ActivityType.Memory:
        res.url = '/memory-activity/';
        break;
      case ActivityType.PhotoSelectionBySound:
        res.url = '/photo-sound/';
        break;
      case ActivityType.TBD2:
        res.url = '/questions/'; // Example need to change
        break;
    }
    return res;
  }

  public getCommunicationActivities(): any[] {
    return [
      {
        name: locale.activities.activityTypes.whatsInThePicture,
        type: ActivityType.WhatInThePicture,
      },
      {
        name: locale.activities.activityTypes.Meaning,
        type: ActivityType.Meaning,
      },
    ];
  }

  public getCognitionActivities(): any[] {
    return [
      {
        name: locale.activities.activityTypes.Categorization,
        type: ActivityType.Categorization,
      },
    ];
  }

  public getMediaTypes(): any[] {
    return [
      { name: locale.general.photoText, type: MediaType.Photo },
      { name: locale.general.videoText, type: MediaType.Video },
    ];
  }
}
