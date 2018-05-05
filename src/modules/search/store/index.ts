
import { Module } from 'vuex';
import {ISearchState} from './types';
import {getters} from './getters';
import {IRootState} from '../../common/store/types';

export const state: ISearchState = {
     test: '',
};

const namespaced: boolean = true;

export const profile: Module<ISearchState, IRootState> = {
    namespaced,
    state,
    getters,
};
