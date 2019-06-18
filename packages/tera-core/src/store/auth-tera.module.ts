import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

import { gqlHttp } from '../gql-http';
import { LOGIN, REGISTER } from '../graphql/login';

import { StorageService, StorageTypes } from '../storage';

export interface IAuthState {
  user: any;
  token: any;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'auth-tera', namespaced: true })
class Auth extends VuexModule implements IAuthState {
  public user = StorageService.get(StorageTypes.USER);
  public token = StorageService.get(StorageTypes.TOKEN);
  public name = '';
  public avatar = '';
  public roles = [];

  @Action({ commit: 'LOGIN_SUCCESS' })
  public async login({ email, password }) {
    const data = await gqlHttp(LOGIN, { email, password });
    return data.login;
  }

  @Action({ commit: 'LOGIN_SUCCESS' })
  public async register({ name, email, password }) {
    const data = await gqlHttp(REGISTER, { name, email, password });
    return data.register;
  }

  @Action({ commit: 'LOGOUT' })
  public async logout() {}

  @Mutation
  private LOGIN_SUCCESS({ user, token }) {
    this.user = user;
    this.token = token;

    StorageService.save(StorageTypes.TOKEN, token);
    StorageService.save(StorageTypes.USER, user);
  }

  @Mutation
  private LOGOUT() {
    this.user = null;
    this.token = null;

    StorageService.destroy(StorageTypes.TOKEN);
    StorageService.destroy(StorageTypes.USER);
  }
}

export const AuthModule = getModule(Auth);
