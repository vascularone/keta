import { Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export type User = {
  id: number
  name: string
  surname: string
}

export interface FetchState<T> {
  data?: T;
  loading: boolean;
  error: unknown;
}

export type Models = keyof typeof Prisma.ModelName;

type ArgsType<T extends Models> =
  Prisma.TypeMap['model'][T]['operations']['findMany']['args'];

export type WhereType<T extends Models> = NonNullable<ArgsType<T>['where']>;

type IsRelationship<T, K extends keyof T> = T[K] extends object ? (keyof T[K] extends keyof T ? true : false) : false;

export type SelectParam<T> = {
  [K in keyof Partial<T>]: IsRelationship<T, K> extends true
    ? { select: SelectParam<T[K]> }
    : boolean | SelectParam<T[K]>;
};

export type BodyParam<T> = {
  [K in keyof Partial<T>]: K extends keyof T ? T[K] : never;
}

export interface EncodedSelectParam<T, K extends Models> extends JwtPayload {
  select: SelectParam<T>
  where?: WhereType<K>
}

export interface EncodedBodyParam<T> extends JwtPayload {
  body?: BodyParam<T>
}

export type DecodedSelectParam<T, K extends Models> = Pick<EncodedSelectParam<T, K>, 'select' | 'where'>

export type DecodedBodyParam<T> = Exclude<EncodedBodyParam<T>, 'iat'>

export type FetchProperties<TModel, KModel extends Models> = {
  select: SelectParam<TModel>
  where?: WhereType<KModel>
}

export type PostProperties<T> = {
  body?: BodyParam<T>
}
// type AndType<T extends Models> = NonNullable<WhereType<T>['AND']>;
