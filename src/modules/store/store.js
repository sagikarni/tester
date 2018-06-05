import Vue from 'vue';
import Vuex from 'vuex';
import { search } from '../search/store/index';
import { activities } from '../activities/store/index';
import { actions } from "./actions";
import { mutations } from "./mutations";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        systemLoading: undefined,
        generalGerror: undefined,
        errorPane: undefined,
    },
    modules: {
        search,
        activities,
    },
    mutations,
    actions,
});
//# sourceMappingURL=store.js.map