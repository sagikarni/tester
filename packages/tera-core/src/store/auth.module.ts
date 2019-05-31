import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

export interface IAuthState {
  user: any;
  token: any;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'auth', namespaced: true })
class Auth extends VuexModule implements IAuthState {
  public user = null;
  public token = null;
  public name = '';
  public avatar = '';
  public roles = [];

  @Action({ commit: 'LOGIN_SUCCESS' })
  public login({ email, password }) {
    return { user: { name: 'shlomi' }, token: '329787939648934634896' };
  }

  @Mutation
  private LOGIN_SUCCESS({ user, token }) {
    this.user = user;
    this.token = token;
  }

  // @MutationAction({ mutate: ['roles', 'name', 'avatar'] })
  // public async GetInfo() {
  //   const token = getToken();
  //   if (token === undefined) {
  //     throw Error('GetInfo: token is undefined!');
  //   }
  //   const { data } = {
  //     data: {
  //       roles: [{}],
  //       name: 'viacards',
  //       avatar: 'https://api.adorable.io/avatars/60/wizardnet972@gmail.com.png',
  //     },
  //   }; // await getInfo(token);
  //   if (data.roles && data.roles.length > 0) {
  //     return {
  //       roles: data.roles,
  //       name: data.name,
  //       avatar: data.avatar,
  //     };
  //   } else {
  //     throw Error('GetInfo: roles must be a non-null array!');
  //   }
  // }

  // @Action({ commit: 'SET_TOKEN' })
  // public async FedLogOut() {
  //   removeToken();
  //   return '';
  // }
}

export const AuthModule = getModule(Auth);
