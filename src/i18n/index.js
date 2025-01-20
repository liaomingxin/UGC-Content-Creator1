import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      title: 'UGC-Content-Creator',
      linkGenerator: 'Link Generator',
      styleMimic: 'Style Mimic'
    },
    link: {
      title: 'Link Style Generator',
      urlPlaceholder: 'Enter product URL',
      productInfo: {
        title: 'Product Title',
        price: 'Product Price',
        imageUrl: 'Product Image URL',
        titlePlaceholder: 'Please enter product title',
        pricePlaceholder: 'Please enter product price',
        imagePlaceholder: 'Please enter product image URL'
      },
      button: {
        crawl: 'Get Product Info',
        generate: 'Generate Content',
        copy: 'Copy',
        copied: 'Copied'
      },
      style: {
        label: 'Style',
        professional: 'Professional',
        casual: 'Casual',
        humorous: 'Humorous',
        elegant: 'Elegant'
      },
      length: {
        label: 'Content Length',
        short: 'Short (within 100 words)',
        medium: 'Medium (about 200 words)',
        long: 'Long (over 300 words)'
      },
      language: {
        label: 'Language',
        zh: 'Chinese',
        en: 'English',
        jp: 'Japanese'
      },
      loading: {
        crawl: 'Getting product information, please wait 3-5 seconds',
        generate: 'Generating content, please wait 3-5 seconds'
      },
      hint: {
        noTitle: 'Title information not obtained, please add',
        noPrice: 'Price information not obtained, please add',
        noImage: 'Image information not obtained, please add',
        enterUrl: 'Please enter product URL!'
      },
      error: {
        crawl: 'Failed to get product information, please fill in manually',
        generation: 'Failed to generate content, please try again later',
        copy: 'Failed to copy content'
      },
      validation: {
        incomplete: 'Please fill in all required information'
      }
    },
    style: {
      title: 'Style Mimic Generator',
      templatePlaceholder: 'Enter template text',
      sceneLabel: 'Scene Selection',
      scenes: {
        default: 'default',
        beauty: 'beauty',
        fashion: 'fashion',
        home: 'home',
        fitness: 'fitness',
        travel: 'travel',
        food: 'food',
        emotion: 'emotion'
      },
      lengthLabel: 'Content Length',
      lengths: {
        words40: '40 words',
        words50: '50 words',
        words100: '100 words',
        words200: '200 words',
        words300: '300 words'
      },
      loading: {
        crawl: 'Getting product information, please wait 3-5 seconds',
        generate: 'Generating content, please wait 3-5 seconds'
      },
      button: {
        generate: 'Generate',
        copy: 'Copy',
        copied: 'Copied'
      },
      sentiment:{
        positive: 'positive',
        neutral: 'positive',
        negative: 'positive',
        unknown: 'unknown'
      },
      analysis: {
        wordCount: 'Word Count',
        sentiment: 'Sentiment Analysis'
      }
    },
    common:{
      word: 'words',
      keyword: 'keyword',
      generate_fail: "generate the article failed",
      connect_fail: "connect the network failed",
      reconnect_num: "current number of connection"
    }
  },
  zh: {
    nav: {
      title: 'UGC内容创作器',
      linkGenerator: '链接生成',
      styleMimic: '风格仿写'
    },
    link: {
      title: '链接样式生成器',
      urlPlaceholder: '请输入商品链接',
      productInfo: {
        title: '商品标题',
        price: '商品价格',
        imageUrl: '商品图片链接',
        titlePlaceholder: '请输入商品标题',
        pricePlaceholder: '请输入商品价格',
        imagePlaceholder: '请输入商品图片链接'
      },
      button: {
        crawl: '获取商品信息',
        generate: '生成爆款文案',
        copy: '复制',
        copied: '已复制'
      },
      style: {
        label: '文案风格',
        professional: '专业正式',
        casual: '轻松随意',
        humorous: '幽默诙谐',
        elegant: '优雅格调'
      },
      length: {
        label: '文案长度',
        short: '简短(100字内)',
        medium: '适中(200字左右)',
        long: '详细(300字以上)'
      },
      language: {
        label: '语言选择',
        zh: '中文',
        en: '英文',
        jp: '日文'
      },
      loading: {
        crawl: '请稍等，正在获取商品信息，约需3~5秒',
        generate: '请稍等，正在生成爆款文案，约需3~5秒'
      },
      hint: {
        noTitle: '暂未获取标题信息，请您补充',
        noPrice: '暂未获取价格信息，请您补充',
        noImage: '暂未获取图片信息，请您补充',
        enterUrl: '请输入商品链接！'
      },
      error: {
        crawl: '获取商品信息失败，请手动填写商品信息',
        generation: '生成爆款文案失败，请稍后重试',
        copy: '复制失败'
      },
      validation: {
        incomplete: '请填写完整信息'
      }
    },
    style: {
      title: '风格仿写生成器',
      templatePlaceholder: '请输入模板文本',
      sceneLabel: '场景选择',
      scenes: {
        default: '默认场景',
        beauty: '美妆场景',
        fashion: '穿搭场景',
        home: '家居场景',
        fitness: '健身场景',
        travel: '旅行场景',
        food: '美食场景',
        emotion: '情感场景'
      },
      lengthLabel: '文案长度',
      lengths: {
        words40: '40字',
        words50: '50字',
        words100: '100字',
        words200: '200字',
        words300: '300字'
      },
      loading: {
        crawl: '请稍等，正在获取商品信息，约需3~5秒',
        generate: '请稍等，正在生成爆款文案，约需3~5秒'
      },
      button: {
        generate: '生成爆款文案',
        copy: '复制',
        copied: '已复制'
      },
      sentiment:{
        positive: '积极',
        neutral: '中性',
        negative: '消极',
        unknown: '未知'
      },
      analysis: {
        wordCount: '字数统计',
        sentiment: '情感倾向'
      }
    },
    common:{
      word: '字',
      keyword: '关键词',
      generate_fail: "生成爆款文案失败",
      connect_fail: "连接失败",
      reconnect_num: "当前连接请求次数",
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
}) 