/* eslint-disable import/no-default-export */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import * as dotenv from 'dotenv';

import type { Configuration } from 'webpack';
import { createWebpackCommonConfig } from '../../config/webpack.common';

dotenv.config();

export default merge<Configuration>(
  createWebpackCommonConfig({
    skipTypeCheck: true,
    skipEslint: true,
    extractStyles: true,
  }),
  {
    entry: './src/index.tsx',
    output: {
      clean: true,
      filename: 'client-[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Libreblok',
      }),
    ],
  },
);
