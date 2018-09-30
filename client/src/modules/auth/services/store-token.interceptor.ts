import Vue from 'vue';
import VueResource from 'vue-resource';
import { get } from 'lodash';
import ApiService from '@/shared/api.service';
import { LOGIN_SUCCESS, LOGOUT_ACCOUNT } from '../store/actions.type';

Vue.use(VueResource);

export const StoreTokenInterceptorPlugin = (store: any) => {
  let token: string | null = get(store, 'state.auth.token') || null;
  let refreshToken: string | null =
    get(store, 'state.auth.refreshToken') || null;

  (Vue.http.interceptors as any).push((request: any, next: any) => {
    if (token && !request.headers.get('Authorization')) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    next((response: any) => {
      if (
        response.status === 401 &&
        refreshToken &&
        request.url !== 'users/refresh'
      ) {
        return new Promise((resolve, reject) => {
          ApiService.post(
            'users/refresh',
            {},
            { headers: { Authorization: `Basic ${refreshToken}` } },
          )
            .then((response: any) => {
              store.dispatch('auth/' + LOGIN_SUCCESS, {
                response,
                store: true,
              });
              ApiService.post(request.url, request.body)
                .then((res: any) => resolve(res))
                .catch((err: any) => {
                  store.dispatch('auth/' + LOGOUT_ACCOUNT);
                  reject(err);
                });
            })
            .catch((err: any) => {
              store.dispatch('auth/' + LOGOUT_ACCOUNT);
              resolve(response);
            });
        });
      }
    });
  });

  store.subscribe((mutation: any, state: any) => {
    token = get(state, 'auth.token') || null;
    refreshToken = get(state, 'auth.refreshToken') || null;
  });
};
