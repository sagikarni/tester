import {ActionTree} from 'vuex';
import {IActivitiesState} from './types';
import {IRootState} from '../../store/types';
import {activityService} from '../activityService';
import {SystemLoadingInfoHelper} from '@/modules/common/components/loadingHelper';
import {ActivitiesManager} from "@/modules/activities/activitiesManager";

export const actions: ActionTree<IActivitiesState, IRootState> = {

    getActivity({ state, commit, rootState , dispatch }, prm: any): any {
        dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
        return activityService.getActivity(prm.activity).then((response: any) => {
            commit('updateActivities' , {activity: response.data});
            dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
            return response;
        }).catch((reject: any) => {
            let status = 500;
            if (reject.response) {
                status = reject.response.status;
            }
            dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
            return {status, message: reject.message};
        });
    },
    pinActivity({ state, commit, rootState , dispatch }, prm: any): any {
        return activityService.pinActivity(prm.activity, prm.pin).then((response: any) => {
            commit('updateActivityIsPinned' , {isPinned: prm.pin}); // TODO here we need to add response from backend
            return response;
        }).catch((reject) => {
            return reject;
        });
    },
    updateSessionInfoType({ state, commit, rootState , dispatch }, prm: any): any {
        if (prm.selectedSessionInfo) {
            commit('updateSelectedSessionInfoId' , {selectedSessionInfoId: prm.selectedSessionInfo.id});
            commit('updateSelectedSessionInfoDesc' , {selectedSessionInfoDesc: prm.selectedSessionInfo.description});
        }
    },
    updateActivity({ state, commit, rootState , dispatch }, prm: any): any {
        commit('updateActivities' , {activity: prm.activity});
    },
    executeActivity({ state, commit, rootState , dispatch }, prm: any): any {
        ActivitiesManager.ExecuteActivity(state);
    },
};
