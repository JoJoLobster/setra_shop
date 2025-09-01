// 商品数据和多语言文本
var products = [];
var categories = [];


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

products = products_all_data.products;
categories = products_all_data.categories;
renderProductsAll();

function renderProductsAll(selectedCategory) {
  let category = selectedCategory;
  if(!selectedCategory) {
    category = localStorage.getItem('selectedCategory')||'all';
  } else {
    localStorage.setItem('selectedCategory', selectedCategory);
  }
  renderTexts();
  renderCategories(category);
  renderProducts(category);
}

function renderTexts() {
  document.getElementById('site-title').textContent = langData[lang].siteTitle;
  document.getElementById('categories-title').textContent = langData[lang].categoriesTitle;
  document.getElementById('products-title').textContent = langData[lang].productsTitle;
}

function renderCategories(selected) {
  const catDiv = document.getElementById('categories');
  catDiv.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'category-btn' + (selected === 'all' ? ' active' : '');
  allBtn.textContent = lang === 'zh' ? '全部' : 'All';
  allBtn.onclick = () => renderProductsAll('all');
  catDiv.appendChild(allBtn);
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-btn' + (selected === cat.id ? ' active' : '');
    btn.textContent = cat[lang];
    btn.onclick = () => renderProductsAll(cat.id);
    catDiv.appendChild(btn);
  });
}

function renderProducts(selected) {
  const prodDiv = document.getElementById('products');
  prodDiv.innerHTML = '';
  let filtered = selected === 'all' ? products : products.filter(p => p.category === selected);
  if(filtered.length) {
    filtered.forEach(prod => {
      const card = document.createElement('div');
      const imgUri = getImgUriByProduct(prod);
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card-inner">
        
          <a href="product.html?id=${prod.id}">
            <img src="${imgUri}" alt="${prod[lang + '_name']}">
          </a>
          <h3>${prod[lang + '_name']}</h3>
          <div class="price">￥${prod.price}</div>
        </div>
      `;
      prodDiv.appendChild(card);
    });
  } else {
    prodDiv.innerHTML = `<img src="assets/images/icon/NotFound.png" alt="">`;
  }
}


// 多语言切换
registerReRenderFunction("renderProductsWithLang", renderProductsAll);
