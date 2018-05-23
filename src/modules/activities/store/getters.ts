import {GetterTree} from 'vuex';
import {IActivitiesState} from './types';
import {IRootState} from '../../store/types';

export const getters: GetterTree<IActivitiesState, IRootState> = {
    activityState(state): any {
        return state.activity;
    },
};
