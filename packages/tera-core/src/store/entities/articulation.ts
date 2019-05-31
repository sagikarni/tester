import { Model } from '@vuex-orm/core';

export class Articulation extends Model {
  static entity = 'articulations';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      display: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      notes: this.attr(''),
      metadata: this.attr(null),
    };
  }
}
