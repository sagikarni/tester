export const mutations = {
    updateActivities(state, payload) {
        state.activity = payload.activity;
    },
    updateSelectedSessionInfoId(state, payload) {
        if (state.activity && state.activity.details) {
            state.activity.details.selectedSessionInfoId = payload.selectedSessionInfoId;
        }
    },
    updateActivityIsPinned(state, payload) {
        if (state.activity && state.activity.details) {
            state.activity.details.isPinned = payload.isPinned;
        }
    },
};
//# sourceMappingURL=mutations.js.map