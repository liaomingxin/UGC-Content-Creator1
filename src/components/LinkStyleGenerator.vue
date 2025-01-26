<template>
  <div class="container">
    <div class="card">
      <!-- 添加页面标题和说明 -->
      <div class="page-header">
        <h1 class="page-title">{{ t('link.pageTitle') }}</h1>
        <div class="page-description">
          <div class="description-wrapper">
            <p class="description-text">
              {{ t('link.pageDescription') }}
              <span class="how-to-use-text" @click="showSteps = true">
                {{ t('link.howToUse') }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- 步骤说明弹窗 -->
      <div v-if="showSteps" class="steps-modal-overlay" @click="showSteps = false">
        <div class="steps-modal" @click.stop>
          <div class="modal-header">
            <h3>{{ t('link.stepsTitle') }}</h3>
            <button class="close-button" @click="showSteps = false">&times;</button>
          </div>
          <div class="modal-content">
            <ol class="steps-list">
              <li>{{ t('link.step1') }}</li>
              <li>{{ t('link.step2') }}</li>
              <li>{{ t('link.step3') }}</li>
              <li>{{ t('link.step4') }}</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- 加载状态遮罩层 -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-content">
          <div class="spinner"></div>
          <p class="loading-text">{{ loadingText }}</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- 链接输入区域 -->
      <div class="link-input-container">
        <div class="step-hint">
          <em>{{ t('link.hint.step1') }}</em>
        </div>
        <div class="group">
          <input 
            v-model="productUrl"
            required
            type="text"
            :placeholder="t('link.urlPlaceholder')"
            class="peer"
          >
          <button 
            @click="crawlProduct"
            :disabled="loading"
            class="action-button"
          >
            {{ t('link.button.crawl') }}
          </button>
        </div>
      </div>

      <!-- 修改商品信息和生成选项的父容器 -->
      <div class="operation-wrapper">
        <!-- 商品信息操作区域 -->
        <div class="operation-area">
          <!-- 添加提示信息区域 -->
          <div class="info-hint">
            <template v-if="!hasTriedCrawling">
              <em>{{ t('link.hint.step2.initial') }}</em>
            </template>
            <template v-else>
              <em v-if="crawlFailed">{{ t('link.hint.step2.failed') }}</em>
              <em v-else-if="hasIncompleteInfo">{{ getMissingInfoHint }}</em>
              <em v-else>{{ t('link.hint.step2.success') }}</em>
            </template>
          </div>

          <!-- 商品信息编辑区 -->
          <div class="config-section">
            <div class="input-row">
              <label class="option-label">{{ t('link.productInfo.title') }}</label>
              <input 
                v-model="productInfo.title" 
                :placeholder="t('link.productInfo.titlePlaceholder')"
                class="modern-input"
              />
            </div>
          </div>

          <div class="config-section">
            <div class="input-row">
              <label class="option-label">{{ t('link.productInfo.price') }}</label>
              <input 
                v-model="productInfo.price" 
                :placeholder="t('link.productInfo.pricePlaceholder')"
                class="modern-input"
              />
            </div>
          </div>

          <div class="config-section">
            <div class="input-row">
              <label class="option-label">{{ t('link.productInfo.imageUrl') }}</label>
              <input 
                v-model="productInfo.imageUrl" 
                :placeholder="t('link.productInfo.imagePlaceholder')"
                class="modern-input"
              />
            </div>
            <div class="preview-button-wrapper">
              <button 
                class="preview-button"
                v-if="productInfo.imageUrl"
                @mouseover="showPreview = true"
                @mouseleave="showPreview = false"
              >
                {{ t('link.button.preview') }}
              </button>
              <div class="preview-popup" v-show="showPreview && productInfo.imageUrl">
                <img 
                  :src="productInfo.imageUrl" 
                  :alt="t('link.productInfo.title')"
                  class="preview-image"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 生成选项区域 - 移到右侧 -->
        <div class="generation-options">
          <!-- 添加步骤3提示信息 -->
          <div class="step-hint">
            <em>{{ t('link.hint.step3') }}</em>
          </div>

          <!-- 文案风格选择 -->
          <div class="option-section">
            <label class="option-label">{{ t('link.style.label') }}</label>
            <div class="option-buttons style-buttons">
              <button 
                v-for="style in styles" 
                :key="style.value"
                :class="['style-button', { active: selectedStyle === style.value }]"
                @click="selectedStyle = style.value"
                :style="{ '--button-gradient': selectedStyle === style.value ? style.gradient : '' }"
              >
                {{ t(`link.style.${style.value}`) }}
              </button>
            </div>
          </div>

          <!-- 文案长度选择 -->
          <div class="option-section">
            <label class="option-label">{{ t('link.length.label') }}</label>
            <div class="option-buttons length-buttons">
              <button 
                v-for="len in lengths" 
                :key="len.value"
                :class="['length-button', { active: selectedLength === len.value }]"
                @click="selectedLength = len.value"
                :style="{ '--button-gradient': selectedLength === len.value ? len.gradient : '' }"
              >
                {{ t(`link.length.${len.value}`) }}
              </button>
            </div>
          </div>

          <!-- 语言选择 -->
          <div class="option-section">
            <label class="option-label">{{ t('link.language.label') }}</label>
            <div class="option-buttons language-buttons">
              <button 
                v-for="lang in languages" 
                :key="lang.value"
                :class="['language-button', { active: selectedLanguage === lang.value }]"
                @click="selectedLanguage = lang.value"
                :style="{ '--button-gradient': selectedLanguage === lang.value ? lang.gradient : '' }"
              >
                {{ t(`link.language.${lang.value}`) }}
              </button>
            </div>
          </div>

          <button 
            @click="generateText" 
            :disabled="loading || !isFormValid"
            class="modern-button generate-button"
          >
            {{ t('link.button.generate') }}
          </button>
        </div>
      </div>

      <!-- 生成结果 -->
      <div v-if="responseText" class="result-section">
        <div class="result-header">
          <h3>{{ t('link.title') }}</h3>
          <button 
            @click="copyContent" 
            class="copy-button"
            :class="{ 'copied': copied }"
          >
            {{ copied ? t('link.button.copied') : t('link.button.copy') }}
          </button>
        </div>
        <div class="result-content">
          <div 
            class="content-display"
            v-html="formattedContent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

export default {
  name: 'LinkStyleGenerator',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      productUrl: "",
      productInfo: {
        title: "",
        price: "",
        imageUrl: "",
        productUrl: ""
      },
      selectedStyle: "professional",
      selectedLength: "",
      selectedLanguage: "",
      responseText: "",
      loading: false,
      hasTriedCrawling: false,
      styles: [
        { value: 'professional', gradient: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 100%)' },
        { value: 'casual', gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)' },
        { value: 'humorous', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)' }
      ],
      lengths: [
        { label: '简短(100字内)', value: 'short', gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)' },
        { label: '适中(200字左右)', value: 'medium', gradient: 'linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)' },
        { label: '详细(300字以上)', value: 'long', gradient: 'linear-gradient(135deg, #A6C1EE 0%, #FBC2EB 100%)' }
      ],
      languages: [
        { label: '中文', value: 'zh', gradient: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)' },
        { label: '英文', value: 'en', gradient: 'linear-gradient(135deg, #5EE7DF 0%, #B490CA 100%)' },
        { label: '日文', value: 'jp', gradient: 'linear-gradient(135deg, #FFD1FF 0%, #FAD0C4 100%)' }
      ],
      loadingText: '',
      progressWidth: 0,
      progressTimer: null,
      copied: false,
      originalContent: '',
      showSteps: false,
      showPreview: false
    };
  },
  computed: {
    isFormValid() {
      return this.productInfo.title && 
             this.productInfo.price && 
             this.selectedStyle && 
             this.selectedLength && 
             this.selectedLanguage;
    },
    formattedContent() {
      if (!this.responseText) return '';
      
      let content = this.responseText;
      
      // 处理图片显示，添加样式类
      content = content.replace(
        /!\[.*?\]\((.*?)\)/g, 
        '<div class="content-image-container"><img src="$1" alt="商品图片" class="content-image"/></div>'
      );
      
      // 处理商品链接
      if (this.productInfo.productUrl && this.productInfo.title) {
        content = content.replace(
          '[LINK]',
          `<a href="${this.productInfo.productUrl}" target="_blank" class="product-link">${this.productInfo.title}</a>`
        );
      }
      
      return content;
    },
    crawlFailed() {
      return this.hasTriedCrawling && !this.productInfo.title && !this.productInfo.price && !this.productInfo.imageUrl;
    },
    
    hasIncompleteInfo() {
      return this.hasTriedCrawling && (!this.productInfo.title || !this.productInfo.price);
    },
    
    getMissingInfoHint() {
      if (!this.hasTriedCrawling) return '';
      
      let missingItems = [];
      if (!this.productInfo.title) missingItems.push(this.t('link.productInfo.title'));
      if (!this.productInfo.price) missingItems.push(this.t('link.productInfo.price'));
      
      if (missingItems.length > 0) {
        return this.t('link.hint.step2.incomplete') + missingItems.join('、');
      }
      return '';
    }
  },
  methods: {
    startLoading(action) {
      this.loading = true;
      this.progressWidth = 0;
      this.loadingText = this.t(`link.loading.${action}`);
      
      // 模拟进度条
      this.progressTimer = setInterval(() => {
        if (this.progressWidth < 90) {
          this.progressWidth += 3;
        }
      }, 100);
    },

    stopLoading() {
      this.progressWidth = 100;
      clearInterval(this.progressTimer);
      setTimeout(() => {
        this.loading = false;
        this.progressWidth = 0;
      }, 500);
    },

    async crawlProduct() {
      if (!this.productUrl) {
        ElMessage({
          message: this.t('link.hint.enterUrl'),
          type: 'warning',
          duration: 3000,
          showClose: true
        });
        return;
      }
      
      // 清空原有内容
      this.productInfo = {
        title: "",
        price: "",
        imageUrl: "",
        productUrl: ""
      };
      
      this.startLoading('crawl');
      try {
        // const response = await axios.post("https://ugc-content-creator.com/api/content/crawl", {
        const response = await axios.post("http://localhost:8080/api/content/crawl", {
          product_url: this.productUrl  // 改为下划线命名匹配后端API
        });
        
        console.log('Received response:', response.data);
        
        // 检查响应数据
        if (!response.data) {
          throw new Error('Empty response data');
        }
        
        // 更新商品信息，保持前端使用驼峰命名
        this.productInfo = {
          title: response.data.title || '',
          price: response.data.price || '',
          imageUrl: response.data.image_url || '',  // 从下划线命名转换为驼峰命名
          productUrl: response.data.product_url || this.productUrl  // 从下划线命名转换为驼峰命名
        };
        
        if (this.productInfo.title) {
          ElMessage({
            message: this.t('link.success.crawl'),
            type: 'success',
            duration: 3000
          });
        }
      } catch (error) {
        console.error("获取商品信息失败：", error);
        let errorMessage = this.t('common.unknown_error');
        if (error.code) {
          switch (error.code) {
            case 400:
              errorMessage = this.t('common.bad_request');
              break;
            case 401:
              errorMessage = this.t('common.auth_error');
              break;
            case 403:
              errorMessage = this.t('common.permission_error');
              break;
            case 404:
              errorMessage = this.t('common.service_not_found');
              break;
            case 500:
              errorMessage = this.t('common.server_error');
              break;
            case -1:  
              errorMessage = this.t('common.network_error');
              break;
          }
        }
        
        ElMessage({
          message: errorMessage,
          type: 'error',
          duration: 3000,
          showClose: true,
          center: true
        });
      } finally {
        this.hasTriedCrawling = true;
        this.stopLoading();
      }
    },
    
    async generateText() {
      if (!this.isFormValid) {
        ElMessage({
          message: this.t('link.validation.incomplete'),
          type: 'warning',
          duration: 3000,
          showClose: true
        });
        return;
      }
      this.startLoading('generate');
      try {
        const response = await axios.post("http://localhost:8080/api/content/generate", {
          product: {
            title: this.productInfo.title,
            price: this.productInfo.price,
            image_url: this.productInfo.imageUrl,
            product_url: this.productInfo.productUrl
          },
          style: this.selectedStyle,
          length: this.selectedLength,
          language: this.selectedLanguage
        });

        // 直接使用后端返回的content，不做修改
        this.responseText = response.data.content;
        
        // 更新商品信息
        if (response.data.product) {
          this.productInfo = {
            title: response.data.product.title,
            price: response.data.product.price,
            imageUrl: response.data.product.image_url,
            productUrl: response.data.product.product_url
          };
        }

      } catch (error) {
        console.error("生成文案失败：", error);
        this.responseText = '';
        
        let errorMessage = this.t('common.unknown_error');
        if (error.code) {
          switch (error.code) {
            case 400:
              errorMessage = this.t('common.bad_request');
              break;
            case 401:
              errorMessage = this.t('common.auth_error');
              break;
            case 403:
              errorMessage = this.t('common.permission_error');
              break;
            case 404:
              errorMessage = this.t('common.service_not_found');
              break;
            case 500:
              errorMessage = this.t('common.server_error');
              break;
            case -1:  
              errorMessage = this.t('common.network_error');
              break;
          }
        }
        
        ElMessage({
          message: errorMessage,
          type: 'error',
          duration: 3000,
          showClose: true,
          center: true
        });
      } finally {
        this.stopLoading();
      }
    },

    async copyContent() {
      try {
        await navigator.clipboard.writeText(this.responseText);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
        ElMessage.error(this.t('link.error.copy'));
      }
    },

    handleContentChange() {
      this.copied = false;
    },
  }
};
</script>

<style scoped>
/* 修改容器和卡片样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.card {
  background: transparent;
  border: none;
  box-shadow: none;
}

/* 调整标题和说明的样式 */
.page-header {
  margin-bottom: 40px;
  text-align: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-description {
  max-width: 800px;
  margin: 0 auto;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.description-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
}

.how-to-use-text {
  color: #007AFF;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.how-to-use-text:hover {
  color: #0056b3;
  border-bottom-color: #0056b3;
}

/* 其他样式保持不变 */
.input-section, .product-info-section, .generation-options {
  margin-bottom: 30px;
}

.input-group, .info-group {
  margin-bottom: 20px;
}

.modern-input {
  width: calc(100% - 93px);
  min-width: 120px;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

.modern-input:focus {
  border-color: #007AFF;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  outline: none;
}

.modern-select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 15px;
  background: white;
  cursor: pointer;
}

.modern-button {
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 122, 255, 0.3);
}

.modern-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.generate-button {
  width: 100%;
  margin-top: 24px;
  height: 36px;
}

.hint {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
}

.preview-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-section {
  margin-top: 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.result-content {
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1.1rem;
  color: #333;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.select-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.option-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 12px;
}

.option-label {
  width: 73px;
  font-size: 14px;
  color: #333;
  text-align: right;
  white-space: nowrap;
}

.option-buttons {
  display: flex;
  gap: 12px;
  flex: 1;
  padding-right: 12px;
}

.style-button,
.length-button,
.language-button {
  flex: 1;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  background: white !important;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

/* 按钮激活状态 */
.style-button.active,
.length-button.active,
.language-button.active {
  color: #333;
  border-color: transparent;
  background: var(--button-gradient) !important;
}

/* 按钮悬停效果 */
.style-button:hover,
.length-button:hover,
.language-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 移除之前的阴影和文字阴影 */
.style-button,
.length-button,
.language-button {
  text-shadow: none;
  box-shadow: none;
}

/* 加载遮罩层样式 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
  padding: 20px;
}

.loading-text {
  margin: 15px 0;
  color: #333;
  font-size: 1rem;
}

/* 旋转动画 */
.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 进度条样式 */
.progress-bar {
  width: 200px;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  margin: 10px auto;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
}

/* 添加内容图片样式 */
.content-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 链接样式 */
.result-content a {
  color: #007AFF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.result-content a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.copy-button {
  padding: 8px 16px;
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.copy-button.copied {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.content-textarea {
  width: 100%;
  min-height: 200px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.content-textarea:focus {
  outline: none;
  border-color: #007AFF;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
}

/* 确保图片在textarea中正确显示 */
.content-textarea img {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
}

/* 添加滚动条样式 */
.content-textarea::-webkit-scrollbar {
  width: 8px;
}

.content-textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.content-textarea::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.content-textarea::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.content-display {
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1.1rem;
  color: #333;
}

.product-link {
  color: #007AFF;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.product-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* 修改复制功能，确保复制的是纯文本 */
.copy-button {
  position: relative;
  z-index: 1;
}

/* 确保结果内容区域的样式 */
.result-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
}

/* 添加步骤弹窗样式 */
.steps-modal-overlay {
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

.steps-modal {
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
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

.steps-list {
  margin: 0;
  padding-left: 24px;
}

.steps-list li {
  color: #555;
  line-height: 1.8;
  margin-bottom: 16px;
  padding-left: 8px;
}

.steps-list li:last-child {
  margin-bottom: 0;
}

/* 添加包装容器样式 */
.operation-wrapper {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  width: 100%;
}

/* 调整商品信息操作区域样式 */
.operation-area {
  width: 55%;
  max-width: 550px;
  flex-shrink: 0;
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 24px 12px 12px;
  margin-bottom: 0;
}

/* 调整配置区域间距 */
.config-section {
  margin-bottom: 20px;
  padding: 0 12px;
}

/* 调整最后一个配置区域的间距 */
.config-section:last-child {
  margin-bottom: 0;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 调整图片预览区域间距 */
.image-preview-wrapper {
  margin-top: 8px;
  margin-left: 93px;
  width: calc(100% - 93px);
  min-width: 120px;
  max-width: none;
  padding-right: 0;
  margin-bottom: 0;
}

.preview-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .operation-wrapper {
    flex-direction: column;
    gap: 16px;
  }

  .operation-area,
  .generation-options {
    width: 100%;
    max-width: none;
  }

  .input-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .option-label {
    width: auto;
    text-align: left;
  }

  .modern-input {
    width: 100%;
  }

  .image-preview-wrapper {
    width: 100%;
    margin-left: 0;
  }
}

/* 调整提示信息间距 */
.info-hint {
  margin-bottom: 16px;
  line-height: 1.5;
  padding: 0 12px 0 24px;
}

.step-hint,
.info-hint {
  margin-bottom: 20px;
  line-height: 1.5;
  padding: 0 12px 0 24px;
}

.step-hint em,
.info-hint em {
  font-style: italic;
  color: #f56565;
  font-size: 13px;
}

/* 链接输入区域样式 */
.link-input-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.group {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}

.peer {
  flex: 1;
  height: 42px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.peer:focus {
  border-color: #f56565;
  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
  outline: none;
}

.action-button {
  height: 42px;
  padding: 0 24px;
  white-space: nowrap;
  border: none;
  border-radius: 8px;
  background: #f56565;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:hover:not(:disabled) {
  background: #e53e3e;
}

.action-button:disabled {
  background: #e2e8f0;
  cursor: not-allowed;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .group {
    flex-direction: column;
  }

  .peer, .action-button {
    width: 100%;
  }
}

/* 添加提示信息样式 */
.info-hint {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  border-left: none;
}

/* 调整生成选项区域样式 */
.generation-options {
  flex: 1;
  min-width: 0;
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 20px 12px;
  margin-bottom: 0;
}

/* 调整选项按钮容器样式 */
.option-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  padding-right: 12px;
}

/* 调整按钮样式以适应新宽度 */
.style-button,
.length-button,
.language-button {
  flex: 1;
  min-width: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 生成按钮样式调整 */
.generate-button {
  width: 100%;
  margin-top: 24px;
  height: 36px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .generation-options {
    width: 100%;
    max-width: none;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .option-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .option-section .option-label {
    width: auto;
    text-align: left;
  }

  .option-buttons {
    width: 100%;
  }
}

/* 修改生成选项区域的按钮样式 */
.style-button,
.length-button,
.language-button {
  flex: 1;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  background: white !important;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

/* 调整选项按钮容器样式 */
.option-buttons {
  display: flex;
  gap: 12px;
  flex: 1;
}

/* 文案风格按钮容器特殊处理 */
.option-buttons.style-buttons {
  flex-wrap: nowrap;
}

/* 文案长度和语言选择按钮容器 */
.option-buttons.length-buttons,
.option-buttons.language-buttons {
  flex-wrap: wrap;
}

/* 按钮激活状态 */
.style-button.active,
.length-button.active,
.language-button.active {
  color: #333;
  border-color: transparent;
  background: var(--button-gradient) !important;
}

/* 按钮悬停效果 */
.style-button:hover,
.length-button:hover,
.language-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 统一商品信息和生成选项区域的基础样式 */
.operation-area,
.generation-options {
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 20px 12px;
  margin-bottom: 0;
}

/* 分别设置两个区域的宽度 */
.operation-area {
  width: 55%;
  max-width: 550px;
  flex-shrink: 0;
}

.generation-options {
  flex: 1;
  min-width: 0;
}

/* 调整输入框宽度 */
.modern-input {
  width: calc(100% - 93px);
  min-width: 120px;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

/* 调整图片预览区域宽度 */
.image-preview-wrapper {
  margin-top: 8px;
  margin-left: 93px;
  width: calc(100% - 93px);
  min-width: 120px;
  max-width: none;
  padding-right: 0;
  margin-bottom: 0;
}

/* 包装容器样式 */
.operation-wrapper {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  width: 100%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .operation-wrapper {
    flex-direction: column;
    gap: 16px;
  }

  .operation-area,
  .generation-options {
    width: 100%;
    max-width: none;
  }
}

.content-image-wrapper {
  margin: 20px 0;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.content-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
  display: inline-block;
}

.content-image:hover {
  transform: scale(1.02);
}

.result-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
}

.product-link {
  display: inline-flex;
  align-items: center;
  color: #007AFF;
  text-decoration: none;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(0, 122, 255, 0.1);
  transition: all 0.3s ease;
}

.product-link:hover {
  color: #0056b3;
  background: rgba(0, 122, 255, 0.15);
  text-decoration: none;
  transform: translateY(-1px);
}

.product-link::after {
  content: '→';
  margin-left: 6px;
  transition: transform 0.3s ease;
}

.product-link:hover::after {
  transform: translateX(4px);
}

/* 预览按钮和弹出样式 */
.preview-button-wrapper {
  position: relative;
  margin-left: 93px;
  margin-top: 8px;
}

.preview-button {
  padding: 6px 12px;
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.preview-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-popup {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  z-index: 1000;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.preview-image {
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
  border-radius: 4px;
}

/* 内容区域图片样式 */
.content-image-container {
  margin: 16px 0;
  text-align: center;
}

.content-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .preview-popup {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .preview-image {
    max-width: 250px;
    max-height: 250px;
  }
}
</style>
