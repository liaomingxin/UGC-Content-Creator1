<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <nav class="nav-bar">
      <!-- Logo -->
      <div class="nav-logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
        <span class="logo-text">{{ t('nav.title') }}</span>
      </div>

      <!-- 导航链接 -->
      <div class="nav-links">
        <button 
          :class="['nav-link', { active: activeTab === 'link' }]"
          @click="activeTab = 'link'"
        >
          {{ t('nav.linkGenerator') }}
        </button>
        <button 
          :class="['nav-link', { active: activeTab === 'style' }]"
          @click="activeTab = 'style'"
        >
          {{ t('nav.styleMimic') }}
        </button>
      </div>

      <!-- 右侧工具栏 -->
      <div class="nav-tools">
        <!-- 语言选择器 -->
        <select class="language-selector" v-model="currentLanguage" @change="changeLanguage">
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>

        <!-- 联系我们按钮 -->
        <button class="contact-button" @click="showContactInfo">
          {{ t('nav.contact') }}
        </button>
      </div>
    </nav>

    <!-- 添加弹窗组件 -->
    <div v-if="showContact" class="contact-modal-overlay" @click="closeContactModal">
      <div class="contact-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ t('nav.contact') }}</h3>
          <button class="close-button" @click="closeContactModal">&times;</button>
        </div>
        <div class="modal-content">
          <p class="contact-description">{{ t('nav.contactDescription') }}</p>
          <div class="contact-item">
            <span class="contact-label">{{ t('nav.contactEmail') }}:</span>
            <div class="copy-group">
              <span class="contact-value">3022097366@qq.com</span>
              <button class="copy-button" @click="copyEmail">
                {{ emailCopied ? t('common.copied') : t('common.copy') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <component :is="currentComponent" />
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import LinkStyleGenerator from './components/LinkStyleGenerator.vue'
import StyleMimicGenerator from './components/StyleMimicGenerator.vue'

export default {
  name: 'App',
  components: {
    LinkStyleGenerator,
    StyleMimicGenerator
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      activeTab: 'link',
      currentLanguage: 'en',
      showContact: false,
      emailCopied: false
    }
  },
  methods: {
    changeLanguage(event) {
      this.$i18n.locale = event.target.value
      this.currentLanguage = event.target.value
    },
    showContactInfo() {
      this.showContact = true
    },
    closeContactModal() {
      this.showContact = false
      this.emailCopied = false
    },
    async copyEmail() {
      try {
        await navigator.clipboard.writeText('3022097366@qq.com')
        this.emailCopied = true
        setTimeout(() => {
          this.emailCopied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
  },
  computed: {
    currentComponent() {
      return this.activeTab === 'link' ? 'LinkStyleGenerator' : 'StyleMimicGenerator'
    }
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}

#app {
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

  /* 添加新的样式 */
  .top-toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
  }

  /* 修改语言选择器样式 */
  .language-selector {
    padding: 8px 24px 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    background: white;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    min-width: 80px;
    width: fit-content;
  }

  .language-selector:hover {
    border-color: #007AFF;
  }

  .language-selector:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
  }

  /* 调整选项样式 */
  .language-selector option {
    padding: 8px;
  }

  /* 导航栏样式 */
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 64px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  /* Logo样式 */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-image {
    height: 32px;
    width: auto;
  }

  .logo-text {
    font-size: 1.2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* 导航链接样式 */
  .nav-links {
    display: flex;
    gap: 16px;
  }

  .nav-link {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #666;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .nav-link:hover {
    color: #007AFF;
    background: rgba(0, 122, 255, 0.1);
  }

  .nav-link.active {
    color: #007AFF;
    background: rgba(0, 122, 255, 0.1);
    font-weight: 500;
  }

  /* 右侧工具栏样式 */
  .nav-tools {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  /* 联系我们按钮样式 */
  .contact-button {
    padding: 8px 16px;
    border: 1px solid #007AFF;
    border-radius: 6px;
    background: white;
    color: #007AFF;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .contact-button:hover {
    background: #007AFF;
    color: white;
  }

  /* 添加弹窗相关样式 */
  .contact-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }

  .contact-modal {
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .contact-item {
    margin-bottom: 16px;
  }

  .contact-label {
    display: block;
    color: #666;
    margin-bottom: 4px;
  }

  .copy-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .contact-value {
    font-size: 1.1rem;
    color: #333;
  }

  .copy-button {
    padding: 4px 12px;
    border: 1px solid #007AFF;
    border-radius: 4px;
    background: white;
    color: #007AFF;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .copy-button:hover {
    background: #007AFF;
    color: white;
  }

  .contact-description {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
