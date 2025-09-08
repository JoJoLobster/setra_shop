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

obj_main.render_Profile_Services = function() {
  let d = obj_lang.getLangData();
  // 首页 Company Profile & Our Products & Services
  if(document.querySelector('.company-profile-section')) {
    const title = document.querySelector('.company-profile-section h2');
    if(title) title.textContent = d.homeProfileTitle;
    const content = document.querySelector('.company-profile-content p');
    if(content) content.textContent = d.homeProfileContent;
    const ul = document.querySelector('.company-profile-content ul');
    if(ul) {
      ul.innerHTML = '';
      d.homeProfileList.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item;
        ul.appendChild(li);
      });
    }
  }

  if(document.querySelector('.products-services-section')) {
    const title = document.querySelector('.products-services-section h2');
    if(title) title.textContent = d.homeServicesTitle;
    const ul = document.querySelector('.products-services-content ul');
    if(ul) {
      ul.innerHTML = '';
      d.homeServicesList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    }
  }
}

registerLangReRenderFunction('renderCarousel', obj_main.renderCarousel);
registerLangReRenderFunction('profile_Services', obj_main.render_Profile_Services);


obj_main.renderCarousel();
obj_main.render_Profile_Services();