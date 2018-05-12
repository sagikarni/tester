import {mock} from '@/axios';

mock.onGet('/getsearchresults').reply(200, {
    users: [
        { id: 1, name: 'John Smith' },
    ],
});
