import { searchService } from '../searchService';
import { SystemLoadingInfoHelper } from '@/modules/common/components/loadingHelper';
export const actions = {
    getSearchResults({ state, commit, rootState, dispatch }, prm) {
        dispatch('loading', SystemLoadingInfoHelper.getLoadingInfo(true), { root: true });
        searchService.getSearchResults().then((response) => {
            dispatch('loading', SystemLoadingInfoHelper.getLoadingInfo(false), { root: true });
        }).catch(() => {
            dispatch('loading', SystemLoadingInfoHelper.getLoadingInfo(false), { root: true });
        });
    },
};
//# sourceMappingURL=actions.js.map