import { ApiService } from '../services/api.service';
import StorageService, { StorageTypes } from '../services/storage.service';
import { get } from 'lodash';

import {
  LOGIN,
  LOGOUT_ACCOUNT,
  REGISTER,
  VERIFY_ACCOUNT,
  DISCONNECT_SOCIAL,
  VERIFY_PASSWORD,
  CHANGE_PASSWORD,
  CONNECT_SOCIAL,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_ERRORS
} from './actions.type';

import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const defaultState = {
  error: null,
  token: null,
  refreshToken: null,
  user: null
};

// const newState = () =>
//   Object.assign({}, defaultState, StorageService.get(StorageTypes.AUTH) || {}, {
//     error: null
//   });

const newState = () => ({
  ...defaultState,
  ...(StorageService.get(StorageTypes.AUTH) || {}),
  ...{ error: null }
});

// Object.assign({}, defaultState, StorageService.get(StorageTypes.AUTH) || {}, {
//   error: null
// });

const state = newState();

const getters = {
  currentUser(state: any) {
    return state.user;
  },
  isAuthenticated(state: any) {
    return state.token;
  },
  error(state: any) {
    return state.error;
  }
};

const actions = {
  [REGISTER](context: any, credentials: any) {
    return ApiService.post('users', credentials).then(
      (response: any) =>
        context.dispatch(LOGIN_SUCCESS, { response, store: true }),
      (reason: any) => context.dispatch(LOGIN_FAILED, reason)
    );
  },
  [LOGIN](context: any, { email, password, rememberMe }: any) {
    return ApiService.post('users/login', { email, password }).then(
      (response: any) =>
        context.dispatch(LOGIN_SUCCESS, { response, store: rememberMe }),
      (reason: any) => context.dispatch(LOGIN_FAILED, reason)
    );
  },
  [LOGIN_SUCCESS](context: any, payload: any) {
    context.commit(SET_AUTH, {
      store: payload.store,
      ...extractAuthFromResponse(payload.response)
    });
  },
  [LOGIN_FAILED](context: any, payload: any) {
    context.commit(SET_ERROR, get(payload, 'body.error') || 'GENERAL_ERROR');
  },
  [VERIFY_PASSWORD](context: any, { password, resetPasswordToken }: any) {
    return ApiService.post(
      'users/verify-password',
      { password },
      { headers: { Authorization: `Basic ${resetPasswordToken}` } }
    ).then(
      (response: any) =>
        context.dispatch(LOGIN_SUCCESS, { response, store: true }),
      (reason: any) => context.dispatch(LOGIN_FAILED, reason)
    );
  },
  [CHANGE_PASSWORD](context: any, { password, oldPassword }: any) {
    return ApiService.post('users/password', { password, oldPassword }).then(
      (response: any) =>
        context.dispatch(LOGIN_SUCCESS, { response, store: true }),
      (reason: any) => context.dispatch(LOGIN_FAILED, reason)
    );
  },
  [VERIFY_ACCOUNT](context: any, verifyToken: string) {
    ApiService.post(
      'users/verify',
      {},
      { headers: { Authorization: `Basic ${verifyToken}` } }
    ).then(
      (response: any) =>
        context.dispatch(LOGIN_SUCCESS, { response, store: true }),
      (reason: any) => context.dispatch(LOGIN_FAILED, reason)
    );
  },
  [CONNECT_SOCIAL](context: any, { accessToken, refreshToken, payload }: any) {
    return new Promise((resolve, reject) => {
      context.commit(SET_AUTH, {
        store: true,
        token: accessToken,
        refreshToken,
        user: payload.user
      });
      resolve();
    });
  },
  [DISCONNECT_SOCIAL](context: any, vendor: any) {
    return ApiService.post('users/social', { vendor }).then(
      (response: any) =>
        context.dispatch(LOGIN_SUCCESS, { response, store: true }),
      (reason: any) => context.dispatch(LOGIN_FAILED, reason)
    );
  },
  [LOGOUT_ACCOUNT](context: any) {
    context.commit(PURGE_AUTH);
    // return Promise.resolve();
  },
  [CLEAR_ERRORS](context: any) {
    context.commit(SET_ERROR, null);
    // return Promise.resolve();
  }
};

const mutations = {
  [SET_ERROR](state: any, error: any) {
    state.error = error;
  },
  [SET_AUTH](state: any, { store, token, refreshToken, user }: any) {
    state.token = token;
    state.refreshToken = refreshToken;
    state.user = user;
    state.error = null;
    store && StorageService.save(StorageTypes.AUTH, state);
  },
  [PURGE_AUTH](state: any) {
    StorageService.destroy(StorageTypes.AUTH);
    const { error, token, refreshToken, user } = newState();
    state.token = token;
    state.refreshToken = refreshToken;
    state.user = user;
    state.error = error;
  }
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export const extractAuthFromResponse = (response: any) => {
  return {
    token: get(response, 'headers.map.access_token[0]') || null,
    refreshToken: get(response, 'headers.map.refresh_token[0]') || null,
    user: get(response, 'data.user') || null
  };
};
