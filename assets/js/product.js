let products = [];
let categories = [];
let lang = localStorage.getItem('lang') || 'zh';
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
  document.getElementById('site-title').textContent = texts[lang].siteTitle;
  const id = getQueryId();
  const prod = products.find(p => String(p.id) === id);
  const detailDiv = document.getElementById('product-detail');
  if (!prod) {
    detailDiv.innerHTML = `<div style='padding:2rem;text-align:center;'>${texts[lang].notFound}</div>`;
    return;
  }
  const cat = categories.find(c => c.id === prod.category);
  const img = prod.image || 'assets/images/' + prod.id + '_thumb.png';
  detailDiv.innerHTML = `
    <div class="product-card" style="max-width:400px;margin:2rem auto;">
      <img src="${img}" alt="${prod[lang + '_name']}" style="max-height:160px;">
      <h3>${prod[lang + '_name']}</h3>
      <div class="price">${texts[lang].price}：￥${prod.price} ${texts[lang].yuan}</div>
      <div style="margin:0.5rem 0;">${texts[lang].category}：${cat ? cat[lang] : ''}</div>
    </div>
  `;
}

// 多语言切换
const langBtns = document.querySelectorAll('#lang-switch button');
langBtns.forEach(btn => {
  btn.onclick = () => {
    lang = btn.getAttribute('data-lang');
    localStorage.setItem('lang', lang);
    renderDetail();
  };
});
function setActiveLangBtn() {
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}
setActiveLangBtn(); 