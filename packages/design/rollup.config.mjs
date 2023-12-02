/* eslint-disable import/no-default-export, import/extensions */
import postcss from 'rollup-plugin-postcss';
import { merge } from 'webpack-merge';
import { createPackageRollupConfig } from '../../config/rollup.shared.config.mjs';

export default merge(
  createPackageRollupConfig({
    input: 'src/index.tsx',
  }),
  {
    plugins: [
      postcss({
        modules: true,
        extract: true,
        minimize: true,
        sourceMap: true,
        use: ['sass'],
      }),
    ],
  },
);
