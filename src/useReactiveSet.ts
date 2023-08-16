import { ref, computed } from 'vue-demi'

import type { SetConstructorArgument } from './types'
import ReactiveSet from './ReactiveSet'

export default function useReactiveSet<T>(values?: SetConstructorArgument<T>) {
  function onMutate() {
    set.value = set.value
  }

  const inner = ref(new ReactiveSet<T>(onMutate, values))

  const set = computed<Set<T>>({
    get: () => {
      return inner.value
    },
    set: (set: Set<T>) => {
      inner.value = new ReactiveSet(onMutate, set)
    },
  })

  return set
}
