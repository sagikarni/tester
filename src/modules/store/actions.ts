import {ActionTree} from "vuex";
import {IRootState} from './types';
import {ISystemLoading} from "@/modules/store/types";


export const actions: ActionTree<IRootState, IRootState> = {
    loading({commit} , loaadingInfo: ISystemLoading) {
        commit('loadingStateChanged' , loaadingInfo);
    },
};
