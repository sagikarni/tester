import {mock} from '@/httpClient';
import {Category, ActivityType, MediaType} from '@/modules/activities/store/types';

mock.onGet('/search/getFilters', { params: { category: Category , activityType: ActivityType } }).reply(200, {
    mediaType:  [MediaType.Video, MediaType.Photo],
    targetAudience: {
        forChilds : true,
    },
    categories: [
        {
            name: 'Category 1',
            subCategories: [
                { name: 'Sub Category 1'},
                { name: 'Sub Category 2'},
                { name: 'Sub Category 3'},
            ],
        },
        {
            name: 'Category 2',
            subCategories: [
                { name: 'Sub Category 1'},
                { name: 'Sub Category 2'},
                { name: 'Sub Category 3'},
            ],
        },
    ],
});
