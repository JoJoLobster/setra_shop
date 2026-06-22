/**
 * About 页面：渲染 “我们的强项” 卡片
 */
var obj_about = {};

obj_about.renderStrengths = function () {
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

window.addEventListener('langchange', obj_about.renderStrengths);
obj_about.renderStrengths();
