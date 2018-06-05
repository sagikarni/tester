import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
export const state = {
    test: '',
};
const namespaced = true;
export const search = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
//# sourceMappingURL=index.js.map