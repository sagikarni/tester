import { Model } from '@vuex-orm/core';

export class Domain extends Model {
  static entity = 'domains';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
    };
  }
}
