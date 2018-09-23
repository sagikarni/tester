import ApiService from '@/shared/api.service';
import StorageService, { StorageTypes } from '@/shared/storage.service';
import { get } from 'lodash';

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
  SET_AUTH_SOCIAL,
} from './actions.type';

import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const state = {
  errors: null,
  user: StorageService.get(StorageTypes.USER) || {},
  isAuthenticated: !!StorageService.get(StorageTypes.TOKEN),
};

const getters = {
  currentUser(state: any) {
    return state.user;
  },
  isAuthenticated(state: any) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context: any, credentials: any) {
    return new Promise(resolve => {
      ApiService.post('users/login', credentials)
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const { user } = response.data;

          context.commit(SET_AUTH, { token, user });
          resolve(response.data);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [LOGOUT](context: any) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context: any, credentials: any) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', credentials)
        .then((response: any) => {
          const token = get(response, 'headers.map.access_token[0]');
          const { user } = response.data;
          context.commit(SET_AUTH, { token, user });
          resolve(response.data);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [SET_AUTH_SOCIAL](context: any, { token, payload }: any) {
    return new Promise((resolve, reject) => {
      context.commit(SET_AUTH, { token, user: payload.user });
      resolve();
    });
  },
  [CHECK_AUTH](context: any) {
    if (StorageService.get(StorageTypes.TOKEN)) {
      ApiService.setHeader();

      //   const publicPages: any = ['/login', '/register'];
      //   const authRequired = !publicPages.includes(to.path);
      //   const loggedIn = localStorage.getItem('user');

      //   if (authRequired && !loggedIn) {
      //     return next('/login');
      //   }

      //   next();
      // });

      // ApiService.get('user')
      //   .then(({ data }) => {
      //     context.commit(SET_AUTH, data.user);
      //   })
      //   .catch(({ response }) => {
      //     context.commit(SET_ERROR, response.data.errors);
      //   });
    } else {
      context.commit(PURGE_AUTH);
    }
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
    state.errors = error;
  },
  [SET_AUTH](state: any, { token, user }: any) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    StorageService.save(StorageTypes.USER, state.user);
    StorageService.save(StorageTypes.TOKEN, token);
  },
  [PURGE_AUTH](state: any) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    StorageService.destroy(StorageTypes.USER);
    StorageService.destroy(StorageTypes.TOKEN);
  },
};

export const store = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
