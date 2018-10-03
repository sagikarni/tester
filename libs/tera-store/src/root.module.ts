import {
  LOADING,
  ERROR_MODAL_DIALOG,
  ERROR_PANE_ACTION,
  CHANGE_RELOAD_ACTIVITY_DETAILS,
  CHANGE_MEDIA_QUALITY,
  CHANGE_FULLSCREEN,
} from './actions.type';

import {
  LOADING_STATE_CHANGED,
  UPDATEE_RROR_MODAL_DIALOG,
  UPDATE_ERROR_PANE,
  UPDATE_RELOAD_ACTIVITY_DETAILS,
  UPDATE_MEDIA_QUALITY,
  UPDATE_FULL_SCREEN,
} from './mutations.type';

export const state = {
  systemLoading: null,
  generalGerror: null,
  errorPane: null,
  reloadActivityDetails: null,
  isHDMedia: null,
  isFullScreen: null,
};

export const actions = {
  [LOADING](context: any, loadingInfo: any) {
    return new Promise(resolve => {
      context.commit(LOADING_STATE_CHANGED, loadingInfo);
      resolve();
    });
  },
  [ERROR_MODAL_DIALOG](context: any, item: any) {
    return new Promise(resolve => {
      context.commit(UPDATE_ERROR_PANE, item);
      resolve();
    });
  },
  [ERROR_PANE_ACTION](context: any, item: any) {
    return new Promise(resolve => {
      context.commit(UPDATEE_RROR_MODAL_DIALOG, item);
      resolve();
    });
  },
  [CHANGE_RELOAD_ACTIVITY_DETAILS](context: any, item: any) {
    return new Promise(resolve => {
      context.commit(UPDATE_RELOAD_ACTIVITY_DETAILS, item);
      resolve();
    });
  },
  [CHANGE_MEDIA_QUALITY](context: any, item: any) {
    return new Promise(resolve => {
      context.commit(UPDATE_MEDIA_QUALITY, item);
      resolve();
    });
  },
  [CHANGE_FULLSCREEN](context: any, item: any) {
    return new Promise(resolve => {
      context.commit(UPDATE_FULL_SCREEN, item);
      resolve();
    });
  },
};

export const mutations = {
  [LOADING_STATE_CHANGED](state: any, payload: any) {
    state.systemLoading = payload;
  },
  [UPDATEE_RROR_MODAL_DIALOG](state: any, payload: any) {
    state.generalGerror = payload;
  },
  [UPDATE_ERROR_PANE](state: any, payload: any) {
    state.errorPane = payload;
  },
  [UPDATE_RELOAD_ACTIVITY_DETAILS](state: any, payload: any) {
    state.reloadActivityDetails = payload.status;
  },
  [UPDATE_MEDIA_QUALITY](state: any, payload: any) {
    state.isHDMedia = payload.isHDMedia;
  },
  [UPDATE_FULL_SCREEN](state: any, payload: any) {
    state.isFullScreen = payload.isFullScreen;
  },
};
