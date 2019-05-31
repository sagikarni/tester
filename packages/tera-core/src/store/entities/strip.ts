import { Model } from '@vuex-orm/core';
import { Activity } from './activity';

const getObjectId = () => {
  const ObjectId = (
    m = Math,
    d = Date,
    h = 16,
    s = (s) => m.floor(s).toString(h)
  ) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  return ObjectId;
};

export class Strip extends Model {
  static entity = 'strips';

  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.attr(getObjectId()),
      name: this.attr(''),
      groups: this.attr([]),
      new: this.attr(null), // private
    };
  }
}
