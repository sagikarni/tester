import { Model } from '@vuex-orm/core';

export interface CategoryModel {
  _id?: string;
  name: string;
}

export class Category extends Model {
  static entity = 'categories';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
    };
  }
}
