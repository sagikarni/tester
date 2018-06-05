import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { lang } from '@/locale';
export const mock = new MockAdapter(axios, { delayResponse: 2000 });
// mock.restore();
export class HttpClient {
    setDefaultHeaders() {
        axios.defaults.headers.common['Lang'] = lang;
    }
    get(url, config) {
        return axios.get(url, config);
    }
}
export const httpClient = new HttpClient();
//# sourceMappingURL=httpClient.js.map