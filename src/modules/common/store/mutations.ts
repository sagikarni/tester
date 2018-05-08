import {MutationTree} from 'vuex';
import {IRootState} from './types';
import {ISystemLoading} from "@/modules/common/store/types";

export const mutations: MutationTree<IRootState> = {
    loadingStateChanged(state, payload: ISystemLoading) {
        state.systemLoading = payload;
    },
};
