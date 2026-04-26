// RDV - Language Switcher (Auto-detect + Manual)

(function() {
  //Translations
  const i18n = {
    zh: {
      heroTitle: "Ego data for Robot",
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
      heroTitle: "Ego data for Robot",
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

  let currentLang = 'en';

  //Init
  function init() {
    //Detect browser language
    const savedLang = localStorage.getItem('rdv-lang');
    if (savedLang) {
      currentLang = savedLang;
    } else {
      currentLang = navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en';
    }
    
    // Apply translations
    applyTranslations();
    
    // Update lang switcher UI
    updateLangSwitcher();
    
    // Add event listener for language switch
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }
    
    // Add event listener for scroll arrow
    const arrow = document.getElementById('hero-arrow');
    if (arrow) {
      arrow.addEventListener('click', scrollToProducts);
    }
  }

  function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('rdv-lang', currentLang);
    applyTranslations();
    updateLangSwitcher();
  }

  function updateLangSwitcher() {
    const btn = document.getElementById('lang-switch');
    if (!btn) return;
    
    // Toggle between globe (EN) and comments (ZH) icons
    btn.innerHTML = currentLang === 'zh' 
      ? '<i class="fa-solid fa-comments"></i>' 
      : '<i class="fa-solid fa-globe"></i>';
  }

  function scrollToProducts() {
    const products = document.getElementById('products');
    if (products) {
      products.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function applyTranslations() {
    const t = i18n[currentLang];
    if (!t) return;

    // Hero
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = t.heroTitle;

    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) heroCta.textContent = t.cta;

    // Products
    const productItems = document.querySelectorAll('.product-item');
    t.products.forEach((p, index) => {
      if (productItems[index]) {
        const titleEl = productItems[index].querySelector('.product-title');
        const descEl = productItems[index].querySelector('.product-desc');
        if (titleEl) titleEl.textContent = p.title;
        if (descEl) descEl.textContent = p.desc;
      }
    });

    // Footer
    const contactTitle = document.querySelector('.footer-title');
    if (contactTitle) contactTitle.textContent = t.contact;

    const copyright = document.querySelector('.footer-copyright');
    if (copyright) copyright.textContent = t.footerCopyright;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();