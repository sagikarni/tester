import { GeneralError } from './typeClasses';

export interface IRootState {
    systemLoading?: ISystemLoading | undefined | null;
    generalGerror: GeneralError | undefined;
    errorPane: GeneralError | undefined;
    reloadActivityDetails: undefined;
    isHDMedia: undefined;
    isFullScreen: undefined;
}

export interface ISystemLoading {
    isLoading?: boolean;
    message?: string;
}
