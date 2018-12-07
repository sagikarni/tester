import { ActionTree, MutationTree, GetterTree } from 'vuex';

import {
  LOADING,
  ERROR_MODAL_DIALOG,
  ERROR_PANE_ACTION,
  CHANGE_RELOAD_ACTIVITY_DETAILS,
  CHANGE_MEDIA_QUALITY,
  CHANGE_FULLSCREEN
} from './actions.type';

import {
  LOADING_STATE_CHANGED,
  UPDATEE_RROR_MODAL_DIALOG,
  UPDATE_ERROR_PANE,
  UPDATE_RELOAD_ACTIVITY_DETAILS,
  UPDATE_MEDIA_QUALITY,
  UPDATE_FULL_SCREEN,
  FULLSCREEN,
  LOAD_LANG,
  DRAWER_TOGGLE,
  DRAWER
} from './mutations.type';

interface State {
  systemLoading: string | null;
  generalGerror: null;
  errorPane: null;
  reloadActivityDetails: null;
  isHDMedia: null;
  isFullScreen: null;
  appToolbar: boolean | null;
  loadedLangs: any;
  isFullscreen: boolean;
  appDrawer: boolean | null;
  stateless: null;
}

const defaultState: State = {
  systemLoading: null,
  generalGerror: null,
  errorPane: null,
  reloadActivityDetails: null,
  isHDMedia: null,
  isFullScreen: null,
  appToolbar: null,
  loadedLangs: [],
  isFullscreen: false,
  appDrawer: null,
  stateless: null
};

const initialState = () => ({
  ...defaultState
});

export const getters: GetterTree<State, any> = {
  isFullscreen: state => {
    return state.isFullscreen;
  },
  loadedLangs: state => {
    return state.loadedLangs;
  },
  appDrawer: state => {
    return state.appDrawer;
  },
  stateless: state => {
    return state.stateless;
  }
};

export const actions: ActionTree<State, any> = {
  [LOADING]({ commit }, loadingInfo: any) {
    commit(LOADING_STATE_CHANGED, loadingInfo);
  },
  [ERROR_MODAL_DIALOG]({ commit }, item: any) {
    commit(UPDATE_ERROR_PANE, item);
  },
  [ERROR_PANE_ACTION]({ commit }, item: any) {
    commit(UPDATEE_RROR_MODAL_DIALOG, item);
  },
  [CHANGE_RELOAD_ACTIVITY_DETAILS]({ commit }, item: any) {
    commit(UPDATE_RELOAD_ACTIVITY_DETAILS, item);
  },
  [CHANGE_MEDIA_QUALITY]({ commit }, item: any) {
    commit(UPDATE_MEDIA_QUALITY, item);
  },
  [CHANGE_FULLSCREEN]({ commit }, item: any) {
    commit(UPDATE_FULL_SCREEN, item);
  },
  [DRAWER_TOGGLE]({ commit }, item: any) {
    commit(DRAWER_TOGGLE);
  },
  [DRAWER]({ commit }, payload: any) {
    commit(DRAWER, payload);
  }
};

export const mutations: MutationTree<State> = {
  [LOADING_STATE_CHANGED](state: State, payload: any) {
    state.systemLoading = payload;
  },
  [UPDATEE_RROR_MODAL_DIALOG](state: State, payload: any) {
    state.generalGerror = payload;
  },
  [UPDATE_ERROR_PANE](state: State, payload: any) {
    state.errorPane = payload;
  },
  [UPDATE_RELOAD_ACTIVITY_DETAILS](state: State, payload: any) {
    state.reloadActivityDetails = payload.status;
  },
  [UPDATE_MEDIA_QUALITY](state: State, payload: any) {
    state.isHDMedia = payload.isHDMedia;
  },
  [UPDATE_FULL_SCREEN](state: State, payload: any) {
    state.isFullScreen = payload.isFullScreen;
  },
  [FULLSCREEN](state: State, payload: any) {
    state.isFullscreen = payload;
    state.stateless = payload;
    state.appDrawer = !payload && null;
    state.appToolbar = !payload;
  },
  [LOAD_LANG](state: State, payload: any) {
    state.loadedLangs.push(payload);
  },
  [DRAWER_TOGGLE](state: State, payload: any) {
    state.appDrawer = !state.appDrawer;
  },
  [DRAWER](state: State, payload: any) {
    state.appDrawer = payload;
  }
};

export const teraStore = {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
  getters
};
