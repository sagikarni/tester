import Vue from 'vue';
import Vuex from 'vuex';
import { search } from '../search/store/index';
import { actions } from "./actions";
import { mutations } from "./mutations";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        systemLoading: undefined,
    },
    modules: {
        search,
    },
    mutations,
    actions,
});
//# sourceMappingURL=store.js.map