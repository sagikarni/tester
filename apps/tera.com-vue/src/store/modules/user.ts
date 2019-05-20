import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
// import { login, logout, getInfo } from '../../api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import store from '@/store';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = '';
  public name = '';
  public avatar = '';
  public roles = [];

  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { username: string; password: string }) {
    const username = userInfo.username.trim();
    const password = userInfo.password.trim();

    if (username === 'viacards' && password === 'smiim9989') {
      // const { data } = { data: { token: '132403289097903290' } }; // await login(username, userInfo.password);
      const token = '132403289097903290';
      setToken(token);
      return token;
    }
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    removeToken();
    return '';
  }

  @MutationAction({ mutate: ['roles', 'name', 'avatar'] })
  public async GetInfo() {
    const token = getToken();
    if (token === undefined) {
      throw Error('GetInfo: token is undefined!');
    }
    const { data } = {
      data: {
        roles: [{}],
        name: 'viacards',
        avatar: 'https://api.adorable.io/avatars/60/wizardnet972@gmail.com.png',
      },
    }; // await getInfo(token);
    if (data.roles && data.roles.length > 0) {
      return {
        roles: data.roles,
        name: data.name,
        avatar: data.avatar,
      };
    } else {
      throw Error('GetInfo: roles must be a non-null array!');
    }
  }

  @MutationAction({ mutate: ['token', 'roles'] })
  public async LogOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!');
    }
    // await logout();
    removeToken();
    return {
      token: '',
      roles: [],
    };
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
}

export const UserModule = getModule(User);
