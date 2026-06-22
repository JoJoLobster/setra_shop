/**
 * 产品详情页 (product.html)
 *
 * 依赖：obj_lang, obj_util, data_products_infos
 *
 * 多语言：监听 langchange 事件，整体重渲染详情页 + 更新面包屑当前节。
 */
var obj_product = {};

obj_product.getQueryId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

obj_product.genProductDetail = (prod) => {
    const lang = obj_lang.getLang();
    const d = obj_lang.getLangData();
    const category = data_products_infos.categories.find(c => c.id === prod.category);
    const img = obj_util.getImgUriByProduct(prod);
    const name = prod[lang + '_name'];
    const desc = prod[lang + '_description'] || d.productNoDesc;

    return `
        <div class="product-detail-container">
            <div class="product-detail-top">
                <div class="product-detail-image-wrap">
                    <img src="${img}" alt="${name}" class="product-detail-image">
                </div>
                <div class="product-detail-info">
                    <h2>${name}</h2>
                    <div class="product-meta">
                        <div>
                            <span class="info-label">${d.productCategoryLabel}</span>
                            <span class="info-value">${category ? category[lang] : '-'}</span>
                        </div>
                        <div>
                            <span class="info-label">${d.productPriceLabel}</span>
                            <span class="price-value">¥${prod.price} ${d.productCurrency}</span>
                        </div>
                    </div>
                    <h3 class="product-detail-section-title">${d.productDescTitle}</h3>
                    <p>${desc}</p>
                </div>
            </div>

            <h3 class="product-detail-section-title">${d.productSpecsTitle}</h3>
            <div class="product-specs">
                <ul>
                    <li><strong>${d.productIdLabel}</strong>${prod.id}</li>
                    <li><strong>${d.productPackageLabel}</strong>${prod.package || d.productPackageDefault}</li>
                    <li><strong>${d.productStorageLabel}</strong>${prod.storage || d.productStorageDefault}</li>
                    <li><strong>${d.productShelfLabel}</strong>${prod.shelf_life || d.productShelfDefault}</li>
                </ul>
            </div>

            <a href="products.html" class="product-back">&larr; ${d.backToList}</a>
        </div>
    `;
};

obj_product.updateBreadcrumb = function (prod) {
    const cur = document.getElementById('breadcrumb-current');
    if (!cur || !prod) return;
    const lang = obj_lang.getLang();
    cur.textContent = prod[lang + '_name'];
};

obj_product.renderDetail = function () {
    const id = obj_product.getQueryId();
    const detailDiv = document.getElementById('product-detail');
    if (!detailDiv) return;
    const d = obj_lang.getLangData();

    if (!id) {
        detailDiv.innerHTML = `<div class="empty-state">${d.productNotFound}</div>`;
        return;
    }
    const prod = data_products_infos.products.find(p => String(p.id) === id);
    if (!prod) {
        detailDiv.innerHTML = `<div class="empty-state">${d.productNotFound}</div>`;
        return;
    }
    detailDiv.innerHTML = obj_product.genProductDetail(prod);
    obj_product.updateBreadcrumb(prod);
};

window.addEventListener('langchange', obj_product.renderDetail);
obj_product.renderDetail();
