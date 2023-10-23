import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import replace from '@rollup/plugin-replace';
import pkg from './package.json' assert { type: 'json' };
import { chmod } from 'node:fs/promises'

const input = 'src/cli.ts';

export default [
  {
    input,
    output: [
      {
        file: pkg.bin.abmt,
        format: 'cjs',
      }
    ],
    plugins: [
      globals(),
      builtins(),
      replace({
        PKG_VERSION: pkg.version,
      }),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          minify: false,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
            target: 'es5',
          },
        }),
      ),
      makeOutputExecutablePlugin()
    ],
  },
];



function makeOutputExecutablePlugin() {
  return {
        name: 'writeBundle',
        writeBundle: {
          sequential: true,
          order: 'post',
          async handler({ file}) {
            await chmod(file, 0o755);
          }
        }
      }
}