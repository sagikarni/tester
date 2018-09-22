import Vue from 'vue';
import StorageService, { StorageTypes } from '@/shared/storage.service';
// import { API_URL } from '@/common/config';
import VueResource from 'vue-resource';

const ApiService = {
  init() {
    Vue.use(VueResource);
    Vue.http.options.root = '/api/v1';
  },

  setHeader() {
    Vue.http.headers!.common![
      'Authorization'
    ] = `Bearer ${StorageService.get(StorageTypes.TOKEN)}`;
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

  post(resource: string, params: any) {
    console.log('in post');
    return Vue.http.post(`${resource}`, params);
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

// export const TagsService = {
//   get() {
//     return ApiService.get('tags');
//   },
// };

// export const ArticlesService = {
//   query(type, params) {
//     return ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
//       params,
//     });
//   },
//   get(slug) {
//     return ApiService.get('articles', slug);
//   },
//   create(params) {
//     return ApiService.post('articles', { article: params });
//   },
//   update(slug, params) {
//     return ApiService.update('articles', slug, { article: params });
//   },
//   destroy(slug) {
//     return ApiService.delete(`articles/${slug}`);
//   },
// };

// export const CommentsService = {
//   get(slug) {
//     if (typeof slug !== 'string') {
//       throw new Error(
//         '[RWV] CommentsService.get() article slug required to fetch comments',
//       );
//     }
//     return ApiService.get('articles', `${slug}/comments`);
//   },

//   post(slug, payload) {
//     return ApiService.post(`articles/${slug}/comments`, {
//       comment: { body: payload },
//     });
//   },

//   destroy(slug, commentId) {
//     return ApiService.delete(`articles/${slug}/comments/${commentId}`);
//   },
// };

// export const FavoriteService = {
//   add(slug) {
//     return ApiService.post(`articles/${slug}/favorite`);
//   },
//   remove(slug) {
//     return ApiService.delete(`articles/${slug}/favorite`);
//   },
// };
