// import { AxiosPromise } from 'axios';
// import './activity-mock.service';
// import { httpClient } from '@/httpClient';

// export class ActivityService {
//   public getActivity<T>(activity: string): AxiosPromise<T> {
//     return httpClient.get(`/general/getActivity`, {
//       params: { activityId: activity },
//     });
//   }
//   public pinActivity<T>(activity: string, isPinned: boolean): AxiosPromise<T> {
//     let pinUnpinUrl = '';
//     if (isPinned) {
//       pinUnpinUrl = '/general/pinActivity';
//     } else {
//       pinUnpinUrl = '/general/unPinActivity';
//     }
//     return httpClient.get(pinUnpinUrl, {
//       params: { activityId: activity, isPinned },
//     });
//   }
// }
// export const activityService = new ActivityService();
