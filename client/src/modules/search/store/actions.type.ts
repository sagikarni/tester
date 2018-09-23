// import {ActionTree} from 'vuex';
// import {ISearchState} from './types';
// import { SearchRequest} from './typesClasses';
// import {IRootState} from '../../store/types';
// import {searchService} from '../searchService';
// import {SystemLoadingInfoHelper} from '@/modules/common/components/loadingHelper';
// import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

// export const actions: ActionTree<ISearchState, IRootState> = {
//     getFilters({ state, commit, rootState , dispatch }, prm: any): any {
//         dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
//         searchService.getSearchResults<any>(new SearchRequest()).then((response) => {
//            dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
//         }).catch(() => {
//             dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
//         });
//     },
//   getSearchResults({ state, commit, rootState , dispatch }, prm: any): any {
//       dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
//       searchService.getSearchResults<any>(new SearchRequest()).then((response) => {
//          dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });

//       }).catch(() => {
//           dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
//       });

//   },
// };
export const ARTICLE_PUBLISH = 'publishArticle';
export const ARTICLE_DELETE = 'deleteArticle';
export const ARTICLE_EDIT = 'editArticle';
export const ARTICLE_EDIT_ADD_TAG = 'addTagToArticle';
export const ARTICLE_EDIT_REMOVE_TAG = 'removeTagFromArticle';
export const ARTICLE_RESET_STATE = 'resetArticleState';
export const CHECK_AUTH = 'checkAuth';
export const COMMENT_CREATE = 'createComment';
export const COMMENT_DESTROY = 'destroyComment';
export const FAVORITE_ADD = 'addFavorite';
export const FAVORITE_REMOVE = 'removeFavorite';
export const FETCH_ARTICLE = 'fetchArticle';
export const FETCH_ARTICLES = 'fetchArticles';
export const FETCH_COMMENTS = 'fetchComments';
export const FETCH_PROFILE = 'fetchProfile';
export const FETCH_PROFILE_FOLLOW = 'fetchProfileFollow';
export const FETCH_PROFILE_UNFOLLOW = 'fetchProfileUnfollow';
export const FETCH_TAGS = 'fetchTags';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'register';
export const UPDATE_USER = 'updateUser';
export const SET_AUTH_SOCIAL = 'setAuthSocial';
