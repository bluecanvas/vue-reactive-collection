import VueCompositionApi, { defineComponent } from '@vue/composition-api'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import { useReactiveMap, useReactiveSet } from '../src'

describe('vue-reactive-collection', () => {
  let localVue = createLocalVue()
  localVue.use(VueCompositionApi)

  describe('useReactiveMap', () => {
    describe('should accept the same arguments as original Map', () => {
      it('when instance of Map is passed', () => {
        const m = new Map<string, string>()
        m.set('foo', 'bar')

        const map = useReactiveMap(m)

        expect(map.value.get('foo')).toBe('bar')
      })

      it('when entries are passed', () => {
        const map = useReactiveMap([['foo', 'bar']])

        expect(map.value.get('foo')).toBe('bar')
      })
    })

    it('exposed ref should be editable', () => {
      const map = useReactiveMap()

      map.value = new Map([['foo', 'bar']])

      expect(map.value.get('foo')).toBe('bar')
    })

    it('should trigger an update when Map#set method is called', async () => {
      const Component = defineComponent({
        setup() {
          const map = useReactiveMap<string, string>()

          function addItem() {
            map.value.set('foo', 'bar')
          }

          return {
            addItem,
            map,
          }
        },
        template:
          '<div><button type="button" @click="addItem">Add Item</button><ul><li v-for="([key, value]) in map" :key="key">{{ value }}</li></ul></div>',
      })
      const wrapper = shallowMount(Component, { localVue })

      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('li').text()).toBe('bar')
    })

    it('should trigger an update when Map#delete method is called', async () => {
      const Component = defineComponent({
        setup() {
          const m = new Map<string, string>()
          m.set('foo', 'bar')
          const map = useReactiveMap(m)

          function deleteItem() {
            map.value.delete('foo')
          }

          return {
            deleteItem,
            map,
          }
        },
        template:
          '<div><button type="button" @click="deleteItem">Delete Item</button><ul><li v-for="([key, value]) in map" :key="key">{{ value }}</li></ul></div>',
      })
      const wrapper = shallowMount(Component, { localVue })

      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('li').exists()).toBe(false)
    })

    it('should trigger an update when Map#clear method is called', async () => {
      const Component = defineComponent({
        setup() {
          const m = new Map<string, string>()
          m.set('foo', 'bar')
          const map = useReactiveMap(m)

          function clear() {
            map.value.clear()
          }

          return {
            clear,
            map,
          }
        },
        template:
          '<div><button type="button" @click="clear">Clear</button><ul><li v-for="([key, value]) in map" :key="key">{{ value }}</li></ul></div>',
      })
      const wrapper = shallowMount(Component, { localVue })

      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('li').exists()).toBe(false)
    })
  })

  describe('useReactiveSet', () => {
    describe('should accept the same arguments as original Set', () => {
      it('when instance of Set is passed', () => {
        const s = new Set<string>()
        s.add('foo')

        const set = useReactiveSet(s)

        expect(set.value.has('foo')).toBe(true)
      })

      it('when values are passed', () => {
        const set = useReactiveSet(['foo'])

        expect(set.value.has('foo')).toBe(true)
      })
    })

    it('exposed ref should be editable', () => {
      const set = useReactiveSet()

      set.value = new Set(['foo'])

      expect(set.value.has('foo')).toBe(true)
    })

    it('should trigger an update when Set#add method is called', async () => {
      const Component = defineComponent({
        setup() {
          const set = useReactiveSet<string>()

          function addItem() {
            set.value.add('foo')
          }

          return {
            addItem,
            set,
          }
        },
        template:
          '<div><button type="button" @click="addItem">Add Item</button><ul><li v-for="item in set" :key="item">{{ item }}</li></ul></div>',
      })
      const wrapper = shallowMount(Component, { localVue })

      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('li').text()).toBe('foo')
    })

    it('should trigger an update when Set#delete method is called', async () => {
      const Component = defineComponent({
        setup() {
          const s = new Set<string>()
          s.add('foo')
          const set = useReactiveSet(s)

          function deleteItem() {
            set.value.delete('foo')
          }

          return {
            deleteItem,
            set,
          }
        },
        template:
          '<div><button type="button" @click="deleteItem">Delete Item</button><ul><li v-for="item in set" :key="item">{{ item }}</li></ul></div>',
      })
      const wrapper = shallowMount(Component, { localVue })

      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('li').exists()).toBe(false)
    })

    it('should trigger an update when Set#clear method is called', async () => {
      const Component = defineComponent({
        setup() {
          const s = new Set<string>()
          s.add('foo')
          const set = useReactiveSet(s)

          function clear() {
            set.value.clear()
          }

          return {
            clear,
            set,
          }
        },
        template:
          '<div><button type="button" @click="clear">Clear</button><ul><li v-for="item in set" :key="item">{{ item }}</li></ul></div>',
      })
      const wrapper = shallowMount(Component, { localVue })

      wrapper.find('button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('li').exists()).toBe(false)
    })
  })
})
