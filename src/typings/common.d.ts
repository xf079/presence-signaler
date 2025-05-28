type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Recordable<T = any> = Record<string, T>;
type Indexable<T = any> = {
  [key: string]: T;
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>;
};
