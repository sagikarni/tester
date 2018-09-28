import ApiService from '@/shared/api.service';
import StorageService, { StorageTypes } from '@/shared/storage.service';
import { get } from 'lodash';

import {
  LOGIN,
  LOGOUT_ACCOUNT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
  SET_AUTH_SOCIAL,
  CONFIRM_ACCOUNT,
  DISCONNECT_AUTH_SOCIAL,
  RESET_NEW_PASSWORD,
  CHANGE_PASSWORD,
} from './actions.type';

import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const defaultState = {
  error: null,
  token: null,
  refreshToken: null,
  user: null,
};

const newState = () =>
  Object.assign(
    { error: null },
    defaultState,
    StorageService.get(StorageTypes.AUTH) || {},
  );

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
  [LOGIN](context: any, { email, password, rememberMe }: any) {
    return new Promise((resolve, reject) => {
      ApiService.post('users/login', { email, password })
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const refreshToken = get(response, 'headers.map.refresh_token[0]');
          const { user } = response.data;
          context.commit(SET_AUTH, {
            token,
            refreshToken,
            user,
            store: rememberMe,
          });
          resolve(response.data);
        })
        .catch((error: any) => {
          const errorCode = get(error, 'body.error') || '';
          context.commit(SET_ERROR, errorCode);
          reject(error);
        });
    });
  },
  [LOGOUT_ACCOUNT](context: any) {
    return new Promise(resolve => {
      context.commit(PURGE_AUTH);
      resolve();
    });
  },
  [REGISTER](context: any, credentials: any) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', credentials)
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const refreshToken = get(response, 'headers.map.refresh_token[0]');
          const { user } = response.data;
          context.commit(SET_AUTH, { token, refreshToken, user, store: true });
          resolve(response.data);
        })
        .catch((error: any) => {
          const errorCode = get(error, 'body.error') || '';
          context.commit(SET_ERROR, errorCode);
          reject(error);
        });
    });
  },
  [SET_AUTH_SOCIAL](context: any, { token, payload }: any) {
    return new Promise((resolve, reject) => {
      context.commit(SET_AUTH, { token, user: payload.user, store: true });
      resolve();
    });
  },
  [DISCONNECT_AUTH_SOCIAL](context: any, vendor: any) {
    return new Promise((resolve, reject) => {
      ApiService.post('users/social', { vendor }).then((response: any) => {
        const token = get(response, 'headers.map.access_token[0]');
        const { user } = response.data;
        context.commit(SET_AUTH, { token, user, store: true });
        resolve(response.data);
      });
    });
  },
  [RESET_NEW_PASSWORD](context: any, payload: any) {
    return new Promise((resolve, reject) => {
      ApiService.post(
        'users/new-password',
        { password: payload.password },
        {
          headers: {
            Authorization: `Basic ${payload.resetPasswordToken}`,
          },
        },
      )
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const { user } = response.data;
          context.commit(SET_AUTH, { token, user, store: true });
          resolve(response.data);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [CHANGE_PASSWORD](context: any, payload: any) {
    return new Promise((resolve, reject) => {
      ApiService.post('users/password', {
        password: payload.password,
        oldPassword: payload.oldPassword,
      })
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const { user } = response.data;
          context.commit(SET_AUTH, { token, user, store: true });
          resolve(response.data);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [CHECK_AUTH](context: any) {
    if (context.state.token) {
      ApiService.setHeader(context.state.token);
    }
  },
  [CONFIRM_ACCOUNT](context: any, confirmToken: string) {
    return new Promise((resolve, reject) => {
      ApiService.post(
        'users/confirmed',
        {},
        {
          headers: {
            Authorization: `Basic ${confirmToken}`,
          },
        },
      )
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const { user } = response.data;
          context.commit(SET_AUTH, { token, user, store: true });
          resolve(response.data);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [UPDATE_USER](context: any, payload: any) {
    // const { email, username, password, image, bio } = payload;
    // const user = {
    //   email,
    //   username,
    //   bio,
    //   image
    // };
    // if (password) {
    //   user.password = password;
    // }
    // return ApiService.put('user', user).then(({ data }) => {
    //   context.commit(SET_AUTH, data.user);
    //   return data;
    // });
  },
};

const mutations = {
  [SET_ERROR](state: any, error: any) {
    state.error = error;
  },
  [SET_AUTH](state: any, { token, refreshToken, user, store }: any) {
    state.token = token;
    state.refreshToken = refreshToken;
    state.user = user;
    state.error = null;
    store && StorageService.save(StorageTypes.AUTH, state);
  },
  [PURGE_AUTH](state: any) {
    StorageService.destroy(StorageTypes.AUTH);
    state = newState();
  },
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
