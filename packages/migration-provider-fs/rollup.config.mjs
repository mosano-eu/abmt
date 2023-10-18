import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const input = 'src/index.ts';

export default [
  {
    input,
    output: [
      {
        file: pkg.module,
        format: 'esm',
      },
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
    plugins: [
      globals(),
      builtins(),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
            target: 'es2016',
          },
        }),
      ),
    ],
  },
  {
    input,
    output: { file: pkg.types },
    plugins: [dts()],
  },
];
