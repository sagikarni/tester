import { mock } from '@/httpClient';
import { MediaType, Orientation } from './store/types';
mock.onGet('/general/getActivity', { params: { activityId: '1' } }).reply(200, {
    details: {
        title: 'Card Deck Name',
        description: 'This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)',
        coverPhoto: '/media/restricted/collections/photos/collection-1/cover.jpg',
        category: 1,
        activityType: 2,
        mediaType: MediaType.Video,
        mediaCount: 12,
        orientation: Orientation.Landscape,
        selectedSessionInfoId: 3,
        isPinned: false,
        sessionsInfo: [
            { id: 1, description: "Short", slidesCount: 6 },
            { id: 2, description: "Medium", slidesCount: 12 },
            { id: 3, description: "Long", slidesCount: 18 },
        ],
        images: [
            {
                id: 1,
                thumbnailSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                imgSrc: '/media/restricted/collections/photos/collection-1/thumbnails/1.jpg',
                title: 'some title 1',
                filterInfo: [2, 3],
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
    content: {},
});
mock.onGet('/general/getActivity', { params: { activityId: '2' } }).reply(500, {});
mock.onGet('/general/getActivity', { params: { activityId: '3' } }).reply(404, {});
mock.onGet('/general/pinActivity', { params: { activityId: '1', isPinned: true } }).reply(200, { status: true });
mock.onGet('/general/unPinActivity', { params: { activityId: '1', isPinned: false } }).reply(200, { status: true });
//# sourceMappingURL=activityServiceMocks.js.map