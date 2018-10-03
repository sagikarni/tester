import Vue from 'vue';
import VueResource from 'vue-resource';
import { get } from 'lodash';
import { ApiService } from './api.service';
import { LOGIN_SUCCESS, LOGOUT_ACCOUNT } from '../store/actions.type';

Vue.use(VueResource);

export const StoreTokenInterceptorPlugin = (store: any) => {
  let token: string | null = get(store, 'state.auth.token') || null;

  let refreshToken: string | null =
    get(store, 'state.auth.refreshToken') || null;

    (Vue as any).http.interceptors.push({
    request: function(request: any) {
      // request.headers['Authorization'] = auth.getAuthHeader()
      console.log('fix that');
      return request;
    },

    response: function(response: any) {
      //console.log('status: ' + response.data)
      console.log('fix that');
      return response;
    }

    // (request, next) => {
    // if (token && !request.headers.get('Authorization')) {
    //   request.headers.set('Authorization', `Bearer ${token}`);
    // }
    // next((response: any) => {
    //   if (
    //     response.status === 401 &&
    //     refreshToken &&
    //     request.url !== 'users/refresh'
    //   ) {
    //     return new Promise((resolve, reject) => {
    //       ApiService.post(
    //         'users/refresh',
    //         {},
    //         { headers: { Authorization: `Basic ${refreshToken}` } }
    //       )
    //         .then((response: any) => {
    //           store.dispatch('auth/' + LOGIN_SUCCESS, {
    //             response,
    //             store: true
    //           });
    //           ApiService.post(request.url, request.body)
    //             .then((res: any) => resolve(res))
    //             .catch((err: any) => {
    //               store.dispatch('auth/' + LOGOUT_ACCOUNT);
    //               reject(err);
    //             });
    //         })
    //         .catch((err: any) => {
    //           store.dispatch('auth/' + LOGOUT_ACCOUNT);
    //           resolve(response);
    //         });
    //     });
    //   }
    // });
  });
  // http.interceptors.push((request, next) => {
  //   if (token && !request.headers.get('Authorization')) {
  //     request.headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   next((response: any) => {
  //     if (
  //       response.status === 401 &&
  //       refreshToken &&
  //       request.url !== 'users/refresh'
  //     ) {
  //       return new Promise((resolve, reject) => {
  //         ApiService.post(
  //           'users/refresh',
  //           {},
  //           { headers: { Authorization: `Basic ${refreshToken}` } }
  //         )
  //           .then((response: any) => {
  //             store.dispatch('auth/' + LOGIN_SUCCESS, {
  //               response,
  //               store: true
  //             });
  //             ApiService.post(request.url, request.body)
  //               .then((res: any) => resolve(res))
  //               .catch((err: any) => {
  //                 store.dispatch('auth/' + LOGOUT_ACCOUNT);
  //                 reject(err);
  //               });
  //           })
  //           .catch((err: any) => {
  //             store.dispatch('auth/' + LOGOUT_ACCOUNT);
  //             resolve(response);
  //           });
  //       });
  //     }
  //   });
  // });

  store.subscribe((mutation: any, state: any) => {
    token = get(state, 'auth.token') || null;
    refreshToken = get(state, 'auth.refreshToken') || null;
  });
};
