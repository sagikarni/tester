import ApiService from '@/shared/api.service';
import StorageService, { StorageTypes } from '@/shared/storage.service';
import { get } from 'lodash';

import {
  LOGIN,
  LOGOUT_ACCOUNT,
  REGISTER,
  CHECK_AUTH,
  CONFIRM_ACCOUNT,
  DISCONNECT_SOCIAL,
  RESET_NEW_PASSWORD,
  CHANGE_PASSWORD,
  CONNECT_SOCIAL,
} from './actions.type';

import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const defaultState = {
  error: null,
  token: null,
  refreshToken: null,
  user: null,
};

const newState = () =>
  Object.assign({}, defaultState, StorageService.get(StorageTypes.AUTH) || {}, {
    error: null,
  });

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
  },
};

const actions = {
  [REGISTER](context: any, credentials: any) {
    return ApiService.post('users', credentials)
      .then(extractAuthFromResponse)
      .then(({ token, refreshToken, user }: any) =>
        context.commit(SET_AUTH, { store: true, token, refreshToken, user }),
      )
      .catch((error: any) => {
        context.commit(SET_ERROR, error);
        throw error;
      });
  },
  [LOGIN](context: any, { email, password, rememberMe }: any) {
    return ApiService.post('users/login', { email, password })
      .then(extractAuthFromResponse)
      .then(({ token, refreshToken, user }: any) =>
        context.commit(SET_AUTH, {
          store: rememberMe,
          token,
          refreshToken,
          user,
        }),
      )
      .catch((error: any) => {
        context.commit(SET_ERROR, error);
        throw error;
      });
  },
  [RESET_NEW_PASSWORD](context: any, { password, resetPasswordToken }: any) {
    return ApiService.post(
      'users/new-password',
      { password },
      { headers: { Authorization: `Basic ${resetPasswordToken}` } },
    )
      .then(extractAuthFromResponse)
      .then(({ token, refreshToken, user }: any) =>
        context.commit(SET_AUTH, { store: true, token, refreshToken, user }),
      )
      .catch((error: any) => {
        context.commit(SET_ERROR, error);
        throw error;
      });
  },
  [CHANGE_PASSWORD](context: any, { password, oldPassword }: any) {
    return ApiService.post('users/password', { password, oldPassword })
      .then(extractAuthFromResponse)
      .then(({ token, refreshToken, user }: any) =>
        context.commit(SET_AUTH, { store: true, token, refreshToken, user }),
      )
      .catch((error: any) => {
        context.commit(SET_ERROR, error);
        throw error;
      });
  },
  [CONFIRM_ACCOUNT](context: any, confirmToken: string) {
    ApiService.post(
      'users/confirmed',
      {},
      { headers: { Authorization: `Basic ${confirmToken}` } },
    )
      .then(extractAuthFromResponse)
      .then(({ token, refreshToken, user }: any) =>
        context.commit(SET_AUTH, { store: true, token, refreshToken, user }),
      )
      .catch((error: any) => {
        context.commit(SET_ERROR, error);
        throw error;
      });
  },
  [CONNECT_SOCIAL](context: any, { token, refreshToken, payload }: any) {
    return new Promise((resolve, reject) => {
      context.commit(SET_AUTH, {
        store: true,
        token,
        refreshToken,
        user: payload.user,
      });
      resolve();
    });
  },
  [DISCONNECT_SOCIAL](context: any, vendor: any) {
    return ApiService.post('users/social', { vendor })
      .then(extractAuthFromResponse)
      .then(({ token, refreshToken, user }: any) =>
        context.commit(SET_AUTH, { store: true, token, refreshToken, user }),
      )
      .catch((error: any) => {
        context.commit(SET_ERROR, error);
        throw error;
      });
  },
  [LOGOUT_ACCOUNT](context: any) {
    context.commit(PURGE_AUTH);
    // ApiService.removeHeader();
    return Promise.resolve();
  },
  [CHECK_AUTH](context: any) {
    // if (context.state.token) {
    //   ApiService.setHeader(context.state.token);
    // } else {
    //   ApiService.removeHeader();
    // }
  },
};

const mutations = {
  [SET_ERROR](state: any, error: any) {
    state.error = get(error, 'body.error') || 'GENERAL_ERROR';
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
  },
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export const extractAuthFromResponse = (response: any) => {
  return {
    token: get(response, 'headers.map.access_token[0]') || null,
    refreshToken: get(response, 'headers.map.refresh_token[0]') || null,
    user: get(response, 'data.user') || null,
  };
};
