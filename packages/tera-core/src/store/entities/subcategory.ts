import { Model } from '@vuex-orm/core';
import { Category, CategoryModel } from './category';

export interface SubCategoryModel {
  _id?: string;
  name: string;
  category: CategoryModel;
  types: [];
}

export class SubCategory extends Model {
  static entity = 'subcategories';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      category: this.belongsTo(Category, 'category_id'),
      category_id: this.attr(''),
      types: this.attr(null),
    };
  }
}
