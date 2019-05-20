import {
  Resolver,
  ResolveParams as GqlComposeResolveParams,
} from 'graphql-compose';
import { IMongooseUserRole } from '../mongodb';
import { getUserFromJwtToken, IJwtToken } from './index';
import { NoAnonymousAccessError, UnmetPermissionsError } from './auth-errors';

export interface IContext {
  jwt?: IJwtToken;
  user?: IMongooseUserRole;
}

export type ResolveParams = GqlComposeResolveParams<any, IContext>;

export interface IResolversMap {
  [resolverName: string]: Resolver<any, IContext>;
}

/**
 * Attaches the user to context.user if a JWT token is present in the request.
 * Anonymous access allowed.
 */
export function attachUser(resolvers: IResolversMap): IResolversMap {
  return wrapResolvers(resolvers, async ({ context }) => {
    if (context.user) {
      return;
    }
    if (context.jwt) {
      context.user = await getUserFromJwtToken(context.jwt);
    }
  });
}

/**
 * Requires that a JWT token is present in the request, and attaches the user to context.user.
 * Anonymous access not allowed.
 */
export function requireUser(resolvers: IResolversMap): IResolversMap {
  return wrapResolvers(resolvers, async ({ context }) => {
    if (isAnonymousContext(context)) {
      throw new NoAnonymousAccessError();
    }
    if (context.user) {
      return;
    }

    context.user = await getUserFromJwtToken(context.jwt);
  });
}

/**
 * Requires that the user has the required permission and attaches it to context.user.
 * Anonymous access not allowed.
 */
export function requirePermission(
  permission: string,
  resolvers: IResolversMap
): IResolversMap {
  return wrapResolvers(resolvers, async ({ context }) => {
    debugger;

    if (isAnonymousContext(context)) {
      throw new NoAnonymousAccessError();
    }

    const user = context.user || (await getUserFromJwtToken(context.jwt));

    if (!user.hasPermission(permission)) {
      throw new UnmetPermissionsError();
    }

    context.user = user;
  });
}

export function requireRule(
  permission: string,
  resolvers: IResolversMap
): IResolversMap {
  return wrapResolvers(resolvers, async ({ context }) => {
    debugger;

    const authorization = context.headers['authorization'];
    console.log({ authorization });
    const [type, token] = authorization.split(' ');

    const user = await getUserFromJwtToken(token);
    // context.headers["accept"]
    if (user.role.name !== 'admin') {
      throw 'not exxxx';
    }
    console.log('in rule!!!');
    debugger;

    // if (isAnonymousContext(context)) { throw new NoAnonymousAccessError(); }

    // const user = context.user || await getUserFromJwtToken(context.jwt);

    // if (!user.hasPermission(permission)) { throw new UnmetPermissionsError(); }

    // context.user = user;
  });
}

/**
 * Requires that the user has all of the required permissions and attaches it to context.user.
 * Anonymous access not allowed.
 */
export function requirePermissions(
  permissions: string[],
  resolvers: IResolversMap
): IResolversMap {
  return wrapResolvers(resolvers, async ({ context }) => {
    if (isAnonymousContext(context)) {
      throw new NoAnonymousAccessError();
    }

    const user = context.user || (await getUserFromJwtToken(context.jwt));

    if (!user.hasPermissions(...permissions)) {
      throw new UnmetPermissionsError();
    }

    context.user = user;
  });
}

function isAnonymousContext(context: any): boolean {
  return !context.jwt && !context.user;
}

function wrapResolvers(
  resolvers: IResolversMap,
  middleware: (resolveParams: any) => Promise<any>
): IResolversMap {
  Object.keys(resolvers).forEach((key) => {
    resolvers[key] = resolvers[key].wrapResolve((next) => {
      return async (resolveParams: any) => {
        await middleware(resolveParams);
        return next(resolveParams);
      };
    });
  });

  return resolvers;
}
