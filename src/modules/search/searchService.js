import './searchServiceMocks';
import { httpClient } from '@/httpClient';
export class SearchService {
    getSearchResults() {
        return httpClient.get(`/getsearchresult`);
    }
}
export const searchService = new SearchService();
//# sourceMappingURL=searchService.js.map