type ExtractType<T, U extends keyof T> = T[U];
type ExtractArrayType<T, U extends keyof T> = T[U] extends Array<infer V>
  ? V
  : never;
