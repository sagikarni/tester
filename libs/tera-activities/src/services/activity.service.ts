
import { PremiumCollectionLayout, Domain, MediaType, Orientation,  } from '../store/types';

// import { AxiosPromise } from 'axios';
// import './activity-mock.service';
// import { httpClient } from '@/httpClient';

// export class ActivityService {
//   public getActivity<T>(activity: string): AxiosPromise<T> {
//     return httpClient.get(`/general/getActivity`, {
//       params: { activityId: activity },
//     });
//   }
//   public pinActivity<T>(activity: string, isPinned: boolean): AxiosPromise<T> {
//     let pinUnpinUrl = '';
//     if (isPinned) {
//       pinUnpinUrl = '/general/pinActivity';
//     } else {
//       pinUnpinUrl = '/general/unPinActivity';
//     }
//     return httpClient.get(pinUnpinUrl, {
//       params: { activityId: activity, isPinned },
//     });
//   }
// }
// export const activityService = new ActivityService();


var x = {
    details: {
        title: 'Card Deck Name',
        baseFolder: '/assets/media/restricted/collections/photos/collection-1',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: 'cover.jpg',
        domain: Domain.Cognitive, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
        activityType: 1, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
        mediaType: MediaType.Photo, // 0 = photos , 1 = videos - should be defined as enum in the store types file
        mediaCount: 12, // number of videos or photos in this activity
        orientation: Orientation.Landscape,
        isPinned: true,
        hasDifferentSessionLength: true,
        images: [
            {
                id: 1,
                imgSrc: '1.jpg',
                title: 'some title 1',
                filterInfo: [2, 3], // this relates to the sessionsInfo. This thumbnail (photo) appears in the Long and Medium sessions but not in the short session
            },
            {
                id: 2,
                imgSrc: '2.jpg',
                title: 'some title 2',
                filterInfo: [1, 2, 3],
            },
            {
                id: 3,
                imgSrc: '3.jpg',
                title: 'some title 3',
                filterInfo: [1, 2, 3],
            },
            {
                id: 4,
                imgSrc: '4.jpg',
                title: 'some title 4',
                filterInfo: [3],
            },
            {
                id: 5,
                imgSrc: '5.jpg',
                title: 'some title 5',
                filterInfo: [3],
            },
            {
                id: 6,
                imgSrc: '6.jpg',
                title: 'some title 6',
                filterInfo: [2, 3],
            },
            {
                id: 7,
                imgSrc: '7.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 8,
                imgSrc: '8.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
            {
                id: 9,
                imgSrc: '9.jpg',
                title: 'some title 7',
                filterInfo: [2, 3],
            },
        ],
    },
    content: {
        layout: PremiumCollectionLayout.SingleMedia,
        slides: [
            {
                photos: ['1.jpg'],
            },
            {
                photos: ['2.jpg'],
            },
            {
                photos: ['3.jpg'],
            },
            {
                photos: ['4.jpg'],
            },
            {
                photos: ['5.jpg'],
            },
            {
                photos: ['6.jpg'],
            },
            {
                photos: ['7.jpg'],
            },
            {
                photos: ['8.jpg'],
            },
            {
                photos: ['9.jpg'],
            },
        ],
    },
}

export const getActivity = (activity: any) => {
  return new Promise((res, req) => { res(x); });
};

export const pinActivity = (activity: string, isPinned: boolean) => {
  return new Promise((res, req) => {});
};
