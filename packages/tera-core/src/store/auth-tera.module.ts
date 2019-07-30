import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
  MutationAction,
} from 'vuex-module-decorators';
import axios from 'axios';

import store from './index';

import { gqlHttp } from '../gql-http';
import {
  LOGIN,
  REGISTER,
  RECOVER_ACCOUNT,
  VERIFY_ACCOUNT,
  CHANGE_PASSWORD,
  NEW_PURCHASE,
} from '../graphql/login';

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
  public error = null;
  public recoverAccountSubmitted = false;
  public changePasswordSubmitted = false;

  // public registerState = { pending: false, error: null, submitted: false };
  // public loginState = { pending: false, error: null, submitted: false };
  // public recoverAccountState = { pending: false, error: null, submitted: false };

  public name = '';
  public avatar = '';
  public roles = [];

  @Action //({ commit: 'LOGIN_SUCCESS' })
  public async newPurchase({ plan }) {
    const data = await gqlHttp(NEW_PURCHASE, { plan }).catch((e) => {
      debugger;
    });
    debugger;
    return data.newPurchase.token;
  }

  @Action //({ commit: 'LOGIN_SUCCESS' })
  public async login({ email, password }) {
    const data = await gqlHttp(LOGIN, { email, password }).catch(this.setError);

    data && this.loginSuccess(data.login);
  }

  @Action
  public async register({ name, email, password }) {
    await this.clearErrors();
    const data = await gqlHttp(REGISTER, { name, email, password }).catch(
      this.setError
    );

    data && this.loginSuccess(data.register);
  }

  @Action
  public async recoverAccount({ email }) {
    await this.clearErrors();
    const data = await gqlHttp(RECOVER_ACCOUNT, { email }).catch(this.setError);
    data && (await this.accountRecoveredSuccess());
  }

  @Action
  public async verifyAccount({ token }) {
    await this.clearErrors();
    const data = await gqlHttp(VERIFY_ACCOUNT, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(this.setError);
    data && this.loginSuccess(data.verifyAccount);
  }

  @Action
  public async changePassword({ token, password }) {
    await this.clearErrors();
    const data = await gqlHttp(
      CHANGE_PASSWORD,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch(this.setError);
    data &&
      this.loginSuccess(data.changePassword) &&
      (await this.changePasswordSuccess());
  }

  @MutationAction({ mutate: ['recoverAccountSubmitted'] })
  async accountRecoveredSuccess() {
    return { recoverAccountSubmitted: true };
  }

  @MutationAction({ mutate: ['changePasswordSubmitted'] })
  async changePasswordSuccess() {
    return { changePasswordSubmitted: true };
  }

  @MutationAction({ mutate: ['token', 'user'] })
  async loginSuccess(payload) {
    StorageService.save(StorageTypes.USER, payload.user);
    StorageService.save(StorageTypes.TOKEN, payload.token);
    return payload;
  }

  @MutationAction({ mutate: ['error'] })
  async setError(error) {
    return { error: error.message };
  }

  @MutationAction({ mutate: ['error'] })
  async clearErrors() {
    return { error: null };
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

  // @Mutation
  // private LOGIN_ERROR(error) {
  //   this.error = error;
  // }

  @Mutation
  private LOGOUT() {
    this.user = null;
    this.token = null;

    StorageService.destroy(StorageTypes.TOKEN);
    StorageService.destroy(StorageTypes.USER);
  }
}

export const AuthModule = getModule(Auth);
