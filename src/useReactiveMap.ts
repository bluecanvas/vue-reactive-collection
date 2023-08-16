import { ref, computed } from 'vue-demi'

import type { MapConstructorArgument } from './types'
import ReactiveMap from './ReactiveMap'

export default function useReactiveMap<K, V>(
  entires?: MapConstructorArgument<K, V>
) {
  function onMutate() {
    map.value = map.value
  }

  const inner = ref(new ReactiveMap<K, V>(onMutate, entires))

  const map = computed<Map<K, V>>({
    get: () => {
      return inner.value
    },
    set: (map: Map<K, V>) => {
      inner.value = new ReactiveMap(onMutate, map)
    },
  })

  return map
}
