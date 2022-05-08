import { ref, computed } from '@vue/composition-api'

import type { SetConstructorArgument } from './types'
import ReactiveSet from './ReactiveSet'

export default function useReactiveSet<T>(values?: SetConstructorArgument<T>) {
  const version = ref(1)

  function onMutate() {
    version.value += 1
  }

  const inner = ref(new ReactiveSet<T>(onMutate, values))

  const set = computed<Set<T>>({
    get: () => {
      // By using `version` we tell Vue that this property depends on it,
      // so it gets re-evaluated whenever `version` changes
      version.value
      return inner.value
    },
    set: (set: Set<T>) => {
      inner.value = new ReactiveSet(onMutate, set)
      version.value += 1
    },
  })

  return set
}
