
export  interface IActivitiesState {
    activity: {
        details: {
            title: string,
            description: string,
            coverPhoto: string,
            category: Category, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
            activityType: 2, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
            mediaType: MediaType, // 0 = photos , 1 = videos - should be defined as enum in the store types file
            orientation: Orientation,
            mediaCount: 12, // number of videos or photos in this activity
            sessionsInfo: SessionsInfo[],
        },
        content: { },
    } | undefined;
  }

export class SessionsInfo {
    public id?: number = 0;
    public description?: string;
    public slidesCount?: number;
}
export enum Orientation {
    Landscape = 1,
    Portrait = 2,
}
export enum MediaType {
    Photo = 1,
    Video = 2,
}
enum ActivityType {
    TBD1 = 1,
    TBD2 = 2,
}
enum Category {
    Communication = 1,
    Cognitive = 2,
}
