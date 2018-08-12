import {ActionTree} from 'vuex';
import {ISearchState} from './types';
import { SearchRequest} from './typesClasses';
import {IRootState} from '../../store/types';
import {searchService} from '../searchService';
import {SystemLoadingInfoHelper} from '@/modules/common/components/loadingHelper';
import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

export const actions: ActionTree<ISearchState, IRootState> = {
    getFilters({ state, commit, rootState , dispatch }, prm: any): any {
        dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
        searchService.getSearchResults<any>(new SearchRequest()).then((response) => {
           dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
        }).catch(() => {
            dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
        });
    },
  getSearchResults({ state, commit, rootState , dispatch }, prm: any): any {
      dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
      searchService.getSearchResults<any>(new SearchRequest()).then((response) => {
         dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });

      }).catch(() => {
          dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
      });

  },
};
