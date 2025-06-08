// 商品数据和多语言文本
var products = [];
var categories = [];
var langMainPage = localStorage.getItem('lang') || 'zh';

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
  renderCarousel();
}

function renderTexts() {
  document.getElementById('site-title').textContent = langData[langMainPage].siteTitle;
}

function renderCarousel() {
  const carousel = document.getElementById('carousel');
  carousel.innerHTML = '';
  if (!products.length) return;
  const showCount = 3;
  const total = Math.min(5, products.length); // 最多轮播5个商品
  let group = [];
  for (let i = 0; i < showCount; i++) {
    const idx = (carouselIndex + i) % total;
    group.push(products[idx]);
  }
  const groupDiv = document.createElement('div');
  groupDiv.style.display = 'flex';
  groupDiv.style.justifyContent = 'center';
  groupDiv.style.alignItems = 'center';
  groupDiv.style.width = '100%';
  groupDiv.style.height = '100%';
  group.forEach(prod => {
    const item = document.createElement('div');
    item.className = 'carousel-item active';
    item.style.flex = '1 1 0';
    item.style.margin = '0 10px';
    const imgUri = getImgUriByProduct(prod);
    item.innerHTML = `
      <img src="${imgUri}" alt="${prod[langMainPage + '_name']}">
    `;
    groupDiv.appendChild(item);
  });
  carousel.appendChild(groupDiv);
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    carouselIndex = (carouselIndex + showCount) % total;
    renderCarousel();
  }, 3000);
}


// 多语言切换
(document.querySelectorAll('#lang-switch button')).forEach(btn => {
  btn.addEventListener('click', () => {

    renderAll();
  });
});
