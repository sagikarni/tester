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
    PhotoAndSound = 3,
}
export enum ActivityType {
    PremiumCollction = 1,
    WHQuestions = 2,
    TBD2 = 3,
    Meaning = 4,
    WhatInThePicture = 5,
    Categorization = 6,
    Puzzle = 7,
    Zoom = 8,
    Memory = 9,
    PhotoSelectionBySound = 10,
    SpotTheDifference = 11,
}
export enum Domain {
    Communication = 1,
    Cognitive = 2,
}
export enum ShapeType {
    Circle = 1,
    Rect = 2,
}

export enum MamoryLayout {
    FourRowsFourColumns = 1,
    ThreeRowsFourColumns = 2,
    SixRowsFourColumns = 3,
}

export enum PremiumCollectionLayout {
     SingleMedia = 1,
     TwoMediasHorizontal = 2,
     TwoMediasVertical = 3,
     FourMedias = 4,
}
export enum ImageType {
    Content = 1,
    Thumbnail = 2,
    PreLoad = 3,
    None = 4,
}
export class ActivityMainDetailsInfo {
    public dataExist: boolean = false;
    public title?: string;
    public baseFolder?: string;
    public description?: string;
    public coverPhoto?: string;
    public category?: Domain;
    public activityType?: ActivityType;
    public mediaType?: MediaType;
    public mediaTypeText?: string;
    public mediaTypeIconClass?: string;
    public orientation?: Orientation;
    public orientationText?: string;
    public orientationIconClass?: string;
    public mediaCount?: number;
    public selectedSessionInfoId?: number = 3;
}

export interface IActivitiesState {
    activity: {
        details: {
            title: string,
            baseFolder: string,
            description: string,
            coverPhoto: string,
            category: Domain, // the category of this activity (e.g. communication, cognitive,premium collection) ,should be defined as enum in the store types file
            activityType: ActivityType, // the activity type (e.g. wh questions , a good store) - should be defined as enum in the store types file (activityType always belong to a specifc category)
            mediaType: MediaType, // 0 = photos , 1 = videos - should be defined as enum in the store types file
            orientation: Orientation,
            mediaCount: number, // number of videos or photos in this activity
            hasDifferentSessionLength:boolean,
            sessionsInfo: SessionsInfo[],
            selectedSessionInfoId: number,
            selectedSessionInfoDesc: 'Long',
            isPinned: boolean,
        },
        content: { },
    } | undefined;

}
