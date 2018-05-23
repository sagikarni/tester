import {MutationTree} from 'vuex';
import {IActivitiesState} from './types';

export const mutations: MutationTree<IActivitiesState> = {
    updateActivities(state, payload: IActivitiesState) {
        state.activity = payload.activity;
        // TODO here we are getting all needed data, but couldn't fire on component side need to research
    },
};
