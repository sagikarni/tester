import { activityService } from '../activityService';
import { SystemLoadingInfoHelper } from '@/modules/common/components/loadingHelper';
export const actions = {
    getActivity({ state, commit, rootState, dispatch }, prm) {
        dispatch('loading', SystemLoadingInfoHelper.getLoadingInfo(true), { root: true });
        return activityService.getActivity(prm.activity).then((response) => {
            commit('updateActivities', { activity: response.data });
            dispatch('loading', SystemLoadingInfoHelper.getLoadingInfo(false), { root: true });
            return response;
        }).catch((reject) => {
            let status = 500;
            if (reject.response) {
                status = reject.response.status;
            }
            dispatch('loading', SystemLoadingInfoHelper.getLoadingInfo(false), { root: true });
            return { status, message: reject.message };
        });
    },
    pinActivity({ state, commit, rootState, dispatch }, prm) {
        return activityService.pinActivity(prm.activity, prm.pin).then((response) => {
            commit('updateActivityIsPinned', { isPinned: prm.pin }); // TODO here we need to add response from backend
            return response;
        }).catch((reject) => {
            return reject;
        });
    },
    updateSessionInfoType({ state, commit, rootState, dispatch }, prm) {
        commit('updateSelectedSessionInfoId', { selectedSessionInfoId: prm.selectedSessionInfoId });
    },
};
//# sourceMappingURL=actions.js.map