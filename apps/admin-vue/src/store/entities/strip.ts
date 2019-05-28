import { Model } from '@vuex-orm/core';
import { Activity } from './activity';

export class Strip extends Model {
  static entity = 'strips';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      groups: this.attr(null),
    };
  }
}
