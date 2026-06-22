/**
 * 产品列表页 (products.html)
 *
 * 依赖：
 *  - data_products_infos
 *  - obj_lang
 *  - obj_util
 *
 * 多语言：监听 langchange 事件后整体重渲染。
 */
var obj_product_list = {};

obj_product_list.searchQuery = '';

obj_product_list.productMatchesSearch = (prod, q) => {
    if (!q) return true;
    const needle = q.trim().toLowerCase();
    if (!needle) return true;
    const zh = (prod.zh_name || '').toLowerCase();
    const en = (prod.en_name || '').toLowerCase();
    const lang = obj_lang.getLang();
    return lang === 'en' ? en.indexOf(needle) !== -1 : zh.indexOf(needle) !== -1;
};

obj_product_list.genProductCard = (prod, lang) => {
    const imgUri = obj_util.getImgUriByProduct(prod);
    return `
        <a href="product.html?id=${prod.id}">
          <img src="${imgUri}" alt="${prod[lang + '_name']}">
        </a>
        <div class="title">${prod[lang + '_name']}</div>
        <div class="price">¥${prod.price}</div>
    `;
};

obj_product_list.renderProductsAll = (selectedCategory) => {
    let category = selectedCategory;
    if (!category) {
        category = localStorage.getItem('selectedCategory') || 'all';
    } else {
        localStorage.setItem('selectedCategory', category);
    }
    obj_product_list.renderCategories(category);
    obj_product_list.renderProducts(category);
};

obj_product_list.renderCategories = (selected) => {
    const lang = obj_lang.getLang();
    const langData = obj_lang.getLangData();
    const catDiv = document.getElementById('categories');
    if (!catDiv) return;
    catDiv.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn' + (selected === 'all' ? ' active' : '');
    allBtn.textContent = langData.all;
    allBtn.onclick = () => obj_product_list.renderProductsAll('all');
    catDiv.appendChild(allBtn);

    data_products_infos.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (selected === cat.id ? ' active' : '');
        btn.textContent = cat[lang];
        btn.onclick = () => obj_product_list.renderProductsAll(cat.id);
        catDiv.appendChild(btn);
    });
};

obj_product_list.renderProducts = (selected) => {
    const prodDiv = document.getElementById('products-list');
    if (!prodDiv) return;
    prodDiv.innerHTML = '';
    let filtered = selected === 'all'
        ? data_products_infos.products
        : data_products_infos.products.filter(p => p.category === selected);

    if (obj_product_list.searchQuery) {
        filtered = filtered.filter(p => obj_product_list.productMatchesSearch(p, obj_product_list.searchQuery));
    }
    const lang = obj_lang.getLang();
    const d = obj_lang.getLangData();
    if (filtered.length) {
        filtered.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = obj_product_list.genProductCard(prod, lang);
            prodDiv.appendChild(card);
        });
    } else {
        prodDiv.innerHTML = `<div class="empty-state">${d.emptyResult}</div>`;
    }
};

obj_product_list.runSearch = function () {
    const input = document.getElementById('product-search-input');
    if (!input) return;
    obj_product_list.searchQuery = (input.value || '').trim();
    const cat = localStorage.getItem('selectedCategory') || 'all';
    obj_product_list.renderProducts(cat);
};

(function initProductSearch() {
    const btn = document.getElementById('product-search-btn');
    const input = document.getElementById('product-search-input');
    if (!btn || !input) return;
    btn.addEventListener('click', () => obj_product_list.runSearch());
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            obj_product_list.runSearch();
        }
    });
})();

// 监听语言切换
window.addEventListener('langchange', () => obj_product_list.renderProductsAll());

// 初次渲染
obj_product_list.renderProductsAll();
