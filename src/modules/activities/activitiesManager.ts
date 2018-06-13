import { ActivityType } from '@/modules/activities/store/types';

export class ActivitiesManager {
    public static ExecuteActivity(state: any) {
        // switch case based on the 'activityType' (access the store's: state.Activity)
        const activityType = state.activity && state.activity.details && state.activity.details.activityType;
        const res = {
            url: '',
        };
        switch (activityType) {
            case ActivityType.PremiumCollction:
                res.url = '/premium-collection/';
                break;
            case ActivityType.TBD2:
                res.url = '/questions/'; // Example need to change
                break;
        }
        return res;
    }
}
