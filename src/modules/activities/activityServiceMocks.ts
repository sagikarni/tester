import {mock} from '@/httpClient';
import {MediaType, Orientation, PremiumCollectionLayout, ActivityType, ShapeType, MamoryLayout} from './store/types';

mock.onGet('/general/getActivity', { params: { activityId: '1' } }).reply(200, {
    details: {
        title: 'Hands',
        description: 'This deck demonstrats hands',
        coverPhoto: '/media/restricted/collections/photos/hands/iStock-649175052.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 4},
            {id: 2, description: "Medium", slidesCount: 8},
            {id: 3, description: "Long", slidesCount: 12},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-171328775.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-171328775.jpg',
                title: 'some title 1',
                filterInfo: [1, 2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-472150005.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-472150005.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-509425044.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-509425044.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-607929238.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-607929238.jpg',
                title: 'some title 4',
                filterInfo: [1, 2, 3],
            },
            {
                id: 5,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-614132554.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-614132554.jpg',
                title: 'some title 5',
                filterInfo: [2, 3],
            },
            {
                id: 6,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-625739874.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-625739874.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-641428548.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-641428548.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 8,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-646057690.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-646057690.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 9,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-649175052.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-649175052.jpg',
                title: 'some title 7',
                filterInfo: [3],
            },
            {
                id: 10,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-654562488.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-654562488.jpg',
                title: 'some title 7',
                filterInfo: [3],
            },
            {
                id: 11,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-669462222.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-669462222.jpg',
                title: 'some title 7',
                filterInfo: [3],
            },
            {
                id: 12,
                thumbnailSrc: '/media/restricted/collections/photos/hands/thumbnails/iStock-925586520.jpg',
                imgSrc: '/media/restricted/collections/photos/hands/content/iStock-925586520.jpg',
                title: 'some title 7',
                filterInfo: [3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        slides: [
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-171328775.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-472150005.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-509425044.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-607929238.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-614132554.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-625739874.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-641428548.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-646057690.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-649175052.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-654562488.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-669462222.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/hands/content/iStock-925586520.jpg'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', { params: { activityId: '2' } }).reply(200, {
    details: {
        title: 'Card Deck Name',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
            {
                id: 5,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',
                title: 'some title 5',
                filterInfo: [3],
            },
            {
                id: 6,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 8,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 9,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.TwoMediasHorizontal,
        slides: [
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/1.jpg', '/media/restricted/collections/photos/collection-1/content/2.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/3.jpg', '/media/restricted/collections/photos/collection-1/content/4.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/4.jpg', '/media/restricted/collections/photos/collection-1/content/6.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/7.jpg', '/media/restricted/collections/photos/collection-1/content/8.jpg'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', { params: { activityId: '3' } }).reply(200, {
    details: {
        title: 'Card Deck Name',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Portrait,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
            {
                id: 5,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',
                title: 'some title 5',
                filterInfo: [3],
            },
            {
                id: 6,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 8,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 9,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.TwoMediasVertical,
        slides: [
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/1.jpg', '/media/restricted/collections/photos/collection-1/content/2.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/3.jpg', '/media/restricted/collections/photos/collection-1/content/4.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/4.jpg', '/media/restricted/collections/photos/collection-1/content/6.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/7.jpg', '/media/restricted/collections/photos/collection-1/content/8.jpg'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', { params: { activityId: '4' } }).reply(200, {
    details: {
        title: 'Compare Feelings',
        description: 'Compare Feelings',
        coverPhoto: '/media/restricted/communication/photos/compare/feelings1/iStock-184652774_super.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-135448176_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-135448176_super.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-184652774_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-184652774_super.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-506616340_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-506616340_super.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-520016598_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-520016598_super.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
            {
                id: 5,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-520792461_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-520792461_super.jpg',
                title: 'some title 5',
                filterInfo: [3],
            },
            {
                id: 6,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-521236382_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-521236382_super.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-524525002_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-524525002_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 8,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-604031152_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-604031152_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 9,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-619241638_medium.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-619241638_medium.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 10,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-626461490_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-626461490_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 1,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-638378146_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-638378146_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 12,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-639581692_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-639581692_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 13,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-641217430_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-641217430_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 14,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-642091690_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-642091690_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 15,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-660654876_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-660654876_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 16,
                thumbnailSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-700702502_super.jpg',
                imgSrc: '/media/restricted/communication/photos/compare/feelings1/content/iStock-700702502_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.FourMedias,
        slides: [
            {
                photos: ['/media/restricted/communication/photos/compare/feelings1/content/iStock-135448176_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-184652774_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-506616340_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-520016598_super.jpg'],
            },
            {
                photos: ['/media/restricted/communication/photos/compare/feelings1/content/iStock-520792461_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-521236382_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-524525002_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-604031152_super.jpg'],
            },
            {
                photos: ['/media/restricted/communication/photos/compare/feelings1/content/iStock-639581692_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-638378146_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-626461490_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-619241638_medium.jpg'],
            },
            {
                photos: ['/media/restricted/communication/photos/compare/feelings1/content/iStock-700702502_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-660654876_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-642091690_super.jpg', '/media/restricted/communication/photos/compare/feelings1/content/iStock-641217430_super.jpg'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', { params: { activityId: '10' } }).reply(200, {
    details: {
        title: 'Card Deck Name',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Video, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 4, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/videos/collection-2/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/videos/collection-2/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [1, 2, 3],
             },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/collections/videos/collection-2/thumbnails/2.jpg',
                imgSrc: '/media/restricted/collections/videos/collection-2/thumbnails/2.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/collections/videos/collection-2/thumbnails/3.jpg',
                imgSrc: '/media/restricted/collections/videos/collection-2/thumbnails/3.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/collections/videos/collection-2/thumbnails/4.jpg',
                imgSrc: '/media/restricted/collections/videos/collection-2/thumbnails/4.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        slides: [
            {
                videos: ['/media/restricted/collections/videos/collection-2/content/1.mp4'],
            },
            {
                videos: ['/media/restricted/collections/videos/collection-2/content/2.mp4'],
            },
            {
                videos: ['/media/restricted/collections/videos/collection-2/content/3.mp4'],
            },
            {
                videos: ['/media/restricted/collections/videos/collection-2/content/4.mp4'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', {params: {activityId: '11'}}).reply(200, {
    details: {
        title: 'This is a Meaning activity',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.Meaning, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 9, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo: [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },

            {

                id: 2,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',

                title: 'some title 2',

                filterInfo: [1, 2, 3],

            },

            {

                id: 3,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',

                title: 'some title 3',

                filterInfo: [1, 2, 3],

            },

            {

                id: 4,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',

                title: 'some title 4',

                filterInfo: [3],

            },

            {

                id: 5,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',

                title: 'some title 5',

                filterInfo: [3],

            },

            {

                id: 6,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',

                title: 'some title 6',

                filterInfo: [2, 3],

            },

            {

                id: 7,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

            {

                id: 8,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

            {

                id: 9,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        slides: [
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/1.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/2.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/3.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/4.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/5.jpg'],
            },
            {
                photos: ['/media/restricted/collections/photos/collection-1/content/6.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/7.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/8.jpg'],
            },
            {
                phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
                photos: ['/media/restricted/collections/photos/collection-1/content/9.jpg'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', {params: {activityId: '12'}}).reply(200, {
    details: {
        title: 'this is What in the picture Activity',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.WhatInThePicture, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 9, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo: [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },

            {

                id: 2,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',

                title: 'some title 2',

                filterInfo: [1, 2, 3],

            },

            {

                id: 3,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',

                title: 'some title 3',

                filterInfo: [1, 2, 3],

            },

            {

                id: 4,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',

                title: 'some title 4',

                filterInfo: [3],

            },

            {

                id: 5,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',

                title: 'some title 5',

                filterInfo: [3],

            },

            {

                id: 6,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',

                title: 'some title 6',

                filterInfo: [2, 3],

            },

            {

                id: 7,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

            {

                id: 8,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

            {

                id: 9,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        slides: [
            {
                questions: ['This is question number 1 for photo number 1', 'This is question number 2 for photo number 1', 'This is question number 3 for photo number 1', 'This is question number 4 for photo number 1'],
                photos: ['/media/restricted/collections/photos/collection-1/content/1.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 2', 'This is question number 2 for photo number 2', 'This is question number 3 for photo number 2', 'This is question number 4 for photo number 2'],
                photos: ['/media/restricted/collections/photos/collection-1/content/2.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 3', 'This is question number 2 for photo number 3', 'This is question number 3 for photo number 3', 'This is question number 4 for photo number 3'],
                photos: ['/media/restricted/collections/photos/collection-1/content/3.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 4', 'This is question number 2 for photo number 4', 'This is question number 3 for photo number 4', 'This is question number 4 for photo number 4'],
                photos: ['/media/restricted/collections/photos/collection-1/content/4.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 5', 'This is question number 2 for photo number 5', 'This is question number 3 for photo number 5', 'This is question number 4 for photo number 5'],
                photos: ['/media/restricted/collections/photos/collection-1/content/5.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 6', 'This is question number 2 for photo number 6', 'This is question number 3 for photo number 6', 'This is question number 4 for photo number 6'],
                photos: ['/media/restricted/collections/photos/collection-1/content/6.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 7', 'This is question number 2 for photo number 7', 'This is question number 3 for photo number 7', 'This is question number 4 for photo number 7'],
                photos: ['/media/restricted/collections/photos/collection-1/content/7.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 8', 'This is question number 2 for photo number 8', 'This is question number 3 for photo number 8', 'This is question number 4 for photo number 8'],
                photos: ['/media/restricted/collections/photos/collection-1/content/8.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 9', 'This is question number 2 for photo number 9', 'This is question number 3 for photo number 9', 'This is question number 4 for photo number 9'],
                photos: ['/media/restricted/collections/photos/collection-1/content/9.jpg'],
            },
        ],
    },
});
mock.onGet('/general/getActivity', {params: {activityId: '13'}}).reply(200, {
    details: {
        title: 'Empty vs. Full',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-139957751_medium.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.Categorization, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Portrait,
        selectedSessionInfoId: 3,
        isPinned: false,
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-139957751_medium.jpg',
                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-139957751_medium.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },

            {

                id: 2,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-467362980_high.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-467362980_high.jpg',

                title: 'some title 2',

                filterInfo: [1, 2, 3],

            },

            {

                id: 3,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-477820284_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-477820284_super.jpg',

                title: 'some title 3',

                filterInfo: [1, 2, 3],

            },

            {

                id: 4,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-481644975_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-481644975_super.jpg',

                title: 'some title 4',

                filterInfo: [3],

            },

            {

                id: 5,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-492668996_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-492668996_super.jpg',

                title: 'some title 5',

                filterInfo: [3],

            },

            {

                id: 6,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-531505727_high.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-531505727_high.jpg',

                title: 'some title 6',

                filterInfo: [2, 3],

            },

            {

                id: 7,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-627856016_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-627856016_super.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

            {

                id: 8,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-637951328_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-637951328_super.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

            {

                id: 9,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-832587060_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-832587060_super.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },
            {

                id: 10,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-857545002_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/9iStock-857545002_super.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },
            {

                id: 11,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-866714174_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-866714174_super.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },
            {

                id: 12,

                thumbnailSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-889525400_super.jpg',

                imgSrc: '/media/restricted/cognitive/categorizations/empty-full/content/iStock-889525400_super.jpg',

                title: 'some title 7',

                filterInfo: [2, 3],

            },

        ],
    },
    content: {
        categories: [
            {
                categorId: 1,
                categoryName: 'Empty',
            },
            {
                categorId: 2,
                categoryName: 'Full',
            },
        ],
        Media: [
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-139957751_medium.jpg",
                categoryId: 2,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-467362980_high.jpg",
                categoryId: 2,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-477820284_super.jpg",
                categoryId: 2,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-492668996_super.jpg",
                categoryId: 1,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-481644975_super.jpg",
                categoryId: 2,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-531505727_high.jpg",
                categoryId: 2,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-637951328_super.jpg",
                categoryId: 1,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-627856016_super.jpg",
                categoryId: 2,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-832587060_super.jpg",
                categoryId: 1,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-857545002_super.jpg",
                categoryId: 1,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-866714174_super.jpg",
                categoryId: 1,
            },
            {
                photo: "/media/restricted/cognitive/categorizations/empty-full/content/iStock-889525400_super.jpg",
                categoryId: 1,
            },
        ],
    },
});
mock.onGet('/general/getActivity', {params: {activityId: '14'}}).reply(200, {
    details: {
        title: 'this is Puzzle Activity',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/cognitive/puzzle/food1/iStock-155129848_super.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.Puzzle, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 3, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        isPinned: false,
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/cognitive/puzzle/food1/thumbnails/iStock-155129848_super.jpg',
                imgSrc: '/media/restricted/cognitive/puzzle/food1/content/puzzle-1/photo.jpg',
                title: 'some title 1',
                filterInfo: [1, 2, 3],
            },

            {

                id: 2,
                thumbnailSrc: '/media/restricted/cognitive/puzzle/food1/thumbnails/iStock-534053642_super.jpg',
                imgSrc: '/media/restricted/cognitive/puzzle/food1/content/puzzle-2/photo.jpg',
                title: 'some title 1',
                filterInfo: [1, 2, 3],

            },
        ],
    },
    content: {
        Media: [
            {
                photo: "/media/restricted/cognitive/puzzle/food1/content/puzzle-1/photo.jpg",
                partsCount: 4,
            },
            {
                photo: "/media/restricted/cognitive/puzzle/food1/content/puzzle-2/photo.jpg",
                partsCount: 9,
            },
        ],
    },
});
mock.onGet('/general/getActivity', { params: { activityId: '15' } }).reply(200, {
    details: {
        title: 'Sports',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/cognitive/zoom/sports/content/iStock-155017350_medium.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.Zoom, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-155017350_medium.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-155017350_medium.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-492887058_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-492887058_super.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-495114582_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-495114582_super.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-509106582_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-509106582_super.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
            {
                id: 5,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-518019370_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-518019370_super.jpg',
                title: 'some title 5',
                filterInfo: [3],
            },
            {
                id: 6,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-532343318_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-532343318_super.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-628276690_medium.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-628276690_medium.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 8,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-827580260_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-827580260_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 9,
                thumbnailSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-840886816_super.jpg',
                imgSrc: '/media/restricted/cognitive/zoom/sports/content/iStock-840886816_super.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        shape: ShapeType.Circle,
        slides: [
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-155017350_medium.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-492887058_super.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-495114582_super.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-509106582_super.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-518019370_super.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-532343318_super.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-628276690_medium.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-827580260_super.jpg'],
            },
            {
                photos: ['/media/restricted/cognitive/zoom/sports/content/iStock-840886816_super.jpg'],
            },
        ],
    },
});

mock.onGet('/general/getActivity', { params: { activityId: '16' } }).reply(200, {
    details: {
        title: 'Animals Puzzle',
        description: 'This is an animals puzzle',
        coverPhoto: '/media/restricted/cognitive/memory/animals1/iStock-505602225.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.Memory, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaCount: 10, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        isPinned: false,
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-93157220.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-93157220.jpg',
                title: 'some title 1',
                filterInfo: [2, 3],
             },
            {
                id: 2,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-98378798.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-98378798.jpg',
                title: 'some title 2',
                filterInfo: [2, 3],
             },
            {
                id: 3,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-177533648.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-177533648.jpg',
                title: 'some title 3',
                filterInfo: [2, 3],
             },
            {
                id: 4,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-505602225.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-505602225.jpg',
                title: 'some title 4',
                filterInfo: [2, 3],
             },
            {
                id: 5,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-508496372.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-508496372.jpg',
                title: 'some title 5',
                filterInfo: [2, 3],
             },
            {
                id: 6,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-516318760.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-516318760.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
             },
            {
                id: 7,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-638654490.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-638654490.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
             },
            {
                id: 8,
                thumbnailSrc: '/media/restricted/cognitive/memory/animals1/thumbnails/iStock-531856654.jpg',
                imgSrc: '/media/restricted/cognitive/memory/animals1/content/iStock-531856654.jpg',
                title: 'some title 8',
                filterInfo: [2, 3],
             },
        ],
    },
    content: {
        aspectRatio: 1.5,
        columnCount: 4,
        rowsCount: 4,
        memoryLayout: MamoryLayout.FourRowsFourColumns,
        photos: [
            '/media/restricted/cognitive/memory/animals1/content/iStock-93157220.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-98378798.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-177533648.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-505602225.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-508496372.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-516318760.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-638654490.jpg',
            '/media/restricted/cognitive/memory/animals1/content/iStock-531856654.jpg',
        ],
    },
});


mock.onGet('/general/getActivity', {params: {activityId: '17'}}).reply(200, {
    details: {
        title: 'this is WH Questions Activity',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: ActivityType.WHQuestions, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 9, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        selectedSessionInfoDesc: 'Long',
        sessionsInfo : [
            {id: 1, description: "Short", slidesCount: 6},
            {id: 2, description: "Medium", slidesCount: 12},
            {id: 3, description: "Long", slidesCount: 18},
        ],
        isPinned: false,
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [1, 2, 3],
             },

            {

                id: 2,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/2.jpg',

                title: 'some title 2',
                filterInfo: [1, 2, 3],

            },

            {

                id: 3,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/3.jpg',

                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },

            {

                id: 4,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/4.jpg',

                title: 'some title 4',
                filterInfo: [1, 2, 3],
            },

            {

                id: 5,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/5.jpg',

                title: 'some title 5',
                filterInfo: [1, 2, 3],
            },

            {

                id: 6,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/6.jpg',

                title: 'some title 6',
                filterInfo: [1, 2, 3],
            },

            {

                id: 7,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/7.jpg',

                title: 'some title 7',
                filterInfo: [1, 2, 3],
            },

            {

                id: 8,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/8.jpg',

                title: 'some title 7',
                filterInfo: [1, 2, 3],
            },

            {

                id: 9,

                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',

                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/9.jpg',

                title: 'some title 7',
                filterInfo: [1, 2, 3],
            },

        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        slides: [
            {
                questions: ['This is question number 1 for photo number 1', 'This is question number 2 for photo number 1', 'This is question number 3 for photo number 1', 'This is question number 4 for photo number 1'],
                photos: ['/media/restricted/collections/photos/collection-1/content/1.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 2', 'This is question number 2 for photo number 2', 'This is question number 3 for photo number 2', 'This is question number 4 for photo number 2'],
                photos: ['/media/restricted/collections/photos/collection-1/content/2.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 3', 'This is question number 2 for photo number 3', 'This is question number 3 for photo number 3', 'This is question number 4 for photo number 3'],
                photos: ['/media/restricted/collections/photos/collection-1/content/3.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 4', 'This is question number 2 for photo number 4', 'This is question number 3 for photo number 4', 'This is question number 4 for photo number 4'],
                photos: ['/media/restricted/collections/photos/collection-1/content/4.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 5', 'This is question number 2 for photo number 5', 'This is question number 3 for photo number 5', 'This is question number 4 for photo number 5'],
                photos: ['/media/restricted/collections/photos/collection-1/content/5.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 6', 'This is question number 2 for photo number 6', 'This is question number 3 for photo number 6', 'This is question number 4 for photo number 6'],
                photos: ['/media/restricted/collections/photos/collection-1/content/6.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 7', 'This is question number 2 for photo number 7', 'This is question number 3 for photo number 7', 'This is question number 4 for photo number 7'],
                photos: ['/media/restricted/collections/photos/collection-1/content/7.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 8', 'This is question number 2 for photo number 8', 'This is question number 3 for photo number 8', 'This is question number 4 for photo number 8'],
                photos: ['/media/restricted/collections/photos/collection-1/content/8.jpg'],
            },
            {
                questions: ['This is question number 1 for photo number 9', 'This is question number 2 for photo number 9', 'This is question number 3 for photo number 9', 'This is question number 4 for photo number 9'],
                photos: ['/media/restricted/collections/photos/collection-1/content/9.jpg'],
            },
        ],
    },
});


mock.onGet('/general/getActivity', { params: { activityId: '100' } }).reply(500, {});
mock.onGet('/general/getActivity', { params: { activityId: '101' } }).reply(404, {});
mock.onGet('/general/pinActivity', { params: { activityId: '1', isPinned: true } }).reply(200, { status: true});
mock.onGet('/general/unPinActivity', { params: { activityId: '1', isPinned: false } }).reply(200, { status: true});
