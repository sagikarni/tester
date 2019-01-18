export * from './src';

export function simpleMiddleware(fn) {
  return (req, res, next) => {
    res.json(fn(req));
  };
}
