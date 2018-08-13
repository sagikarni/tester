export class Image {
    public id?: number;
    public thumbnailSrc?: string;
    public imgSrc?: string;
    public title?: string;
    public filterInfo?: number[];
}

export class ImageInfo {
    public thumbnails?: Image[];
}

export class GeneralError {
    public message?: string | undefined;
}
