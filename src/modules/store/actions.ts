import {ActionTree} from "vuex";
import {IRootState} from './types';
import {ISystemLoading} from "@/modules/store/types";
import { GeneralError } from "@/modules/store/typeClasses";

export const actions: ActionTree<IRootState, IRootState> = {
    loading({commit} , loaadingInfo: ISystemLoading) {
        commit('loadingStateChanged' , loaadingInfo);
    },
    errorModalDialog({commit} , item: GeneralError) {
        commit('updateErrorModalDialog' , item);
    },
    errorPaneAction({commit} , item: GeneralError) {
        commit('updateErrorPane' , item);
    },
    changeReloadActivityDetails({commit} , item: any) {
        commit('updateReloadActivityDetails' , item);
    },
    changeQualityStatus({commit} , item: any) {
        commit('updateQualityStatus' , item);
    },
};
