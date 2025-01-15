<template>
  <div class="container">
    <div class="card">
      <div class="flex-container">
        <!-- 左侧模板文案输入区 -->
        <div class="left-panel">
          <div class="template-section">
            <div class="input-group">
              <label>模板文案</label>
              <textarea
                v-model="templateText"
                placeholder="请输入您想要模仿的文案风格示例..."
                class="template-textarea"
                rows="20"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 右侧配置区 -->
        <div class="right-panel">
          <!-- 场景选择 -->
          <div class="config-section">
            <label>关联场景</label>
            <div class="scene-grid">
              <button
                v-for="scene in scenes"
                :key="scene.value"
                :class="['scene-button', { active: selectedScene === scene.value }]"
                @click="selectedScene = scene.value"
              >
                {{ scene.label }}
              </button>
            </div>
          </div>

          <!-- 文案长度选择 -->
          <div class="config-section">
            <label>文案长度</label>
            <div class="length-buttons">
              <button
                v-for="length in lengths"
                :key="length.value"
                :class="['length-button', { active: selectedLength === length.value }]"
                @click="selectedLength = length.value"
              >
                {{ length.label }}
              </button>
            </div>
          </div>

          <button 
            @click="generateText"
            :disabled="!isFormValid"
            class="generate-button"
          >
            生成文案
          </button>
        </div>
      </div>

      <!-- 生成结果 -->
      <div v-if="responseText" class="result-section">
        <div class="result-header">
          <div class="result-info">
            <h3>生成结果</h3>
            <div class="result-meta">
              <span class="word-count">字数：{{ wordCount }}字</span>
              <span class="sentiment" :class="sentiment">
                情感倾向：{{ getSentimentText(sentiment) }}
              </span>
            </div>
          </div>
          <button 
            @click="copyContent"
            class="copy-button"
            :class="{ 'copied': copied }"
          >
            {{ copied ? '已复制' : '复制文案' }}
          </button>
        </div>
        <div class="result-content">{{ responseText }}</div>
        <div v-if="keywords.length" class="keywords-section">
          <span class="keywords-label">关键词：</span>
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

      <!-- 添加加载状态遮罩 -->
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

export default {
  name: 'StyleMimicGenerator',
  components: {
    ElProgress
  },
  data() {
    return {
      templateText: '',
      selectedScene: '',
      selectedLength: '',
      responseText: '',
      copied: false,
      scenes: [
        { label: '默认场景', value: 'default' },
        { label: '美妆场景', value: 'beauty' },
        { label: '穿搭场景', value: 'fashion' },
        { label: '家居场景', value: 'home' },
        { label: '健身场景', value: 'fitness' },
        { label: '旅行场景', value: 'travel' },
        { label: '美食场景', value: 'food' },
        { label: '情感场景', value: 'emotion' }
      ],
      lengths: [
        { label: '40字', value: '40' },
        { label: '50字', value: '50' },
        { label: '100字', value: '100' },
        { label: '200字', value: '200' },
        { label: '300字', value: '300' }
      ],
      loading: false,
      progressWidth: 0,
      loadingText: '',
      progressTimer: null,
      wordCount: 0,
      sentiment: 'neutral',
      keywords: [],
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
      this.loadingText = '正在生成文案，预计需要15-20秒...'
      
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
        ElMessage.warning("请填写完整信息！")
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
            url: "http://localhost:8080/api/content/generate-mimic",
            method: 'POST',
            data: requestData,
            timestamp: new Date().toISOString()
          })

          const response = await axios.post(
            "http://localhost:8080/api/content/generate-mimic", 
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
            throw new Error(response.data.message || '生成失败')
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
              message: `生成文案失败 (${error.response?.status || 'unknown'}): ${error.response?.data?.message || error.message}`,
              duration: 5000,
              showClose: true
            })
          } else {
            this.loadingText = `连接失败 (${error.response?.status || 'unknown'})，正在进行第${retryCount}次重试...`
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
      }
    },
    getSentimentText(sentiment) {
      const sentimentMap = {
        positive: '积极',
        neutral: '中性',
        negative: '消极'
      }
      return sentimentMap[sentiment] || '未知'
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
  padding: 30px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.flex-container {
  display: flex;
  gap: 30px;
}

.left-panel, .right-panel {
  flex: 1;
}

/* 输入区域样式 */
.template-textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.6;
}

/* 按钮样式 */
.scene-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.scene-button {
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.length-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.length-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.generate-button {
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 结果区域样式 */
.result-section {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
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
.scene-button.active,
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

/* 禁用状态样式 */
.generate-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 