import type { SetConstructorArgument } from './types'

export default class ReactiveSet<T> extends Set<T> {
  constructor(
    private readonly onMutate: () => void,
    values?: SetConstructorArgument<T>
  ) {
    super(values)
  }

  add(value: T) {
    super.add(value)
    if (this.onMutate !== undefined) {
      this.onMutate()
    }
    return this
  }

  delete(value: T): boolean {
    const res = super.delete(value)
    this.onMutate()
    return res
  }

  clear() {
    super.clear()
    this.onMutate()
  }
}
