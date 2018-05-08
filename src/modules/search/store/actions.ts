import {ActionTree} from 'vuex';
import {ISearchState} from './types';
import {IRootState} from '../../common/store/types';
import {searchService} from '../api';
import {SystemLoadingInfoHelper} from '@/modules/utils/loading/loadingHelper';

export const actions: ActionTree<ISearchState, IRootState> = {
  getSearchResults({ state, commit, rootState , dispatch }, prm: any): any {

      dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
      searchService.getSearchResults();
      setTimeout(()=>{
          dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
      }, 3000)
  },
};
