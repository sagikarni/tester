import Vue from 'vue';
import Vuex from 'vuex';
import {IRootState} from './types';

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    state: {
        isLoading: false, // a simple property
    },
    modules: {
    },
    mutations: {

    },
    actions: {

    },
});
