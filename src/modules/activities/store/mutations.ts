import {MutationTree} from 'vuex';
import {IActivitiesState} from './types';

export const mutations: MutationTree<IActivitiesState> = {
    updateActivities(state, payload: IActivitiesState) {
        state.activity = payload.activity;
    },
    updateSelectedSessionInfoId(state, payload: any) {
        if (state.activity && state.activity.details) {
            state.activity.details.selectedSessionInfoId = payload.selectedSessionInfoId;
        }
    },
};
