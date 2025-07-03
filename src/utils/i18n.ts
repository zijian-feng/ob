import resources from '@/locales';
import i18n, { type Module } from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

i18n
  .use(detector) // 自动检测语言
  .use(reactI18nextModule as Module) // 绑定 react-i18next 模块

  .init({
    resources,
    fallbackLng: 'zh-CN', // 回退语言
    keySeparator: false, // 不使用 key 分隔符
    interpolation: {
      escapeValue: false, // 不转义
    }
  });
  
export default i18n;