import { mergeRsbuildConfig } from '@rsbuild/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import defaultConfig from './rsbuild.config.default';

export default mergeRsbuildConfig(defaultConfig, {
  mode: 'development',
  plugins: [
    pluginSass({
      sassLoaderOptions: {
        sourceMap: true,
        additionalData: (content) => {
          const $path = resolve(__dirname, '../src/assets/styles/variables.scss')
          const variables = readFileSync($path, 'utf8')
          return variables + content;
        }
      }
    })
  ],
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': './src'
    }
  }
});
