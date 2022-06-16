import { createI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { LANG } from '@/constants/storage';
import { Local } from '@/utils/storage';
import { Vats } from '@/types/vats.d';

// 项目语言
export type ILangMapKey = 'zh' | 'ja' | 'en';
// 各第三方依赖国际化语言
type ILangDependence = {
  antd: Vats.IAntdLang;
  dayjs: Vats.IDayjsLang;
};

const langMap: Record<ILangMapKey, ILangDependence> = {
  zh: {
    antd: 'zh_CN',
    dayjs: 'zh-cn',
  },
  ja: {
    antd: 'ja_JP',
    dayjs: 'ja',
  },
  en: {
    antd: 'en_US',
    dayjs: 'en',
  },
};

// 初始化
export function initI18n() {
  const lang = Local.get(LANG) ?? 'zh';
  return createI18n({
    legacy: false,
    globalInjection: true,
    useScope: 'global',
    locale: lang,
    fallbackLocale: 'zh',
    messages: {
      [lang]: require(`../locales/${lang}.ts`).default,
    },
  });
}

// 异步加载语言包的方法
export async function loadMessage(lang: ILangMapKey) {
  const arr = [
    import(
      /* webpackInclude: /(zh|ja|en)\.ts/ */ /* webpackChunkName: "locale-[request]" */ `@/locales/${lang}.ts`
    ),
    import(
      /* webpackInclude: /(ja_JP|zh_CN|en_US)\.js$/ */ /* webpackChunkName: "locale-[request]" */ `ant-design-vue/es/locale/${langMap[lang].antd}`
    ),
  ];
  if (lang !== 'en') {
    arr.push(
      import(
        /* webpackInclude: /(zh-cn|ja)\.js$/ */ /* webpackChunkName: "locale-[request]" */ `dayjs/locale/${langMap[lang].dayjs}`
      ),
    );
  }
  const [messages, antdMessage] = await Promise.all(arr);
  dayjs.locale(langMap[lang].dayjs);
  return {
    messages,
    antdMessage,
  };
}
