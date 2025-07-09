# 按需自动导入组件插件

这个插件用于智能分析代码中实际使用的组件，并按需生成导入和注册代码，避免不必要的组件加载。

## 功能特性

- 🚀 按需扫描和注册组件
- 📦 智能分析组件使用情况
- 🔧 支持开发和生产环境
- 💡 智能识别组件注册方式
- 🔄 开发模式下实时监听文件变化
- ⚡ 支持动态组件注册
- 📊 详细的使用统计信息

## 工作原理

1. 扫描 `src/components` 目录下的所有可用组件
2. 分析源码文件，检测实际使用的组件（通过自定义标签或直接导入）
3. 只为被使用的组件生成注册代码
4. 提供懒加载机制，支持运行时动态注册
5. 开发模式下监听文件变化，实时更新组件注册

## 支持的组件格式

### 方式一：导出 install 函数

```tsx
// src/components/MyComponent/index.tsx
export default function MyComponent() {
  return <trove-my-component>My Component</trove-my-component>
}

export const install = () => {
  const CustomComponent = defineCustomElement(MyComponent, ['prop1', 'prop2'])
  customElements.define('trove-my-component', CustomComponent)
}
```

### 方式二：直接定义 customElements

```tsx
// src/components/MyComponent/index.tsx
export default function MyComponent() {
  return <div>My Component</div>
}

// 直接定义
const CustomComponent = defineCustomElement(MyComponent, ['prop1'])
customElements.define('trove-my-component', CustomComponent)
```

## 组件使用检测

插件会通过以下方式检测组件是否被使用：

### 1. 自定义元素标签使用

```tsx
// 在 JSX 中使用自定义标签
function App() {
  return (
    <div>
      <trove-checkbox label="选项1" value="option1" />
      <trove-steps name="步骤" />
    </div>
  )
}
```

### 2. 直接导入组件

```tsx
// 直接导入组件
import Checkbox from '@/components/Checkbox'
import { install } from '@/components/Steps'

// 使用组件
install()
```

## 使用方法

### 1. 配置插件

在 rsbuild 配置中引入插件：

```ts
// config/rsbuild.config.default.ts
import { pluginAutoImport } from '../plugins/unplugin-auto-import'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginAutoImport()
  ]
})
```

### 2. 引入自动生成的文件

在入口文件中导入自动生成的文件：

```ts
// src/index.tsx
import './auto-import-components'
```

### 3. 动态注册组件（可选）

如果需要在运行时动态注册组件：

```ts
import { registerComponent, componentRegistry } from './auto-import-components'

// 动态注册单个组件
registerComponent('Checkbox')

// 查看所有可用组件
console.log('可用组件:', Array.from(componentRegistry.keys()))
```

## 生成的文件示例

插件会在 `src/auto-import-components.ts` 生成类似以下内容：

```ts
// 此文件由 unplugin-auto-import 自动生成，请勿手动修改
import { install as installCheckbox } from '@/components/Checkbox';

// 按需注册组件映射
const componentRegistry = new Map<string, () => void>();

componentRegistry.set('Checkbox', async () => {
  const { install } = await import('@/components/Checkbox');
  install();
});

componentRegistry.set('Steps', async () => {
  await import('@/components/Steps');
});

// 按需注册已使用的组件
export function registerUsedComponents() {
  installCheckbox();
}

// 动态注册组件（用于运行时按需加载）
export function registerComponent(componentName: string) {
  const register = componentRegistry.get(componentName);
  if (register) {
    register();
    console.log(`✅ 动态注册组件: ${componentName}`);
  } else {
    console.warn(`⚠️ 组件 ${componentName} 不存在或未配置`);
  }
}

// 自动执行注册
registerUsedComponents();

// 导出组件注册表供外部使用
export { componentRegistry };
```

## 开发体验

### 控制台输出

插件会在控制台输出有用的信息：

```
✅ 按需导入组件文件已生成: /path/to/src/auto-import-components.ts
📊 检测到 2 个组件被使用: Checkbox, Steps
🔄 检测到文件变化，重新分析组件使用情况...
✅ 动态注册组件: NewComponent
```

### 实时更新

在开发模式下，插件会监听源码文件的变化：
- 当你在代码中新增或删除组件使用时
- 插件会自动重新分析并更新注册代码
- 无需手动重启开发服务器

## 性能优势

- **减少初始加载**: 只注册实际使用的组件
- **按需加载**: 支持运行时动态加载未使用的组件
- **智能缓存**: 避免重复分析和注册
- **开发友好**: 实时监听文件变化，无需重启

## 注意事项

- 生成的 `auto-import-components.ts` 文件请勿手动修改
- 组件目录结构应为 `src/components/ComponentName/index.tsx`
- 建议将 `auto-import-components.ts` 添加到 `.gitignore` 中
- 自定义元素标签名需要在组件文件中明确定义
- 插件会递归扫描所有 `.tsx` 和 `.ts` 文件来检测组件使用

## 故障排除

### 组件未被检测到

1. 确保组件文件路径正确：`src/components/ComponentName/index.tsx`
2. 检查自定义元素标签名是否正确定义
3. 确保在代码中使用了正确的标签名或导入语句

### 开发模式下文件监听不工作

1. 确保 `chokidar` 依赖已正确安装
2. 检查文件权限和路径访问权限
3. 查看控制台是否有相关错误信息