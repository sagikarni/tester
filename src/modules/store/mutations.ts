import {MutationTree} from 'vuex';
import {IRootState} from './types';
import {ISystemLoading} from "@/modules/store/types";
import { GeneralError } from "@/modules/store/typeClasses";

export const mutations: MutationTree<IRootState> = {
    loadingStateChanged(state, payload: ISystemLoading) {
        state.systemLoading = payload;
    },
    updateErrorModalDialog(state, payload: GeneralError) {
        state.generalGerror = payload;
    },
    updateErrorPane(state, payload: GeneralError) {
        state.errorPane = payload;
    },
};
