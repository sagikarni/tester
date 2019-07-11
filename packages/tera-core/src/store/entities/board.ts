import { Model } from '@vuex-orm/core';
import { Activity } from './activity';

export class Board extends Model {
  static entity = 'board';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      user: this.attr(null),

      // items: this.hasMany(Activity, "activity_id")
      // items: this.hasMany(Activity, "activity_id") // this.attr([]),

      // activities: this.hasManyBy(Activity, "items")
      //      items: this.belongsTo(Activity, 'activity_id'),
      items: this.attr([]),
      // items: this.belongsTo(Activity, 'items_id'),
      // items_id: this.attr([]),

      // category: this.belongsTo(Category, 'category_id'),
      // category_id: this.attr(''),
    };
  }
}
