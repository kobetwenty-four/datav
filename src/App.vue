<template>
  <div class="app">
    <dv-full-screen-container>
      <router-view />
    </dv-full-screen-container>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { provide } from 'vue'
provide('echarts', echarts)
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}
</style>
