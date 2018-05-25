import {MutationTree} from 'vuex';
import {IActivitiesState} from './types';

export const mutations: MutationTree<IActivitiesState> = {
    updateActivities(state, payload: IActivitiesState) {
        state.activity = payload.activity;
    },
    updateSessionInfoId(state, payload: IActivitiesState) {
        state.sessionInfoId = payload.sessionInfoId;
    },
};
