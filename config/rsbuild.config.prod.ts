import { mergeRsbuildConfig } from '@rsbuild/core';
import defaultConfig from './rsbuild.config.default';
import { pluginSass } from '@rsbuild/plugin-sass';

export default mergeRsbuildConfig(defaultConfig, {
  mode: 'production',
  plugins: [
    pluginSass()
  ]
});
