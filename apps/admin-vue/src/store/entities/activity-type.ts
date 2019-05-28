import { Model } from '@vuex-orm/core';
import { Domain } from './domain';

export class ActivityType extends Model {
  static entity = 'activity-types';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      domain: this.belongsTo(Domain, 'domain_id'),
      domain_id: this.attr(''),
    };
  }
}
