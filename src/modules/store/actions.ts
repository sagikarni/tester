import {ActionTree} from "vuex";
import {IRootState} from './types';
import {ISystemLoading, GeneralError} from "@/modules/store/types";


export const actions: ActionTree<IRootState, IRootState> = {
    loading({commit} , loaadingInfo: ISystemLoading) {
        commit('loadingStateChanged' , loaadingInfo);
    },
    errorModalDialog({commit} , item: GeneralError) {
        commit('updateErrorModalDialog' , item);
    },
};
