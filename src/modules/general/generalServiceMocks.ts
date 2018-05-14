import {mock} from '@/httpClient';

mock.onGet('/general/getActivity', { params: { activityId: '1234567890' } }).reply(200, {
    users: [
        { id: 1, name: 'John Smith' },
    ],
});
