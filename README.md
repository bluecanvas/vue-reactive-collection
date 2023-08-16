# vue-reactive-collection

## Installation

Reactive `Map` and `Set` for Vue 2 using [vue-demi](https://github.com/vueuse/vue-demi) plugin.

### NPM

```bash
$ npm i vue-reactive-collection
```

### Yarn

```bash
$ yarn add vue-reactive-collection
```

## Usage

```ts
import { defineComponent } from 'vue'
import { useReactiveSet, useReactiveMap } from 'vue-reactive-collection'

export default defineComponent({
  // ...
  setup() {
    const set = useReactiveSet()
    const map = useReactiveMap()

    return {
      set,
      map,
    }
  },
})
```

`set` and `map` will have the same methods as native `Set` and `Map`. They can be accessed via `.value` as you would do it with `ref`. The beauty of it is that they are completely reactive, so calling `set.value.add/delete/clear` or `map.value.set/delete/clear` will cause a template rerender.

## Motivation

One of the [Vue 2 drawbacks](https://github.com/vuejs/vue/issues/2410) is the lack of a first class support for `Map` and `Set`. Though it has been recently implemented in Vue 3. The purpose of this library is to allow the usage of `Map` and `Set` in Vue 2 as you would use them in Vue 3.

During Vue 3 migration `useReactiveSet` and `useReactiveMap` will be replaced with Vue `ref`.

```ts
const set = useReactiveSet()
```

will become

```ts
const set = ref(new Set())
```

That's it, that simple.

The idea was adopted from @inca [comment](https://github.com/vuejs/vue/issues/2410#issuecomment-318487855) in this [issue](https://github.com/vuejs/vue/issues/2410).

## Q&A

### How to pass an initial value

You can pass an initial value as you would it with native `Map` and `Set`.

```ts
const fruits = useReactiveSet(new Set(['apple', 'pear']))
const vegetables = useReactiveSet(['cabbage', 'onion'])
```

```ts
const fruits = useReactiveMap(
  new Map([
    ['apple', true],
    ['pear', true],
  ]),
)
const vegetables = useReactiveMap([
  ['cabbage', true],
  ['onion', true],
])
```

## Tests

```bash
npm test
```

## Build

```bash
npm run build
```

## License

[MIT](http://opensource.org/licenses/MIT)
