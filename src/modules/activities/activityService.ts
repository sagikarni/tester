import axios from 'axios';
import {AxiosPromise} from "axios";
import './searchServiceMocks';
import {httpClient} from '@/httpClient';

export class ActivityService {
    public getActivity <T>(activity: string): AxiosPromise<T> {
        return httpClient.get(`/general/getActivity` ,  { params: { activityId: activity } });
    }
}
export const searchService = new ActivityService();


