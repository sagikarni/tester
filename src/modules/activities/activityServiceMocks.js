import { mock } from '@/httpClient';
mock.onGet('/general/getActivity', { params: { activityId: '1' } }).reply(200, {
    details: {
        title: 'this is the title',
        description: 'this is the title',
        coverPhoto: 'media/restricted/communication/photos/whquesstions/activity-name-1/cover.jpg',
        category: 1,
        activityType: 2,
        mediaType: 0,
        mediaCount: 12,
        thumbnails: [
            {
                imgSrc: 'media/restricted/communication/photos/whquesstions/activity-name-1/thumbnails/adolescent-beautiful-blond-786801.jpg',
                title: 'some title 1',
            },
            {
                imgSrc: 'media/restricted/communication/photos/whquesstions/activity-name-1/thumbnails/adult-alone-autumn-701747.jpg',
                title: 'some title 2',
            },
        ],
    },
    content: {},
});
//# sourceMappingURL=activityServiceMocks.js.map