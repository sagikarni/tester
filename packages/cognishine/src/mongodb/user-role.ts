import mongoose, { Document, Schema } from 'mongoose';

export interface IUserRole {
  name?: string;
  permissions?: string[];
  isDefault?: boolean;
}

export interface IMongooseUserRole extends IUserRole, Document {}

const UserRoleSchema = new Schema({
  name: { type: String, unique: true, index: true },

  permissions: { type: [String] },

  isDefault: { type: Boolean, default: false },
});

export const UserRole = mongoose.model<IMongooseUserRole>(
  'UserRole',
  UserRoleSchema
);
