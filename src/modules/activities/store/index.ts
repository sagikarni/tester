
import { Module } from 'vuex';
import {IActivitiesState} from './types';
import {IRootState} from '../../store/types';

const namespaced: boolean = true;

export const state: IActivitiesState = {
    activity: undefined,
};
export const Activities: Module<IActivitiesState, IRootState> = {
    namespaced,
    state,
};
