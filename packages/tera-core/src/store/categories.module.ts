import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

import {
  Category,
  SubCategory,
  CategoryModel,
  SubCategoryModel,
} from './entities';
import { gqlHttp } from '../gql-http';
import {
  LOAD_CATEGORIES,
  ADD_CATEGORY,
  ADD_SUBCATEGORY,
  REMOVE_CATEGORY,
  REMOVE_SUBCATEGORY,
} from '../graphql/categories';

@Module({ dynamic: true, store, name: 'categories', namespaced: true })
export class Categories extends VuexModule {
  loaded = false;

  get category() {
    return Category;
  }

  get subCategory() {
    return SubCategory;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    const { categoryMany, subCategoryMany } = await gqlHttp(LOAD_CATEGORIES);
    await Category.insertOrUpdate({ data: categoryMany });
    await SubCategory.insertOrUpdate({ data: subCategoryMany });
    return true;
  }

  @Action({ commit: 'UPSERT_CATEGORY' })
  async add({ category }: { category: CategoryModel }) {
    const { categoryCreateOne } = await gqlHttp(ADD_CATEGORY, {
      record: category,
    });

    return { category: categoryCreateOne.record };
  }

  @Action({ commit: 'UPSERT_SUBCATEGORY' })
  async addSubcategory({ subCategory }: { subCategory: SubCategoryModel }) {
    const { subCategoryCreateOne } = await gqlHttp(ADD_SUBCATEGORY, {
      record: subCategory,
    });

    return { subCategory: subCategoryCreateOne.record };
  }

  @Action({ commit: 'REMOVE_CATEGORY' })
  async remove({ category }) {
    const { categoryRemoveOne } = await gqlHttp(REMOVE_CATEGORY, {
      id: category._id,
    });

    return { category };
  }

  @Action({ commit: 'REMOVE_SUBCATEGORY' })
  async removeSubcategory({ subCategory }) {
    const { subCategoryRemoveOne } = await gqlHttp(REMOVE_SUBCATEGORY, {
      id: subCategory._id,
    });

    return { subCategory };
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }

  @Mutation
  private async UPSERT_CATEGORY({ category }) {
    await Category.insertOrUpdate({ data: category });
  }

  @Mutation
  private async UPSERT_SUBCATEGORY({ subCategory }) {
    await SubCategory.insertOrUpdate({ data: subCategory });
  }

  @Mutation
  private async REMOVE_CATEGORY({ category }) {
    await Category.delete({ where: category._id });
  }

  @Mutation
  private async REMOVE_SUBCATEGORY({ subCategory }) {
    await SubCategory.delete({ where: subCategory._id });
  }
}

export const CategoriesModule = getModule(Categories);
