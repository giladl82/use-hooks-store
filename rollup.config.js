import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';

console.log('ROLLUP!!!');

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    name: 'use-hooks-store'
  },
  plugins: [
    minify({
      comments: false,
      banner: '/* Created by Gilad Lev-Ari[giladl82@gmail.com] */',
      bannerNewLine: true,
      sourceMap: true
    }),
    external(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
};
