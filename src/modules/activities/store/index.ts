
import { Module } from 'vuex';
import {IActivitiesState} from './types';
import {IRootState} from '../../store/types';
import {getters} from "@/modules/activities/store/getters";
import {mutations} from "@/modules/activities/store/mutations";
import {actions} from "@/modules/activities/store/actions";

const namespaced: boolean = true;

export const state: IActivitiesState = {
    activity: undefined,
};
export const activities: Module<IActivitiesState, IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
