<template>
  <vats-page :has-permission="true" @init="handlePass">
    <a-card> 12321 </a-card>
  </vats-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardIndex',
});
</script>

<script lang="ts" setup>
import { onActivated } from 'vue';
const handlePass = () => {
  console.log('触发了');
};

onActivated(() => {
  console.log('dsadas');
});
</script>

<style scoped lang="scss"></style>
