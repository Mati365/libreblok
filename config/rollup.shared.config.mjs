import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';

export const createPackageRollupConfig = ({ input }) => ({
  input,
  external: [/node_modules/],
  cache: false,
  output: [
    {
      file: './dist/cjs/index.js',
      format: 'cjs',
    },
    {
      dir: './dist/esm',
      format: 'esm',
      preserveModules: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2022',
          moduleResolution: 'node',
          declaration: true,
        },
        include: ['src/'],
        exclude: ['node_modules/', '**/*.test.tsx', '**/*.test.ts'],
      },
    }),
    resolve({
      moduleDirectories: ['node_modules'],
    }),
  ],
});
