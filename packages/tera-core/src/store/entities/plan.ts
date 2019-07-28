import { Model } from '@vuex-orm/core';

export class Plan extends Model {
  static entity = 'plan';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      price: this.attr(null),
      category: this.attr(null),
      recommended: this.attr(false),
      defaultUrl: this.attr(null),
      level: this.attr(null),
      licenses: this.attr(null),
    };
  }
}
