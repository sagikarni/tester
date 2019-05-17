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
import gql from 'graphql-tag';

import request from '../../utils/request';
import axios from 'axios';
import { print } from 'graphql';
import { chain } from 'lodash';

export interface ICategoryState {
  categories: any[];
  subCategories: any[];
}

@Module({ dynamic: true, store, name: 'categories' })
class Category extends VuexModule implements ICategoryState {
  public categories = [];
  public subCategories = [];

  @Action({ commit: 'SET_CATEGORIES' })
  async loadCategory() {
    const query = gql`
      {
        categoryMany {
          name
          _id
        }
        subCategoryMany {
          name
          _id
          category {
            _id
          }
        }
      }
    `;

    console.log({ query });

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
      },
    });

    const {
      categoryMany: category,
      subCategoryMany: subCategory,
    } = res2.data.data;

    return { category, subCategory };
    //    return res2.data.data.subCategoryMany;
  }

  @Action({ commit: 'REMOVE_CATEGORY' })
  async RemoveCategory({ id }) {
    const query = gql`
      mutation($id: MongoID!) {
        categoryRemoveOne(filter: { _id: $id }) {
          recordId
        }
      }
    `;

    console.log({ query });

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
        variables: {
          id,
        },
      },
    });

    debugger;

    return id;
  }

  @Action({ commit: 'REMOVE_SUBCATEGORY' })
  async RemoveSubCategory({ id }) {
    const query = gql`
      mutation($id: MongoID!) {
        subCategoryRemoveOne(filter: { _id: $id }) {
          recordId
        }
      }
    `;

    console.log({ query });

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
        variables: {
          id,
        },
      },
    });

    debugger;

    return id;
  }

  @Action({ commit: 'ADD_TO_CATEGORY' })
  async AddCategory({ category }) {
    const query = gql`
      mutation($record: CreateOneCategoryInput!) {
        categoryCreateOne(record: $record) {
          record {
            _id
            name
          }
        }
      }
    `;

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
        variables: {
          record: { name: category },
        },
      },
    });

    debugger;

    return res2.data.data.categoryCreateOne.record;
  }

  @Action({ commit: 'ADD_TO_SUBCATEGORY' })
  async AddSubCategory(opt) {
    const query = gql`
      mutation($record: CreateOneSubCategoryInput!) {
        subCategoryCreateOne(record: $record) {
          record {
            _id
            name
            category {
              name
              _id
            }
          }
        }
      }
    `;

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
        variables: {
          record: opt,
        },
      },
    });

    debugger;

    return res2.data.data.subCategoryCreateOne.record;
  }

  @Mutation
  private SET_CATEGORIES({ category, subCategory }) {
    this.subCategories = subCategory;
    this.categories = category;
  }

  @Mutation
  private ADD_TO_CATEGORY(raw: any) {
    this.categories = [...this.categories, raw];
  }

  @Mutation
  private ADD_TO_SUBCATEGORY(raw: any) {
    this.subCategories = [...this.subCategories, raw];
  }

  @Mutation
  private REMOVE_CATEGORY(id: any) {
    this.categories = this.categories.filter((c) => c._id !== id);
    debugger;
  }

  @Mutation
  private REMOVE_SUBCATEGORY(id: any) {
    this.subCategories = this.subCategories.filter((c) => c._id !== id);
    debugger;
  }
}

export const CategoryModule = getModule(Category);
