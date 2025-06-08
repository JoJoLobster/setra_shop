// 商品数据和多语言文本
var products = [];
var categories = [];
var langProductsPage = localStorage.getItem('lang') || 'zh';

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
renderAll();

function renderAll(selectedCategory = 'all') {
  renderTexts();
  renderCategories(selectedCategory);
  renderProducts(selectedCategory);
}

function renderTexts() {
  document.getElementById('site-title').textContent = langData[langProductsPage].siteTitle;
  document.getElementById('categories-title').textContent = langData[langProductsPage].categoriesTitle;
  document.getElementById('products-title').textContent = langData[langProductsPage].productsTitle;
}

function renderCategories(selected) {
  const catDiv = document.getElementById('categories');
  catDiv.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'category-btn' + (selected === 'all' ? ' active' : '');
  allBtn.textContent = langProductsPage === 'zh' ? '全部' : 'All';
  allBtn.onclick = () => renderAll('all');
  catDiv.appendChild(allBtn);
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-btn' + (selected === cat.id ? ' active' : '');
    btn.textContent = cat[langProductsPage];
    btn.onclick = () => renderAll(cat.id);
    catDiv.appendChild(btn);
  });
}

function renderProducts(selected) {
  const prodDiv = document.getElementById('products');
  prodDiv.innerHTML = '';
  let filtered = selected === 'all' ? products : products.filter(p => p.category === selected);
  filtered.forEach(prod => {
    const card = document.createElement('div');
    const imgUri = getImgUriByProduct(prod);
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${imgUri}" alt="${prod[langProductsPage + '_name']}">
      <h3>${prod[langProductsPage + '_name']}</h3>
      <div class="price">￥${prod.price}</div>
      <a class="view-btn" href="product.html?id=${prod.id}">${langData[langProductsPage].view}</a>
    `;
    prodDiv.appendChild(card);
  });
}


// 多语言切换
(document.querySelectorAll('#lang-switch button')).forEach(btn => {
  btn.onclick = () => {
    langProductsPage = btn.getAttribute('data-lang');
    localStorage.setItem('lang', langProductsPage);
    renderAll();
  };
});
