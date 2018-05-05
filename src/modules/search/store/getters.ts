import {GetterTree} from 'vuex';
import {ISearchState} from './types';
import {IRootState} from '../../common/store/types';

export const getters: GetterTree<ISearchState, IRootState> = {
    fullName(state): string {
        return '';
    },
};
