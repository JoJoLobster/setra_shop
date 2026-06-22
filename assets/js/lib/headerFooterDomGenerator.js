/**
 * 头部、Hero 横幅、底部统一生成器
 *
 * 依赖：assets/js/data/lang.js (obj_lang)
 *
 * 生成内容：
 *   1. 顶部信息条（电话/邮箱 + 语言切换）
 *   2. 主头部（Logo + 主导航 + 头部 CTA）
 *   3. 非首页：页面 hero 横幅（深蓝渐变 + 金色 eyebrow + 标题 + 副文 + 面包屑）
 *   4. 底部
 *
 * 多语言：通过 data-i18n / data-i18n-html 属性 + langchange 事件实时刷新。
 */

var obj_headerFooterDomGenerator = {};

// ------------ 简单图标 ------------
const ICON_PHONE = '<svg viewBox="0 0 24 24"><path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1C8.7 6.5 8.5 5.2 8.5 4c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-5-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/></svg>';
const ICON_MAIL  = '<svg viewBox="0 0 24 24"><path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>';
const ICON_PIN   = '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
const ICON_WHATSAPP = '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.4-1 1-1 2.4s1.1 2.7 1.2 2.9c.1.2 2.1 3.2 5 4.5 1.9.8 2.7.9 3.7.7.6-.1 1.7-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.2-.2-.5-.3z"/><path d="M20 4a10 10 0 0 0-15.6 12.4L3 21l4.7-1.4A10 10 0 1 0 20 4zm0 0M12 19.9c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.9.8-3-.2-.3a8 8 0 1 1 7.1 4z"/></svg>';

// ------------ 主入口：生成完整结构 ------------
obj_headerFooterDomGenerator.genHeader = function () {
    const d = obj_lang.getLangData();
    const mainBody = document.body;

    let existing = document.querySelector('.main-header');
    if (existing) return;

    let html = '';

    // 顶部信息条
    html += `
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="top-info">
          <span>${ICON_PHONE}<a href="tel:+8675527782265" data-i18n="topPhone">${d.topPhone}</a></span>
          <span>${ICON_MAIL}<a href="mailto:info@setra-ep.com" data-i18n="topEmail">${d.topEmail}</a></span>
          <span class="hide-on-mobile">${ICON_PIN}<span data-i18n="contactAddr">${d.contactAddr}</span></span>
        </div>
        <div id="lang-switch" role="tablist" aria-label="Language">
          <div data-lang="zh" role="tab">中文</div>
          <div data-lang="en" role="tab">English</div>
        </div>
      </div>
    </div>`;

    // 主头部
    html += `
    <header class="main-header">
      <div class="header-inner">
        <a class="logo-area" href="index.html" aria-label="${d.siteTitle}">
          <img src="assets/images/c/setra2.svg" alt="logo" class="logo-img">
          <span class="logo-text">
            <span class="logo-text-main" id="site-title" data-i18n="siteTitle">${d.siteTitle}</span>
            <span class="logo-text-sub" data-i18n="siteSlogan">${d.siteSlogan}</span>
          </span>
        </a>
        <nav class="main-nav" id="main-nav">
          <a href="index.html"     data-nav="index"     data-i18n="home">${d.home}</a>
          <a href="products.html"  data-nav="products"  data-i18n="products">${d.products}</a>
          <a href="strengths.html" data-nav="strengths" data-i18n="strengths">${d.strengths}</a>
          <a href="about.html"     data-nav="about"     data-i18n="about">${d.about}</a>
          <a href="contact.html"   data-nav="contact"   data-i18n="contact">${d.contact}</a>
        </nav>
        <a href="contact.html" class="header-cta" data-i18n="heroCtaContact">${d.heroCtaContact}</a>
        <button type="button" class="nav-toggle" aria-label="Toggle Menu" aria-expanded="false"><span></span></button>
      </div>
    </header>`;

    // 非首页 Hero（首页有自己的轮播 Hero）
    if (pageName !== 'index') {
        html += `
        <section class="page-hero" id="page-hero">
          <div class="page-hero-inner">
            <div class="eyebrow" id="hero-eyebrow"></div>
            <h1 id="hero-title"></h1>
            <p class="subtitle" id="hero-subtitle"></p>
            <nav class="breadcrumb" id="page-breadcrumb" aria-label="Breadcrumb"></nav>
          </div>
        </section>`;
    }

    mainBody.insertAdjacentHTML('afterbegin', html);
};

obj_headerFooterDomGenerator.genFooter = function () {
    if (document.getElementById('site-footer')) return;
    const d = obj_lang.getLangData();

    const html = `
    <footer id="site-footer">
      <div class="footer-grid">
        <div class="footer-col">
          <h5 data-i18n="footerAboutTitle">${d.footerAboutTitle}</h5>
          <p data-i18n="footerAboutDesc">${d.footerAboutDesc}</p>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footerLinksTitle">${d.footerLinksTitle}</h5>
          <ul class="footer-links">
            <li><a href="index.html"     data-i18n="home">${d.home}</a></li>
            <li><a href="products.html"  data-i18n="products">${d.products}</a></li>
            <li><a href="strengths.html" data-i18n="strengths">${d.strengths}</a></li>
            <li><a href="about.html"     data-i18n="about">${d.about}</a></li>
            <li><a href="contact.html"   data-i18n="contact">${d.contact}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footerContactTitle">${d.footerContactTitle}</h5>
          <ul class="footer-info-list">
            <li><a href="tel:+8675527782265" data-i18n="contactPhone">${d.contactPhone}</a></li>
            <li><a href="mailto:info@setra-ep.com" data-i18n="contactEmail">${d.contactEmail}</a></li>
            <li><span data-i18n="contactAddr">${d.contactAddr}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom" data-i18n="footerCopyright">${d.footerCopyright}</div>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', html);
};

// ------------ Hero / 面包屑 渲染 ------------
obj_headerFooterDomGenerator.renderHero = function () {
    const hero = document.getElementById('page-hero');
    if (!hero) return;

    const data = obj_lang.getHeroData();
    const d = obj_lang.getLangData();

    const eyebrowEl = document.getElementById('hero-eyebrow');
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');
    const breadcrumbEl = document.getElementById('page-breadcrumb');

    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;

    if (breadcrumbEl) {
        // 面包屑：Home / [products/strengths/about/contact] / [当前产品名（可选）]
        const segs = [`<a href="index.html">${data.breadcrumbHome}</a>`];
        const pageKey = pageName;
        // product 详情页：上一级是产品列表
        if (pageKey === 'product') {
            segs.push('<span class="sep">/</span>');
            segs.push(`<a href="products.html">${d.products}</a>`);
            segs.push('<span class="sep">/</span>');
            segs.push(`<span class="current" id="breadcrumb-current">${d.heroTitle.product}</span>`);
        } else if (pageKey === 'products') {
            segs.push('<span class="sep">/</span>');
            segs.push(`<span class="current">${d.products}</span>`);
        } else if (pageKey === 'strengths') {
            segs.push('<span class="sep">/</span>');
            segs.push(`<span class="current">${d.strengths}</span>`);
        } else if (pageKey === 'about') {
            segs.push('<span class="sep">/</span>');
            segs.push(`<span class="current">${d.about}</span>`);
        } else if (pageKey === 'contact') {
            segs.push('<span class="sep">/</span>');
            segs.push(`<span class="current">${d.contact}</span>`);
        }
        breadcrumbEl.innerHTML = segs.join(' ');
    }
};

// ------------ 高亮当前导航 ------------
obj_headerFooterDomGenerator.setActiveNav = function () {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    const map = {
        index: 'index',
        products: 'products',
        product: 'products',
        strengths: 'strengths',
        about: 'about',
        contact: 'contact'
    };
    const activeKey = map[pageName] || 'index';
    nav.querySelectorAll('a[data-nav]').forEach(a => {
        if (a.getAttribute('data-nav') === activeKey) a.classList.add('active');
        else a.classList.remove('active');
    });
};

// ------------ 语言切换按钮 ------------
obj_headerFooterDomGenerator.bindLangBtns = function () {
    const btns = document.querySelectorAll('#lang-switch div');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            obj_lang.setLang(btn.getAttribute('data-lang'));
        });
    });
};

obj_headerFooterDomGenerator.updateActiveLangBtn = function () {
    const lang = obj_lang.getLang();
    document.querySelectorAll('#lang-switch div').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
};

// ------------ 移动端导航开关 ------------
obj_headerFooterDomGenerator.bindNavToggle = function () {
    const btn = document.querySelector('.nav-toggle');
    const nav = document.getElementById('main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // 点击导航链接后自动收起
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
};

// ------------ 启动 ------------
obj_headerFooterDomGenerator.genHeader();
obj_headerFooterDomGenerator.genFooter();
obj_headerFooterDomGenerator.bindLangBtns();
obj_headerFooterDomGenerator.bindNavToggle();
obj_headerFooterDomGenerator.setActiveNav();

// 监听 langchange，刷新 Hero / 当前选中
window.addEventListener('langchange', () => {
    obj_headerFooterDomGenerator.updateActiveLangBtn();
    obj_headerFooterDomGenerator.renderHero();
});

// 初次渲染
obj_lang.renderLang();
obj_headerFooterDomGenerator.updateActiveLangBtn();
obj_headerFooterDomGenerator.renderHero();
