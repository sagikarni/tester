// import { store } from 'vuex-store';

// import {
//   VuexModule,
//   Module,
//   Mutation,
//   Action,
//   getModule,
// } from 'vuex-module-decorators';

// export interface State {
//   systemLoading: string | null;
//   generalGerror: null;
//   errorPane: null;
//   reloadActivityDetails: null;
//   isHDMedia: null;
//   isFullScreen: null;
//   appToolbar: boolean | null;
//   loadedLangs: any;
//   isFullscreen: boolean;
//   appDrawer: boolean | null;
//   stateless: null;
// }

// @Module({ name: 'teraStore', dynamic: true, store })
// export class TeraStore extends VuexModule implements State {
//   systemLoading;
//   generalGerror;
//   errorPane;
//   reloadActivityDetails;
//   isHDMedia;
//   isFullScreen;
//   appToolbar;
//   loadedLangs;
//   isFullscreen;
//   appDrawer;
//   stateless;

//   @Mutation
//   loadingStateChanged(payload: any) {
//     this.systemLoading = payload;
//   }

//   @Mutation
//   updateErrorModalDialog(payload: any) {
//     this.generalGerror = payload;
//   }

//   @Mutation
//   updateErrorPane(payload: any) {
//     this.errorPane = payload;
//   }

//   @Mutation
//   updateReloadActivityDetails(payload: any) {
//     this.reloadActivityDetails = payload.state;
//   }

//   @Mutation
//   updateMediaQuality(payload: any) {
//     this.isHDMedia = payload.isHDMedia;
//   }

//   @Mutation
//   updateFullScreen(payload: any) {
//     this.isFullScreen = this.isFullScreen;
//   }

//   @Mutation
//   fullscreen(payload: any) {
//     this.isFullscreen = payload;
//     this.stateless = payload;
//     this.appDrawer = !payload && null;
//     this.appToolbar = !payload;
//   }

//   @Mutation
//   loadLang(payload: any) {
//     this.loadedLangs.push(payload);
//   }

//   @Mutation
//   drawerToggle1(payload: any) {
//     this.appDrawer = !this.appDrawer;
//   }

//   @Mutation
//   drawer1(payload: any) {
//     this.appDrawer = payload;
//   }

//   @Action({ commit: 'loadingStateChanged' })
//   async loading(loadingInfo) {
//     return loadingInfo;
//   }

//   @Action({ commit: 'updateErrorPane' })
//   async errorModalDialog(item) {
//     return item;
//   }

//   @Action({ commit: 'updateErrorModalDialog' })
//   async errorPaneAction(item) {
//     return item;
//   }

//   @Action({ commit: 'uploadReloadActivityDetails' })
//   async changeReloadActivityDetails(item) {
//     return item;
//   }

//   @Action({ commit: 'updateMediaQuality' })
//   async changeMediaQuality(item) {
//     return item;
//   }

//   @Action({ commit: 'updateFullscreen' })
//   async changeFullscreen(item) {
//     return item;
//   }

//   @Action({ commit: 'drawerToggle1' })
//   async drawerToggle() {
//     return {};
//   }

//   @Action({ commit: 'drawerToggle1' })
//   async drawer(payload) {
//     return payload;
//   }
// }

// export const TeraStoreModule = getModule(TeraStore);
