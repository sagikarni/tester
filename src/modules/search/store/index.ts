
import { Module } from 'vuex';
import {ISearchState} from './types';
import {getters} from './getters';
import {IRootState} from '../../store/types';
import {actions} from './actions';
import {mutations} from './mutations';

export const state: ISearchState = {
     test: '',
};

const namespaced: boolean = true;

export const search: Module<ISearchState, IRootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
