<template>
  <div class="container">
    <h2>{{ t('style.title') }}</h2>
    <div class="card">
      <div class="flex-container">
        <!-- 左侧模板文案输入区 -->
        <div class="left-panel">
          <textarea
            v-model="templateText"
            :placeholder="t('style.templatePlaceholder')"
            class="template-textarea"
          ></textarea>
        </div>

        <!-- 右侧配置区 -->
        <div class="right-panel">
          <!-- 场景选择 -->
          <div class="config-section">
            <label class="option-label">{{ t('style.sceneLabel') }}</label>
            <ul class="scene-grid">
              <li v-for="scene in scenes" :key="scene.value">
                <div 
                  class="scene-card"
                  :class="{ 'active': selectedScene === scene.value }"
                  @click="selectedScene = scene.value"
                >
                  <img 
                    :src="scene.imageUrl" 
                    :alt="t(`style.scenes.${scene.value}`)" 
                    :title="t(`style.scenes.${scene.value}`)" 
                    class="scene-image"
                  />
                  <span class="scene-label">{{ t(`style.scenes.${scene.value}`) }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- 文案长度选择 -->
          <div class="config-section">
            <label class="option-label">{{ t('style.lengthLabel') }}（{{ t('common.word') }}）</label>
            <div class="option-buttons">
              <button 
                v-for="length in lengths" 
                :key="length.value"
                :class="['length-button', { active: selectedLength === length.value }]"
                @click="selectedLength = length.value"
              >
                {{ length.value }}
              </button>
            </div>
          </div>

          <button 
            @click="generateText"
            :disabled="!isFormValid"
            class="generate-button"
          >
            {{ t('style.button.generate') }}
          </button>
        </div>
      </div>

      <!-- 生成结果 -->
      <div v-if="responseText" class="result-section">
        <div class="result-header">
          <div class="result-info">
            <h3>{{ t('style.title') }}</h3>
            <div class="result-meta">
              <span class="word-count">{{ t('style.analysis.wordCount') }}：{{ wordCount }}</span>
              <span class="sentiment" :class="sentiment">
                {{ t('style.analysis.sentiment') }}：{{ getSentimentText(sentiment) }}
              </span>
            </div>
          </div>
          <button 
            @click="copyContent"
            class="copy-button"
            :class="{ 'copied': copied }"
          >
            {{ copied ? t('style.button.copied') : t('style.button.copy') }}
          </button>
        </div>
        <div class="result-content">{{ responseText }}</div>
        <div v-if="keywords.length" class="keywords-section">
          <span class="keywords-label">{{t('common.keyword')}}：</span>
          <div class="keywords-list">
            <span v-for="(keyword, index) in keywords" 
                  :key="index" 
                  class="keyword-tag"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
      </div>

      <!-- 加载状态遮罩 -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-content">
          <el-progress 
            type="circle" 
            :percentage="progressWidth"
            :status="progressWidth >= 100 ? 'success' : ''"
          />
          <p class="loading-text">{{ loadingText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElProgress, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default {
  name: 'StyleMimicGenerator',
  components: {
    ElProgress
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      templateText: '',
      selectedScene: '',
      selectedLength: '',
      responseText: '',
      copied: false,
      scenes: [
        { 
          value: 'default',
          imageUrl: 'https://www.kandouyin.com/wenan/9999.jpg'
        },
        { 
          value: 'beauty',
          imageUrl: 'https://www.kandouyin.com/wenan/1.jpg'
        },
        { 
          value: 'fashion',
          imageUrl: 'https://www.kandouyin.com/wenan/2.jpg'
        },
        { 
          value: 'home',
          imageUrl: 'https://www.kandouyin.com/wenan/3.jpg'
        },
        { 
          value: 'fitness',
          imageUrl: 'https://www.kandouyin.com/wenan/4.jpg'
        },
        { 
          value: 'travel',
          imageUrl: 'https://www.kandouyin.com/wenan/5.jpg'
        },
        { 
          value: 'food',
          imageUrl: 'https://www.kandouyin.com/wenan/6.jpg'
        },
        { 
          value: 'emotion',
          imageUrl: 'https://www.kandouyin.com/wenan/7.jpg'
        }
      ],
      lengths: [
        { value: '40', gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)' },
        { value: '50', gradient: 'linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)' },
        { value: '100', gradient: 'linear-gradient(135deg, #A6C1EE 0%, #FBC2EB 100%)' },
        { value: '200', gradient: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)' },
        { value: '300', gradient: 'linear-gradient(135deg, #5EE7DF 0%, #B490CA 100%)' }
      ],

      loading: false,
      progressWidth: 0,
      loadingText: '',
      progressTimer: null,
      wordCount: 0,
      sentiment: 'neutral',
      keywords: []
    }
  },
  computed: {
    isFormValid() {
      return this.templateText && this.selectedScene && this.selectedLength
    },
    formattedContent() {
      return this.responseText
    }
  },
  methods: {
    startLoading() {
      this.loading = true
      this.progressWidth = 0
      this.loadingText = this.t('style.loading.generate')
      
      this.progressTimer = setInterval(() => {
        if (this.progressWidth < 90) {
          this.progressWidth += 1
        }
      }, 200)
    },
    
    stopLoading() {
      this.progressWidth = 100
      clearInterval(this.progressTimer)
      setTimeout(() => {
        this.loading = false
        this.progressWidth = 0
      }, 500)
    },

    async generateText() {
      if (!this.isFormValid) {
        ElMessage.warning(this.t('style.validation.incomplete'))
        return
      }

      this.startLoading()
      let retryCount = 0
      const maxRetries = 3
           
      while (retryCount < maxRetries) {
        try {
          // 记录请求参数
          const requestData = {
            template: this.templateText,
            scene: this.selectedScene,
            length: this.selectedLength,
            productInfo: {
              title: "XXXXX品牌 补水保湿面霜",
              description: "补水保湿，改善干燥，提亮肤色",
              price: "299.00",
              features: [
                "深层补水",
                "长效保湿",
                "温和不刺激",
                "提亮肤色"
              ]
            }
          }
          
          console.log('发送请求数据:', {
            // url: "http://localhost:8080/api/content/generate-mimic",
            url: "https://ugc-content-creator.com/api/content/generate-mimic",
            method: 'POST',
            data: requestData,
            timestamp: new Date().toISOString()
          })

          const response = await axios.post(
            // "http://localhost:8080/api/content/generate-mimic",
            "https://ugc-content-creator.com/api/content/generate-mimic",
            requestData
          )

          // 记录响应数据
          console.log('收到响应数据:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
            timestamp: new Date().toISOString()
          })

          if (response.data.code === 200 && response.data.data) {
            const result = response.data.data
            this.responseText = result.content
            this.wordCount = result.wordCount
            this.sentiment = result.sentiment
            this.keywords = result.keywords || []
          } else {
            throw new Error(response.data.message || this.t('common.generate_fail'))
          }

          break
          
        } catch (error) {
          // 详细记录错误信息
          console.error('请求失败:', {
            retryCount,
            error: {
              message: error.message,
              status: error.response?.status,
              statusText: error.response?.statusText,
              data: error.response?.data,
              config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers
              }
            },
            timestamp: new Date().toISOString()
          })

          retryCount++
          
          if (retryCount === maxRetries) {
            ElMessage.error({
              message: `${this.t('common.generate_fail')} (${error.response?.status || 'unknown'}): ${error.response?.data?.message || error.message}`,
              duration: 5000,
              showClose: true
            })
          } else {
            this.loadingText = `${this.t('common.connect_fail')} (${error.response?.status || 'unknown'})，${this.t('common.reconnect_num')} ：${retryCount}...`
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }
      }
      
      this.stopLoading()
    },
    async copyContent() {
      try {
        await navigator.clipboard.writeText(this.responseText)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败：', err)
        ElMessage.error(this.t('link.error.copy'));
      }
    },
    getSentimentText(sentiment) {
      const sentimentMap = {
        positive: 'positive',
        neutral: 'neutral',
        negative: 'negative'
      }
      // return sentimentMap[sentiment] || '未知'
      return this.t(`style.sentiment.${sentimentMap[sentiment] || 'unknown'}`)
    },
  }
}
</script>

<style scoped>
/* 基础样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.flex-container {
  display: flex;
  gap: 50px;
  align-items: stretch;
  min-height: 450px;
}

.left-panel {
  flex: 1.3;
  display: flex;
  flex-direction: column;
}

.right-panel {
  flex: 0.7;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 16px;
}

/* 输入区域样式 */
.template-section,
.input-group {
  display: none;
}

.template-textarea {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none;
  font-size: 1rem;
  line-height: 1.6;
  min-height: 0;
  background: white;
  height: 100%;
}

/* 按钮样式 */
.option-section {
  margin-bottom: 25px;
}

.option-label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  padding: 0;
}

.option-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  padding-right: 0;
  flex-wrap: nowrap;
  width: 100%;
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.scene-card {
  position: relative;
  display: block;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  padding: 6px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.scene-card:hover {
  transform: translateY(-2px);
  border-color: #007AFF;
}

.scene-card.active {
  border: 2px solid #007AFF;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.scene-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
}

.scene-label {
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 4px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 12px;
  text-align: center;
  border-radius: 0 0 4px 4px;
  backdrop-filter: blur(4px);
}

.length-button {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  flex: 1;
  min-width: 0;
  text-align: center;
  white-space: nowrap;
}

.length-button:hover {
  background: #f8f9fa;
  border-color: #d0d0d0;
}

.length-button.active {
  border-color: #f56c6c;
  color: #f56c6c;
  background: white;
  box-shadow: 0 2px 4px rgba(245, 108, 108, 0.1);
}

.generate-button {
  width: 100%;
  padding: 12px;
  margin-top: 0;
  margin-bottom: 25px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 添加禁用状态样式 */
.generate-button:disabled {
  background: #e0e0e0;  /* 灰色背景 */
  opacity: 1;  /* 保持完全不透明 */
  cursor: not-allowed;
  box-shadow: none;  /* 移除阴影 */
}

/* 添加启用状态样式 */
.generate-button:not(:disabled) {
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);  /* 蓝色渐变背景 */
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);  /* 添加阴影效果 */
}

.generate-button:not(:disabled):hover {
  transform: translateY(-1px);  /* 悬浮效果 */
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);  /* 增强阴影 */
}

/* 结果区域样式 */
.result-section {
  margin-top: 30px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.result-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.word-count {
  background: #f0f2f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.sentiment {
  padding: 4px 8px;
  border-radius: 4px;
}

.sentiment.positive {
  background: #e6f7e6;
  color: #52c41a;
}

.sentiment.neutral {
  background: #f0f2f5;
  color: #666;
}

.sentiment.negative {
  background: #fff1f0;
  color: #f5222d;
}

.result-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
  white-space: pre-wrap;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.keywords-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.keywords-label {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.keyword-tag {
  background: #f0f2f5;
  color: #666;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.copy-button {
  min-width: 100px;
}

/* 激活状态样式 */
.scene-card.active,
.length-button.active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.copy-button.copied {
  background: #28a745;
}

/* 添加加载状态样式 */
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
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

/* 调整配置区域间距 */
.config-section {
  margin-bottom: 25px;
  padding: 0;
}
</style> 