import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      title: 'UGC-Content-Creator',
      linkGenerator: 'Link Generator',
      styleMimic: 'Style Mimic',
      contact: 'Contact Us',
      contactInfo: 'Email: 3022097366@qq.com',
      contactEmail: 'Email',
      contactPhone: 'Phone',
      contactDescription: 'If you have any suggestions or questions, please feel free to contact us. Let\'s make this website better together.'
    },
    link: {
      title: 'Link Style Generator',
      urlPlaceholder: 'Enter product URL',
      productInfo: {
        title: 'Product Title',
        price: 'Product Price',
        imageUrl: 'Image URL',
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
        label: 'Length',
        short: '100 words',
        medium: '200 words',
        long: '> 300 words'
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
        enterUrl: 'Please enter product URL!',
        manualInput: 'You can input manually',
        step1: 'Step 1: Enter the product link to get product information, or you can skip this step and manually enter product information in Step 2',
        step2: {
          initial: 'Step 2: You can manually input product title, price and image URL',
          failed: 'Step 2: Failed to fetch information, please manually input product title, price and image URL (image URL is optional)',
          incomplete: 'Step 2: Information incomplete, please input: ',
          success: 'Step 2: Information fetched successfully, you can proceed to step 3 to select style'
        },
        step3: 'Step 3: Please select your preferred content style'
      },
      error: {
        crawl: 'Failed to get product information, please fill in manually',
        generation: 'Failed to generate content, please try again later',
        copy: 'Failed to copy content'
      },
      validation: {
        incomplete: 'Please fill in all required information'
      },
      pageTitle: 'Link Style Generator',
      pageDescription: 'Transform your product links into engaging content. This tool helps you create professional and attractive product descriptions with just a few clicks.',
      stepsTitle: 'How to use:',
      step1: 'Enter your product URL and click "Get Product Info" to automatically fetch product details',
      step2: 'Review and edit the product information if needed',
      step3: 'Choose your preferred content style, length, and language',
      step4: 'Click "Generate Content" to create your customized product description',
      howToUse: 'How to use it'
    },
    style: {
      title: 'Style Mimic Generator',
      templatePlaceholder: 'Please enter your template text here',
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
      lengthLabel: 'Length',
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
      },
      pageTitle: 'Style Mimic Generator',
      pageDescription: 'Create content that matches your favorite writing style. Simply input a template text, and our AI will generate new content while maintaining the same tone and style.',
      stepsTitle: 'How to use:',
      step1: 'Enter your product URL and click "Get Product Info" to automatically fetch product details',
      step2: 'Review and edit the product information if needed',
      step3: 'Choose your preferred content style, length, and language',
      step4: 'Click "Generate Content" to create your customized product description',
      howToUse: 'How to use it'
    },
    common:{
      word: 'words',
      keyword: 'keyword',
      generate_fail: "generate the article failed",
      connect_fail: "connect the network failed",
      reconnect_num: "current number of connection",
      copy: 'Copy',
      copied: 'Copied'
    },
    home: {
      title: 'AI-Powered Content Creation',
      subtitle: 'Transform your product links into engaging content and mimic writing styles with AI assistance',
      features: {
        title: 'Our Features',
        link: {
          title: 'Link Style Generator',
          description: 'Convert product links into compelling content automatically',
          point1: 'Auto-extract product information',
          point2: 'Multiple style options',
          point3: 'Multilingual support'
        },
        style: {
          title: 'Style Mimic Generator',
          description: 'Create content that matches your favorite writing style',
          point1: 'Scene-based generation',
          point2: 'Customizable length',
          point3: 'Sentiment analysis'
        }
      },
      getStarted: 'Get Started'
    },
    footer: {
      copyright: 'UGC-Content-Creator, Inc. All rights reserved.',
      copyrightTip: 'All rights reserved. No reproduction without permission.',
      quickLinks: 'Quick Links',
      exploreMore: 'Explore More',
      connectWithUs: 'Connect with Us',
      recipes: 'Recipes',
      blog: 'Blog',
      about: 'About Us',
      products: 'Products',
      support: 'Support',
      careers: 'Careers',
      scrollToTop: 'Back to Top',
      contactUs: 'Contact Us'
    },
  },
  zh: {
    nav: {
      home: '首页',
      title: 'UGC内容创作器',
      linkGenerator: '链接生成',
      styleMimic: '风格仿写',
      contact: '联系我们',
      contactInfo: '邮箱：3022097366@qq.com',
      contactEmail: '邮箱',
      contactPhone: '电话',
      contactDescription: '如果您有任何建议和问题，欢迎联系我们，我们一起让这个网站变得更好'
    },
    link: {
      title: '链接样式生成器',
      urlPlaceholder: '请输入商品链接',
      productInfo: {
        title: '商品标题',
        price: '商品价格',
        imageUrl: '图片链接',
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
        short: '100字',
        medium: '200字',
        long: '>300字'
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
        enterUrl: '请输入商品链接！',
        manualInput: '您可以手动输入信息',
        step1: '步骤1：请输入商品链接获取商品信息，或者您可以跳过此步骤，在步骤2中手动输入商品信息',
        step2: {
          initial: '步骤2：你可以手动输入商品标题、价格和图片URL',
          failed: '步骤2：抓取信息失败，请手动输入商品标题、价格和图片URL，其中图片URL可选',
          incomplete: '步骤2：抓取信息缺失，请补充：',
          success: '步骤2：信息抓取成功，可直接在步骤三选择风格'
        },
        step3: '步骤3：请选择您想生成文案风格'
      },
      error: {
        crawl: '获取商品信息失败，请手动填写商品信息',
        generation: '生成爆款文案失败，请稍后重试',
        copy: '复制失败'
      },
      validation: {
        incomplete: '请填写完整信息'
      },
      pageTitle: '链接样式生成器',
      pageDescription: '将您的商品链接转化为吸引人的内容。这个工具可以帮助您只需点击几下，就能创建专业且有吸引力的商品描述。',
      stepsTitle: '使用步骤：',
      step1: '输入商品链接并点击"获取商品信息"自动获取商品详情',
      step2: '检查并根据需要编辑商品信息',
      step3: '选择您喜欢的文案风格、长度和语言',
      step4: '点击"生成爆款文案"创建您的定制商品描述',
      howToUse: '如何使用'
    },
    style: {
      title: '风格仿写生成器',
      templatePlaceholder: '请在这里输入模板文案',
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
      },
      pageTitle: '风格仿写生成器',
      pageDescription: '创建与您喜爱的写作风格相匹配的内容。只需输入模板文本，我们的AI就能生成保持相同语气和风格的新内容。',
      stepsTitle: '使用步骤：',
      step1: '输入商品链接并点击"获取商品信息"自动获取商品详情',
      step2: '检查并根据需要编辑商品信息',
      step3: '选择您喜欢的文案风格、长度和语言',
      step4: '点击"生成爆款文案"创建您的定制商品描述',
      howToUse: '如何使用'
    },
    common:{
      word: '字',
      keyword: '关键词',
      generate_fail: "生成爆款文案失败",
      connect_fail: "连接失败",
      reconnect_num: "当前连接请求次数",
      copy: '复制',
      copied: '已复制',
      network_error: '网络连接失败，请检查网络后重试',
      auth_error: '认证失败，请重新登录',
      permission_error: '没有操作权限',
      service_not_found: '服务未找到',
      server_error: '服务器错误，请稍后重试',
      unknown_error: '发生未知错误，请稍后重试'
    },
    home: {
      title: 'AI驱动的内容创作',
      subtitle: '将商品链接转化为吸引人的内容，用AI助手模仿写作风格',
      features: {
        title: '核心功能',
        link: {
          title: '链接样式生成器',
          description: '自动将商品链接转换为引人入胜的内容',
          point1: '自动提取商品信息',
          point2: '多种文案风格选择',
          point3: '多语言支持'
        },
        style: {
          title: '风格仿写生成器',
          description: '创建与您喜爱的写作风格相匹配的内容',
          point1: '场景化生成',
          point2: '自定义长度',
          point3: '情感倾向分析'
        }
      },
      getStarted: '立即开始'
    },
    footer: {
      copyright: 'UGC内容创作器。保留所有权利。',
      copyrightTip: '版权所有，未经许可不得转载',
      quickLinks: '快速链接',
      exploreMore: '更多探索',
      connectWithUs: '关注我们',
      recipes: '食谱',
      blog: '博客',
      about: '关于我们',
      products: '产品',
      support: '支持',
      careers: '招聘',
      scrollToTop: '回到顶部',
      contactUs: '联系我们'
    },
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
}) 