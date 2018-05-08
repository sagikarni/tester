export interface IRootState {
    systemLoading?: ISystemLoading | undefined | null,
}

export interface ISystemLoading {
    isLoading?: boolean;
    message?: string;
}