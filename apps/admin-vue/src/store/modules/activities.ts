import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { flatten, values } from 'lodash';

import request from '../../utils/request';

export interface IActivitiesState {
  categories: any[];
  activities: any[];
  domains: any[];
}

@Module({ dynamic: true, store, name: 'activities' })
class Activities extends VuexModule implements IActivitiesState {
  public categories = [];
  public subcategories = [];
  public activities = [];
  public domains = [];
  public collections = [];

  public get domainsKeys() {
    return Object.keys(this.domains);
  }

  public get types() {
    return flatten(this.domainsKeys.map((k) => this.domains[k]));
  }

  @Action({ commit: 'SET_COLLECTIONS' })
  public async LoadCollections() {
    const res = await request({
      url: '/api/v1/collections',
      method: 'get',
      baseURL: '',
    });

    return (res as any).collections;
  }

  @Action({ commit: 'REMOVE_ACTIVITY' })
  public async RemoveActivity(id) {
    return id;
  }

  @Action({ commit: 'ADD_ACTIVITY' })
  public async AddActivity(activity) {
    return activity;
  }

  @Action({ commit: 'UPDATE_ACTIVITY' })
  public async UpdateActivity(activity) {
    return activity;
  }

  @Action({ commit: 'SET_CATEGORIES' })
  public async LoadCategories() {
    const res2 = await request({
      url: `/api/v1/categories`,
      method: 'get',
      baseURL: '',
    });

    return (res2 as any).categories;
  }

  @Action({ commit: 'SET_CATEGORIES' })
  public async AddCategory({ category }) {
    const res2 = await request({
      url: `/api/v1/categories`,
      method: 'post',
      baseURL: '',
      data: { category },
    });

    return (res2 as any).categories;
  }

  @Action({ commit: 'SET_CATEGORIES' })
  public async RemoveCategory({ name }) {
    const res2 = await request({
      url: `/api/v1/categories`,
      method: 'delete',
      baseURL: '',
      data: { name },
    });

    return (res2 as any).categories;
  }

  @Action({ commit: 'SET_CATEGORIES' })
  public async RemoveSubCategory({ name }) {
    const res2 = await request({
      url: `/api/v1/categories/sub`,
      method: 'delete',
      baseURL: '',
      data: { name },
    });

    return (res2 as any).categories;
  }

  @Action({ commit: 'SET_CATEGORIES' })
  public async AddSubCategory({ name, category }) {
    const res2 = await request({
      url: `/api/v1/categories/sub`,
      method: 'post',
      baseURL: '',
      data: { name, category },
    });

    return (res2 as any).categories;
  }

  @Action({ commit: 'SET_ACTIVITIES' })
  public async LoadActivities() {
    const res = await request({
      url: '/api/v1/activities',
      method: 'get',
      baseURL: '',
    });

    return (res as any).activities;
  }

  @Action({ commit: 'SET_DOMAINS' })
  public async LoadDomains() {
    const res = await request({
      url: '/api/v1/domains',
      method: 'get',
      baseURL: '',
    });

    return (res as any).domains;
  }

  @Mutation
  private ADD_ACTIVITY(activity: any) {
    this.activities.push(activity);
  }

  @Mutation
  private UPDATE_ACTIVITY(activity: any) {
    const i = this.activities.findIndex((s) => s._id === activity._id);
    this.activities[i] = activity;
    // this.activities.push(activity);
  }

  @Mutation
  private SET_CATEGORIES(categories: any) {
    this.categories = categories;

    let r = [];

    this.categories.forEach((a) => {
      r = [...r, ...a.subcategory];
    });

    console.log({ r });
    this.subcategories = r;
  }

  @Mutation
  private SET_DOMAINS(domains: any) {
    this.domains = domains;
  }

  @Mutation
  private REMOVE_ACTIVITY(id: any) {
    this.activities = this.activities.filter((f) => f._id !== id);
  }

  @Mutation
  private SET_ACTIVITIES(activities: any) {
    this.activities = activities;
  }

  @Mutation
  private SET_COLLECTIONS(collections: any) {
    this.collections = collections;
  }
}

export const ActivitiesModule = getModule(Activities);
