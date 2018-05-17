import {mock} from '@/httpClient';

mock.onGet('/general/getActivity', { params: { activityId: '1234567890' } }).reply(200, {
    details: {
        title: 'this is the title',
        description: 'this is the title',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 2, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: 0, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
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
    content: {

    },
});
