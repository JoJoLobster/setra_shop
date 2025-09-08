/**
 * dependencies:
 *  data_products_infos
 *  obj_lang
 *  obj_util
 */
var obj_product_list = {};


// 轮播区
var carouselIndex = 0;
var carouselTimer = null;

// 加载商品数据
// fetch('data/products.json')
//   .then(res => res.json())
//   .then(data => {
//     products = data.products;
//     categories = data.categories;
//     renderAll();
//   });

obj_product_list.genProductCard = (prod, lang) => {
  const imgUri = obj_util.getImgUriByProduct(prod);
  return `
        <div class="product-card-inner">
          <a href="product.html?id=${prod.id}">
            <img src="${imgUri}" alt="${prod[lang + '_name']}">
          </a>
          <h3>${prod[lang + '_name']}</h3>
          <div class="price">￥${prod.price}</div>
        </div>
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
  document.getElementById('site-title').textContent = obj_lang.langData[lang].siteTitle;
  document.getElementById('categories-title').textContent = obj_lang.langData[lang].categoriesTitle;
  document.getElementById('products-title').textContent = obj_lang.langData[lang].productsTitle;
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
  const prodDiv = document.getElementById('products');
  prodDiv.innerHTML = '';
  let filtered = selected === 'all' ? 
              data_products_infos.products :
              data_products_infos.products.filter(p => p.category === selected);
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


// 多语言切换
registerLangReRenderFunction("renderProductsWithLang", obj_product_list.renderProductsAll);

obj_product_list.renderProductsAll();