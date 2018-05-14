import axios from 'axios';
import {AxiosPromise} from "axios";
import './searchServiceMocks';
import {httpClient} from '@/httpClient';
export class SearchService {
    public getSearchResults <T>(): AxiosPromise<T> {
        return httpClient.get(`/getsearchresult`);
    }
}
export const searchService = new SearchService();



