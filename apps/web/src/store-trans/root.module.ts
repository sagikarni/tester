const state = {
  showBar: false,
  showCreateDialog: false,
  currentKey: null,
  isTranslating: false,
  buttons: [],
};

export const SOME_ACTION = 'SOME_ACTION';
export const SOME_MUTATIONS = 'SOME_MUTATIONS';

const actions = {
  [SOME_ACTION](context: any, loadingInfo: any) {
    // return new Promise((resolve) => {
    //   context.commit(LOADING_STATE_CHANGED, loadingInfo);
    //   resolve();
    // });
  },
};

const mutations = {
  [SOME_MUTATIONS](state: any, payload: any) {
    state.systemLoading = payload;
  },
};

const getters = {
  isTranslating: (state: any) => {
    return state.isTranslating;
  },
};

export const translation = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};

