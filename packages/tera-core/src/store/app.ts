import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: false,
    withoutAnimation: false,
  };
  public device = DeviceType.Desktop;
  public hasToolbar = true;
  public hasDrawer = true;
  public hasFooter = true;

  @Action({ commit: 'SHOW_TOOLBAR' })
  public showToolbar(hasToolbar) {
    return hasToolbar;
  }

  @Action({ commit: 'SHOW_DRAWER' })
  public showDrawer(hasDrawer) {
    return hasDrawer;
  }

  @Action({ commit: 'SHOW_FOOTER' })
  public showFooter(hasFooter) {
    return hasFooter;
  }

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  public toggleDrawer(val) {
    return val;
  }

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  public ToggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }
  @Action({ commit: 'CLOSE_SIDEBAR' })
  public CloseSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }
  @Action({ commit: 'TOGGLE_DEVICE' })
  public ToggleDevice(device: DeviceType) {
    return device;
  }

  @Mutation
  private SHOW_TOOLBAR(hasToolbar: boolean) {
    this.hasToolbar = hasToolbar;
  }

  @Mutation
  private SHOW_DRAWER(hasDrawer: boolean) {
    this.hasDrawer = hasDrawer;
  }

  @Mutation
  private SHOW_FOOTER(hasFooter: boolean) {
    this.hasFooter = hasFooter;
  }

  @Mutation
  private TOGGLE_SIDEBAR(opened: boolean) {
    this.sidebar.opened = opened;
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }
}

export const AppModule = getModule(App);
