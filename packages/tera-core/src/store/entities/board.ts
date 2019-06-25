import { Model } from '@vuex-orm/core';

export class Board extends Model {
  static entity = 'board';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
    };
  }
}
