import commonjs from 'rollup-plugin-commonjs';
import coffee from 'rollup-plugin-coffee-script';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';

export default {
  input: 'index.coffee',
  plugins: [
    autoExternal({
      builtins: true
    }),
    coffee(),
    nodeResolve({ extensions: ['.js', '.coffee'] }),
    commonjs({ extensions: ['.js', '.coffee'] }),
    json()
  ],
  output: {
    exports: 'named',
    file: pkg.main,
    format: 'cjs'
  },
  external: [
    'lodash/merge'
  ]
}
