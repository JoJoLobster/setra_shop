/**
 * 首页 (index.html) 脚本
 * - Hero 图片轮播
 * - 公司简介卡片 (homeProfileList)
 * - 产品与服务列表 (homeServicesList)
 * - 我们的强项卡片
 *
 * 多语言：通过 langchange 事件刷新动态生成的内容。
 */

var obj_main = {};

var heroSlides = [
    'assets/images/home/bg-2.jpg',
    'assets/images/home/bg-4.jpg',
    'assets/images/home/bg-6.jpg'
];

obj_main.heroIndex = 0;
obj_main.heroTimer = null;

obj_main.renderHeroStack = function () {
    const stack = document.getElementById('hero-image-stack');
    const dots = document.getElementById('hero-dots');
    if (!stack || !dots) return;

    stack.innerHTML = heroSlides.map((src, i) => `
        <div class="slide${i === obj_main.heroIndex ? ' active' : ''}">
            <img src="${src}" alt="hero-${i + 1}">
        </div>
    `).join('');
    dots.innerHTML = heroSlides.map((_, i) => `
        <div class="dot${i === obj_main.heroIndex ? ' active' : ''}" data-i="${i}" role="button" aria-label="slide ${i + 1}"></div>
    `).join('');

    dots.querySelectorAll('.dot').forEach(d => {
        d.addEventListener('click', () => {
            obj_main.heroIndex = parseInt(d.getAttribute('data-i'), 10) || 0;
            obj_main.updateHeroActive();
            obj_main.resetTimer();
        });
    });
};

obj_main.updateHeroActive = function () {
    const stack = document.getElementById('hero-image-stack');
    const dots = document.getElementById('hero-dots');
    if (!stack || !dots) return;
    stack.querySelectorAll('.slide').forEach((el, i) => {
        el.classList.toggle('active', i === obj_main.heroIndex);
    });
    dots.querySelectorAll('.dot').forEach((el, i) => {
        el.classList.toggle('active', i === obj_main.heroIndex);
    });
};

obj_main.resetTimer = function () {
    if (obj_main.heroTimer) clearInterval(obj_main.heroTimer);
    obj_main.heroTimer = setInterval(() => {
        obj_main.heroIndex = (obj_main.heroIndex + 1) % heroSlides.length;
        obj_main.updateHeroActive();
    }, 4500);
};

obj_main.renderProfileServices = function () {
    const d = obj_lang.getLangData();

    // 公司简介列表
    const profileUl = document.querySelector('.company-profile-content ul');
    if (profileUl) {
        profileUl.innerHTML = d.homeProfileList.map(item => `<li>${item}</li>`).join('');
    }

    // 产品与服务列表
    const servicesUl = document.querySelector('.products-services-content ul');
    if (servicesUl) {
        servicesUl.innerHTML = d.homeServicesList.map(item => `<li>${item}</li>`).join('');
    }
};

obj_main.renderHomeStrengths = function () {
    const list = document.getElementById('home-strengths-list');
    if (!list) return;
    const d = obj_lang.getLangData();
    const titles = d.strengthsList || [];
    const descs = d.strengthsDesc || [];
    list.innerHTML = titles.map((title, i) => `
        <li class="strength-card">
            <div class="strength-icon">${String(i + 1).padStart(2, '0')}</div>
            <h4>${title}</h4>
            <p>${descs[i] || ''}</p>
        </li>
    `).join('');
};

// 监听语言切换
window.addEventListener('langchange', () => {
    obj_main.renderProfileServices();
    obj_main.renderHomeStrengths();
});

// 首次渲染
obj_main.renderHeroStack();
obj_main.resetTimer();
obj_main.renderProfileServices();
obj_main.renderHomeStrengths();
