let products = [];
let categories = [];
let langDetailPage = localStorage.getItem('lang') || 'zh';
let texts = {
  zh: {
    siteTitle: '深圳市西特新环保材料有限公司',
    back: '返回首页',
    category: '分类',
    price: '价格',
    notFound: '未找到该商品',
    yuan: '元'
  },
  en: {
    siteTitle: 'Shenzhen SETRA new environmental protection materail CO，Ltd',
    back: 'Back to Home',
    category: 'Category',
    price: 'Price',
    notFound: 'Product Not Found',
    yuan: 'CNY'
  }
};

// fetch('data/products.json')
//   .then(res => res.json())
//   .then(data => {
//     products = data.products;
//     categories = data.categories;
//     renderDetail();
//   });

products = products_all_data.products;
categories = products_all_data.categories;
renderDetail();

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderDetail() {
  document.getElementById('site-title').textContent = texts[langDetailPage].siteTitle;
  const id = getQueryId();
  const prod = products.find(p => String(p.id) === id);
  const detailDiv = document.getElementById('product-detail');
  if (!prod) {
    detailDiv.innerHTML = `<div style='padding:2rem;text-align:center;'>${texts[lang].notFound}</div>`;
    return;
  }
  const cat = categories.filter(c => c.id === prod.category)[0];
  const img = prod.image || 'assets/images/' + prod.id + '_thumb.png';
  
  detailDiv.innerHTML = `
    <div class="product-detail-container">
      <div class="product-detail-left">
        <div class="product-image-container">
          <img src="${img}" alt="${prod[langDetailPage + '_name']}" class="product-detail-image">
        </div>
      </div>
      <div class="product-detail-right">
        <div class="product-info">
          <h1 class="product-title">${prod[langDetailPage + '_name']}</h1>
          <div class="product-category">
            <span class="info-label">${texts[langDetailPage].category}:</span>
            <span class="info-value">${cat ? cat[langDetailPage] : ''}</span>
          </div>
          <div class="product-price">
            <span class="info-label">${texts[langDetailPage].price}:</span>
            <span class="price-value">￥${prod.price} ${texts[langDetailPage].yuan}</span>
          </div>
          <div class="product-description">
            <h3>产品描述</h3>
            <p>${prod[langDetailPage + '_description'] || '暂无详细描述'}</p>
          </div>
          <div class="product-specifications">
            <h3>产品规格</h3>
            <ul>
              <li><strong>产品编号:</strong> <span>${prod.id}</span></li>
              <li><strong>包装规格:</strong> <span>${prod.package || '标准包装'}</span></li>
              <li><strong>储存条件:</strong> <span>${prod.storage || '常温储存'}</span></li>
              <li><strong>保质期:</strong> <span>${prod.shelf_life || '长期有效'}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 多语言切换
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    langDetailPage = btn.getAttribute('data-lang');
    renderDetail();
  });
});