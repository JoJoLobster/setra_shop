/**
 * 多语言 / i18n 框架
 *
 * 用法：
 *   - 任意元素加 data-i18n="key"            -> textContent = t(key)
 *   - 任意元素加 data-i18n-html="key"       -> innerHTML  = t(key)
 *   - 任意元素加 data-i18n-attr="attr:key"  -> el.setAttribute(attr, t(key))  支持多组逗号分隔
 *
 * 切换语言：obj_lang.setLang('zh' | 'en')
 *  -> 触发自定义事件 'langchange' (window.dispatchEvent)，事件 detail = { lang, data }
 *  -> 自动遍历 DOM 完成所有 data-i18n* 的实时刷新
 *
 * 各页面 JS 应监听 langchange 事件来刷新动态生成的内容，而不是再去维护
 * registerLangReRenderFunction 的形式（保留向后兼容）。
 */

var obj_lang = {};
var pageName = (typeof pageName !== 'undefined' && pageName) ? pageName : 'index';

// --- 向后兼容（旧 API）---
const langReRenderFunctions = {};
function registerLangReRenderFunction(name, func) {
    langReRenderFunctions[name] = func;
}
function unregisterLangReRenderFunction(name) {
    delete langReRenderFunctions[name];
}

obj_lang.langData = {
    zh: {
        // 站点信息
        siteTitle: '深圳市西特新环保材料有限公司',
        siteTitleShort: '西特新环保',
        siteSlogan: '专注电镀添加剂研发 · 16 年行业经验',

        // 导航
        home: '首页',
        products: '我们的产品',
        strengths: '我们的强项',
        about: '关于我们',
        contact: '联系我们',

        // 顶部联系条
        topPhone: '0755-27782265',
        topMobile: '13724351021',
        topEmail: 'info@setra-ep.com',

        // 页面 Hero (eyebrow / title / subtitle)
        heroEyebrow: {
            index: 'SETRA · 深圳西特新环保材料',
            products: '产品中心',
            product: '产品详情',
            strengths: '我们的优势',
            about: '关于西特',
            contact: '联系西特'
        },
        heroTitle: {
            index: '专业电镀添加剂研发与生产专家',
            products: '高品质化工与电镀添加剂',
            product: '产品详情',
            strengths: '我们的核心优势',
            about: '深圳市西特新环保材料有限公司',
            contact: '联系我们 · 携手共赢'
        },
        heroSubtitle: {
            index: '面向电子、五金、塑胶、PCB / FPC 全制程提供铜、镍、锡、银、金等系列添加剂、保护剂及定制化电镀工艺方案。',
            products: '覆盖无气电镀、五金 / 塑胶电镀系列、PCB/FPC 电镀、中间体、特殊添加剂与后处理保护系列。',
            product: '查看产品规格、应用领域与技术参数。',
            strengths: '专注镀铜研发、品质保障、专业服务，与全球客户共同成长。',
            about: '专注电镀添加剂研发、生产与销售的高新技术企业。',
            contact: '电话 / 邮箱 / 地址，欢迎随时与我们取得联系。'
        },
        // 面包屑
        breadcrumbHome: '首页',

        // 首页
        heroCtaProducts: '查看产品',

        homeAboutEyebrow: '关于我们',
        homeAboutTitle: '16+ 年深耕电镀化学品行业',
        homeAboutDesc: '我们是专业的电镀添加剂研发生产单位，从事电子、五金、塑胶、PCB、FPC 电镀化学镀工艺全制程配套添加剂；铜、镍、锡、银、金等添加剂、保护剂，提供特殊电镀工艺及产品配方开发。',
        homeAboutMore: '了解更多',

        homeProductsEyebrow: '产品中心',
        homeProductsTitle: '我们的产品与解决方案',
        homeProductsDesc: '覆盖多个行业的专业电镀化学品与解决方案。',
        homeProductsMore: '浏览全部产品',

        homeStrengthsEyebrow: '为什么选择我们',
        homeStrengthsTitle: '客户信赖的电镀化学品制造商',

        // 统计
        statYears: '行业经验',
        statClients: '合作客户',
        statQuality: '材料品质',
        statCountries: '出口国家',
        statYearsSuffix: '年+',
        statClientsSuffix: '家+',
        statQualitySuffix: '%',
        statCountriesSuffix: '+',

        // CTA section
        ctaTitle: '需要专业的电镀方案？',
        ctaDesc: '欢迎拨打技术热线，让我们的工程师为您量身定制电镀工艺与产品配方。',
        ctaButton: '立即咨询',

        // About 页
        aboutTitle: '公司简介',
        aboutDesc: `
            <p>深圳市西特新环保材料有限公司是专业电镀添加剂研发生产单位，从事电子、五金、塑胶、PCB、FPC 电镀化学镀工艺全制程配套添加剂；铜、镍、锡、银、金等添加剂、保护剂，提供特殊电镀工艺及产品配方开发。</p>
            <p>公司特色产品：<span class="highlight">碱铜、无氰碱铜、焦铜、酸铜</span>（原装德系酸铜、原装日系酸铜，均可代替德国日本品牌酸铜）。公司研发无阳极泥酸铜添加剂均可应用于五金、塑胶、PCB / FPC 电镀，节约阳极消耗、节约生产成本、提高生产效率、延长生产维护周期。无氰碱铜完全取代氰化物，效果显著、性能稳定。</p>
            <p>我们热忱期待着为您提供优质的产品和专业的服务！本着用户至上、信誉第一的宗旨，不断创新、与时俱进的理念热忱服务于每一位客户。</p>
            <p><strong>深圳西特，专注镀铜研发！</strong></p>
            <p>产品详情欢迎致电 +086-0755-27782265，新产品开发与技术支持请致电 +086 13724351021。</p>
        `,

        // 强项
        strengthsTitle: '我们的强项',
        strengthsList: ['专注镀铜研发', '高品质产品保障', '完善的售后服务', '丰富的行业经验'],
        strengthsDesc: ['16+ 年专注于镀铜及电镀添加剂研发，多项核心配方自主可控。', '严格的原料筛选与多道工序质量管控，确保每一批次稳定一致。', '专业工程师团队提供工艺调试、现场诊断与全流程技术服务。', '服务于电子、五金、塑胶、PCB / FPC 等多个行业的优质客户。'],

        // 联系
        contactTitle: '联系我们',
        contactPhoneLabel: '电话',
        contactEmailLabel: '邮箱',
        contactAddrLabel: '公司地址',
        contactWhatsappLabel: 'WhatsApp',
        contactWhatsappValue: '在线咨询',
        contactDesc: '如有任何关于化工产品的需求或疑问，欢迎随时联系我们，我们将竭诚为您服务！',
        contactPhone: '13724351021 / 0755-27782265',
        contactEmail: 'info@setra-ep.com',
        contactAddr: '深圳市松岗镇江边工业一路 9 号',

        // 产品列表
        productsTitle: '产品列表',
        categoriesTitle: '产品分类',
        all: '全部',
        view: '查看详情',
        searchPlaceholder: '按产品名称搜索',
        searchButton: '搜索',
        emptyResult: '未找到相关产品',

        // 产品详情
        productDescTitle: '产品描述',
        productSpecsTitle: '产品规格',
        productCategoryLabel: '产品分类',
        productPriceLabel: '价格',
        productIdLabel: '产品编号',
        productPackageLabel: '包装规格',
        productStorageLabel: '储存条件',
        productShelfLabel: '保质期',
        productPackageDefault: '标准包装',
        productStorageDefault: '常温储存',
        productShelfDefault: '长期有效',
        productNotFound: '未找到该商品',
        productNoDesc: '暂无详细描述',
        productCurrency: '元',
        backToList: '返回产品列表',

        // 首页 services / profile（保留）
        homeProfileTitle: '公司简介',
        homeProfileContent: '我们自豪地介绍自己是深圳西特新环保材料有限公司，是电镀添加剂、保护剂系列等领先制造商之一，拥有设备齐全的工厂和专业的化学师团队。',
        homeProfileList: [
            '<strong>成立年份：</strong>2009',
            '<strong>主营业务：</strong>专业电镀添加剂研发生产，自 2009 年起在行业内享有良好口碑。',
            '<strong>核心实力：</strong>100+ 种高品质产品，技术持续迭代，成绩显著。',
            '<strong>市场覆盖：</strong>业务覆盖中国及海外多个国家与地区。'
        ],
        homeServicesTitle: '我们的产品与服务',
        homeServicesList: [
            '无气电镀',
            '五金电镀系列',
            '塑胶电镀系列',
            'PCB / FPC 电镀',
            '中间体系列',
            '特殊添加剂',
            '后处理保护系列'
        ],

        // Footer
        footerAboutTitle: '关于西特',
        footerAboutDesc: '深圳市西特新环保材料有限公司专注电镀添加剂研发、生产与销售，为客户提供优质化工产品与专业的工艺服务。',
        footerLinksTitle: '快速链接',
        footerContactTitle: '联系方式',
        footerCopyright: 'Copyright © 2025 SETRA New Environmental Protection Material Co., Ltd. 版权所有。',
        footerICP: ''
    },

    en: {
        siteTitle: 'SETRA New Environmental Protection Material Co., Ltd.',
        siteTitleShort: 'SETRA',
        siteSlogan: 'Focused on plating additives R&D · 16+ years experience',

        home: 'Home',
        products: 'Our Products',
        strengths: 'Our Strengths',
        about: 'About Us',
        contact: 'Contact Us',

        topPhone: '0755-27782265',
        topMobile: '13724351021',
        topEmail: 'info@setra-ep.com',

        heroEyebrow: {
            index: 'SETRA · Shenzhen Xite New EP Material',
            products: 'Our Products',
            product: 'Product Details',
            strengths: 'Our Strengths',
            about: 'About SETRA',
            contact: 'Get in Touch'
        },
        heroTitle: {
            index: 'Professional Electroplating Additive Manufacturer',
            products: 'High-Quality Chemicals & Plating Additives',
            product: 'Product Details',
            strengths: 'Why Customers Choose Us',
            about: 'Shenzhen Xite New EP Material',
            contact: 'Contact Us · Let’s Work Together'
        },
        heroSubtitle: {
            index: 'Full-process additives, protectants and custom plating formulations for electronics, hardware, plastics and PCB / FPC industries — covering copper, nickel, tin, silver and gold.',
            products: 'No-air plating, hardware / plastic plating, PCB / FPC plating, intermediates, special additives and post-treatment protection series.',
            product: 'Product specifications, applications and technical parameters.',
            strengths: 'Specialized copper plating R&D, quality assurance and professional service for our global customers.',
            about: 'A high-tech enterprise specializing in R&D, manufacturing and sales of plating chemicals.',
            contact: 'Phone, email or address — we are always ready to help.'
        },
        breadcrumbHome: 'Home',

        heroCtaProducts: 'View Products',

        homeAboutEyebrow: 'About Us',
        homeAboutTitle: '16+ Years in the Plating Chemistry Industry',
        homeAboutDesc: 'We are a professional R&D and manufacturer of plating additives, providing full-process additives for electronics, hardware, plastics, PCB and FPC plating — including copper, nickel, tin, silver and gold systems, protectants and custom formulations.',
        homeAboutMore: 'Learn more',

        homeProductsEyebrow: 'Products',
        homeProductsTitle: 'Our Products & Solutions',
        homeProductsDesc: 'Professional plating chemicals and solutions covering multiple industries.',
        homeProductsMore: 'Browse All Products',

        homeStrengthsEyebrow: 'Why Choose Us',
        homeStrengthsTitle: 'A Trusted Plating Chemicals Partner',

        statYears: 'Years of Experience',
        statClients: 'Happy Clients',
        statQuality: 'Material Quality',
        statCountries: 'Export Countries',
        statYearsSuffix: '+',
        statClientsSuffix: '+',
        statQualitySuffix: '%',
        statCountriesSuffix: '+',

        ctaTitle: 'Need a tailored plating solution?',
        ctaDesc: 'Call our technical hotline and let our engineers design the process and formulation that fits your line.',
        ctaButton: 'Inquire Now',

        aboutTitle: 'Company Profile',
        aboutDesc: `
            <p>Shenzhen Xite New Environmental Protection Material Co., Ltd. is a specialized R&amp;D and manufacturer of plating additives. We supply full-process additives for electroplating and chemical plating in electronics, hardware, plastics, PCB and FPC industries — including copper, nickel, tin, silver and gold systems, protectants and custom formulations.</p>
            <p>Featured products: <span class="highlight">alkaline copper, cyanide-free alkaline copper, pyrophosphate copper, acid copper</span> (German / Japanese-grade acid copper, fully replacing imported brands). Our anode-residue-free acid copper additive is widely used in hardware, plastic and PCB / FPC plating, saving anode consumption, lowering cost, improving efficiency and extending maintenance cycles. Cyanide-free alkaline copper fully replaces cyanides with stable performance.</p>
            <p>We sincerely look forward to providing you with high-quality products and professional service. With "customer first, integrity above all", we keep innovating and serving every customer.</p>
            <p><strong>Shenzhen SETRA — focused on copper plating R&amp;D.</strong></p>
            <p>For product details, call +086-0755-27782265. For new product development &amp; technical support, call +086 13724351021.</p>
        `,

        strengthsTitle: 'Our Strengths',
        strengthsList: ['Focus on copper plating R&D', 'High quality assurance', 'Comprehensive after-sales service', 'Rich industry experience'],
        strengthsDesc: ['16+ years specialized in copper plating and additive R&D, with proprietary core formulations.', 'Strict raw material screening and multi-stage QC ensures batch-to-batch consistency.', 'A professional engineering team for line tuning, on-site diagnosis and full-process support.', 'Serving high-end customers across electronics, hardware, plastics and PCB / FPC industries.'],

        contactTitle: 'Contact Us',
        contactPhoneLabel: 'Phone',
        contactEmailLabel: 'Email',
        contactAddrLabel: 'Address',
        contactWhatsappLabel: 'WhatsApp',
        contactWhatsappValue: 'Chat Now',
        contactDesc: 'For any questions or inquiries about our chemicals, please feel free to contact us. We are always at your service!',
        contactPhone: '13724351021 / 0755-27782265',
        contactEmail: 'info@setra-ep.com',
        contactAddr: 'No. 9, Jiangbian Industrial 1st Road, Songgang Town, Shenzhen, China',

        productsTitle: 'Product List',
        categoriesTitle: 'Categories',
        all: 'All',
        view: 'View Details',
        searchPlaceholder: 'Search by product name',
        searchButton: 'Search',
        emptyResult: 'No matching products found',

        productDescTitle: 'Product Description',
        productSpecsTitle: 'Specifications',
        productCategoryLabel: 'Category',
        productPriceLabel: 'Price',
        productIdLabel: 'Product ID',
        productPackageLabel: 'Package',
        productStorageLabel: 'Storage',
        productShelfLabel: 'Shelf Life',
        productPackageDefault: 'Standard Package',
        productStorageDefault: 'Room Temperature',
        productShelfDefault: 'Long-term',
        productNotFound: 'Product not found',
        productNoDesc: 'No detailed description available.',
        productCurrency: 'CNY',
        backToList: 'Back to product list',

        homeProfileTitle: 'Company Profile',
        homeProfileContent: 'We introduce ourselves as Shenzhen SETRA New EP Material Co., Ltd., one of the leading manufacturers of electroplating additives and protectants — backed by a well-equipped plant and a professional team of chemists.',
        homeProfileList: [
            '<strong>Founded:</strong> 2009',
            '<strong>Business:</strong> Professional plating additives R&D and manufacturing since 2009, with a strong industry reputation.',
            '<strong>Capability:</strong> 100+ premium products with continuous technology iteration and remarkable results.',
            '<strong>Coverage:</strong> Serving customers across China and many overseas markets.'
        ],
        homeServicesTitle: 'Our Products & Services',
        homeServicesList: [
            'No-air Plating',
            'Hardware Plating Series',
            'Plastic Plating Series',
            'PCB / FPC Plating',
            'Intermediate Series',
            'Special Additives',
            'Post-treatment Protection Series'
        ],

        footerAboutTitle: 'About SETRA',
        footerAboutDesc: 'Shenzhen Xite New EP Material Co., Ltd. focuses on R&D, manufacturing and sales of plating additives, delivering quality chemicals and professional service.',
        footerLinksTitle: 'Quick Links',
        footerContactTitle: 'Contact',
        footerCopyright: 'Copyright © 2025 SETRA New Environmental Protection Material Co., Ltd. All rights reserved.',
        footerICP: ''
    }
};

// --- 内部工具 ---
obj_lang.getLang = () => localStorage.getItem('lang') || 'zh';
obj_lang.getLangData = () => obj_lang.langData[obj_lang.getLang()];

/**
 * 按 key 取值，支持 'a.b.c' 路径取值。返回字符串/undefined。
 */
obj_lang.t = function (key, langOverride) {
    if (!key) return '';
    const lang = langOverride || obj_lang.getLang();
    const root = obj_lang.langData[lang] || {};
    if (key.indexOf('.') === -1) return root[key];
    return key.split('.').reduce((acc, k) => (acc && acc[k] !== undefined) ? acc[k] : undefined, root);
};

/**
 * 获取当前页对应的 hero 数据（eyebrow / title / subtitle / breadcrumb）。
 */
obj_lang.getHeroData = function () {
    const d = obj_lang.getLangData();
    const key = pageName || 'index';
    return {
        eyebrow: (d.heroEyebrow && d.heroEyebrow[key]) || '',
        title: (d.heroTitle && d.heroTitle[key]) || d.siteTitle,
        subtitle: (d.heroSubtitle && d.heroSubtitle[key]) || d.siteSlogan,
        breadcrumbHome: d.breadcrumbHome,
        pageLabel: d[key] || d.heroTitle?.[key] || ''
    };
};

/**
 * 应用 data-i18n / data-i18n-html / data-i18n-attr 到给定根节点。
 */
obj_lang.applyI18n = function (root) {
    const scope = root || document;
    // 文本
    scope.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = obj_lang.t(key);
        if (val !== undefined && val !== null) {
            el.textContent = val;
        }
    });
    // HTML
    scope.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const val = obj_lang.t(key);
        if (val !== undefined && val !== null) {
            el.innerHTML = val;
        }
    });
    // 属性，例 data-i18n-attr="placeholder:searchPlaceholder,title:siteTitle"
    scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const spec = el.getAttribute('data-i18n-attr');
        if (!spec) return;
        spec.split(',').forEach(pair => {
            const [attr, key] = pair.split(':').map(s => s && s.trim());
            if (!attr || !key) return;
            const val = obj_lang.t(key);
            if (val !== undefined && val !== null) {
                el.setAttribute(attr, val);
            }
        });
    });

    // html lang
    document.documentElement.setAttribute('lang', obj_lang.getLang() === 'zh' ? 'zh-CN' : 'en');
};

/**
 * 切换语言并广播事件。
 */
obj_lang.setLang = function (newLang) {
    if (newLang && (newLang === 'zh' || newLang === 'en')) {
        localStorage.setItem('lang', newLang);
    }
    obj_lang.renderLang();
};

/**
 * 通用刷新：
 *  1. 应用 data-i18n*
 *  2. 触发 langchange 事件（detail = { lang, data }）
 *  3. 兼容旧的 langReRenderFunctions
 */
obj_lang.renderLang = function () {
    obj_lang.applyI18n(document);

    const lang = obj_lang.getLang();
    const data = obj_lang.getLangData();
    try {
        window.dispatchEvent(new CustomEvent('langchange', { detail: { lang, data } }));
    } catch (_) { /* IE 兼容忽略 */ }

    // 旧 API：调用所有已注册函数
    for (const key in langReRenderFunctions) {
        if (Object.prototype.hasOwnProperty.call(langReRenderFunctions, key)) {
            try { langReRenderFunctions[key](); } catch (e) { /* ignore */ }
        }
    }
    const siteTitle = document.getElementById('site-title');
    const langNow = obj_lang.getLang();
    if (siteTitle && langNow === 'zh' && !siteTitle.classList.contains('logo-text-main-cn')) {
        siteTitle.classList.add('logo-text-main-cn');
    } else {
        siteTitle.classList.remove('logo-text-main-cn');
    }
};

// 暴露给浏览器全局
window.obj_lang = obj_lang;
