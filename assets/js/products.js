/**
 * dependencies:
 *  data_products_infos
 *  obj_lang
 *  obj_util
 */
var obj_product_list = {};

/** 当前搜索关键词（trim 后非空时才参与过滤） */
obj_product_list.searchQuery = '';

obj_product_list.productMatchesSearch = (prod, q) => {
  if (!q) return true;
  const needle = q.trim();
  if (!needle) return true;
  const zh = prod.zh_name || '';
  const en = prod.en_name || '';
  const lang = obj_lang.getLang();
  if (lang === 'en') {
    if (en.toLowerCase().indexOf(needle.toLowerCase()) !== -1) return true;
  } else {
    if (zh.toLowerCase().indexOf(needle.toLowerCase()) !== -1) return true;
  }
  return false;
};

// 轮播区
var carouselIndex = 0;
var carouselTimer = null;


obj_product_list.genProductCard = (prod, lang) => {
  const imgUri = obj_util.getImgUriByProduct(prod);
  return `
        <a href="product.html?id=${prod.id}">
          <img src="${imgUri}" alt="${prod[lang + '_name']}">
        </a>
        <div class="title">${prod[lang + '_name']}</div>
        <div class="price">￥${prod.price}</div>
      `;
}

obj_product_list.renderProductsAll = (selectedCategory) => {
  let category = selectedCategory;
  if(!selectedCategory) {
    category = localStorage.getItem('selectedCategory')||'all';
  } else {
    localStorage.setItem('selectedCategory', selectedCategory);
  }
  obj_product_list.renderPageTitles();
  obj_product_list.renderCategories(category);
  obj_product_list.renderProducts(category);
}

obj_product_list.renderPageTitles = () => {
  let lang = obj_lang.getLang();
  const d = obj_lang.getLangData();
  document.getElementById('site-title').textContent = obj_lang.langData[lang].siteTitle;
  document.getElementById('categories-title').textContent = obj_lang.langData[lang].categoriesTitle;
  document.getElementById('products-title').textContent = obj_lang.langData[lang].productsTitle;
  const searchInput = document.getElementById('product-search-input');
  const searchBtn = document.getElementById('product-search-btn');
  if (searchInput && d.searchPlaceholder) searchInput.placeholder = d.searchPlaceholder;
  if (searchBtn && d.searchButton) searchBtn.textContent = d.searchButton;
}

obj_product_list.renderCategories = (selected) => {
  let lang = obj_lang.getLang();
  let langData = obj_lang.getLangData();
  const catDiv = document.getElementById('categories');
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
}

obj_product_list.renderProducts = (selected) => {
  const prodDiv = document.getElementById('products-list');
  prodDiv.innerHTML = '';
  let filtered = selected === 'all' ? 
              data_products_infos.products :
              data_products_infos.products.filter(p => p.category === selected);
  if (obj_product_list.searchQuery) {
    filtered = filtered.filter(p => obj_product_list.productMatchesSearch(p, obj_product_list.searchQuery));
  }
  let lang = obj_lang.getLang();
  if(filtered.length) {
    filtered.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = obj_product_list.genProductCard(prod, lang);
      prodDiv.appendChild(card);
    });
  } else {
    prodDiv.innerHTML = `<img src="assets/images/icon/NotFound.png" alt="">`;
  }
}


obj_product_list.runSearch = function () {
  const input = document.getElementById('product-search-input');
  if (!input) return;
  const v = input.value;
  if (v.trim()) {
    obj_product_list.searchQuery = v.trim();
  } else {
    obj_product_list.searchQuery = '';
  }
  const cat = localStorage.getItem('selectedCategory') || 'all';
  obj_product_list.renderProducts(cat);
};

(function initProductSearch () {
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

// 多语言切换
registerLangReRenderFunction("renderProductsWithLang", obj_product_list.renderProductsAll);

obj_product_list.renderProductsAll();