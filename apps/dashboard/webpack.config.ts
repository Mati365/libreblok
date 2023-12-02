/* eslint-disable import/no-default-export */
import path from 'path';
import NodemonPlugin from 'nodemon-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { merge } from 'webpack-merge';
import * as dotenv from 'dotenv';

import type { Configuration } from 'webpack';
import { createWebpackCommonConfig } from '../../config/webpack.common';

dotenv.config();

const config: Configuration[] = [
  merge<Configuration>(
    createWebpackCommonConfig({ skipTypeCheck: true, skipEslint: true }),
    {
      entry: './src/client/index.tsx',
      output: {
        clean: true,
        filename: 'client-[contenthash].js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/dashboard/public/',
      },
      plugins: [
        new WebpackManifestPlugin({
          publicPath: '/dashboard/public/',
        }),
      ],
    },
  ),
  merge<Configuration>(
    createWebpackCommonConfig({ skipTypeCheck: true, skipEslint: true }),
    {
      target: 'node',
      entry: './src/server/index.ts',
      output: {
        clean: true,
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist/server'),
        publicPath: '/dashboard/public/',
      },
      optimization: {
        minimize: false,
      },
      plugins: [
        new NodemonPlugin({
          ignore: ['node_modules'],
          script: './dist/server/server.js',
        }),
      ],
    },
  ),
];

export default config;
