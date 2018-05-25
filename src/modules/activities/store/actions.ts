import {ActionTree} from 'vuex';
import {IActivitiesState} from './types';
import {IRootState} from '../../store/types';
import {activityService} from '../activityService';
import {SystemLoadingInfoHelper} from '@/modules/common/components/loadingHelper';

export const actions: ActionTree<IActivitiesState, IRootState> = {

    getActivity({ state, commit, rootState , dispatch }, prm: any): any {
        dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });

        activityService.getActivity(prm.activity).then((response: any) => {
            commit('updateActivities' , {activity: response.data});
            dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
        }).catch(() => {
            dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
        });
    },
    updateSessionInfoType({ state, commit, rootState , dispatch }, prm: any): any {
        commit('updateSessionInfoId' , {sessionInfoId: prm.sessionInfoId});
    },
};
