export interface IRootState {
    systemLoading?: ISystemLoading | undefined | null;
    generalGerror: GeneralError | undefined;
}

export interface ISystemLoading {
    isLoading?: boolean;
    message?: string;
}

export class GeneralError {
     public message?: string | undefined;
}
