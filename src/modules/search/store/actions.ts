import {ActionTree} from 'vuex';
import {ISearchState} from './types';
import {IRootState} from '../../store/types';
import {searchService} from '../searchService';
import {SystemLoadingInfoHelper} from '@/modules/common/components/loadingHelper';

export const actions: ActionTree<ISearchState, IRootState> = {
  getSearchResults({ state, commit, rootState , dispatch }, prm: any): any {
      dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(true) ,  { root: true });
      searchService.getSearchResults<any>().then((response) => {
          dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });

      }).catch(() => {
          dispatch('loading' , SystemLoadingInfoHelper.getLoadingInfo(false) ,  { root: true });
      });

  },
};
