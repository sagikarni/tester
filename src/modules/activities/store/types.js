export class SessionsInfo {
    constructor() {
        this.id = 0;
    }
}
export var Orientation;
(function (Orientation) {
    Orientation[Orientation["Landscape"] = 1] = "Landscape";
    Orientation[Orientation["Portrait"] = 2] = "Portrait";
})(Orientation || (Orientation = {}));
export var MediaType;
(function (MediaType) {
    MediaType[MediaType["Photo"] = 1] = "Photo";
    MediaType[MediaType["Video"] = 2] = "Video";
})(MediaType || (MediaType = {}));
export var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["TBD1"] = 1] = "TBD1";
    ActivityType[ActivityType["TBD2"] = 2] = "TBD2";
})(ActivityType || (ActivityType = {}));
export var Category;
(function (Category) {
    Category[Category["Communication"] = 1] = "Communication";
    Category[Category["Cognitive"] = 2] = "Cognitive";
})(Category || (Category = {}));
export class ActivityMainDetailsInfo {
    constructor() {
        this.dataExist = false;
    }
}
//# sourceMappingURL=types.js.map