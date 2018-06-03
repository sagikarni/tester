import {MutationTree} from 'vuex';
import {IRootState} from './types';
import {ISystemLoading, GeneralError} from "@/modules/store/types";

export const mutations: MutationTree<IRootState> = {
    loadingStateChanged(state, payload: ISystemLoading) {
        state.systemLoading = payload;
    },
    updateErrorModalDialog(state, payload: GeneralError) {
        state.generalGerror = payload;
    },
};
