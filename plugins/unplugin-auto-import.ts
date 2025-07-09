import { RsbuildPlugin } from "@rsbuild/core";

export const pluginAutoImport = (): RsbuildPlugin => ({
  name: 'scope:auto-import',
  setup(api) {
    api.onBeforeBuild(() => {})
    api.onBeforeStartDevServer(() => {})
  }
})