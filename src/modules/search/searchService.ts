
import axios from 'axios';
import {AxiosPromise} from "axios";
import './searchServiceMocks';

export class SearchService {
    public getSearchResults <T>(): AxiosPromise<T> {
        return axios.get(`/getsearchresults`);
    }
}
export const searchService = new SearchService();



