import { store } from 'vuex-store';
import { ApiService } from '../services/api.service';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import { get } from 'lodash';

export interface State {
  error: string | null;
  token: string | null;
  refreshToken: string | null;
  user: any | null;
}

@Module({ name: 'auth', dynamic: true, store })
export class Auth extends VuexModule implements State {
  error = null;
  token = null;
  refreshToken = null;
  user = null;

  @Mutation
  public setAuth({ token, refreshToken, user, error }) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.user = user;
    this.error = null;
  }

  @Mutation
  public setError({ error }) {
    this.error = error;
  }

  @Action
  public async register(credentials) {
    const response = await ApiService.post('users', credentials).catch(
      (err) => {
        this.loginFailed({ err });
        return;
      }
    );

    this.loginSuccess({ store: true, response });
  }

  @Action
  public async login({ email, password, rememberMe }) {
    const response = await ApiService.post('users/login', {
      email,
      password,
    }).catch((err) => {
      this.loginFailed({ err });
      return;
    });

    this.loginSuccess({ store: rememberMe, response });
  }

  @Action({ commit: 'setAuth' })
  public async loginSuccess({ store, response }) {
    const { user, refreshToken, token } = extractAuthFromResponse(response);

    return { token, refreshToken, user, error: null };
  }

  @Action({ commit: 'setError' })
  public async loginFailed({ err }) {
    return err;
  }

  @Action({ commit: 'setAuth' })
  public async connectSocial({ accessToken, refreshToken, payload }) {
    return { token: accessToken, refreshToken, user: payload.user };
  }

  @Action({ commit: 'setAuth' })
  public async disconnectSocial(vendor) {
    //  return { token: accessToken, refreshToken, user: payload.user };

    return new Promise((resolve, reject) => {});
  }

  @Action({ commit: 'setAuth' })
  public async logout() {
    //  return { token: accessToken, refreshToken, user: payload.user };

    return new Promise((resolve, reject) => {});
  }

  //   [CONNECT_SOCIAL]({ commit }, { accessToken, refreshToken, payload }) {
  //     console.log({ payload });
  //     return new Promise((resolve, reject) => {
  //       commit(SET_AUTH, {
  //         store: true,
  //         token: accessToken,
  //         refreshToken,
  //         user: payload.user
  //       });
  //       resolve();
  //     });
  //   },
  //   [DISCONNECT_SOCIAL]({ dispatch }, vendor: any) {
  //     return ApiService.post('users/social', { vendor }).then(
  //       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
  //       reason => dispatch(LOGIN_FAILED, reason)
  //     );
  //   },

  // [SET_AUTH](state: State, { store, token, refreshToken, user }) {
  //     console.log({ user, store});
  //     state.token = token;
  //     state.refreshToken = refreshToken;
  //     state.user = user;
  //     state.error = null;
  //     store && StorageService.save(StorageTypes.AUTH, state);
  //   },

  // [LOGIN]({ dispatch }, { email, password, rememberMe }) {
  //     return ApiService.post('users/login', { email, password }).then(
  //       response => dispatch(LOGIN_SUCCESS, { response, store: rememberMe }),
  //       reason => dispatch(LOGIN_FAILED, reason)
  //     );
  //   },
  //   [LOGIN_SUCCESS]({ commit }, { store, response }) {
  //     commit(SET_AUTH, {
  //       store,
  //       ...extractAuthFromResponse(response)
  //     });
  //   },
  //   [LOGIN_FAILED]({ commit }, payload: any) {
  //     commit(SET_ERROR, get(payload, 'body.error') || 'GENERAL_ERROR');
  //   },

  // [REGISTER]({ dispatch }, credentials: any) {
  //     return ApiService.post('users', credentials).then(
  //       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
  //       reason => dispatch(LOGIN_FAILED, reason)
  //     );
  //   },

  // public sidebar = {
  //   opened: Cookies.get('sidebarStatus') !== 'closed',
  //   withoutAnimation: false,
  // };
  // public device = DeviceType.Desktop;

  // @Action({ commit: 'TOGGLE_SIDEBAR' })
  // public ToggleSideBar(withoutAnimation: boolean) {
  //   return withoutAnimation;
  // }
  // @Action({ commit: 'CLOSE_SIDEBAR' })
  // public CloseSideBar(withoutAnimation: boolean) {
  //   return withoutAnimation;
  // }
  // @Action({ commit: 'TOGGLE_DEVICE' })
  // public ToggleDevice(device: DeviceType) {
  //   return device;
  // }

  // @Mutation
  // private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
  //   if (this.sidebar.opened) {
  //     Cookies.set('sidebarStatus', 'closed');
  //   } else {
  //     Cookies.set('sidebarStatus', 'opened');
  //   }
  //   this.sidebar.opened = !this.sidebar.opened;
  //   this.sidebar.withoutAnimation = withoutAnimation;
  // }
  // @Mutation
  // private CLOSE_SIDEBAR(withoutAnimation: boolean) {
  //   Cookies.set('sidebarStatus', 'closed');
  //   this.sidebar.opened = false;
  //   this.sidebar.withoutAnimation = withoutAnimation;
  // }
  // @Mutation
  // private TOGGLE_DEVICE(device: DeviceType) {
  //   this.device = device;
  // }
}

// console.log({ Auth });

// export default function({ store }) {

// }

// export default function createModule({ store }) {
//   return {
//     Auth,
//     AuthModule: getModule(Auth),
//   };
// }

export const AuthModule = getModule(Auth);

// export const AuthModule = getModule(Auth);

// import { StorageService, StorageTypes } from '../services/storage.service';
// import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';
// import { get } from 'lodash';
// import { ActionTree, MutationTree, GetterTree } from 'vuex';

// import {
//   LOGIN,
//   LOGOUT_ACCOUNT,
//   REGISTER,
//   VERIFY_ACCOUNT,
//   DISCONNECT_SOCIAL,
//   VERIFY_PASSWORD,
//   CHANGE_PASSWORD,
//   CONNECT_SOCIAL,
//   LOGIN_SUCCESS,
//   LOGIN_FAILED,
//   CLEAR_ERRORS
// } from './actions.type';

// interface State {
//   error: string | null;
//   token: string | null;
//   refreshToken: string | null;
//   user: any | null;
// }

// const defaultState: State = {
//   error: null,
//   token: null,
//   refreshToken: null,
//   user: null
// };

// const initialState = () => ({
//   ...defaultState,
//   ...(StorageService.get(StorageTypes.AUTH) || {}),
//   ...{ error: null }
// });

// export const getters: GetterTree<State, any> = {
//   error: state => {
//     return state.error;
//   },
//   isAuthenticated: state => {
//     return state.token;
//   },
//   currentUser: state => {
//     return state.user;
//   }
// };

// export const actions: ActionTree<State, any> = {
//   [REGISTER]({ dispatch }, credentials: any) {
//     return ApiService.post('users', credentials).then(
//       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
//       reason => dispatch(LOGIN_FAILED, reason)
//     );
//   },
//   [LOGIN]({ dispatch }, { email, password, rememberMe }) {
//     return ApiService.post('users/login', { email, password }).then(
//       response => dispatch(LOGIN_SUCCESS, { response, store: rememberMe }),
//       reason => dispatch(LOGIN_FAILED, reason)
//     );
//   },
//   [LOGIN_SUCCESS]({ commit }, { store, response }) {
//     commit(SET_AUTH, {
//       store,
//       ...extractAuthFromResponse(response)
//     });
//   },
//   [LOGIN_FAILED]({ commit }, payload: any) {
//     commit(SET_ERROR, get(payload, 'body.error') || 'GENERAL_ERROR');
//   },
//   [VERIFY_PASSWORD]({ dispatch }, { password, resetPasswordToken }) {
//     return ApiService.post(`users/verify-password`, { password }, { headers: { Authorization: `Basic ${resetPasswordToken}` } }).then(
//       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
//       reason => dispatch(LOGIN_FAILED, reason)
//     );
//   },
//   [CHANGE_PASSWORD]({ dispatch }, { password, oldPassword }) {
//     return ApiService.post('users/password', { password, oldPassword }).then(
//       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
//       reason => dispatch(LOGIN_FAILED, reason)
//     );
//   },
//   [VERIFY_ACCOUNT]({ dispatch }, verifyToken: string) {
//     ApiService.post('users/verify', {}, { headers: { Authorization: `Basic ${verifyToken}` } }).then(
//       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
//       reason => dispatch(LOGIN_FAILED, reason)
//     );
//   },
//   [CONNECT_SOCIAL]({ commit }, { accessToken, refreshToken, payload }) {
//     console.log({ payload });
//     return new Promise((resolve, reject) => {
//       commit(SET_AUTH, {
//         store: true,
//         token: accessToken,
//         refreshToken,
//         user: payload.user
//       });
//       resolve();
//     });
//   },
//   [DISCONNECT_SOCIAL]({ dispatch }, vendor: any) {
//     return ApiService.post('users/social', { vendor }).then(
//       response => dispatch(LOGIN_SUCCESS, { response, store: true }),
//       reason => dispatch(LOGIN_FAILED, reason)
//     );
//   },
//   [LOGOUT_ACCOUNT]({ commit }) {
//     commit(PURGE_AUTH);
//   },
//   [CLEAR_ERRORS]({ commit }) {
//     commit(SET_ERROR, null);
//   }
// };

// export const mutations: MutationTree<State> = {
//   [SET_ERROR](state: State, error: any) {
//     state.error = error;
//   },
//   [SET_AUTH](state: State, { store, token, refreshToken, user }) {
//     console.log({ user, store});
//     state.token = token;
//     state.refreshToken = refreshToken;
//     state.user = user;
//     state.error = null;
//     store && StorageService.save(StorageTypes.AUTH, state);
//   },
//   [PURGE_AUTH](state: State) {
//     StorageService.destroy(StorageTypes.AUTH);
//     const { error, token, refreshToken, user } = initialState();
//     state.token = token;
//     state.refreshToken = refreshToken;
//     state.user = user;
//     state.error = error;
//   }
// };

// export const auth = {
//   namespaced: true,
//   state: initialState(),
//   actions,
//   mutations,
//   getters
// };

export const extractAuthFromResponse = (
  response: any
): { token; refreshToken; user } => {
  return {
    token: get(response, 'headers.map.access_token[0]') || '',
    refreshToken: get(response, 'headers.map.refresh_token[0]') || '',
    user: get(response, 'data.user') || null,
  };
};
