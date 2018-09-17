import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
  verified: boolean;
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
  getConfirmToken(): string;
  getAccessToken(): string;
  getRefreshToken(): string;
  toJSON(): any;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
}

export const userSchema: Schema = new Schema({
  email: { type: String, index: { unique: true }, required: true },
  name: { type: String, index: { unique: true }, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false }
});

userSchema.pre('save', function(next) {
  const user = this as IUser;
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      return next();
    });
  });
});

userSchema.method('comparePassword', function(password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

userSchema.method('getConfirmToken', function(): string {
  const user = this;
  const token = jwt.sign({ id: user._id, grant: 'confirm' }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.CONFIRM_TOKEN_EXPIRES_IN
  });
  return token;
});

userSchema.method('getAccessToken', function(): string {
  const user = this;
  const token = jwt.sign({ id: user._id, grant: 'access' }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
  });
  return token;
});

userSchema.method('getRefreshToken', function(): string {
  const user = this;
  const token = jwt.sign({ id: user._id, grant: 'refresh' }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
  });
  return token;
});

userSchema.method('getResetPasswordToken', function(): string {
  const user = this;
  const token = jwt.sign({ id: user._id, grant: 'reset' }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
  });
  return token;
});

userSchema.method('toJSON', function(): any {
  const { email, name, verified } = this;

  return { user: { email, name, verified } };
});

userSchema.static(
  'hashPassword',
  (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
);

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
