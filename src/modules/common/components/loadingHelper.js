export class SystemLoadingInfoHelper {
    static getLoadingInfo(isLoading, message) {
        return new SystemLoading(isLoading, message);
    }
}
export class SystemLoading {
    constructor(isLoading, message) {
        this.isLoading = isLoading;
        this.message = message;
    }
}
//# sourceMappingURL=loadingHelper.js.map