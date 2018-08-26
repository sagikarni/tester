import axios from 'axios';
import {AxiosPromise} from "axios";
import './searchServiceMocks';
import {httpClient} from '@/httpClient';
import {SearchRequest} from '@/modules/search/store/typesClasses';
import {Domain, ActivityType, MediaType} from '@/modules/activities/store/types';
export class SearchService {
    public PREFIX: string = "search";

    public getSearchResults <T>(searchRequest: SearchRequest): AxiosPromise<T> {
        return httpClient.get(`${this.PREFIX}/getSearchresult`);
    }
    public getFilters <T>(domain: Domain , activityType?: ActivityType): AxiosPromise<T> {
        return httpClient.post(`${this.PREFIX}/getFilters` ,  { domain, activityType });
    }
}
export const searchService = new SearchService();



