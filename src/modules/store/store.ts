import Vue from 'vue';
import Vuex from 'vuex';
import {IRootState} from './types';
import {search} from '../search/store/index';
import {activities} from '../activities/store/index';
import {actions} from "./actions";
import {mutations} from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
    state: {
        systemLoading:  undefined,
    },
    modules: {
        search,
        activities,
    },
    mutations,
    actions,
});
