
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
                        <img src="assets/images/logo.png" alt="logo" class="logo-img">
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
                            <button data-lang="zh">中文</button>
                            <button data-lang="en">English</button>
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
            <section class="page-title-section"> 
            </section>
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
const langBtns = document.querySelectorAll('#lang-switch button');


function setActiveLangBtn() {
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    });
}


langBtns.forEach(btn => {
  btn.onclick = () => {
    setLang(btn.getAttribute('data-lang'));
    setActiveLangBtn();
    renderHeaderFooterWithLang();
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


