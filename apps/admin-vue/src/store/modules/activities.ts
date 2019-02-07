import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import store from '@/store';

import request from '../../utils/request';

export interface IActivitiesState {
  categories: any[];
  activities: any[];
  domains: any;
}

@Module({ dynamic: true, store, name: 'activities' })
class Activities extends VuexModule implements IActivitiesState {
  public categories = [];
  public subcategories = [];
  public activities = [];

  public domains = {
    Learning: ['Plain', 'Facts', 'Questions'],
    Cognition: [
      'Categorization',
      'PhotoAssembly',
      'WhatsInThePicture',
      'MemoryCards',
      'WhatIsWrong',
      'Zoom',
      'SpotTheDifference',
      'ISee',
    ],
    Communication: ['Meaning', 'WHQuestions', 'GoodStory', 'SoundOfLifePhoto'],
  };

  public get types() {
    const { Learning, Cognition, Communication } = this.domains;

    const list = [...Learning, ...Cognition, ...Communication];
    return list;
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

  @Action({ commit: 'SET_ACTIVITIES' })
  public async LoadActivities() {
    const res = await request({
      url: '/api/v1/activities',
      method: 'get',
      baseURL: '',
    });

    return (res as any).activities;
  }

  @Mutation
  private SET_CATEGORIES(categories: any) {
    this.categories = categories;
  }

  @Mutation
  private SET_ACTIVITIES(activities: any) {
    this.activities = activities;

    let r = [];

    this.categories.forEach((a) => {
      r = [...r, ...a.subcategory];
    });

    this.subcategories = r;
  }
}

export const ActivitiesModule = getModule(Activities);