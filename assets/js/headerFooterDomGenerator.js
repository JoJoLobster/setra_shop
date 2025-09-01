
function genHeader() {
    const d = langData[lang];
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
                        <img src="assets/images/c/logo-r.png" alt="logo" class="logo-img">
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

function genFooter() {
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
genHeader(); 
genFooter();

// 绑定按钮
const langBtns = document.querySelectorAll('#lang-switch div');

const reRenderFunctions = {};
function registerReRenderFunction(name, func) {
    reRenderFunctions[name] = func;
}
function unRegisterReRenderFunction(name) {
    delete reRenderFunctions[name];
}
registerReRenderFunction('setActiveLangBtn', setActiveLangBtn);
registerReRenderFunction('renderHeaderFooterWithLang', renderHeaderFooterWithLang);

function setActiveLangBtn() {
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    });
}


langBtns.forEach(btn => {
  btn.onclick = () => {
    setLang(btn.getAttribute('data-lang'));
    // setActiveLangBtn();
    // renderHeaderFooterWithLang();
    for(const key in reRenderFunctions) {
        if(reRenderFunctions.hasOwnProperty(key)) {
            reRenderFunctions[key]();
        }
    }
  }
});
function renderHeaderFooterWithLang(){
    const d = langData[lang];
    let domSiteTitle = document.getElementById('site-title');
    if(domSiteTitle) {
        domSiteTitle.textContent = d.siteTitle;
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



setActiveLangBtn();
renderLang();
renderHeaderFooterWithLang();


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

