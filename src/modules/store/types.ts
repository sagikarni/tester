import { GeneralError } from './typeClasses';

export interface IRootState {
    systemLoading?: ISystemLoading | undefined | null;
    generalGerror: GeneralError | undefined;
    errorPane: GeneralError | undefined;
    reloadActivityDetails: undefined;
    qualityStatus: undefined;
}

export interface ISystemLoading {
    isLoading?: boolean;
    message?: string;
}
