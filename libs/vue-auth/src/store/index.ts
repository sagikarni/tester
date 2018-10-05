import { namespace, Action } from 'vuex-class';

export * from './actions.type';
export * from './mutations.type';
export * from './auth.module';

export const Auth = namespace('auth');