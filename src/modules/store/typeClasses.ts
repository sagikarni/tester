export class Thumbnail {
    public imgSrc?: string;
    public title?: string;
    public appearsInSession?: number[];
}

export class ImageGalleryInfo {
    public selectedSessionInfoId?: number;
    public thumbnails?: Thumbnail[];
}
