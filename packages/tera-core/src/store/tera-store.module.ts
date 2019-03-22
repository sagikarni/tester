import {Store} from 'vuex-store';

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

export interface State {
  systemLoading: string | null;
  generalGerror: null;
  errorPane: null;
  reloadActivityDetails: null;
  isHDMedia: null;
  isFullScreen: null;
  appToolbar: boolean | null;
  loadedLangs: any;
  isFullscreen: boolean;
  appDrawer: boolean | null;
  stateless: null;
}

@Module({ name: 'teraStore', dynamic: true, store: Store })
export class TeraStore extends VuexModule implements State {
  systemLoading;
  generalGerror;
  errorPane;
  reloadActivityDetails;
  isHDMedia;
  isFullScreen;
  appToolbar;
  loadedLangs;
  isFullscreen;
  appDrawer;
  stateless;

  @Mutation
  loadingStateChanged(payload: any) {
    this.systemLoading = payload;
  };

  @Mutation
  updateErrorModalDialog(payload: any) {
    this.generalGerror = payload;
  }

  @Mutation
  updateErrorPane(payload: any) {
    this.errorPane = payload;
  }

  @Mutation
  updateReloadActivityDetails(payload: any) {
    this.reloadActivityDetails = payload.state;
  }

  @Mutation
  updateMediaQuality(payload: any) {
    this.isHDMedia = payload.isHDMedia;
  }

  @Mutation
  updateFullScreen(payload: any) {
    this.isFullScreen = this.isFullScreen;
  }

  @Mutation
  fullscreen(payload: any) {
    this.isFullscreen = payload;
    this.stateless = payload;
    this.appDrawer = !payload && null;
    this.appToolbar = !payload;
  }

  @Mutation
  loadLang(payload: any) {
    this.loadedLangs.push(payload);
  }

  @Mutation
  drawerToggle1(payload: any) {
    this.appDrawer = !this.appDrawer;
  }

  @Mutation
  drawer1(payload: any) {
    this.appDrawer = payload;
  }


  @Action({  commit: 'loadingStateChanged' })
  async loading(loadingInfo) {
    return loadingInfo;
  }

  @Action({  commit: 'updateErrorPane' })
  async errorModalDialog(item) {
    return item;
  }

  @Action({  commit: 'updateErrorModalDialog' })
  async errorPaneAction(item) {
    return item;
  }

  @Action({  commit: 'uploadReloadActivityDetails' })
  async changeReloadActivityDetails(item) {
    return item;
  }

  @Action({  commit: 'updateMediaQuality' })
  async changeMediaQuality(item) {
    return item;
  }

  @Action({  commit: 'updateFullscreen' })
  async changeFullscreen(item) {
    return item;
  }

  @Action({  commit: 'drawerToggle1' })
  async drawerToggle() {
    return {};
  }

  @Action({  commit: 'drawerToggle1' })
  async drawer(payload) {
    return payload;
  }
}

export const TeraStoreModule = getModule(TeraStore);


// import { ActionTree, MutationTree, GetterTree } from 'vuex';

// import {
//   LOADING,
//   ERROR_MODAL_DIALOG,
//   ERROR_PANE_ACTION,
//   CHANGE_RELOAD_ACTIVITY_DETAILS,
//   CHANGE_MEDIA_QUALITY,
//   CHANGE_FULLSCREEN,
// } from './actions.type';

// import {
//   LOADING_STATE_CHANGED,
//   UPDATEE_RROR_MODAL_DIALOG,
//   UPDATE_ERROR_PANE,
//   UPDATE_RELOAD_ACTIVITY_DETAILS,
//   UPDATE_MEDIA_QUALITY,
//   UPDATE_FULL_SCREEN,
//   FULLSCREEN,
//   LOAD_LANG,
//   DRAWER_TOGGLE,
//   DRAWER,
// } from './mutations.type';



// const defaultState: State = {
 
// };

// const initialState = () => ({
//   ...defaultState
// });

// export const getters: GetterTree<State, any> = {
//   isFullscreen: state => {
//     return state.isFullscreen;
//   },
//   loadedLangs: state => {
//     return state.loadedLangs;
//   },
//   appDrawer: state => {
//     return state.appDrawer;
//   },
//   stateless: state => {
//     return state.stateless;
//   }
// };

// export const actions: ActionTree<State, any> = {
//   [LOADING]({ commit }, loadingInfo: any) {
//     commit(LOADING_STATE_CHANGED, loadingInfo);
//   },
//   [ERROR_MODAL_DIALOG]({ commit }, item: any) {
//     commit(UPDATE_ERROR_PANE, item);
//   },
//   [ERROR_PANE_ACTION]({ commit }, item: any) {
//     commit(UPDATEE_RROR_MODAL_DIALOG, item);
//   },
//   [CHANGE_RELOAD_ACTIVITY_DETAILS]({ commit }, item: any) {
//     commit(UPDATE_RELOAD_ACTIVITY_DETAILS, item);
//   },
//   [CHANGE_MEDIA_QUALITY]({ commit }, item: any) {
//     commit(UPDATE_MEDIA_QUALITY, item);
//   },
//   [CHANGE_FULLSCREEN]({ commit }, item: any) {
//     commit(UPDATE_FULL_SCREEN, item);
//   },
//   [DRAWER_TOGGLE]({ commit }, item: any) {
//     commit(DRAWER_TOGGLE);
//   },
//   [DRAWER]({ commit }, payload: any) {
//     commit(DRAWER, payload);
//   }
// };

// export const mutations: MutationTree<State> = {
//   [LOADING_STATE_CHANGED](state: State, payload: any) {
//     state.systemLoading = payload;
//   },
//   [UPDATEE_RROR_MODAL_DIALOG](state: State, payload: any) {
//     state.generalGerror = payload;
//   },
//   [UPDATE_ERROR_PANE](state: State, payload: any) {
//     state.errorPane = payload;
//   },
//   [UPDATE_RELOAD_ACTIVITY_DETAILS](state: State, payload: any) {
//     state.reloadActivityDetails = payload.status;
//   },
//   [UPDATE_MEDIA_QUALITY](state: State, payload: any) {
//     state.isHDMedia = payload.isHDMedia;
//   },
//   [UPDATE_FULL_SCREEN](state: State, payload: any) {
//     state.isFullScreen = payload.isFullScreen;
//   },
//   [FULLSCREEN](state: State, payload: any) {
//     state.isFullscreen = payload;
//     state.stateless = payload;
//     state.appDrawer = !payload && null;
//     state.appToolbar = !payload;
//   },
//   [LOAD_LANG](state: State, payload: any) {
//     state.loadedLangs.push(payload);
//   },
//   [DRAWER_TOGGLE](state: State, payload: any) {
//     state.appDrawer = !state.appDrawer;
//   },
//   [DRAWER](state: State, payload: any) {
//     state.appDrawer = payload;
//   }
// };

// export const teraStore = {
//   namespaced: true,
//   state: initialState(),
//   actions,
//   mutations,
//   getters
// };
