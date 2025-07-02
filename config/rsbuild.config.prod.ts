import { mergeRsbuildConfig } from '@rsbuild/core';
import defaultConfig from './rsbuild.config.default';

export default mergeRsbuildConfig(defaultConfig, {
  mode: 'production'
});
