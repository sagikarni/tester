import { ApiService } from '../services/api.service';
import { StorageService, StorageTypes } from '../services/storage.service';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';
import { get } from 'lodash';
import { ActionTree, MutationTree, GetterTree } from 'vuex';

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

interface State {
  error: string | null;
  token: string | null;
  refreshToken: string | null;
  user: any | null;
}

const defaultState: State = {
  error: null,
  token: null,
  refreshToken: null,
  user: null
};

const initialState = () => ({
  ...defaultState,
  ...(StorageService.get(StorageTypes.AUTH) || {}),
  ...{ error: null }
});

export const getters: GetterTree<State, any> = {
  error: state => {
    return state.error;
  },
  isAuthenticated: state => {
    return state.token;
  },
  currentUser: state => {
    return state.user;
  }
};

export const actions: ActionTree<State, any> = {
  [REGISTER]({ dispatch }, credentials: any) {
    return ApiService.post('users', credentials).then(
      response => dispatch(LOGIN_SUCCESS, { response, store: true }),
      reason => dispatch(LOGIN_FAILED, reason)
    );
  },
  [LOGIN]({ dispatch }, { email, password, rememberMe }) {
    return ApiService.post('users/login', { email, password }).then(
      response => dispatch(LOGIN_SUCCESS, { response, store: rememberMe }),
      reason => dispatch(LOGIN_FAILED, reason)
    );
  },
  [LOGIN_SUCCESS]({ commit }, { store, response }) {
    commit(SET_AUTH, {
      store,
      ...extractAuthFromResponse(response)
    });
  },
  [LOGIN_FAILED]({ commit }, payload: any) {
    commit(SET_ERROR, get(payload, 'body.error') || 'GENERAL_ERROR');
  },
  [VERIFY_PASSWORD]({ dispatch }, { password, resetPasswordToken }) {
    return ApiService.post(`users/verify-password`, { password }, { headers: { Authorization: `Basic ${resetPasswordToken}` } }).then(
      response => dispatch(LOGIN_SUCCESS, { response, store: true }),
      reason => dispatch(LOGIN_FAILED, reason)
    );
  },
  [CHANGE_PASSWORD]({ dispatch }, { password, oldPassword }) {
    return ApiService.post('users/password', { password, oldPassword }).then(
      response => dispatch(LOGIN_SUCCESS, { response, store: true }),
      reason => dispatch(LOGIN_FAILED, reason)
    );
  },
  [VERIFY_ACCOUNT]({ dispatch }, verifyToken: string) {
    ApiService.post('users/verify', {}, { headers: { Authorization: `Basic ${verifyToken}` } }).then(
      response => dispatch(LOGIN_SUCCESS, { response, store: true }),
      reason => dispatch(LOGIN_FAILED, reason)
    );
  },
  [CONNECT_SOCIAL]({ commit }, { accessToken, refreshToken, payload }) {
    console.log({ payload });
    return new Promise((resolve, reject) => {
      commit(SET_AUTH, {
        store: true,
        token: accessToken,
        refreshToken,
        user: payload.user
      });
      resolve();
    });
  },
  [DISCONNECT_SOCIAL]({ dispatch }, vendor: any) {
    return ApiService.post('users/social', { vendor }).then(
      response => dispatch(LOGIN_SUCCESS, { response, store: true }),
      reason => dispatch(LOGIN_FAILED, reason)
    );
  },
  [LOGOUT_ACCOUNT]({ commit }) {
    commit(PURGE_AUTH);
  },
  [CLEAR_ERRORS]({ commit }) {
    commit(SET_ERROR, null);
  }
};

export const mutations: MutationTree<State> = {
  [SET_ERROR](state: State, error: any) {
    state.error = error;
  },
  [SET_AUTH](state: State, { store, token, refreshToken, user }) {
    console.log({ user, store});
    state.token = token;
    state.refreshToken = refreshToken;
    state.user = user;
    state.error = null;
    store && StorageService.save(StorageTypes.AUTH, state);
  },
  [PURGE_AUTH](state: State) {
    StorageService.destroy(StorageTypes.AUTH);
    const { error, token, refreshToken, user } = initialState();
    state.token = token;
    state.refreshToken = refreshToken;
    state.user = user;
    state.error = error;
  }
};

export const auth = {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
  getters
};

export const extractAuthFromResponse = (response: any) => {
  return {
    token: get(response, 'headers.map.access_token[0]') || 'access_token_iufiohfikdshkjfdh',
    refreshToken: get(response, 'headers.map.refresh_token[0]') || 'refreh_kljfdksfhdkl',
    user: get(response, 'data.user') || null
  };
};
