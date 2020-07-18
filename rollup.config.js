import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import svelte from 'rollup-plugin-svelte'
import typescript from '@rollup/plugin-typescript'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'
import { createEnv, preprocess, readConfigFile } from 'svelte-ts-preprocess'

const env = createEnv()
const compilerOptions = readConfigFile(env)
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true,
  },
}
const mode = process.env.NODE_ENV
const dev = mode === 'development'
const dedupe = (importee) => importee === 'svelte' || importee.startsWith('svelte/')

const warningIsIgnored = (warning) => warning.message.includes(
  'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
) || warning.message.includes('Circular dependency: node_modules')

// Workaround for https://github.com/sveltejs/sapper/issues/1266
const onwarn = (warning, _onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message))
  || warningIsIgnored(warning)
  || console.warn(warning.toString())

const extensions = ['.ts', '.js', '.svelte', '.mjs']

export default {
  input: 'src/client.ts',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    replace({
      'process.browser': true,
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    scss(),
    svelte({
      dev,
      hydratable: true,
      emitCss: true,
      preprocess: preprocess(opts),
    }),
    resolve({
      browser: true,
      jsnext: true,
      extensions,
      dedupe,
    }),
    commonjs,
    typescript(),
    json(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: ['node_modules/@babel/**', 'src/node_modules/'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
          },
        ],
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    }),

    !dev
      && terser({
        module: true,
      }),
  ],
  preserveEntrySignatures: false,

  onwarn,
  watch: {
    clearScreen: false,
  },
}
