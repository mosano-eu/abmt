import register from '@swc/register';

register({
  sourceMaps: true,
  module: {
    type: 'commonjs',
  },
  jsc: {
    target: 'esnext',
    keepClassNames: true,
    loose: true,
    parser: {
      syntax: 'typescript',
      dynamicImport: true,
    },
  },
});
