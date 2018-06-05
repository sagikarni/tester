import { getters } from "@/modules/activities/store/getters";
import { mutations } from "@/modules/activities/store/mutations";
import { actions } from "@/modules/activities/store/actions";
const namespaced = true;
export const state = {
    activity: undefined,
};
export const activities = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
//# sourceMappingURL=index.js.map