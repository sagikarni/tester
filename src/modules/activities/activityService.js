import './searchServiceMocks';
import { httpClient } from '@/httpClient';
export class ActivityService {
    getActivity(activity) {
        return httpClient.get(`/general/getActivity`, { params: { activityId: activity } });
    }
}
export const searchService = new ActivityService();
//# sourceMappingURL=activityService.js.map