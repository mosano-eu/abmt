// import globals from 'rollup-plugin-node-globals';
// import builtins from 'rollup-plugin-node-builtins';
// import typescript from '@rollup/plugin-typescript';
// import commonjs from '@rollup/plugin-commonjs';
// import terser from '@rollup/plugin-terser';
// import pkg from './package.json' assert { type: 'json' };

// const minifiedOutputs = [
//   {
//     file: pkg.exports['.'].import,
//     format: 'esm',
//   },
//   {
//     file: pkg.exports['.'].require,
//     format: 'cjs',
//   },
// ];

// const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
//   ...rest,
//   file: file.replace('.min.', '.'),
//   plugins: [terser()],
// }));

// export default {
//   input: 'src/index.ts',
//   output: [...unminifiedOutputs, ...minifiedOutputs],
//   plugins: [globals(), builtins(), commonjs(), typescript()],
// };

export default [];
