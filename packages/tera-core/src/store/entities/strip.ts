import { Model } from '@vuex-orm/core';
import { Activity } from './activity';
import { ObjectID } from 'bson';

export class Strip extends Model {
  static entity = 'strips';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(new ObjectID()),
      name: this.attr(''),
      groups: this.attr([]),
      new: this.attr(null), // private
    };
  }
}
