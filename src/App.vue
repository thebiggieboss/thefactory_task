<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from "@/components/layouts/header-component.vue";

</script>

<template>
  <div class="default-layout">
    <div>
      <header-component />
      <RouterView />
    </div>
    <div></div> <!--foot-->
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
