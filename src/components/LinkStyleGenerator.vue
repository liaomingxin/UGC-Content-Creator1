<template>
  <div class="card">
    <!-- 用户输入框 -->
    <input v-model="userInput" class="input" placeholder="请输入您的问题" />

    <!-- 风格选择 -->
    <div class="form-group">
      <label for="style">选择风格：</label>
      <select v-model="selectedStyle" id="style" class="select">
        <option value="">请选择风格</option>
        <option value="style1">风格 1</option>
        <option value="style2">风格 2</option>
      </select>
    </div>

    <!-- 文案长度选择 -->
    <div class="form-group">
      <label>选择文案长度：</label>
      <input type="radio" id="short" value="short" v-model="selectedLength" />
      <label for="short">短文案</label>

      <input type="radio" id="long" value="long" v-model="selectedLength" />
      <label for="long">长文案</label>
    </div>

    <!-- 生成文案按钮 -->
    <button @click="generateText" :disabled="loading">
      {{ loading ? "生成中..." : "生成文案" }}
    </button>

    <!-- 加载动画 -->
    <div v-if="loading" class="loader"></div>

    <!-- 文案展示，带 Vue.js 过渡效果 -->
    <transition name="fade">
      <div v-if="responseText" class="response">
        <h3>生成的文案:</h3>
        <p>{{ responseText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInput: "", // 用户输入内容
      selectedStyle: "", // 风格选择
      selectedLength: "", // 文案长度选择
      responseText: "", // 接收到的文案结果
      loading: false, // 加载状态
    };
  },
  methods: {
    async generateText() {
      if (!this.userInput) {
        alert("请输入内容！");
        return;
      }
      this.loading = true; // 开启加载状态
      try {
        // 向后端发送请求
        const response = await axios.post("http://127.0.0.1:5000/generate-text", {
          userMessage: this.userInput,
          style: this.selectedStyle,
          length: this.selectedLength,
        });

        // 获取生成的文案
        this.responseText = response.data.generatedText;
      } catch (error) {
        console.error("请求失败：", error);
        alert("生成失败，请稍后重试！");
      } finally {
        this.loading = false; // 关闭加载状态
      }
    },
  },
};
</script>

<style scoped>
/* 卡片样式 */
.card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  animation: fadeIn 1s ease-in-out; /* 渐入动画 */
}

/* 输入框样式 */
.input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 下拉框样式 */
.select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 按钮样式 */
button {
  background-color: #ff5f7f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #ff789a;
  transform: scale(1.05);
}

/* 加载动画 */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff5f7f;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 10px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 文案响应样式 */
.response {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Vue.js 过渡效果样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
