declare namespace Express {
  export interface Request {
    fromStrategy?: any;
    userExist?: boolean;
    user?: any;
  }
}
