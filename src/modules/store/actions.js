export const actions = {
    loading({ commit }, loaadingInfo) {
        commit('loadingStateChanged', loaadingInfo);
    },
    errorModalDialog({ commit }, item) {
        commit('updateErrorModalDialog', item);
    },
    errorPaneAction({ commit }, item) {
        commit('updateErrorPane', item);
    },
};
//# sourceMappingURL=actions.js.map