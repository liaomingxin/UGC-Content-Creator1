<template>
  <div id="app">
    <!-- 标题部分 -->
    <h1 class="app-title">
      <span class="gradient-text">UGC-Content-Creator</span>
    </h1>

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

.app-title {
  text-align: center;
  margin: 20px 0;
}

.gradient-text {
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 700;
}
</style>
