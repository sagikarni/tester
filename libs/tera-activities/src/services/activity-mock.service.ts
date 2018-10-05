// import {mock} from '@/httpClient';
// import {MediaType, Orientation, Domain, PremiumCollectionLayout, ActivityType, ShapeType, MamoryLayout} from '../store/types';

// mock.onGet('/general/getActivity', {params: {activityId: '1'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Cognitive, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 12, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: true,
//         hasDifferentSessionLength: true,
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//             {
//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [3],
//             },
//             {
//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 photos: ['1.jpg'],
//             },
//             {
//                 photos: ['2.jpg'],
//             },
//             {
//                 photos: ['3.jpg'],
//             },
//             {
//                 photos: ['4.jpg'],
//             },
//             {
//                 photos: ['5.jpg'],
//             },
//             {
//                 photos: ['6.jpg'],
//             },
//             {
//                 photos: ['7.jpg'],
//             },
//             {
//                 photos: ['8.jpg'],
//             },
//             {
//                 photos: ['9.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '2'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Cognitive, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 12, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//             {
//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [3],
//             },
//             {
//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.TwoMediasHorizontal,
//         slides: [
//             {
//                 photos: ['1.jpg', '2.jpg'],
//             },
//             {
//                 photos: ['3.jpg', '4.jpg'],
//             },
//             {
//                 photos: ['4.jpg', '6.jpg'],
//             },
//             {
//                 photos: ['7.jpg', '8.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '3'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 12, // number of videos or photos in this activity
//         orientation: Orientation.Portrait,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//             {
//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [3],
//             },
//             {
//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.TwoMediasVertical,
//         slides: [
//             {
//                 photos: ['1.jpg', '2.jpg'],
//             },
//             {
//                 photos: ['3.jpg', '4.jpg'],
//             },
//             {
//                 photos: ['4.jpg', '6.jpg'],
//             },
//             {
//                 photos: ['7.jpg', '8.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '4'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 12, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//             {
//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [3],
//             },
//             {
//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.FourMedias,
//         slides: [
//             {
//                 photos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
//             },
//             {
//                 photos: ['5.jpg', '6.jpg', '7.jpg', '8.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '10'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/videos/collection-2',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Video, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 4, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 videos: ['1.mp4'],
//             },
//             {
//                 videos: ['2.mp4'],
//             },
//             {
//                 videos: ['3.mp4'],
//             },
//             {
//                 videos: ['4.mp4'],
//             },
//         ],
//     },
// });





// mock.onGet('/general/getActivity', {params: {activityId: '11'}}).reply(200, {
//     details: {
//         title: 'This is a Meaning activity',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.Meaning, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 9, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },

//             {

//                 id: 2,
//                 imgSrc: '2.jpg',

//                 title: 'some title 2',

//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 3,
//                 imgSrc: '3.jpg',

//                 title: 'some title 3',

//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 4,
//                 imgSrc: '4.jpg',

//                 title: 'some title 4',

//                 filterInfo: [3],

//             },

//             {

//                 id: 5,
//                 imgSrc: '5.jpg',

//                 title: 'some title 5',

//                 filterInfo: [3],

//             },

//             {

//                 id: 6,
//                 imgSrc: '6.jpg',

//                 title: 'some title 6',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 7,
//                 imgSrc: '7.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 8,
//                 imgSrc: '8.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 9,
//                 imgSrc: '9.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['1.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['2.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['3.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['4.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['5.jpg'],
//             },
//             {
//                 photos: ['6.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['7.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['8.jpg'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 photos: ['9.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '19'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/videos/collection-2',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.Meaning, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Video, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 4, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 videos: ['1.mp4'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 videos: ['2.mp4'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 videos: ['3.mp4'],
//             },
//             {
//                 phrases: ['love', 'inspiration', 'wind', 'spirit', 'opputunity'],
//                 videos: ['4.mp4'],
//             },
//         ],
//     },
// });


// mock.onGet('/general/getActivity', {params: {activityId: '12'}}).reply(200, {
//     details: {
//         title: 'this is What in the picture Activity',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.WhatInThePicture, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 9, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },

//             {

//                 id: 2,

//                 imgSrc: '2.jpg',

//                 title: 'some title 2',

//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 3,
//                 imgSrc: '3.jpg',

//                 title: 'some title 3',

//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 4,
//                 imgSrc: '4.jpg',

//                 title: 'some title 4',

//                 filterInfo: [3],

//             },

//             {

//                 id: 5,
//                 imgSrc: '5.jpg',

//                 title: 'some title 5',

//                 filterInfo: [3],

//             },

//             {

//                 id: 6,
//                 imgSrc: '6.jpg',

//                 title: 'some title 6',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 7,
//                 imgSrc: '7.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 8,
//                 imgSrc: '8.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 9,
//                 imgSrc: '9.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 questions: ['This is question number 1 for photo number 1', 'This is question number 2 for photo number 1', 'This is question number 3 for photo number 1', 'This is question number 4 for photo number 1'],
//                 photos: ['1.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 2', 'This is question number 2 for photo number 2', 'This is question number 3 for photo number 2', 'This is question number 4 for photo number 2'],
//                 photos: ['2.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 3', 'This is question number 2 for photo number 3', 'This is question number 3 for photo number 3', 'This is question number 4 for photo number 3'],
//                 photos: ['3.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 4', 'This is question number 2 for photo number 4', 'This is question number 3 for photo number 4', 'This is question number 4 for photo number 4'],
//                 photos: ['4.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 5', 'This is question number 2 for photo number 5', 'This is question number 3 for photo number 5', 'This is question number 4 for photo number 5'],
//                 photos: ['5.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 6', 'This is question number 2 for photo number 6', 'This is question number 3 for photo number 6', 'This is question number 4 for photo number 6'],
//                 photos: ['6.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 7', 'This is question number 2 for photo number 7', 'This is question number 3 for photo number 7', 'This is question number 4 for photo number 7'],
//                 photos: ['7.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 8', 'This is question number 2 for photo number 8', 'This is question number 3 for photo number 8', 'This is question number 4 for photo number 8'],
//                 photos: ['8.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 9', 'This is question number 2 for photo number 9', 'This is question number 3 for photo number 9', 'This is question number 4 for photo number 9'],
//                 photos: ['9.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '22'}}).reply(200, {
//     details: {
//         title: 'this is whatinThePictureVideo activty',
//         baseFolder: '/assets/media/restricted/collections/videos/collection-2',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType:  ActivityType.WhatInThePicture, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Video, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 4, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 questions: ['This is question number 100 for photo number 1', 'This is question number 2 for photo number 1', 'This is question number 3 for photo number 1', 'This is question number 4 for photo number 1'],
//                 videos: ['1.mp4'],
//             },
//             {
//                 questions: ['This is question number 101 for photo number 2', 'This is question number 2 for photo number 2', 'This is question number 3 for photo number 2', 'This is question number 4 for photo number 2'],
//                 videos: ['2.mp4'],
//             },
//             {
//                 questions: ['This is question number 102 for photo number 3', 'This is question number 2 for photo number 3', 'This is question number 3 for photo number 3', 'This is question number 4 for photo number 3'],
//                 videos: ['3.mp4'],
//             },
//             {
//                 questions: ['This is question number 103 for photo number 4', 'This is question number 2 for photo number 4', 'This is question number 3 for photo number 4', 'This is question number 4 for photo number 4'],
//                 videos: ['4.mp4'],
//             },
//         ],
//     },
// });




// mock.onGet('/general/getActivity', {params: {activityId: '13'}}).reply(200, {
//     details: {
//         title: 'this is Cetegorization Activity',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.Categorization, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 9, // number of videos or photos in this activity
//         orientation: Orientation.Portrait,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },

//             {

//                 id: 2,

//                 imgSrc: '2.jpg',

//                 title: 'some title 2',

//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 3,
//                 imgSrc: '3.jpg',

//                 title: 'some title 3',

//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 4,
//                 imgSrc: '4.jpg',

//                 title: 'some title 4',

//                 filterInfo: [3],

//             },

//             {

//                 id: 5,
//                 imgSrc: '5.jpg',

//                 title: 'some title 5',

//                 filterInfo: [3],

//             },

//             {

//                 id: 6,
//                 imgSrc: '6.jpg',

//                 title: 'some title 6',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 7,
//                 imgSrc: '7.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 8,
//                 imgSrc: '8.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//             {

//                 id: 9,
//                 imgSrc: '9.jpg',

//                 title: 'some title 7',

//                 filterInfo: [2, 3],

//             },

//         ],
//     },
//     content: {
//         categories: [
//             {
//                 categorId: 1,
//                 categoryName: 'Hot',
//             },
//             {
//                 categorId: 2,
//                 categoryName: 'Cold',
//             },
//         ],
//         Media: [
//             {
//                 photo: "1.jpg",
//                 categoryId: 1,
//             },
//             {
//                 photo: "2.jpg",
//                 categoryId: 1,
//             },
//             {
//                 photo: "3.jpg",
//                 categoryId: 2,
//             },
//             {
//                 photo: "4.jpg",
//                 categoryId: 1,
//             },
//             {
//                 photo: "5.jpg",
//                 categoryId: 2,
//             },
//             {
//                 photo: "6.jpg",
//                 categoryId: 2,
//             },
//             {
//                 photo: "7.jpg",
//                 categoryId: 2,
//             },
//             {
//                 photo: "8.jpg",
//                 categoryId: 1,
//             },
//             {
//                 photo: "9.jpg",
//                 categoryId: 1,
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '14'}}).reply(200, {
//     details: {
//         title: 'this is Puzzle Activity',
//         baseFolder: '/assets/media/restricted/cognitive/puzzle/food1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'iStock-155129848_super.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.Puzzle, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 3, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         images: [
//             {
//                 id: 1,
//                 imgSrc: 'iStock-155129848_super.jpg',
//                 title: 'some title 1',
//             },

//             {

//                 id: 2,
//                 imgSrc: 'iStock-534053642_super.jpg',
//                 title: 'some title 1',

//             },
//             {

//                 id: 3,
//                 imgSrc: 'iStock-508496372.jpg',
//                 title: 'some title 1',

//             },
//         ],
//     },
//     content: {
//        aspectRatio: 1.23,
//         Media: [
//             {
//                 photo: "puzzle-1/photo.jpg",
//                 partsCount: 4,
//             },
//             {
//                 photo: "puzzle-2/photo.jpg",
//                 partsCount: 9,
//             },
//             {
//                 photo: "puzzle-3/photo.jpg",
//                 partsCount: 9,
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '15'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.Zoom, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 12, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//             {
//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [3],
//             },
//             {
//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//             {
//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 7',
//                 filterInfo: [2, 3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         shape: ShapeType.Circle,
//         slides: [
//             {
//                 photos: ['1.jpg'],
//             },
//             {
//                 photos: ['2.jpg'],
//             },
//             {
//                 photos: ['3.jpg'],
//             },
//             {
//                 photos: ['4.jpg'],
//             },
//             {
//                 photos: ['5.jpg'],
//             },
//             {
//                 photos: ['6.jpg'],
//             },
//             {
//                 photos: ['7.jpg'],
//             },
//             {
//                 photos: ['8.jpg'],
//             },
//             {
//                 photos: ['9.jpg'],
//             },
//         ],
//     },
// });
// mock.onGet('/general/getActivity', {params: {activityId: '16'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.Memory, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaCount: 10, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 8',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 9',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 10,
//                 imgSrc: '9.jpg',
//                 title: 'some title 9',
//                 filterInfo: [1, 2, 3],
//             },
//         ],
//     },
//     content: {
//         aspectRatio: 1.5,
//         columnCount: 4,
//         rowsCount: 4,
//         memoryLayout: MamoryLayout.FourRowsFourColumns,
//         photos: [
//             '1.jpg',
//             '2.jpg',
//             '3.jpg',
//             '4.jpg',
//             '5.jpg',
//             '6.jpg',
//             '7.jpg',
//             '8.jpg',
//         ],
//     },
// });


// mock.onGet('/general/getActivity', {params: {activityId: '17'}}).reply(200, {
//     details: {
//         title: 'this is WH Questions Activity',
//         baseFolder: '/assets/media/restricted/collections/photos/collection-1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.WHQuestions, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 9, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 2,


//                 imgSrc: '2.jpg',

//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],

//             },

//             {

//                 id: 3,


//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 5,
//                 imgSrc: '5.jpg',
//                 title: 'some title 5',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 6,
//                 imgSrc: '6.jpg',
//                 title: 'some title 6',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 7,
//                 imgSrc: '7.jpg',
//                 title: 'some title 7',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 8,
//                 imgSrc: '8.jpg',
//                 title: 'some title 7',
//                 filterInfo: [1, 2, 3],
//             },

//             {

//                 id: 9,
//                 imgSrc: '9.jpg',
//                 title: 'some title 7',
//                 filterInfo: [1, 2, 3],
//             },

//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 questions: ['This is question number 1 for photo number 1', 'This is question number 2 for photo number 1', 'This is question number 3 for photo number 1', 'This is question number 4 for photo number 1'],
//                 photos: ['1.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 2', 'This is question number 2 for photo number 2', 'This is question number 3 for photo number 2', 'This is question number 4 for photo number 2'],
//                 photos: ['2.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 3', 'This is question number 2 for photo number 3', 'This is question number 3 for photo number 3', 'This is question number 4 for photo number 3'],
//                 photos: ['3.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 4', 'This is question number 2 for photo number 4', 'This is question number 3 for photo number 4', 'This is question number 4 for photo number 4'],
//                 photos: ['4.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 5', 'This is question number 2 for photo number 5', 'This is question number 3 for photo number 5', 'This is question number 4 for photo number 5'],
//                 photos: ['5.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 6', 'This is question number 2 for photo number 6', 'This is question number 3 for photo number 6', 'This is question number 4 for photo number 6'],
//                 photos: ['6.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 7', 'This is question number 2 for photo number 7', 'This is question number 3 for photo number 7', 'This is question number 4 for photo number 7'],
//                 photos: ['7.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 8', 'This is question number 2 for photo number 8', 'This is question number 3 for photo number 8', 'This is question number 4 for photo number 8'],
//                 photos: ['8.jpg'],
//             },
//             {
//                 questions: ['This is question number 1 for photo number 9', 'This is question number 2 for photo number 9', 'This is question number 3 for photo number 9', 'This is question number 4 for photo number 9'],
//                 photos: ['9.jpg'],
//             },
//         ],
//     },
// });

// mock.onGet('/general/getActivity', {params: {activityId: '18'}}).reply(200, {
//     details: {
//         title: 'Card Deck Name',
//         baseFolder: '/assets/media/restricted/collections/videos/collection-2',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'cover.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.WHQuestions, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaType: MediaType.Video, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         mediaCount: 4, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//                 hasDifferentSessionLength: false,

//         sessionsInfo: [
//             {id: 1, description: "Short", slidesCount: 6},
//             {id: 2, description: "Medium", slidesCount: 12},
//             {id: 3, description: "Long", slidesCount: 18},
//         ],
//         images: [
//             {
//                 id: 1,
//                 imgSrc: '1.jpg',
//                 title: 'some title 1',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 2,
//                 imgSrc: '2.jpg',
//                 title: 'some title 2',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 3,
//                 imgSrc: '3.jpg',
//                 title: 'some title 3',
//                 filterInfo: [1, 2, 3],
//             },
//             {
//                 id: 4,
//                 imgSrc: '4.jpg',
//                 title: 'some title 4',
//                 filterInfo: [3],
//             },
//         ],
//     },
//     content: {
//         layout: PremiumCollectionLayout.SingleMedia,
//         slides: [
//             {
//                 videos: ['1.mp4'],
//                 questions: ['This is question number 1 for photo number 1', 'This is question number 2 for photo number 1', 'This is question number 3 for photo number 1', 'This is question number 4 for photo number 1'],

//             },
//             {
//                 videos: ['2.mp4'],
//                 questions: ['This is question number 1 for photo number 2', 'This is question number 2 for photo number 2', 'This is question number 3 for photo number 2', 'This is question number 4 for photo number 2'],

//             },
//             {
//                 videos: ['3.mp4'],
//                 questions: ['This is question number 1 for photo number 3', 'This is question number 2 for photo number 3', 'This is question number 3 for photo number 3', 'This is question number 4 for photo number 3'],

//             },
//             {
//                 videos: ['4.mp4'],
//                 questions: ['This is question number 1 for photo number 4', 'This is question number 2 for photo number 4', 'This is question number 3 for photo number 4', 'This is question number 4 for photo number 4'],

//             },
//         ],
//     },
// });


// mock.onGet('/general/getActivity', {params: {activityId: '19'}}).reply(200, {
//     details: {
//         title: 'Sounds and Photos',
//         baseFolder: '/assets/media/restricted/cognitive/soundPhotoSelection/soundPhotoSelection1',
//         description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
//         coverPhoto: 'iStock-505602225.jpg',
//         domain: Domain.Communication, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
//         activityType: ActivityType.PhotoSelectionBySound, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
//         mediaCount: 8, // number of videos or photos in this activity
//         orientation: Orientation.Landscape,
//         isPinned: false,
//         hasDifferentSessionLength: false,
//         mediaType: MediaType.PhotoAndSound, // 0 = photos , 1 = videos - should be defined as enum in the store types file
//         images: [
//             {
//                 id: 1,
//                 imgSrc: 'iStock-93157220.jpg',
//                 title: 'some title 1',
//             },
//             {
//                 id: 2,
//                 imgSrc: 'iStock-98378798.jpg',
//                 title: 'some title 2',
//             },
//             {
//                 id: 3,
//                 imgSrc: 'iStock-177533648.jpg',
//                 title: 'some title 3',
//             },
//             {
//                 id: 4,
//                 imgSrc: 'iStock-505602225.jpg',
//                 title: 'some title 4',
//             },
//             {
//                 id: 5,
//                 imgSrc: 'iStock-508496372.jpg',
//                 title: 'some title 5',
//             },
//             {
//                 id: 6,
//                 imgSrc: 'iStock-516318760.jpg',
//                 title: 'some title 6',
//             },
//             {
//                 id: 7,
//                 imgSrc: 'iStock-531856654.jpg',
//                 title: 'some title 7',
//             },
//             {
//                 id: 8,
//                 imgSrc: 'iStock-638654490.jpg',
//                 title: 'some title 8',
//             },
//         ],
//     },
//     content: {
//         slides: [
//             {
//                 photos: ['iStock-93157220.jpg', 'iStock-98378798.jpg', 'iStock-177533648.jpg', 'iStock-505602225.jpg'],
//                 sound: 'sounds/sound1.mp3',
//                 correctPhotoIndex: 1,

//             },
//             {
//                 photos: ['iStock-508496372.jpg', 'iStock-516318760.jpg', 'iStock-531856654.jpg', 'iStock-638654490.jpg'],
//                 sound: 'sounds/sound2.mp3',
//                 correctPhotoIndex: 3,
//             },
//         ],
//     },
// });










// mock.onGet('/general/getActivity', {params: {activityId: '100'}}).reply(500, {});
// mock.onGet('/general/getActivity', {params: {activityId: '101'}}).reply(404, {});
// mock.onGet('/general/pinActivity', {params: {activityId: '1', isPinned: true}}).reply(200, {status: true});
// mock.onGet('/general/unPinActivity', {params: {activityId: '1', isPinned: false}}).reply(200, {status: true});