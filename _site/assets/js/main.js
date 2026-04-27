// RDV - Language Switcher + Word Carousel

(function() {
  var i18n = {
    zh: {
      heroTitleFixed: "数据赋能",
      heroTitleWords: ["具身智能", "物理智能", "人工智能", "机器人", "一切", "未来"],
      cta: "了解更多",
      productsTitle: "我们的产品",
      productNames: "Egocentric Data / 动作捕捉 / Sim-to-Real",
      productDesc: "专为物理 AI 训练打造",
      featuresTitle: "我们的特色",
      feature1Title: "数据采集",
      feature1Item1: "多协议支持",
      feature1Item2: "实时采集",
      feature1Item3: "边缘计算",
      feature2Title: "智能处理",
      feature2Item1: "AI 分析",
      feature2Item2: "自动分类",
      feature2Item3: "模式识别",
      feature3Title: "安全",
      feature3Item1: "端到端加密",
      feature3Item2: "访问控制",
      feature3Item3: "审计日志",
      goalTitle: "我们的目标",
      goalDesc: "成为物理智能时代机器人数据基础设施的支柱。通过可靠的数据采集、处理和分析，让机器人能够学习、适应和进化。",
      newsTitle: "新闻动态",
      newsMore: "更多 →",
      readMore: "阅读全文 →",
      blogTitle: "博客",
      backToHome: "返回",
      contact: "联系我们",
      footerEmail: "becky@rdv.bot",
      footerPhone: "+1 234 567 890",
      footerAddress: "美国加利福尼亚州旧金山",
      footerCopyright: "© 2025 RDV. 保留所有权利。"
    },
    en: {
      heroTitleFixed: "Data Fuels",
      heroTitleWords: ["Physical AI", "Embodied AI", "Humanoid", "AI", "All", "Future"],
      cta: "Learn More",
      productsTitle: "Our Product",
      productNames: "Egocentric Data / Motion Capture / Sim-to-Real",
      productDesc: "Crafted for Physical AI Training",
      featuresTitle: "Our Feature",
      feature1Title: "Data Collection",
      feature1Item1: "Multi-protocol Support",
      feature1Item2: "Real-time Collection",
      feature1Item3: "Edge Computing",
      feature2Title: "Smart Processing",
      feature2Item1: "AI Analytics",
      feature2Item2: "Auto Classification",
      feature2Item3: "Pattern Recognition",
      feature3Title: "Security",
      feature3Item1: "End-to-end Encryption",
      feature3Item2: "Access Control",
      feature3Item3: "Audit Logging",
      goalTitle: "Our Goal",
      goalDesc: "To become the backbone of robotic intelligence by providing high-quality data infrastructure for the Physical AI era. We empower robots to learn, adapt, and evolve through reliable data collection, processing, and analytics.",
      newsTitle: "Our News",
      newsMore: "More →",
      readMore: "Read More →",
      blogTitle: "Blog",
      backToHome: "Back",
      contact: "Contact",
      footerEmail: "becky@rdv.bot",
      footerPhone: "+1 234 567 890",
      footerAddress: "San Francisco, CA, USA",
      footerCopyright: "© 2025 RDV. All rights reserved."
    }
  };

  var currentLang = 'en';
  var wordIndex = 0;
  var wordInterval = null;
  var mediaModes = ['image', 'video', 'none'];
  var currentMediaIndex = 0;

  function init() {
    var savedLang = localStorage.getItem('rdv-lang');
    if (savedLang) {
      currentLang = savedLang;
    } else {
      currentLang = navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en';
    }
    
    applyTranslations();
    startWordCarousel();
    updateLangSwitcher();
    initTheme();
    initHeaderScroll();
    
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    updateMediaForTheme(theme);
    
    var langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLangMenu);
    }
    
    var options = document.querySelectorAll('.lang-option');
    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', function(e) {
        var lang = this.getAttribute('data-lang');
        if (lang && lang !== currentLang) {
          currentLang = lang;
          localStorage.setItem('rdv-lang', currentLang);
          applyTranslations();
          updateLangSwitcher();
        }
        closeLangMenu();
      });
    }
    
    document.addEventListener('click', function(e) {
      var dropdown = document.querySelector('.lang-dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        closeLangMenu();
      }
    });
    
    var arrow = document.getElementById('hero-arrow');
    if (arrow) {
      arrow.addEventListener('click', scrollToProducts);
    }

    var mediaBtn = document.getElementById('media-switch');
    if (mediaBtn) {
      mediaBtn.onclick = function() {
        cycleMedia();
      };
    }

    document.onkeydown = function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        cycleMedia();
      }
    };
  }

  function toggleLangMenu(e) {
    e.stopPropagation();
    var menu = document.getElementById('lang-menu');
    if (menu) {
      menu.classList.toggle('show');
    }
  }

  function closeLangMenu() {
    var menu = document.getElementById('lang-menu');
    if (menu) {
      menu.classList.remove('show');
    }
  }

  function initTheme() {
    var savedTheme = localStorage.getItem('rdv-theme');
    var theme = savedTheme ? savedTheme : 'light';
    setTheme(theme);
    
    var themeBtn = document.getElementById('theme-switch');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rdv-theme', theme);
    
    var themeBtn = document.getElementById('theme-switch');
    if (themeBtn) {
      var icon = themeBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    }
    
    updateMediaForTheme(theme);
  }
  
  function updateMediaForTheme(theme) {
    var bgLight = document.getElementById('hero-bg-light');
    var bgDark = document.getElementById('hero-bg-dark');
    
    if (bgLight) bgLight.style.display = theme === 'light' ? 'block' : 'none';
    if (bgDark) bgDark.style.display = theme === 'dark' ? 'block' : 'none';
  }

  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function cycleMedia() {
    var hero = document.getElementById('hero');
    var bgLight = document.getElementById('hero-bg-light');
    var bgDark = document.getElementById('hero-bg-dark');
    var video = document.getElementById('hero-video');
    var mediaBtn = document.getElementById('media-switch');
    
    currentMediaIndex = (currentMediaIndex + 1) % mediaModes.length;
    var mode = mediaModes[currentMediaIndex];
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    
    if (bgLight) bgLight.classList.remove('active');
    if (bgDark) bgDark.classList.remove('active');
    if (video) video.classList.remove('active');
    
    if (mode === 'image') {
      if (theme === 'light' && bgLight) bgLight.classList.add('active');
      if (theme === 'dark' && bgDark) bgDark.classList.add('active');
      hero.classList.add('has-bg');
    } else if (mode === 'video') {
      if (theme === 'light' && video) {
        video.classList.add('active');
        hero.classList.add('has-bg');
      } else {
        hero.classList.remove('has-bg');
      }
    } else {
      hero.classList.remove('has-bg');
    }
    
    if (mediaBtn) {
      var icon = mediaBtn.querySelector('i');
      if (icon) {
        if (mode === 'image') icon.className = 'fa-solid fa-image';
        else if (mode === 'video') icon.className = 'fa-solid fa-video';
        else icon.className = 'fa-solid fa-square';
      }
    }
  }

  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    
    function getBgColor() {
      var theme = document.documentElement.getAttribute('data-theme');
      return theme === 'dark' ? '26, 26, 26' : '255, 255, 255';
    }
    
    function getBorderColor() {
      var theme = document.documentElement.getAttribute('data-theme');
      return theme === 'dark' ? '51, 51, 51' : '229, 229, 229';
    }
    
    window.addEventListener('scroll', function() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var threshold = window.innerHeight * 0.5;
      
      var opacity = Math.min(scrollY / threshold, 1);
      
      var bgColor = getBgColor();
      var borderColor = getBorderColor();
      
      header.style.background = 'rgba(' + bgColor + ', ' + opacity + ')';
      header.style.borderBottomColor = 'rgba(' + borderColor + ', ' + opacity + ')';
    }, { passive: true });
  }

  function startWordCarousel() {
    if (wordInterval) {
      clearInterval(wordInterval);
    }
    
    wordIndex = 0;
    updateCarouselWords();
    
    wordInterval = setInterval(rotateWord, 3000);
  }

  function rotateWord() {
    var words = i18n[currentLang].heroTitleWords;
    if (!words || words.length === 0) return;
    
    var currentEl = document.querySelector('.word-carousel .word.active');
    var nextEl = document.querySelector('.word-carousel .word.inactive');
    
    if (!currentEl || !nextEl) return;
    
    var nextIndex = (wordIndex + 1) % words.length;
    nextEl.textContent = words[nextIndex];
    
    currentEl.classList.remove('active');
    currentEl.classList.add('slide-out');
    
    nextEl.classList.remove('inactive');
    nextEl.classList.add('slide-in');
    
    setTimeout(function() {
      currentEl.classList.remove('slide-out');
      currentEl.classList.add('inactive');
      
      nextEl.classList.remove('slide-in');
      nextEl.classList.add('active');
      
      wordIndex = nextIndex;
    }, 800);
  }

  function updateCarouselWords() {
    var words = i18n[currentLang].heroTitleWords;
    if (!words) return;
    
    var activeEl = document.querySelector('.word-carousel .word.active');
    var inactiveEl = document.querySelector('.word-carousel .word.inactive');
    
    if (activeEl) activeEl.textContent = words[wordIndex];
    if (inactiveEl) inactiveEl.textContent = words[(wordIndex + 1) % words.length];
  }

  function updateLangSwitcher() {
    var options = document.querySelectorAll('.lang-option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('data-lang') === currentLang) {
        options[i].classList.add('active');
      } else {
        options[i].classList.remove('active');
      }
    }
    
    startWordCarousel();
  }

  function scrollToProducts() {
    var products = document.getElementById('products');
    if (products) {
      products.scrollIntoView({ behavior: 'smooth' });
    } else {
      var features = document.getElementById('features');
      if (features) {
        features.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function applyTranslations() {
    var t = i18n[currentLang];
    if (!t) return;

    var heroFixed = document.querySelector('.hero-fixed');
    if (heroFixed && t.heroTitleFixed) {
      heroFixed.textContent = t.heroTitleFixed;
    }

    wordIndex = 0;
    updateCarouselWords();

    var i18nElements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < i18nElements.length; i++) {
      var key = i18nElements[i].getAttribute('data-i18n');
      if (t[key]) {
        i18nElements[i].textContent = t[key];
      }
    }

    var contactTitle = document.querySelector('.footer-title');
    if (contactTitle) contactTitle.textContent = t.contact;

    var copyright = document.querySelector('.footer-copyright');
    if (copyright) copyright.textContent = t.footerCopyright;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();