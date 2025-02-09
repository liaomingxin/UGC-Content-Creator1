<template>
  <div class="home-container">
    <!-- 主要标题区域 -->
    <div class="hero-section">
      <h1 class="hero-title">{{ t('home.title') }}</h1>
      <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
    </div>

    <!-- 主要功能介绍 -->
    <div class="main-features1">
      <div class="feature-block" @click="$emit('change-tab', 'link')">
        <h2>{{ t('home.features.link.title') }}</h2>
        <p>{{ t('home.features.link.description') }}</p>
      </div>

      <div class="feature-block" @click="$emit('change-tab', 'style')">
        <h2>{{ t('home.features.style.title') }}</h2>
        <p>{{ t('home.features.style.description') }}</p>
      </div>
    </div>

    <!-- 分割线 -->
    <hr class="divider" />
    <div class="innovation-title">
        <h2>专注国产远程控制自主创新</h2>
    </div>

    <!-- link区域介绍 -->
    <div class="innovation-section">
        <div class="innovation-text">
          <h2>{{ t('home.features.link.title') }}</h2>
            <p>{{ t('home.features.link.description') }}</p>
            <div class="feature-highlights">
            <div class="highlight-item">
                <span class="highlight-icon">🎯</span>
                <span>{{ t('home.features.link.point1') }}</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">✨</span>
                <span>{{ t('home.features.link.point2') }}</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">🌍</span>
                <span>{{ t('home.features.link.point3') }}</span>
            </div>
            </div>
          <button class="start-button" @click="$emit('change-tab', 'link')">
            {{ t('home.getStarted') }}
          </button>
        </div>
        <div class="innovation-image">
          <img src="@/assets/log1.png" alt="远程控制技术" />
        </div>
    </div>


    <div class="innovation-title2">
        <h2>专注国产远程控制自主创新2</h2>
      </div>

    <!-- link区域介绍 -->
    <div class="innovation-section">
        <div class="innovation-image">
          <img src="@/assets/log1.png" alt="远程控制技术" />
        </div>
        <div class="innovation-text">
          <h2>{{ t('home.features.link.title') }}</h2>
            <p>{{ t('home.features.link.description') }}</p>
            <div class="feature-highlights">
            <div class="highlight-item">
                <span class="highlight-icon">🎯</span>
                <span>{{ t('home.features.link.point1') }}</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">✨</span>
                <span>{{ t('home.features.link.point2') }}</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">🌍</span>
                <span>{{ t('home.features.link.point3') }}</span>
            </div>
            </div>
          <button class="start-button" @click="$emit('change-tab', 'link')">
            {{ t('home.getStarted') }}
          </button>
        </div>
    </div>


    <!-- 新的四列页脚设计 -->
    <footer class="footer">
      <div class="footer-container">
        <!-- 第一列：Logo和版权信息 -->
        <div class="footer-column brand-column">
          <div class="footer-logo">
            <svg class="footprint-icon" viewBox="0 0 24 24" width="32" height="32">
              <path fill="currentColor" d="M12 1c-3.3 0-6 2.7-6 6v2c0 1.1.9 2 2 2s2-.9 2-2V7c0-.6.4-1 1-1s1 .4 1 1v2c0 1.1.9 2 2 2s2-.9 2-2V7c0-.6.4-1 1-1s1 .4 1 1v2c0 1.1.9 2 2 2s2-.9 2-2V7c0-3.3-2.7-6-6-6z"/>
            </svg>
          </div>
          <p class="copyright">© {{ currentYear }} {{ t('footer.copyright') }}</p>
        </div>

        <!-- 第二列：Quick Links -->
        <div class="footer-column">
          <h3 class="footer-title">{{ t('footer.quickLinks') }}</h3>
          <nav class="footer-links">
            <a href="#" @click.prevent="$emit('change-tab', 'home')">{{ t('nav.home') }}</a>
            <a href="#" @click.prevent="$emit('change-tab', 'recipes')">{{ t('footer.recipes') }}</a>
            <a href="#" @click.prevent="$emit('change-tab', 'blog')">{{ t('footer.blog') }}</a>
            <a href="#" @click.prevent="$emit('change-tab', 'shop')">{{ t('footer.shop') }}</a>
          </nav>
        </div>

        <!-- 第三列：Explore More -->
        <div class="footer-column">
          <h3 class="footer-title">{{ t('footer.exploreMore') }}</h3>
          <nav class="footer-links">
            <a href="#" @click.prevent="$emit('change-tab', 'about')">{{ t('footer.about') }}</a>
            <a href="#" @click.prevent="$emit('change-tab', 'products')">{{ t('footer.products') }}</a>
            <a href="#" @click.prevent="$emit('change-tab', 'support')">{{ t('footer.support') }}</a>
            <a href="#" @click.prevent="$emit('change-tab', 'careers')">{{ t('footer.careers') }}</a>
          </nav>
        </div>

        <!-- 第四列：Connect with Us -->
        <div class="footer-column">
          <h3 class="footer-title">{{ t('footer.connectWithUs') }}</h3>
          <nav class="footer-links">
            <a href="#" target="_blank" rel="noopener">Facebook</a>
            <a href="#" target="_blank" rel="noopener">Instagram</a>
            <a href="#" target="_blank" rel="noopener">Twitter</a>
            <a href="#" target="_blank" rel="noopener">Pinterest</a>
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px; /* 可以根据需要调整 */
  margin: 0px auto; /* 设置上下边距 */
  padding: 30px 20px;
}

.hero-section {
  text-align: center;
  margin: 0; /* 设置上边距为0 */
  padding: 40px 0;
  /* background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(0, 198, 255, 0.1) 100%); */
  border-radius: 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.start-button {
  background: linear-gradient(135deg, #007AFF 0%, #00C6FF 100%);
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: 600;
  margin-top: 10px;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 122, 255, 0.3);
}

.main-features1 {
  max-width: 70%; /* 设置宽度为50% */
  margin: 0 auto; /* 居中对齐 */
  display: flex; /* 使用 flexbox 布局 */
  justify-content: space-between; /* 在主轴上均匀分配空间 */
  gap: 20px; /* 设置间距 */
}

.divider {
  border: 0.5px solid rgb(194, 193, 193); /* 设置分割线的颜色为灰色 */
  margin: 80px 40px 0 0; /* 设置上下间距 */
}

.main-features {
  max-width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 60px;
}

.feature-block {
  background: white;
  padding: 10px 30px; /* 减小上下内边距，增加左右内边距 */
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.feature-block:hover {
  transform: translateY(-5px);
}

.feature-block h2 {
  font-size: 1.2rem;
  color: blue; /* 设置颜色为蓝色 */
  margin-bottom: 20px;
  font-weight: 700;
}

.feature-block p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.feature-highlights {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #444;
}

.highlight-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 122, 255, 0.1);
  border-radius: 50%;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    padding: 0 20px;
  }
}

/* 新的页脚样式 */
.footer {
  margin-top: 60px;
  padding: 20px 0;
  /* background: white; */
  border-top: 0.5px solid rgb(194, 193, 193);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
}

.brand-column {
  padding-right: 40px;
}

.footer-logo {
  margin-bottom: 20px;
}

.footprint-icon {
  color: #333;
}

.copyright {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.footer-title {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  width: fit-content;
}

.footer-links a:hover {
  color: #333;
  text-decoration: underline;
}

@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 40px 20px;
  }

  .brand-column {
    grid-column: 1 / -1;
    padding-right: 0;
    text-align: center;
  }

  .footer-logo {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 40px 0;
  }

  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-links {
    align-items: center;
  }
}

.innovation-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: white; 背景为纯白色 */
  padding: 0 10px; /* 内边距 */
  border-radius: 10px;
  margin-top: 0; /* 与上方内容的间距 */
  gap: 50px; /* 设置间距 */
}

.innovation-title {
  display: block;          /* 移除 flex */
  text-align: center;      /* 纯文本水平居中 */
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  padding: 5px; /* 内边距 */
  margin-top: 70px;
}

.innovation-title2 {
  display: block;          /* 移除 flex */
  text-align: center;      /* 纯文本水平居中 */
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  padding: 5px; /* 内边距 */
  margin-top: 80px;
}

.quote-icon {
  color: orange; /* 引号颜色 */
  font-size: 2rem; /* 引号大小 */
  margin: 0 10px; /* 引号与标题的间距 */
}

.innovation-text {
  width: 90%; /* 文本区域宽度 */
  padding-left: 15px;
}

.innovation-text h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
}

.innovation-text p {
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
}

.innovation-image img {
  max-width: 95%; /* 图片自适应宽度 */
  height: auto; /* 高度自适应 */
  padding-right: 10px;
}
</style>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'HomePage',
  emits: ['change-tab'],
  setup() {
    const { t } = useI18n()
    const currentYear = computed(() => new Date().getFullYear())
    return { t, currentYear }
  }
}
</script> 