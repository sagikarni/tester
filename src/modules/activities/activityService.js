import './activityServiceMocks';
import { httpClient } from '@/httpClient';
export class ActivityService {
    getActivity(activity) {
        return httpClient.get(`/general/getActivity`, { params: { activityId: activity } });
    }
    pinActivity(activity, isPinned) {
        let pinUnpinUrl = '';
        if (isPinned) {
            pinUnpinUrl = '/general/pinActivity';
        }
        else {
            pinUnpinUrl = '/general/unPinActivity';
        }
        return httpClient.get(pinUnpinUrl, { params: { activityId: activity, isPinned } });
    }
}
export const activityService = new ActivityService();
//# sourceMappingURL=activityService.js.map