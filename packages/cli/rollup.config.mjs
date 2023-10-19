import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import pkg from './package.json' assert { type: 'json' };

const input = 'src/cli.ts';

export default [
  {
    input,
    output: [
      {
        file: pkg.bin.abmf,
        format: 'cjs',
      },
    ],
    plugins: [
      globals(),
      builtins(),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          minify: true,
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
];
