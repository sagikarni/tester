import Vue from 'vue';
import VueResource from 'vue-resource';

const ApiService = {
  init() {
    Vue.use(VueResource);
    Vue.http.options.root = '/api/v1';
  },

  query(resource: string, params: any) {
    console.log('in query');
    // return Vue.axios.get(resource, params).catch(error => {
    //   throw new Error(`[RWV] ApiService ${error}`);
    // });
  },

  get(resource: string, slug = '') {
    console.log('in get');
    // return Vue.axios.get(`${resource}/${slug}`).catch(error => {
    //   throw new Error(`[RWV] ApiService ${error}`);
    // });
  },

  post(resource: string, params: any, options: any = null) {
    return Vue.http.post(`${resource}`, params, options);
  },

  update(resource: string, slug: any, params: any) {
    console.log('in update');
    // return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource: string, params: any) {
    console.log('in put');
    // return Vue.axios.put(`${resource}`, params);
  },

  delete(resource: any) {
    console.log('in delete');
    // return Vue.axios.delete(resource).catch(error => {
    //   throw new Error(`[RWV] ApiService ${error}`);
    // });
  },
};

export default ApiService;
