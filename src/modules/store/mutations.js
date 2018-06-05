export const mutations = {
    loadingStateChanged(state, payload) {
        state.systemLoading = payload;
    },
    updateErrorModalDialog(state, payload) {
        state.generalGerror = payload;
    },
    updateErrorPane(state, payload) {
        state.errorPane = payload;
    },
};
//# sourceMappingURL=mutations.js.map