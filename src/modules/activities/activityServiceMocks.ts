import {mock} from '@/httpClient';
import {MediaType, Orientation} from './store/types';

mock.onGet('/general/getActivity', { params: { activityId: '1' } }).reply(200, {
    details: {
        title: 'Card Deck Name',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: 'https://thumb.ibb.co/ivFuRT/cover_Demo.png',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 2, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Video, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
            {
                id: 5,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 5',
                filterInfo: [3],
            },
            {
                id: 6,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                thumbnailSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                imgSrc: 'https://image.ibb.co/daNdJJ/water_waterfall_nature_214751.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
        ],
    },
    content: {

    },
});
