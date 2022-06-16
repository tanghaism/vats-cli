<template>
  <vats-provider :locale="localeMessage">
    <router-view />
  </vats-provider>
  <VueWaterMarker :content="watermarkTexts" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoot } from '@/store/root';
import VueWaterMarker from 'vue-watermarker';
import { useI18n } from 'vue-i18n';
import { ILangMapKey, loadMessage } from '@/utils/i18n';

const rootStore = useRoot();
const { setLocaleMessage, locale } = useI18n();

const localeMessage = ref(null);
const setLocale = async (lang: ILangMapKey) => {
  const { messages, antdMessage } = await loadMessage(lang);
  locale.value = lang;
  localeMessage.value = antdMessage.default;
  setLocaleMessage(lang, messages.default);
};

setLocale(rootStore.lang);

watch(
  () => rootStore.lang,
  newVal => {
    setLocale(newVal);
  },
);

const watermarkTexts = ref<string[]>([
  'welcome to use Vats',
  'Auth: TangHai',
  new Date().toLocaleString(),
]);

const setWatermarkTexts = () => {
  watermarkTexts.value = [...watermarkTexts.value.slice(0, 2), new Date().toLocaleString()];
  setTimeout(() => {
    setWatermarkTexts();
  }, 5000);
};

setWatermarkTexts();
</script>

<style lang="scss"></style>
