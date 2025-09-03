var obj_main = {};
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


var carouselItems = [
  {
    img: 'assets/images/home/bg-2.jpg',
    link: '#'
  },
  {
    img: 'assets/images/home/bg-4.jpg',
    link: '#'
  },
  {
    img: 'assets/images/home/bg-6.jpg',
    link: '#'
  }
];

obj_main.renderCarousel = function() {
  const carousel = document.getElementById('carousel');
  carousel.innerHTML = '';
  if (!carouselItems.length) return;
  const showCount = 1;
  const total = Math.min(5, carouselItems.length); // 最多轮播5个商品
  let group = [];
  for (let i = 0; i < showCount; i++) {
    const idx = (carouselIndex + i) % total;
    group.push(carouselItems[idx]);
  }
  const groupDiv = document.createElement('div');
  groupDiv.className = 'carousel-inner';
  group.forEach(prod => {
    const item = document.createElement('div');
    item.className = 'carousel-item active';
    item.style.flex = '1 1 0';
    item.style.margin = '0 10px';
    const imgUri = prod.img;
    item.innerHTML = `
      <img src="${imgUri}" alt="">
    `;
    groupDiv.appendChild(item);
  });
  carousel.appendChild(groupDiv);
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    carouselIndex = (carouselIndex + showCount) % total;
    obj_main.renderCarousel();
  }, 3500);
}

registerReRenderFunction('renderCarousel', obj_main.renderCarousel);


obj_main.renderCarousel();