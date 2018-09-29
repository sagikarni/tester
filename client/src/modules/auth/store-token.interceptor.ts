import Vue from 'vue';
import VueResource from 'vue-resource';
import { get } from 'lodash';

Vue.use(VueResource);

export const StoreTokenInterceptorPlugin = (store: any) => {
  let token: string | null = get(store, 'state.auth.token') || null;

  (Vue.http.interceptors as any).push((request: any) => {
    if (token && !request.headers.get('Authorization')) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
  });

  store.subscribe((mutation: any, state: any) => {
    token = get(state, 'auth.token') || null;
  });
};
