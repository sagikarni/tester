declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'secure-ls';

// declare module '*.vue' {
//   interface VueConstructor {
//     $myGlobal: string;
//   }
// }
declare module 'vue-izitoast';
declare module 'vue-awesome-swiper';
declare module 'current-device';
declare module 'vue-fullscreen';
declare module 'vue-video-player';
declare module 'nosleep.js';
declare module 'gsap/Draggable.js';
declare module "jquery";
declare module "vue-lodash";
declare module "lodash";

declare module '@/lang/en';
declare module '@/lang';



declare module "*.json" {
  const value: any;
  export default value;
}


// declare namespace __WebpackModuleApi {
//   interface RequireFunction {

//   }
// }

declare namespace __WebpackModuleApi {
  interface RequireFunction {
    context(path: string, deep?: boolean, filter?: RegExp, method?: string): RequireContext;
  }
}