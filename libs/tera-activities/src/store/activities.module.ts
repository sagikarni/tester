import { getActivity, pinActivity } from '../services/activity.service';
// import { ActivitiesManagerService } from '../services/activities-manager.service';

import {
  GET_ACTIVITY,
  UPDATE_SESSION_INFO_TYPE,
  EXECUTE_ACTIVITY,
  UPDATE_ACTIVITY,
  PIN_ACTIVITY,
} from './actions.type';

import {
  UPDATE_ACTIVITIES,
  UPDATE_SELECTED_SESSION_INFO_ID,
  UPDATE_SELECTED_SESSION_INFO_DESC,
  UPDATE_ACTIVITY_IS_PINNED,
} from './mutations.type';

const state = {
  activity: null,
};

const getters = {
  activityState(state: any) {
    return state.activity;
  },
  currentActivity(state: any) {
    return state.activity;
  },
};

const actions = {
  [GET_ACTIVITY](context: any, { activity }: any) {
    return getActivity(activity).then((response: any) => {
      context.commit(UPDATE_ACTIVITIES, { activity: response.data });
      return response;
    });
  },
  [PIN_ACTIVITY](context: any, { activity, pin }: any) {
    return pinActivity(activity, pin)
      .then((response: any) => {
        context.commit(UPDATE_ACTIVITY_IS_PINNED, { isPinned: pin }); // TODO here we need to add response from backend
        return response;
      })
      .catch(reject => {
        return reject;
      });
  },
  [UPDATE_SESSION_INFO_TYPE](context: any, { selectedSessionInfo }: any) {
    if (selectedSessionInfo) {
      context.commit(UPDATE_SELECTED_SESSION_INFO_ID, {
        selectedSessionInfoId: selectedSessionInfo.id,
      });
      context.commit(UPDATE_SELECTED_SESSION_INFO_DESC, {
        selectedSessionInfoDesc: selectedSessionInfo.description,
      });
    }
  },
  [UPDATE_ACTIVITY](context: any, { activity }: any) {
    context.commit(UPDATE_ACTIVITIES, { activity });
  },
  [EXECUTE_ACTIVITY](context: any) {
    // return ActivitiesManagerService.ExecuteActivity(state);
  },
};

const mutations = {
  [UPDATE_ACTIVITIES](state: any, payload: any) {
    state.activity = payload.activity;
  },
  [UPDATE_SELECTED_SESSION_INFO_ID](state: any, payload: any) {
    if (state.activity && state.activity.details) {
      state.activity.details.selectedSessionInfoId =
        payload.selectedSessionInfoId;
    }
  },
  [UPDATE_SELECTED_SESSION_INFO_DESC](state: any, payload: any) {
    if (state.activity && state.activity.details) {
      state.activity.details.selectedSessionInfoDesc =
        payload.selectedSessionInfoDesc;
    }
  },
  [UPDATE_ACTIVITY_IS_PINNED](state: any, payload: any) {
    if (state.activity && state.activity.details) {
      state.activity.details.isPinned = payload.isPinned;
    }
  },
};

export const activities = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
