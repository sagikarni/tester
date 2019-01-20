declare namespace Express {
  export interface Request {
    strategyResponse?: any;
    userExist?: boolean;
    user?: any;
  }
}
