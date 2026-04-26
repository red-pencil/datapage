// RDV - Language Switcher + Word Carousel

(function() {
  var i18n = {
    zh: {
      heroTitleFixed: "数据赋能",
      heroTitleWords: ["具身智能", "物理智能", "人工智能", "机器人", "一切", "未来"],
      cta: "了解更多",
      products: [
        { title: "数据采集", desc: "高效采集机器人设备数据，支持多种协议和格式" },
        { title: "智能处理", desc: "AI 驱动的智能数据处理和分析能力" },
        { title: "API 接口", desc: "标准化 RESTful API 接口，轻松集成" },
        { title: "即将推出", desc: "更多功能敬请期待..." }
      ],
      contact: "联系我们",
      footerCopyright: "© 2025 RDV. 保留所有权利。"
    },
    en: {
      heroTitleFixed: "Data Fuels",
      heroTitleWords: ["Physical AI", "Embodied AI", "Humanoid", "AI", "All", "Future"],
      cta: "Learn More",
      products: [
        { title: "Data Collection", desc: "Efficiently collect robot device data with multi-protocol support" },
        { title: "Smart Processing", desc: "AI-driven intelligent data processing and analytics" },
        { title: "API Interface", desc: "Standardized RESTful API for easy integration" },
        { title: "Coming Soon", desc: "More features to be announced..." }
      ],
      contact: "Contact",
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
  }

  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function cycleMedia() {
    var hero = document.getElementById('hero');
    var bg = document.getElementById('hero-bg');
    var video = document.getElementById('hero-video');
    var mediaBtn = document.getElementById('media-switch');
    
    currentMediaIndex = (currentMediaIndex + 1) % mediaModes.length;
    var mode = mediaModes[currentMediaIndex];
    
    if (bg) bg.classList.remove('active');
    if (video) video.classList.remove('active');
    
    if (mode === 'image' && bg) {
      bg.classList.add('active');
      hero.classList.add('has-bg');
    } else if (mode === 'video' && video) {
      video.classList.add('active');
      hero.classList.add('has-bg');
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

    var productItems = document.querySelectorAll('.product-item');
    for (var i = 0; i < t.products.length; i++) {
      if (productItems[i]) {
        var titleEl = productItems[i].querySelector('.product-title');
        var descEl = productItems[i].querySelector('.product-desc');
        if (titleEl) titleEl.textContent = t.products[i].title;
        if (descEl) descEl.textContent = t.products[i].desc;
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