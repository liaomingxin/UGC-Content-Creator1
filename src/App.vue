<template>
  <div id="app">

    <!-- 标题部分 -->
    <h1>💖 UGC 💕</h1>

    <LinkStyleGenerator />
  </div>
</template>

<script>
import LinkStyleGenerator from './components/LinkStyleGenerator.vue';

export default {
  name: 'App',
  components: {
    LinkStyleGenerator
  }
};
</script>

<style>
/* 引入全局样式 */
@import './styles/theme.css';
</style>
