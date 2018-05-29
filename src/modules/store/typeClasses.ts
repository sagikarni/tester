export class Thumbnail {
    public imgSrc?: string;
    public title?: string;
    public filterInfo?: number[];
}

export class ImageGalleryInfo {
    public thumbnails?: Thumbnail[];
}
