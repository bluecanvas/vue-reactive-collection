import { ref, computed } from '@vue/composition-api'

import type { MapConstructorArgument } from './types'
import ReactiveMap from './ReactiveMap'

export default function useReactiveMap<K, V>(
  entires?: MapConstructorArgument<K, V>
) {
  const version = ref(1)

  function onMutate() {
    version.value += 1
  }

  const inner = ref(new ReactiveMap<K, V>(onMutate, entires))

  const map = computed<Map<K, V>>({
    get: () => {
      // By using `version` we tell Vue that this property depends on it,
      // so it gets re-evaluated whenever `version` changes
      version.value
      return inner.value
    },
    set: (map: Map<K, V>) => {
      inner.value = new ReactiveMap(onMutate, map)
      version.value += 1
    },
  })

  return map
}
