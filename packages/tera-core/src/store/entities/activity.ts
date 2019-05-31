import { Model } from '@vuex-orm/core';
import { ActivityType } from './activity-type';
import { Category } from './category';
import { SubCategory } from './subcategory';

export class Activity extends Model {
  static entity = 'activities';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      type: this.belongsTo(ActivityType, 'type_id'),
      type_id: this.attr(''),
      category: this.belongsTo(Category, 'category_id'),
      category_id: this.attr(''),
      subCategory: this.belongsTo(SubCategory, 'subCategory_id'),
      subCategory_id: this.attr(''),
      level: this.attr(null),
      description: this.attr(null),
      free: this.attr(null),
      printable: this.attr(null),
      editorial: this.attr(null),
      notes: this.attr(null),
      orientation: this.attr(null),
      mediaType: this.attr(null),
      status: this.attr(null),
      audience: this.attr(null),
      isolate: this.attr(null),
      metadata: this.attr(null),
    };
  }
}
