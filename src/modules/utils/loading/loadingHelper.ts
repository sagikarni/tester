import {ISystemLoading} from "@/modules/common/store/types";

export class SystemLoadingInfoHelper {
    public static getLoadingInfo(isLoading: boolean, message?: string) : ISystemLoading {
        let systemLoadingInfo = new SystemLoading(isLoading, message);
        return systemLoadingInfo;
    }
}

export class SystemLoading {

    constructor(public isLoading: boolean, public message?: string){};
}