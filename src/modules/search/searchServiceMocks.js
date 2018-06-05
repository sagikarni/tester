import { mock } from '@/httpClient';
mock.onGet('/getsearchresult').reply(200, {
    users: [
        { id: 1, name: 'John Smith' },
    ],
});
//# sourceMappingURL=searchServiceMocks.js.map