import {Domain, ActivityType, MediaType} from '@/modules/activities/store/types';

export const pageSize = 50;

export enum SortBy {
    Popularity = 1,
    Date = 2,
  }

export class SearchRequest {
    public activityType: ActivityType | undefined;
    public mediaType: MediaType | undefined;
    public target: string | undefined;
    public category: string | undefined;
    public subCategory: string | undefined;
    public sortBy: SortBy | undefined;
    public pageNum: number | undefined;
  }
