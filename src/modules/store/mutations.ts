import {MutationTree} from 'vuex';
import {IRootState} from './types';
import {ISystemLoading, IErrorModalDialog} from "@/modules/store/types";

export const mutations: MutationTree<IRootState> = {
    loadingStateChanged(state, payload: ISystemLoading) {
        state.systemLoading = payload;
    },
    updateErrorModalDialog(state, payload: IErrorModalDialog) {
        state.errorModalDialog = payload.dialog;
        state.errorModalMessage = payload.message;
    },
};
