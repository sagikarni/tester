import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';
import { IUserRole } from './user-role';

// tslint:disable:only-arrow-functions

const BCRYPT_SALT_ROUNDS = 13; // strong, but not too much, ~1 hash/sec

export interface IUser {
  email?: string;
  name?: string;
  role?: IUserRole;
  password: string;
  verified: boolean;
  picture: string;
  facebook: {
    id: string;
    token: string;
    refreshToken: string;
    code: string;
    _raw: string;
  };
  twitter: {
    id: string;
    token: string;
    refreshToken: string;
    code: string;
    _raw: string;
  };
  linkedin: {
    id: string;
    token: string;
    refreshToken: string;
    code: string;
    _raw: string;
  };
  google: {
    id: string;
    token: string;
    refreshToken: string;
    code: string;
    _raw: string;
  };
}

export interface IMongooseUser extends IUser, Document {
  hasPermission(permission: string): boolean;
  hasPermissions(...permissions: string[]): boolean;

  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema({
  role: { type: Schema.Types.ObjectId, ref: 'UserRole' },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String },
  verified: { type: Boolean, default: false },
  picture: { type: String },
  facebook: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String },
  },
  twitter: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String },
  },
  linkedin: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String },
  },
  google: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String },
  },
});

UserSchema.pre('save', async function(this: Document, next): Promise<void> {
  const that: IMongooseUser = this as IMongooseUser;
  if (this.isNew || this.isModified('password')) {
    that.password = await that.hashPassword(that.password);
  }
  next();
});

UserSchema.methods.hashPassword = async function(
  this: IMongooseUser,
  password: string
): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

UserSchema.methods.verifyPassword = async function(
  this: IMongooseUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.hasPermission = function(
  this: IMongooseUser,
  permission: string
): boolean {
  return this.role.permissions.includes(permission);
};

UserSchema.methods.hasPermissions = function(
  this: IMongooseUser,
  ...permissions: string[]
): boolean {
  for (const permission of permissions) {
    if (!this.role.permissions.includes(permission)) {
      return false;
    }
  }

  return true;
};

export const User = mongoose.model<IMongooseUser>('User', UserSchema);
