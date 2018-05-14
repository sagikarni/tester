
import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

import MockAdapter from 'axios-mock-adapter';
import {lang} from '@/locale';
export const mock = new MockAdapter(axios,  { delayResponse: 2000 });


export class HttpClient {

    public setDefaultHeaders() {
        axios.defaults.headers.common['lang'] = lang;
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
          return axios.get(url, config);
    }
}

export const httpClient = new HttpClient();
