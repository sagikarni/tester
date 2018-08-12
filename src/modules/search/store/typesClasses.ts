import {Category, ActivityType, MediaType} from '@/modules/activities/store/types';

export const pageSize = 50;

export enum SortBy {
    Popularity = 1,
    Date = 2,
  }

export class SearchRequest {
    public activityType: ActivityType;
    public mediaType: MediaType;
    public target: string;
    public category: string;
    public subCategory: string;
    public sortBy: SortBy;
    public pageNum: number;
  }
