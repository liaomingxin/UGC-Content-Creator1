<template>
  <div id="app">
    <!-- 标题部分 -->
    <h1 class="app-title">
      <span class="gradient-text">UGC-Content-Creator</span>
    </h1>

    <!-- 导航切换 -->
    <div class="nav-tabs">
      <button 
        :class="['nav-tab', { active: activeTab === 'link' }]"
        @click="activeTab = 'link'"
      >
        链接生成
      </button>
      <button 
        :class="['nav-tab', { active: activeTab === 'style' }]"
        @click="activeTab = 'style'"
      >
        风格仿写
      </button>
    </div>

    <!-- 内容区域 -->
    <component :is="currentComponent" />
  </div>
</template>

<script>
import LinkStyleGenerator from './components/LinkStyleGenerator.vue';
import StyleMimicGenerator from './components/StyleMimicGenerator.vue';

export default {
  name: 'App',
  components: {
    LinkStyleGenerator,
    StyleMimicGenerator
  },
  data() {
    return {
      activeTab: 'link'
    };
  },
  computed: {
    currentComponent() {
      return this.activeTab === 'link' ? 'LinkStyleGenerator' : 'StyleMimicGenerator';
    }
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

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0 30px;
}

.nav-tab {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.nav-tab.active {
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}
</style>
