import {ISystemLoading} from "@/modules/common/store/types";

export class SystemLoadingInfoHelper {
    public static getLoadingInfo(isLoading: boolean, message?: string): ISystemLoading {
        return new SystemLoading(isLoading, message);
    }
}

export class SystemLoading {
    constructor(public isLoading: boolean, public message?: string) {}
}
