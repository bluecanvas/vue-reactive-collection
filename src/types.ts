export type MapConstructorArgument<K, V> =
  | readonly (readonly [K, V])[]
  | null
  | Map<K, V>

export type SetConstructorArgument<T> = readonly T[] | null | Set<T>
