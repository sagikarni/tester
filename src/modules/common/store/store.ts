import Vue from 'vue';
import Vuex from 'vuex';
import {IRootState} from './types';
import {search} from '@/modules/search/store';
import {actions} from "./actions";
import {mutations} from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    state: {
        systemLoading:  undefined,
    },
    modules: {
        search,
    },
    mutations,
    actions,
});
