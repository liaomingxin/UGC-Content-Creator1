<template>
  <div class="container">
    <div class="card">
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

      <!-- 第一步：输入链接 -->
      <div class="input-section">
        <div class="input-group">
          <input 
            v-model="productUrl" 
            :placeholder="t('link.urlPlaceholder')"
            class="modern-input"
          />
          <button 
            @click="crawlProduct" 
            :disabled="loading"
            class="modern-button"
          >
            <span v-if="!loading">{{ t('link.button.crawl') }}</span>
            <span v-else class="loader"></span>
          </button>
        </div>
      </div>

      <!-- 商品信息编辑区 -->
      <div class="product-info-section">
        <div class="info-group">
          <label>{{ t('link.productInfo.title') }}</label>
          <input 
            v-model="productInfo.title" 
            :placeholder="t('link.productInfo.titlePlaceholder')"
            class="modern-input"
          />
          <span class="hint" v-if="!productInfo.title && hasTriedCrawling">
            {{ t('link.hint.noTitle') }}
          </span>
        </div>

        <div class="info-group">
          <label>{{ t('link.productInfo.price') }}</label>
          <input 
            v-model="productInfo.price" 
            :placeholder="t('link.productInfo.pricePlaceholder')"
            class="modern-input"
          />
          <span class="hint" v-if="!productInfo.price && hasTriedCrawling">
            {{ t('link.hint.noPrice') }}
          </span>
        </div>

        <div class="info-group">
          <label>{{ t('link.productInfo.imageUrl') }}</label>
          <input 
            v-model="productInfo.imageUrl" 
            :placeholder="t('link.productInfo.imagePlaceholder')"
            class="modern-input"
          />
          <img 
            v-if="productInfo.imageUrl" 
            :src="productInfo.imageUrl" 
            :alt="t('link.productInfo.title')"
            class="preview-image"
          />
          <span class="hint" v-if="!productInfo.imageUrl && hasTriedCrawling">
            {{ t('link.hint.noImage') }}
          </span>
        </div>
      </div>

      <!-- 生成选项 -->
      <div class="generation-options">
        <!-- 文案风格选择 -->
        <div class="option-section">
          <label class="option-label">{{ t('link.style.label') }}</label>
          <div class="option-buttons">
            <button 
              v-for="style in styles" 
              :key="style.value"
              :class="['style-button', { active: selectedStyle === style.value }]"
              @click="selectedStyle = style.value"
              :style="{ background: style.gradient }"
            >
              {{ t(`link.style.${style.value}`) }}
            </button>
          </div>
        </div>

        <!-- 文案长度选择 -->
        <div class="option-section">
          <label class="option-label">{{ t('link.length.label') }}</label>
          <div class="option-buttons">
            <button 
              v-for="len in lengths" 
              :key="len.value"
              :class="['length-button', { active: selectedLength === len.value }]"
              @click="selectedLength = len.value"
              :style="{ background: len.gradient }"
            >
              {{ t(`link.length.${len.value}`) }}
            </button>
          </div>
        </div>

        <!-- 语言选择 -->
        <div class="option-section">
          <label class="option-label">{{ t('link.language.label') }}</label>
          <div class="option-buttons">
            <button 
              v-for="lang in languages" 
              :key="lang.value"
              :class="['language-button', { active: selectedLanguage === lang.value }]"
              @click="selectedLanguage = lang.value"
              :style="{ background: lang.gradient }"
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
        { value: 'humorous', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)' },
        { value: 'elegant', gradient: 'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)' }
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
      
      // 处理图片显示
      content = content.replace(
        /!\[.*?\]\((.*?)\)/g, 
        '<img src="$1" alt="商品图片" class="content-image"/>'
      );
      
      // 处理商品链接
      if (this.productInfo.productUrl && this.productInfo.title) {
        content = content.replace(
          '[LINK]',
          `<a href="${this.productInfo.productUrl}" target="_blank" class="product-link">${this.productInfo.title}</a>`
        );
      }
      
      return content;
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
        ElMessage.warning(this.t('link.hint.enterUrl'));
        return;
      }
      this.startLoading('crawl');
      try {
        const response = await axios.post("https://ugc-content-creator.com/api/content/crawl", {
        // const response = await axios.post("http://localhost:8080/api/content/crawl", {
          productUrl: this.productUrl
        });
        this.productInfo = {
          ...this.productInfo,
          ...response.data,
          productUrl: this.productUrl
        };
      } catch (error) {
        console.error("获取商品信息失败：", error);
        ElMessage.error(this.t('link.error.crawl'));
      } finally {
        this.stopLoading();
      }
    },
    
    async generateText() {
      if (!this.isFormValid) {
        ElMessage.warning(this.t('link.validation.incomplete'));
        return;
      }
      this.startLoading('generate');
      try {
        const response = await axios.post("https://ugc-content-creator.com/api/content/generate", {
        // const response = await axios.post("http://localhost:8080/api/content/generate", {
          product: this.productInfo,
          style: this.selectedStyle,
          length: this.selectedLength,
          language: this.selectedLanguage
        });
        this.responseText = response.data;
      } catch (error) {
        console.error("生成文案失败：", error);
        ElMessage.error(this.t('link.error.generation'));
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  overflow: hidden;
}

.input-section, .product-info-section, .generation-options {
  margin-bottom: 30px;
}

.input-group, .info-group {
  margin-bottom: 20px;
}

.modern-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
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
  margin-top: 20px;
  font-size: 18px;
  padding: 15px;
}

.hint {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-section {
  margin-top: 30px;
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
  margin-bottom: 24px;
}

.option-label {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #333;
  font-weight: 500;
}

.option-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.style-button,
.length-button,
.language-button {
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

.style-button:hover,
.length-button:hover,
.language-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.style-button.active,
.length-button.active,
.language-button.active {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
}

.style-button.active::after,
.length-button.active::after,
.language-button.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
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
  margin: 15px 0;
  border-radius: 8px;
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
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.product-link:hover {
  color: #0056b3;
  border-bottom-color: #0056b3;
}

/* 修改复制功能，确保复制的是纯文本 */
.copy-button {
  position: relative;
  z-index: 1;
}

/* 确保结果内容区域的样式 */
.result-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
