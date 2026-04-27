var obj_product = {};

let texts = {
  zh: {
    category: '分类',
    price: '价格',
    notFound: '未找到该商品',
    yuan: '元'
  },
  en: {
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


obj_product.getQueryId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

obj_product.genProductDetail = (prod) => {
  let langDetailPage = obj_lang.getLang();
  const category = data_products_infos.categories.filter(c => c.id === prod.category)[0];
  const img = prod.image || 'assets/images/' + prod.id + '_thumb.png';
  return `
    <div class="product-detail-container">
      <h3>产品描述</h3> 
      <div class="description">
        <div>
          <span class="info-label">${texts[langDetailPage].category}:</span>
          <span class="info-value">${category ? category[langDetailPage] : ''}</span>
          <span class="info-label">${texts[langDetailPage].price}:</span>
          <span class="price-value">￥${prod.price} ${texts[langDetailPage].yuan}</span>
        </div>
        <p>${prod[langDetailPage + '_name']}</p>
        <img src="${img}" alt="${prod[langDetailPage + '_name']}" class="product-detail-image"> 
        <p>${prod[langDetailPage + '_description'] || '暂无详细描述'}</p>
      </div>
        
      <h3>产品规格</h3>
      <div class="specifications">
        <ul>
          <li><strong>产品编号:</strong> <span>${prod.id}</span></li>
          <li><strong>包装规格:</strong> <span>${prod.package || '标准包装'}</span></li>
          <li><strong>储存条件:</strong> <span>${prod.storage || '常温储存'}</span></li>
          <li><strong>保质期:</strong> <span>${prod.shelf_life || '长期有效'}</span></li>
        </ul>
      </div>
    </div>
  `
}

obj_product.renderDetail = (productId) => {
  const id = productId ?? obj_product.getQueryId();
  if(!id) {
    console.log('Product ID not found');
    return;
  }
  const prod = data_products_infos.products.find(p => String(p.id) === id);
  const detailDiv = document.getElementById('product-detail');
  if (!prod) {
    detailDiv.innerHTML = `<div style='padding:2rem;text-align:center;'>${texts[lang].notFound}</div>`;
    return;
  }

  detailDiv.innerHTML = obj_product.genProductDetail(prod);
}

// 多语言切换
registerLangReRenderFunction('renderProductDetail', obj_product.renderDetail);
// 渲染产品详情
obj_product.renderDetail(obj_product.getQueryId());