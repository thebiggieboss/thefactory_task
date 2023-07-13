<script setup>

import HeaderComponent from "@/components/layouts/header-component.vue";
</script>

<template>
  <div class="default-layout">
    <header-component />
  </div>
</template>

<style scoped>
.default-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  height: 100%;
}
</style>