import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import type { Configuration, WebpackPluginInstance } from 'webpack';

export const isDevMode = () => process.env.NODE_ENV === 'development';

type CommonWebpackConfig = {
  declarations?: boolean;
  skipTypeCheck?: boolean;
  skipEslint?: boolean;
  extractStyles?: boolean;
};

export const createWebpackCommonConfig = ({
  declarations,
  skipTypeCheck,
  skipEslint,
  extractStyles,
}: CommonWebpackConfig = {}): Configuration => {
  const devMode = isDevMode();
  const plugins: WebpackPluginInstance[] = [
    ...(extractStyles
      ? [
          new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
            chunkFilename: '[id].css',
          }),
        ]
      : []),
  ];

  if (devMode) {
    if (!skipTypeCheck) {
      plugins.push(
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            memoryLimit: 4048,
          },
        }),
      );
    }

    if (!skipEslint) {
      plugins.push(
        new ESLintPlugin({
          extensions: ['.tsx', '.ts'],
          exclude: 'node_modules',
        }),
      );
    }
  }

  return {
    mode: devMode ? 'development' : 'production',
    watch: devMode,
    ...(devMode && {
      devtool: 'cheap-source-map',
    }),
    experiments: {},
    node: {
      __dirname: false,
      __filename: false,
      global: false,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|ico|gif|woff2|ttf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: !declarations,
              compilerOptions: {
                module: 'esnext',
                moduleResolution: 'node',
              },
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            ...(extractStyles ? [MiniCssExtractPlugin.loader] : []),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins,
  };
};
