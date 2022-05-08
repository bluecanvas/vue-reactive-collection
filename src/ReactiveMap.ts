import type { MapConstructorArgument } from './types'

export default class ReactiveMap<K, V> extends Map<K, V> {
  constructor(
    private readonly onMutate: () => void,
    entries?: MapConstructorArgument<K, V>
  ) {
    super(entries)
  }

  set(key: K, value: V) {
    super.set(key, value)
    if (this.onMutate !== undefined) {
      this.onMutate()
    }
    return this
  }

  delete(key: K): boolean {
    const res = super.delete(key)
    this.onMutate()
    return res
  }

  clear() {
    super.clear()
    this.onMutate()
  }
}
