var obj_headerFooterDomGenerator = {};

// obj_headerFooterDomGenerator.genGlobalScript = function() {
//     let gScript = document.createElement('script');
//     gScript.src = 'assets/js/lib/global.js';
//     document.getElementsByTagName('body')[0].insertAdjacentElement('afterbegin', gScript);
// }
// obj_headerFooterDomGenerator.genGlobalScript();
obj_headerFooterDomGenerator.genHeader = function() {
    const d = obj_lang.getLangData();
    let siteTitle = d.siteTitle;
    let home      = d.home     ;
    let products  = d.products ;
    let strengths = d.strengths;
    let about     = d.about    ;
    let contact   = d.contact  ;

    let mainHeader = document.getElementsByClassName('main-header');
    if(!(mainHeader.length) || mainHeader[0].tagName !== 'HEADER') {
        const mainBody = document.getElementsByTagName('body')[0];
        let headerTemplate= `
        <header class="main-header">
            <div class="logo-header-wrapper">
                <div class="logo-header"> 
                    <div class="logo-area">
                        <img src="assets/images/c/setra.svg" alt="logo" class="logo-img">
                        <span id="site-title">${siteTitle}</span>
                    </div>

                    <div class="phone_lang_switch"> 
                        <div class="word_right">
                            <div class="iconPhone icon-dh"></div>
                            <div class="phone">
                            <div>13724351021</div>
                            <div>0755-27782265</div>
                            </div>
                        </div>
                        <div id="lang-switch">
                            <div data-lang="zh">中文</div>
                            <div data-lang="en">English</div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="container">
                <div class="main-nav-wrapper"> 
                    <nav class="main-nav">
                        <a href="index.html">${home}</a>
                        <a href="products.html">${products}</a>
                        <a href="strengths.html">${strengths}</a>
                        <a href="about.html">${about}</a>
                        <a href="contact.html">${contact}</a>
                    </nav>
                </div>
            </div>
        </header>
        `;
        if(pageName !== 'index') {
            headerTemplate = headerTemplate + `
            <section class="page-title-section header finisher-header"/>
            `
        }
        mainBody.insertAdjacentHTML('afterbegin', headerTemplate);
    }

}

obj_headerFooterDomGenerator.genFooter = function() {
    const ul = document.getElementById('site-footer');
    if(!ul) {
        const mainBody = document.getElementsByTagName('body')[0];
        mainBody.insertAdjacentHTML('beforeend', `
        <footer id="site-footer">
            <div class="footer-content">
            <div>地址：深圳市松岗镇江边工业一路9号</div>
            <div>电话：13724351021 | 座机：0755-27782265</div>
            <div>Copyright @ 2025, SETRA New Environmental Protection Material Co., Ltd.</div>
            </div>
        </footer>
        `);
    }
}

// 生成头部和底部
obj_headerFooterDomGenerator.genHeader(); 
obj_headerFooterDomGenerator.genFooter();

// 绑定按钮
obj_headerFooterDomGenerator.langBtns = document.querySelectorAll('#lang-switch div');
obj_headerFooterDomGenerator.langBtnClickHandler = (event) => {
    const btn = event.currentTarget;
    obj_lang.setLang(btn.getAttribute('data-lang'));
    for(const key in langReRenderFunctions) {
        if(langReRenderFunctions.hasOwnProperty(key)) {
            langReRenderFunctions[key]();
        }
    }
}

obj_headerFooterDomGenerator.setActiveLangBtn = function() {
    let lang = obj_lang.getLang();
    obj_headerFooterDomGenerator.langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
      btn.removeEventListener('click', obj_headerFooterDomGenerator.langBtnClickHandler);
      btn.addEventListener('click', obj_headerFooterDomGenerator.langBtnClickHandler);
    });
}

obj_headerFooterDomGenerator.renderHeaderFooterWithLang = function() {
    let lang = obj_lang.getLang();
    const d = obj_lang.langData[lang];
    let domSiteTitle = document.getElementById('site-title');
    if(domSiteTitle) {
        domSiteTitle.textContent = d.siteTitle;
        if(lang === 'zh') {
            domSiteTitle.classList.add('site-title-zh');
            domSiteTitle.classList.remove('site-title-en');
        } else {
            domSiteTitle.classList.add('site-title-en');
            domSiteTitle.classList.remove('site-title-zh');
        }
    }
    // 导航
    const nav = document.querySelector('.main-nav');
    if(nav) {
        const navText = [d.home, d.products, d.strengths, d.about, d.contact];
        for(let i=0; i<nav.children.length; i++) {
            nav.children[i].textContent = navText[i];
        }
    }
    
    const pageTitleSection = document.querySelector('.page-title-section');
    if(pageTitleSection) {
        pageTitleSection.innerHTML = `
            <div class="title-wrapper">
                <div>${d[pageName]}</div>
            </div>
            `;

    }

}


registerLangReRenderFunction('setActiveLangBtn', obj_headerFooterDomGenerator.setActiveLangBtn);
registerLangReRenderFunction('renderHeaderFooterWithLang', obj_headerFooterDomGenerator.renderHeaderFooterWithLang);

obj_headerFooterDomGenerator.setActiveLangBtn();
obj_lang.renderLang();
obj_headerFooterDomGenerator.renderHeaderFooterWithLang();


// Finisher Header动态背景图
// new FinisherHeader({
//   "count": 12,
//   "size": {
//     "min": 1300,
//     "max": 1500,
//     "pulse": 0
//   },
//   "speed": {
//     "x": {
//       "min": 0.6,
//       "max": 3
//     },
//     "y": {
//       "min": 0.6,
//       "max": 3
//     }
//   },
//   "colors": {
//     "background": "#2a292c",
//     "particles": [
//       "#682a0b",
//       "#558ca1",
//       "#100e66",
//       "#ff0a53"
//     ]
//   },
//   "blending": "lighten",
//   "opacity": {
//     "center": 0.6,
//     "edge": 0
//   },
//   "skew": -2,
//   "shapes": [
//     "c"
//   ]
// });

