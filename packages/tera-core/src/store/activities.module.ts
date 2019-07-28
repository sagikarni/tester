import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

import { Activity } from './entities';
import { gqlHttp } from '../gql-http';
import {
  LOAD_ACTIVITIES,
  UPSERT_ACTIVITY,
  REMOVE_ACTIVITY,
  FILTER_ACTIVITIES,
} from '../graphql/activities';

@Module({ dynamic: true, store, name: 'activities', namespaced: true })
export class Activities extends VuexModule {
  loaded = false;

  get activity() {
    return Activity;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    if (this.loaded) return;
    const { activityMany } = await gqlHttp(LOAD_ACTIVITIES);
    return await Activity.insertOrUpdate({ data: activityMany });
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async loadByFilter({ filter, perPage, page }) {
    const results = await gqlHttp(FILTER_ACTIVITIES, {
      filter,
      perPage,
      page,
    });

    console.log({ results });
    await Activity.insertOrUpdate({
      data: results.activityPagination.items,
    });
    return results;
  }

  @Action({ commit: 'UPSERT_ACTIVITY' })
  async add({ activity }) {
    const { activityUpdateOrCreate } = await gqlHttp(UPSERT_ACTIVITY, {
      collections: [activity],
    });

    return { activity: activityUpdateOrCreate[0] };
  }

  @Action({ commit: 'REMOVE_ACTIVITY' })
  async remove({ activity }) {
    const { activityRemoveOne } = await gqlHttp(REMOVE_ACTIVITY, {
      id: activity._id,
    });

    return { activity };
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }

  @Mutation
  private async UPSERT_ACTIVITY({ activity }) {
    await Activity.insertOrUpdate({ data: activity });
  }

  @Mutation
  private async REMOVE_ACTIVITY({ activity }) {
    await Activity.delete({ where: activity._id });
  }
}

export const ActivitiesModule = getModule(Activities);
