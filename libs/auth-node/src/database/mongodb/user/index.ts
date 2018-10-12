import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface IUserDocument extends Document {
  email: string;
  name: string;
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

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
  getVerifyToken(): string;
  getAccessToken(): string;
  getRefreshToken(): string;
  getResetPasswordToken(): string;
  toJSON(): any;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): boolean;
}

export const userSchema: Schema = new Schema({
  email: { type: String, index: { unique: true }, required: true },
  name: { type: String, index: { unique: true }, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  picture: { type: String },
  facebook: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String }
  },
  twitter: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String }
  },
  linkedin: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String }
  },
  google: {
    id: { type: String },
    token: { type: String },
    refreshToken: { type: String },
    code: { type: String },
    _raw: { type: String }
  }
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
  if (password === this.password) return true;

  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

userSchema.method('getVerifyToken', function(): string {
  const user = this;
  const token = jwt.sign(
    { id: user._id, grant: 'verify' },
    process.env.SECRET_TOKEN,
    {
      expiresIn: process.env.VERIFY_TOKEN_EXPIRES_IN
    }
  );
  return token;
});

userSchema.method('getAccessToken', function(): string {
  const user = this;
  const token = jwt.sign(
    { id: user._id, grant: 'access' },
    process.env.SECRET_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    }
  );
  return token;
});

userSchema.method('getRefreshToken', function(): string {
  const user = this;
  const token = jwt.sign(
    { id: user._id, grant: 'refresh' },
    process.env.SECRET_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    }
  );
  return token;
});

userSchema.method('getResetPasswordToken', function(): string {
  const user = this;
  const token = jwt.sign(
    { id: user._id, grant: 'reset' },
    process.env.SECRET_TOKEN,
    {
      expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN
    }
  );
  return token;
});

userSchema.method('toJSON', function(): any {
  const user = this.toObject();

  delete user.password;
  delete user._id;
  delete user.__v;
  delete user._v;

  ['facebook', 'twitter', 'linkedin', 'google'].forEach(i => {
    if (user[i]) user[i] = true;
  });

  console.log('user', user);

  return { user };

  // const { email, name, verified, picture } = this;

  // return { user: { email, name, verified, picture } };
});

userSchema.static(
  'hashPassword',
  (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
);

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
