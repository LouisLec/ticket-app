/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

type ExtractArrayType<T, U extends keyof T> = T[U] extends Array<infer V>
  ? V
  : never;
type ExtractType<T, U extends keyof T> = T[U];
