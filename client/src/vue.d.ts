import Vue from 'vue';
import VueResource from 'vue-resource';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    http?: VueResource.HttpOptions & { headers?: VueResource.HttpHeaders } & {
      [key: string]: any;
    };
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: {
      (options: VueResource.HttpOptions): PromiseLike<VueResource.HttpResponse>;
      get: VueResource.$http;
      post: VueResource.$http;
      put: VueResource.$http;
      patch: VueResource.$http;
      delete: VueResource.$http;
      jsonp: VueResource.$http;
    };
    $resource: VueResource.$resource;
  }

  interface VueConstructor {
    http: {
      //options: VueResource.HttpOptions | PromiseLike<VueResource.HttpResponse>;
      options: VueResource.HttpOptions & { root: string };
      headers?: VueResource.HttpHeaders;
      get: VueResource.$http | PromiseLike<VueResource.HttpResponse>;
      post: VueResource.$http | PromiseLike<VueResource.HttpResponse> | any;
      put: VueResource.$http | PromiseLike<VueResource.HttpResponse>;
      patch: VueResource.$http | PromiseLike<VueResource.HttpResponse>;
      delete: VueResource.$http | PromiseLike<VueResource.HttpResponse>;
      jsonp: VueResource.$http | PromiseLike<VueResource.HttpResponse>;
    };
    resource: VueResource.$resource;
  }
}
