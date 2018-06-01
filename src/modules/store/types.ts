export interface IRootState {
    systemLoading?: ISystemLoading | undefined | null;
    errorModalDialog?: boolean | undefined;
    errorModalMessage?: string | undefined;
}

export interface ISystemLoading {
    isLoading?: boolean;
    message?: string;
}

export interface IErrorModalDialog {
    dialog?: boolean | undefined;
    message?: string | undefined;
}
