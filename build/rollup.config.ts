import path from 'path'
import { defineConfig } from 'rollup'
import common from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const FILE = {
  name: 'vue-reactive-collection',
  path: path.join(__dirname, '../src/index.ts'),
}

const DIST_DIR = 'dist'
const name = 'VueReactiveCollection'
const external = ['@vue/composition-api']
const globals = {
  '@vue/composition-api': 'VueCompositionAPI',
}
const plugins = [
  common(),
  resolve(),
  replace({
    'process.env.NODE_ENV': 'production',
    preventAssignment: true,
  }),
  typescript({
    tsconfig: './tsconfig.json',
  }),
]

export default [
  defineConfig({
    input: FILE.path,
    external,
    output: [
      {
        file: `${DIST_DIR}/${FILE.name}.js`,
        format: 'umd',
        globals,
        name,
      },
      {
        file: `${DIST_DIR}/${FILE.name}.common.js`,
        format: 'cjs',
      },
      {
        file: `${DIST_DIR}/${FILE.name}.esm.js`,
        format: 'esm',
      },
    ],
    plugins,
  }),
  defineConfig({
    input: FILE.path,
    external,
    output: {
      file: `${DIST_DIR}/${FILE.name}.min.js`,
      format: 'umd',
      globals,
      name,
    },
    plugins: [terser({ format: { comments: false } })].concat(plugins),
  }),
]
